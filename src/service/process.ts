import { Command, CommandResult, TaskRunner } from '@service/command';
import { Configuration } from '@artifacts/configuration';
import { ArgumentEntry } from '@artifacts/argument';
import { ParameterEntry } from '@artifacts/parameter';
import { ErrorMessage, Message } from '@service/message';
import { Hashable, PropertyEntry } from '@/artifacts';
import { Configurable } from '@/artifacts/configurable';


const ProcessConfig: Configuration = new Configuration({
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
});

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


class Process<T>
    extends
        Configurable
{
    public instance?: T;
    public status: ProcessStatus = 'New';
    public commands: Array<Command<any, T>> = [];

    constructor({
        name = 'Process',
        description = '',
        configuration = ProcessConfig,
        properties = [],
        parameters = [],
        args = [],
        instance,
        commands = []
    }: {
        name?: string,
        description?: string,
        configuration?: Configuration,
        properties?: PropertyEntry<any>[],
        parameters?: ParameterEntry<any>[],
        args?: ArgumentEntry<any>[],
        instance?: T,
        commands?: Array<Command<any, T>>
    }) {
        super({name, description, configuration, properties, parameters, args});

        this.name = name;
        this.description = description;
        
        this.commands = commands;

        if (
            instance !== undefined
        ) {
            this.instance = instance;
            this.status = 'Ready';
        }
    }

    public async initialize(): Promise<void> {
        const initialize: boolean = this.config.getValue<boolean>('initialize');
        // const initializer: TaskRunner | undefined = this.getArgumentValue<TaskRunner>('initializer');


        if (
            this.status === 'Ready' &&
            initialize === true &&
            // initializer !== undefined && 
            this.instance !== undefined
        ) {
            ErrorMessage.create<'Error'>({
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

            Message.create<'Info'>({
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
                const initializer: Function | undefined = this.config.getValue<Function>('initializer');
                const config: Configuration | undefined = this.config.getValue<Configuration>('initializerConfig') || undefined;
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
                    ErrorMessage.create<'Warn'>({
                        action: 'Process:Initialize',
                        body: 'Initializer function not defined',
                        status: 400,
                        throwError: false
                    });
                }
            }
            catch (error: any) {
                this.status = 'Error';
                ErrorMessage.create<'Error'>({
                    action: 'Process:Initialize',
                    body: 'Error initializing process',
                    status: 500,
                    data: error.body,
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
            ErrorMessage.create<'Warn'>({
                action: 'Process:Initialize',
                body: 'Process is already initialized',
                status: 400,
                throwError: false
            });
        }
    }

    public runCommand = async <R>(command: Command<R, T>, args: ArgumentEntry<any>[] = []): Promise<Message | ErrorMessage> => {
        const action: string = 'Process:RunCommand';
        let result: Message | ErrorMessage = ErrorMessage.create<'Warn'>({
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

                result = Message.create<'Info', CommandResult<R, T>>({
                    action,
                    body: 'Command executed successfully',
                    status: 200,
                    data: commandOutput,
                    print: false
                });

            }
            catch (err: any) {
                this.status = 'Error';
                result = ErrorMessage.create<'Error', {error: any, command: Command<any, any>}>({
                    action,
                    body: 'Error running command',
                    status: 500,
                    data: {
                        error: err,
                        command
                    },
                    throwError: false,
                    print: false
                });
            }
        }

        else {
            result = ErrorMessage.create<'Warn', { status: ProcessStatus }>({
                action,
                body: 'Process not ready to run command',
                status: 400,
                throwError: false,
                data: {
                    status: this.status as ProcessStatus
                }
            });
        }

        this.status = 'Idle';
        return result;
    }

    public run = async (commandName: string, args?: ArgumentEntry<any>[]): Promise<Message | ErrorMessage> => {
        const action: string = 'Process:Run';
        let result: Message | ErrorMessage = ErrorMessage.create<'Warn'>({
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
            result = ErrorMessage.create<'Warn', { status: ProcessStatus }>({
                action,
                body: 'Process not ready to run command, ',
                status: 400,
                throwError: false,
                data: {
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
            return ErrorMessage.create<'Warn'>({
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
    type ProcessStatus,
    ProcessStatuses,
    type ProcessResult
}
