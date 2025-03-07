import { 
    CommandResultSpec,
    Metadata, 
    ProcessStatus, 
    ProcessStatuses
} from "@/template";
import { ProcessEntry, ProcessStorageItem, ProcessType, ProcessTypes } from "./process.types";
import { ArgumentEntry, Base, BaseTypes, HashedStorageItem, Properties, PropertiesEntry } from "../base";
import { ProcessParameters } from "./process.params";
import { Command, CommandManager } from "../commands";



class Process<
    T extends ProcessType,
    D extends Base<BaseTypes.Identity | BaseTypes.Command>[]
> 
    extends
        HashedStorageItem<BaseTypes.Process, ProcessStorageItem<T, D>>
{
    public status: ProcessStatus = ProcessStatuses.New;

    constructor({
        id,
        type,
        name = `${type} Process`,
        description,
        args,
        instance,
        metadata,
        dependencies = [],
    }: ProcessEntry<T, D>) {
        super({
            type: BaseTypes.Process,
            data: {
                id,
                type: type as T,
                name,
                description,
                instance,
                dependencies,
                properties: new Properties<BaseTypes.Process>({ type: BaseTypes.Process, params: ProcessParameters, args }),
            },
            meta: new Metadata(metadata)
        });
    }

    private get instance(): Function | undefined {
        return this.data.instance;
    }

    private set instance(instance: Function | undefined) {
        this.data.instance = instance;
    }

    public get id(): string {
        return this.data.id;
    }

    public get name(): string {
        return this.data.name;
    }

    public get description(): string {
        return this.data.description;
    }

    public get dependencies(): D[] {
        return this.data.dependencies as D[];
    }

    public get properties(): Properties<
        BaseTypes.Process
    >{
        return this.data.properties  as Properties<BaseTypes.Process>;
    }

    public get command(): Command {
        return this.properties.getValue('command');
    }



    // public get commandRunner(): CommandRunner {
    //     return this.data.commandRunner;
    // }

    private async createInstance(): Promise<void> {
        this.status = ProcessStatuses.Initializing;

        const initializeFunction: (args?: Record<string, any>) => Promise<Function> = this.properties.getValue('initializeFunction');
        const initializeProperties: Properties<BaseTypes.Process> = new Properties(this.properties.getValue<PropertiesEntry<BaseTypes.Process>>('initializeProperties'));


        try {
            if (initializeFunction !== null
                && typeof initializeFunction === 'function'
            ) {
                this.instance = await initializeFunction(initializeProperties.toKeyValue());
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


        if (initialize === true) {
            await this.createInstance();
        }

        this.status = ProcessStatuses.Ready;
    }

    private async runWithRetryAndTimeout<R>({
        commandName,
        args
    }:{
        commandName: string,
        args: ArgumentEntry[]
    }): Promise<Map<number, R | undefined | Error>> {
        const properties = new Properties({type: 'Process', params: ProcessParameters, args});

        const retry: boolean = properties.getValue('retry');
        const retryCount: number = properties.getValue('retryCount');
        const retryDelay: number = properties.getValue('retryDelay');

        let retries = 0;
        let results: Map<number, R | undefined | Error> = new Map();


        if (retry) {
            do {
                const result = await this.runWithTimeout<R>({
                    commandName,
                    args
                });
                results.set(retries + 1, result);
                retries++;

                await new Promise((resolve) => setTimeout(resolve, retryDelay));


            }
            while (retries < retryCount);
        }
        else {

            const result = await this.runWithTimeout<R>({
                commandName,
                args
            });
            results.set(retries + 1, result);
        }

        return results;
    }

    private async runWithTimeout<R>({
        commandName,
        args
    }:{
        commandName: string,
        args: ArgumentEntry[]
    }): Promise<R | undefined | Error> {

        const properties = new Properties({type: BaseTypes.Process, params: ProcessParameters, args});

        const timeout: number = this.properties.getValue('timeout');
        const timeoutAction: string = this.properties.getValue('timeoutAction');

        if (timeout > 0) {
            return new Promise((resolve, reject) => {
                const timer = setTimeout(async () => {

                    if (timeoutAction === 'retry') {
                        resolve(this.runCommand<R>({
                            commandName,
                            args
                        }));
                    }
                    else {
                        this.status = ProcessStatuses.Error;
                        reject(new Error(`Process ${this.id} timed out`));
                    }
                }, timeout);

                timer.unref();

                this.runCommand<R>({
                    commandName,
                    args
                })
                    .then((result: R | undefined | Error) => {
                        clearTimeout(timer);
                        this.status = ProcessStatuses.Completed;
                        resolve(result);
                    })
                    .catch((error: any) => {

                        clearTimeout(timer);
                        this.status = ProcessStatuses.Error;
                        reject(error);
                    });
            });
        }
        else {
            const result = await this.runCommand<R>({
                commandName,
                args
            });
            this.status = ProcessStatuses.Completed;
            return result;
        }
    }

    private async runCommand<R>({
        commandName,
        args
    }:{
        commandName: string,
        args: ArgumentEntry[]
    }): Promise<R | undefined | Error> {
        this.status = ProcessStatuses.Running;

        const command = this.data.storage.getCommand(commandName);

        if (command === undefined) {
            this.status = ProcessStatuses.CommandNotFound;
            throw new Error(`Command ${commandName} not found`);
        }

        const properties = new Properties({params: command?.properties.params, args: [...args, ...command?.properties.args]});

        const result = await this.data.commandRunner.executeCommand<R>({
            commandName,
            instance: this.instance,
            args: properties.toKeyValue()
        });

        this.status = ProcessStatuses.Completed;

        return result;
    }

    public async run<R>({
        commandName,
        args
    }:{
        commandName: string,
        args: ArgumentEntry[]
    }): Promise<CommandResultSpec<R | undefined | Error>> {

        let output: Map<number, R | undefined | Error> = new Map();
        const { startTime, bytesIn } = CommandManager.getInputMetrics(new Properties({type: 'Process', args}).toKeyValue());

        try {
            output = await this.runWithRetryAndTimeout<R>({
                commandName,
                args
            });
        }
        catch (error: any) {
            this.status = ProcessStatuses.Error;
            output.set(1, error);
        }

        const { endTime, bytesOut, duration } = CommandManager.getOutputMetrics(output.get(output.size), startTime);

        return {
            run: {
                processId: this.id,
                commandName,
                args: new Properties<'Process'>({type: 'Process', args}).toKeyValue(),
                instance: this.instance
            },
            output: output.get(output.size) as R | undefined | Error,
            metrics: {
                start: startTime,
                end: endTime,
                duration,
                bytesIn,
                bytesOut
            }
        } as CommandResultSpec<R | undefined | Error>;
    }
}

export {
    Process
}