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

    public async run<R>({
        jobId,
        commandName,
        args
    }:{
        jobId: string,
        commandName: string,
        args: ArgumentEntry[]
    }): Promise<CommandResultSpec<any>> {
        if (this.status === ProcessStatuses.Ready) {
            this.status = ProcessStatuses.Running;
            const argMap: Map<string, any> = new Map();
            for (const arg of args) {
                argMap.set(arg.name, arg.value);
            }
            const result = await this.data.commandRunner.executeCommand<R>({commandName, jobId: jobId, processId: this.id, instance: this.instance, args: argMap});
            this.status = ProcessStatuses.Completed;

            return result;
        }
        else {

            throw new Error(`Process ${this.id} is not ready to run`);
        }
    }
}

export {
    Process,
    type ProcessType,
    ProcessTypes
}