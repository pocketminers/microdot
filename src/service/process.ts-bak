import { Command, CommandResult } from '@service/command';
import { ArgumentEntry } from '@artifacts/argument';
import { ErrorMessage, Message } from '@service/message';
import { Configurable, ConfigurableEntry } from '@artifacts/configurable';
import { Identifier } from '@utils/identifier';


const ProcessConfig = (id: Identifier): ConfigurableEntry => {

    return {
        id,
        name: 'ProcessConfig',
        description: 'Process Configuration',
        parameters: [
            {
                name: 'initialize',
                required: true,
                description: 'Initialize the process instance',
                defaultValue: false,
                optionalValues: [true, false]
            },
            {
                name: 'initializer',
                required: false,
                description: 'Returns the process instance',
                defaultValue: null
            },
            {
                name: 'initializerConfig',
                required: false,
                description: 'Configuration for the initializer function',
                defaultValue: {}
            },
            {
                name: 'run',
                required: false,
                description: 'Run the process instance',
                defaultValue: false,
                optionalValues: [true, false]
            }
        ],
        args: []
    };
}

enum ProcessStatuses {
    New = 'New',
    Ready = 'Ready',
    Initializing = 'Initializing',
    Initialized = 'Initialized',
    Idle = 'Idle',
    Running = 'Running',
    Stopped = 'Stopped',
    Paused = 'Paused',
    Error = 'Error',
    Completed = 'Completed',
    Unknown = 'Unknown'
}

type ProcessStatus = keyof typeof ProcessStatuses;

type ProcessResult = Message | ErrorMessage

interface ProcessEntry<T>
    extends
        ConfigurableEntry,
        Partial<Record<'instance', T>>,
        Partial<Record<'commands', Array<Command<any, T>>>>
{}

class Process<T>
    extends
        Configurable
{
    public instance?: T;
    public status: ProcessStatus = 'New';
    public commands: Array<Command<any, T>> = [];

    constructor({
        id,
        name = 'Process',
        description = '',
        parameters = ProcessConfig(id).parameters,
        args = ProcessConfig(id).args,
        instance,
        commands = []
    }: ProcessEntry<T>) {
        super({id, name, description, parameters, args});
        
        this.commands = commands;

        if (
            instance !== undefined
        ) {
            this.instance = instance;
            this.status = 'Ready';
        }
        else {
            this.status = 'New';
        }
    }

    public async initialize(): Promise<void> {
        const initialize: boolean = this.getValue<boolean>('initialize');
        // const initializer: TaskRunner | undefined = this.getArgumentValue<TaskRunner>('initializer');


        if (
            this.status === 'Ready' &&
            initialize === true &&
            // initializer !== undefined && 
            this.instance !== undefined
        ) {
            ErrorMessage.createMsg<'Error'>({
                action: 'Process:Initialize',
                body: 'Instance already initialized, but a seperate initializer is defined, disregarding the initializer',
                status: 400,
                throwError: true
            });
        }

        if (
            this.status === 'New' // &&
            // initialize === true
            // initializer !== undefined
        ) {
            this.status = 'Initializing';

            Message.createMsg<'Info'>({
                action: 'Process:Initialize',
                body: `Initializing process - ${this.name}`,
                status: 200,
                // print: false
            });

            await this.initializeInstance();

            if (
                this.status.toString() === 'Initialized'
            ) {
                this.status = 'Ready';
            }
            else {
                this.status = 'Error';
            }
            
        }
    }

    public async initializeInstance(): Promise<void> {
        if (
            this.status === 'Initializing'
        ) {
            try {
                const initializer: Function | undefined = this.getValue('initializer');
                const config: Configurable | undefined = this.getValue('initializerConfig') || undefined;
                let args: Record<string, any> = {};

                if (
                    config &&
                    config.size > 0
                ) {
                    args = config.toArguments();
                    console.log('Initializer Config:', args);
                }

                if (
                    initializer !== undefined
                ) {
                    this.instance = await initializer(args);
                    this.status = 'Initialized';
                    return;
                }
                else {
                    ErrorMessage.createMsg<'Warn'>({
                        action: 'Process:Initialize',
                        body: 'Initializer function not defined',
                        status: 400,
                        throwError: false
                    });
                }
            }
            catch (error: any) {
                this.status = 'Error';
                ErrorMessage.createMsg<'Error'>({
                    action: 'Process:Initialize',
                    body: 'Error initializing process',
                    status: 500,
                    metadata: error.body,
                    throwError: true
                });
            }
        }

        if (
            this.status === 'Initialized' || 
            this.status === 'Running' ||
            this.status === 'Paused' ||
            this.status === 'Stopped' ||
            this.status === 'Error' ||
            this.status === 'Completed' ||
            this.status === 'Unknown'
        ) {
            ErrorMessage.createMsg<'Warn'>({
                action: 'Process:Initialize',
                body: 'Process is already initialized',
                status: 400,
                throwError: false
            });
        }
    }

    public runCommand = async <R>(command: Command<R, T>, args: ArgumentEntry<any>[] = []): Promise<Message | ErrorMessage> => {
        const action: string = 'Process:RunCommand';
        let result: Message | ErrorMessage = ErrorMessage.createMsg<'Warn'>({
            action,
            body: 'Process not initialized',
            status: 400,
            throwError: false,
            print: false
        });

        if (
            this.status === 'Ready' ||
            this.status === 'Idle'
        ) {
            this.status = 'Running';
            try {
                const commandOutput: CommandResult<R, T> = await command.run({instance: this.instance, args});
                this.status = 'Completed';

                result = Message.createMsg<'Info', CommandResult<R, T>>({
                    action,
                    body: 'Command executed successfully',
                    status: 200,
                    metadata: commandOutput,
                    print: false
                });

            }
            catch (err: any) {
                this.status = 'Error';
                result = ErrorMessage.createMsg<'Error', {error: any, command: Command<any, any>}>({
                    action,
                    body: 'Error running command',
                    status: 500,
                    metadata: {
                        error: err,
                        command
                    },
                    throwError: false,
                    print: false
                });
            }
        }

        else {
            result = ErrorMessage.createMsg<'Warn', { status: ProcessStatus }>({
                action,
                body: 'Process not ready to run command',
                status: 400,
                throwError: false,
                metadata: {
                    status: this.status as ProcessStatus
                }
            });
        }

        this.status = 'Idle';
        return result;
    }

    public run = async (commandName: string, args?: ArgumentEntry<any>[]): Promise<Message | ErrorMessage> => {
        const action: string = 'Process:Run';
        let result: Message | ErrorMessage = ErrorMessage.createMsg<'Warn'>({
            action,
            body: 'Process not initialized',
            status: 400,
            throwError: false,
            print: false
        });

        if (
            this.status === 'Ready' ||
            this.status === 'Idle'
        ) {
            const command: Command<any, T> | ErrorMessage = this.getCommand(commandName);

            if (
                command instanceof Command
            ) {
                result = await this.runCommand(command, args);
            }
            else {
                result = command;
            }
        }

        else {
            result = ErrorMessage.createMsg<'Warn', { status: ProcessStatus }>({
                action,
                body: 'Process not ready to run command, ',
                status: 400,
                throwError: false,
                metadata: {
                    status: this.status as ProcessStatus
                }
            });
        }

        this.status = 'Idle';
        return result;
    }

    public getCommand = (name: string): Command<any, T> | ErrorMessage => {
        const command: Command<any, T> | undefined = this.commands.find(command => command.name === name);
        if (!command) {
            return ErrorMessage.createMsg<'Warn'>({
                action: 'Process:GetCommand',
                body: `Command not found: ${name} in process: ${this.name}`,
                status: 404,
                throwError: false
            });
        }
        return command;
    }
}

export {
    Process,
    ProcessConfig,
    type ProcessStatus,
    type ProcessEntry,
    ProcessStatuses,
    type ProcessResult
}
