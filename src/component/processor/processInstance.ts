import { 
    CommandResultSpec,
    Metadata, 
    ProcessStatus, 
    ProcessStatuses
} from "@/template";
import { ProcessEntry, ProcessStorageItem, ProcessType, ProcessTypes } from "./process.types";
import { ArgumentEntry, Base, BaseTypes, HashedStorageItem, Properties, PropertiesEntry } from "../base";
import { ProcessParameters } from "./process.params";
// import { Command, CommandManager } from "../commands";



class ProcessInstance<
    T extends ProcessType,
    D extends Base<BaseTypes.Identity | BaseTypes.Command>[] = Base<BaseTypes.Identity | BaseTypes.Command>[]
> 
    extends
        HashedStorageItem<
            BaseTypes.Process,
            ProcessStorageItem<T, D>
        >
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

    // public get command(): Command {
    //     return this.data?.dependencies[0].storage.getCommand(this.properties.getValue('commandName'));
    // }



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

}

export {
    ProcessInstance
}