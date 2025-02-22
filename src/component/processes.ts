import { CommandResultSpec, CommandRunSpec, CommandSpec, Metadata, MetadataEntry, ProcessStatus, ProcessStatuses } from "@/template";
import { ArgumentEntry, Properties } from "./properties";
import { CommandRunner } from "@/service/runner";
import { Configurable } from "./configurable";

enum ProcessTypes {
    DB_PSQL = 'DB_PSQL',
    USER = 'USER',
    AUTH = 'AUTH'
}

type ProcessType = keyof typeof ProcessTypes;

const ProcessParameters = [
    {
        name: 'initialize',
        type: 'boolean',
        default: false,
        required: false
    },
    {
        name: 'initializeFunction',
        type: 'function',
        default: undefined,
        required: false
    },
    {
        name: 'initializeProperties',
        type: 'object',
        default: {},
        required: false
    },
    {
        name: 'retry',
        type: 'boolean',
        default: false,
        required: false
    },
    {
        name: 'retryCount',
        type: 'number',
        default: 0,
        required: false
    },
    {
        name: 'retryDelay',
        type: 'number',
        default: 0,
        required: false
    },
    {
        name: 'timeout',
        type: 'number',
        default: 0,
        required: false
    },
    {
        name: 'timeoutAction',
        type: 'string',
        default: 'fail',
        required: false,
        optionalValues: ['fail', 'retry']
    }
]

interface ProcessEntry<T extends ProcessType>
    extends
        Record<'type', T>,
        Record<'instance', Function>,
        Record<'commandRunner', CommandRunner> {}

class Process<T extends ProcessType> 
    extends Configurable<ProcessEntry<T>>
{
    public status: ProcessStatus = ProcessStatuses.New;
    public commands: CommandSpec[] = [];

    constructor({
        id,
        type,
        name = `${type} Process`,
        description,
        args,
        instance,
        commands,
        metadata
    }: {
        id: string,
        type?: T,
        name?: string,
        description?: string,
        args?: ArgumentEntry[],
        instance?: Function,
        commands?: CommandSpec[],
        metadata?: MetadataEntry | Metadata
    }) {
        super({
            id,
            name,
            description,
            properties: { params: ProcessParameters, args },
            data: {
                type: type as T,
                instance: instance !== undefined ? instance : async ({instance, args}:{ instance: Function, args: Record<string, any>}) => {return await instance(args)},
                commandRunner: new CommandRunner(commands)
            },
            metadata
        });

        this.status = ProcessStatuses.New;
        this.commands = this.data.commandRunner.listCommands();
    }

    private get instance(): Function {
        return this.data.instance;
    }

    private async createInstance(): Promise<void> {
        this.status = ProcessStatuses.Initializing;

        const initializeFunction = this.properties.getValue('initializeFunction');
        const initializeProperties = this.properties.getValue('initializeProperties');

        try {
            if (initializeFunction) {
                this.data.instance = await initializeFunction(initializeProperties);
                this.status = ProcessStatuses.Initialized
            }
            else {
                this.status = ProcessStatuses.InitializationError;
                throw new Error('No initialize function found, although initialize is set to true');
            }
        }
        catch (error) {
            this.status = ProcessStatuses.InitializationError;
            throw new Error(`Failed to create instance: ${error}`);
        }
    }

    public async initialize(): Promise<void> {
        const initialize: boolean = this.properties.getValue('initialize');

        if (initialize) {
            await this.createInstance();
        }

        this.status = ProcessStatuses.Ready;
    }

    private async runWithRetryAndTimeout<R>({
        jobId,
        commandName,
        args
    }:{
        jobId: string,
        commandName: string,
        args: ArgumentEntry[]
    }): Promise<CommandResultSpec<R | undefined>> {
        const retry: boolean = this.properties.getValue('retry');
        const retryCount: number = this.properties.getValue('retryCount');
        const retryDelay: number = this.properties.getValue('retryDelay');

        if (retry) {
            let retries = 0;
            let result: CommandResultSpec<undefined> = {
                run: {
                    instance: this.instance,
                    processId: this.id,
                    jobId,
                    commandName,
                    args
                },
                output: undefined,
                metrics: {
                    start: 0,
                    end: 0,
                    duration: 0,
                    bytesIn: 0,
                    bytesOut: 0
                }
            };

            do {
                try {
                    result = await this.runWithTimeout<R>({jobId, commandName, args});
                    break;
                }
                catch (error) {
                    retries++;
                    await new Promise((resolve) => setTimeout(resolve, retryDelay));
                }
            }
            while (retries < retryCount);

            return result;
        }
        else {
            return this.runWithTimeout<R>({jobId, commandName, args});
        }
    }

    private async runWithTimeout<R>({
        jobId,
        commandName,
        args
    }:{
        jobId: string,
        commandName: string,
        args: ArgumentEntry[]
    }): Promise<CommandResultSpec<any>> {
        const timeout: number = this.properties.getValue('timeout');
        const timeoutAction: string = this.properties.getValue('timeoutAction');

        if (timeout > 0) {
            return new Promise((resolve, reject) => {
                const timer = setTimeout(() => {
                    if (timeoutAction === 'retry') {
                        resolve(this.runCommand<R>({jobId, commandName, args}));
                    }
                    else {
                        reject(new Error(`Process ${this.id} timed out`));
                    }
                }, timeout);

                this.runCommand<R>({jobId, commandName, args})
                    .then((result: CommandResultSpec<R>) => {
                        clearTimeout(timer);
                        resolve(result);
                    })
                    .catch((error: any) => {
                        clearTimeout(timer);
                        reject(error);
                    });
            });
        }
        else {
            return this.runCommand<R>({jobId, commandName, args});
        }
    }

    private async runCommand<R>({
        jobId,
        commandName,
        args
    }:{
        jobId: string,
        commandName: string,
        args: ArgumentEntry[]
    }): Promise<CommandResultSpec<any>> {
        this.status = ProcessStatuses.Running;

        const command = this.data.commandRunner.getCommand(commandName);

        if (command === undefined) {
            this.status = ProcessStatuses.CommandNotFound;
            throw new Error(`Command ${commandName} not found`);
        }

        const result = await this.data.commandRunner.executeCommand({
            commandName,
            jobId,
            processId: this.id,
            instance: this.instance,
            args
        });

        this.status = ProcessStatuses.Completed;

        return result;
    }

    public async run<R>({
        jobId,
        commandName,
        args
    }:{
        jobId: string,
        commandName: string,
        args: ArgumentEntry[]
    }): Promise<CommandResultSpec<R | undefined>> {
        return await this.runWithRetryAndTimeout<R | undefined>({jobId, commandName, args});
    }
}

export {
    Process,
    type ProcessType,
    ProcessTypes,
    type ProcessEntry,
    ProcessParameters
}