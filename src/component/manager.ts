import { ProcessConfigSpec } from "@/template/spec/v0/process";
import { Component } from "./";
import { ConfigSpec } from "@/template/spec/v0/config";
import { ParameterSpec, PropertiesSpec } from "@/template/spec";
import { Parameter, Properties } from "./properties";

class ProcessManager
    extends
        Component<ProcessConfigSpec>
{
    constructor(data: ProcessConfigSpec) {
        super({data, meta: {}});
    }
}

export {
    ProcessManager
};

const ProcessConfig = (id: string): ConfigSpec => {
    return {
        id,
        name: 'ProcessConfig',
        description: 'Process Configuration',
        properties: new Properties({
            params: [
                new Parameter({
                    name: 'initialize',
                    required: false,
                    description: 'Initialize the process instance',
                    defaultValue: false
                }),
                new Parameter({
                    name: 'initializer',
                    required: false,
                    description: 'Initializer function',
                }),
                new Parameter({
                    name: 'initializerConfig',
                    required: false,
                    description: 'Initializer configuration',
                }),
                new Parameter({
                    name: 'run',
                    required: false,
                    description: 'Run the process instance',
                }),
            ]
        })
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
        ConfigSpec,
        Partial<Record<'instance', T>>,
        Partial<Record<'commands', Array<Command<any, T>>>>
{}

abstract class Process<T>
    extends
        Configurable
{
    public abstract instance?: T;
    public status: ProcessStatus = 'New';
    public commands: Array<Command<any, T>> = [];

    constructor({
        id,
        name = 'Process',
        description = '',
        args = ProcessConfig(id).args,
        instance,
        commands = []
    }: ProcessEntry<T>) {
        const parameters = ProcessConfig(id).parameters;
        super({id, name, description, parameters, args});
        
        this.commands = commands;

        if (
            instance !== undefined
        ) {
            // this.instance = instance;
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
                    config !== undefined
                ) {
                    args = config.getAllValues();
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
