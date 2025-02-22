import { CommandResultSpec, CommandRunSpec, CommandSpec, Metadata, MetadataEntry, ParameterSpec, ProcessStatus, ProcessStatuses } from "@/template";
import { ArgumentEntry, Parameter, Properties } from "./properties";
import { CommandRunner } from "@/service/runner";
import { Configurable } from "./configurable";

enum ProcessTypes {
    DB_PSQL = 'DB_PSQL',
    USER = 'USER',
    AUTH = 'AUTH'
}

type ProcessType = keyof typeof ProcessTypes;

const ProcessParameters: ParameterSpec[] = [
    {
        name: 'initialize',
        description: 'Initialize the process',
        type: 'boolean',
        defaultValue: false,
        required: false
    } as ParameterSpec<boolean>,
    {
        name: 'initializeFunction',
        defaultValue: null,
        required: false
    } as ParameterSpec<Function | null>,
    {
        name: 'initializeProperties',
        type: 'object',
        defaultValue: {},
        required: false
    } as ParameterSpec<Record<string, any>>,
    {
        name: 'retry',
        type: 'boolean',
        defaultValue: false,
        required: false
    } as ParameterSpec<boolean>,
    {
        name: 'retryCount',
        type: 'number',
        defaultValue: 0,
        required: false
    } as ParameterSpec<number>,
    {
        name: 'retryDelay',
        type: 'number',
        defaultValue: 0,
        required: false
    } as ParameterSpec<number>,
    {
        name: 'timeout',
        type: 'number',
        defaultValue: 0,
        required: false
    } as ParameterSpec<number>,
    {
        name: 'timeoutAction',
        type: 'string',
        defaultValue: 'fail',
        required: false,
        optionalValues: ['fail', 'retry']
    } as ParameterSpec<string>
]

interface ProcessEntry<T extends ProcessType>
    extends
        Record<'type', T>,
        Record<'instance', Function | undefined>,
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
                instance,
                // instance: instance !== undefined ? instance : async ({instance, args}:{ instance: Function, args: Record<string, any>}) => {return await instance(args)},
                commandRunner: new CommandRunner(commands)
            },
            metadata
        });

        this.status = ProcessStatuses.New;
        this.commands = this.data.commandRunner.listCommands();
    }

    private get instance(): Function | undefined {
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
    }): Promise<Map<number, CommandResultSpec<R | undefined | Error>>> {
        const properties = new Properties({params: this.properties.params, args: [...args, ...this.properties.args]});

        const retry: boolean = properties.getValue('retry');
        const retryCount: number = properties.getValue('retryCount');
        const retryDelay: number = properties.getValue('retryDelay');

        let retries = 0;
        let results: Map<number, CommandResultSpec<R | undefined | Error>> = new Map();

        if (retry) {
            let result: CommandResultSpec<R | undefined | Error> = {
                run: {
                    instance: this.instance,
                    processId: this.id,
                    jobId,
                    commandName,
                    args
                },
                output: undefined,
                metrics: {
                    start: Date.now(),
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
                catch (error: any) {
                    result = {
                        run: {
                            instance: this.instance,
                            processId: this.id,
                            jobId,
                            commandName,
                            args
                        },
                        output: error,
                        metrics: {
                            start: result.metrics.start || 0,
                            end: result.metrics.end || 0,
                            duration: result.metrics.duration || 0,
                            bytesIn: result.metrics.bytesIn || 0,
                            bytesOut: result.metrics.bytesOut || 0
                        }
                    };
                    retries++;
                    await new Promise((resolve) => setTimeout(resolve, retryDelay));
                }
            }
            while (retries < retryCount);

            results.set(retries + 1, result);
        }
        else {
            let result: CommandResultSpec<R | undefined | Error> = {
                run: {
                    instance: this.instance,
                    processId: this.id,
                    jobId,
                    commandName,
                    args
                },
                output: undefined,
                metrics: {
                    start: Date.now(),
                    end: 0,
                    duration: 0,
                    bytesIn: 0,
                    bytesOut: 0
                }
            };
            try {
                result = await this.runWithTimeout<R>({jobId, commandName, args});
            }
            catch (error: any) {
                result = {
                    run: {
                        instance: this.instance,
                        processId: this.id,
                        jobId,
                        commandName,
                        args
                    },
                    output: error,
                    metrics: {
                        start: result.metrics.start || 0,
                        end: result.metrics.end || 0,
                        duration: result.metrics.duration || 0,
                        bytesIn: result.metrics.bytesIn || 0,
                        bytesOut: result.metrics.bytesOut || 0
                    }
                };
            }

            results.set(retries + 1, result);
        }

        return results;
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

        const properties = new Properties({params: command?.properties.params, args: [...args, ...command?.properties.args]});

        const result = await this.data.commandRunner.executeCommand<R>({
            commandName,
            jobId,
            processId: this.id,
            instance: this.instance,
            args: properties.toKeyValue()
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
    }): Promise<Map<number, CommandResultSpec<R | undefined | Error>>> {
        const properties = new Properties({params: this.properties.params, args: [...args, ...this.properties.args]});


        let argKeyPairs: Record<string, any> = properties.toKeyValue();
        // let result: CommandResultSpec<R | undefined>;
        let output: Map<number, CommandResultSpec<R | undefined | Error>> = new Map<number, CommandResultSpec<R | undefined | Error>>();
        let error: Error | undefined = undefined;
        try {
            output = await this.runWithRetryAndTimeout<R | undefined>({jobId, commandName, args});
        }
        catch (error: any) {
            this.status = ProcessStatuses.Error;
            error = error instanceof Error ? error.message : error;
        }

        if (error !== undefined) {
            
        }

        return output;

        // const result = await this.runWithRetryAndTimeout<R | undefined>({jobId, commandName, args});

        // if (result.output instanceof Error) {
        //     result.output = result.output.message as unknown as R;
        // }

        // return result;

        // return await this.runWithRetryAndTimeout<R | undefined>({jobId, commandName, args});
    }
}

export {
    Process,
    type ProcessType,
    ProcessTypes,
    type ProcessEntry,
    ProcessParameters
}