import { ArgumentEntry, BaseTypes, Factory, Manager, ParameterEntry, Properties, Storage } from "@/component";
import { CommandSpec, TaskRunner } from "@/template";
import { Checks } from "@/utils";

/**
 * The default task runner
 * @returns The result of the command
 */
const defaultTaskRunner: TaskRunner<any, any> = async ({instance, args}) => {
    return await instance({args});
}

interface CommandEntry<R = any, T = any>
    extends
        Pick<CommandSpec, "name" | "description">,
        Partial<Record<'parameters', ParameterEntry[]>>,
        Partial<Record<'run', TaskRunner<R, T>>> {}


interface RunCommandEntry
    extends
        Record<'commandName', string>,
        Record<'instance', any>,
        Partial<Record<'args', {[key: string]: any}>> {}

class Command<R = any, T = any>{
    public readonly name: string;
    public readonly description: string;
    public readonly properties: Record<string, any>;
    public readonly run: TaskRunner<R, T>;

    constructor({
        name,
        description,
        parameters,
        run
    }: CommandEntry<R, T>) {
        this.name = name;
        this.description = description;
        this.properties = new Properties({type: 'Command', params: parameters});
        this.run = run !== undefined ? run : defaultTaskRunner;
    }
}

class CommandFactory
    extends Factory<BaseTypes.Command, Command>
{
    constructor() {
        super(BaseTypes.Command);
    }

    public create<R, T>({
        name,
        description,
        parameters,
        run
    }: CommandEntry<R, T>): Command {
        return new Command<R, T>({name, description, parameters, run});
    }
}


class CommandStorage
    extends Storage<BaseTypes.Command, Command>
{
    constructor(commands: Command[] = []) {
        super({type: BaseTypes.Command});

        for (const command of commands) {
            this.addItem({index: command.name, item: command});
        }
    }
}

const CommandsManagerParameters: ParameterEntry[] = [
];

class CommandManager
    extends Manager
    <
        BaseTypes.Command,
        CommandFactory,
        CommandStorage
    >
{
    constructor({
        args,
        commandEntries
    }:{
        args: ArgumentEntry[]
        commandEntries: CommandEntry[]
    }) {
        super({
            type: BaseTypes.Command,
            factory: new CommandFactory(),
            storage: new CommandStorage(),
            parameters: CommandsManagerParameters,
            args
        });

        for (const commandEntry of commandEntries) {
            this.storage.addItem({index: commandEntry.name, item: this.factory.create(commandEntry)});
        }
    }

    public async executeCommand<R>({
        commandName,
        instance,
        args
    }: RunCommandEntry): Promise<R | Error | undefined> {
        let output: R | Error |undefined;
        
        try {
            const command = this.storage.getItem(commandName);
            output = await command.run({instance, args});
        }
        catch (error: any) {
            output = error;
        }

        return output;
    }

    public static getByteCount(value: any): number {
        let count: number = 0;

        if (
            value instanceof Error
            && value.message !== undefined
        ) {
            const errorObject = value.message
            count = JSON.stringify(errorObject).length;
        }
        else if (
            value instanceof Object
            || value instanceof Map
            || value instanceof Set
            || value instanceof WeakMap
            || value instanceof WeakSet
            || value instanceof Function
        ) {
            count = JSON.stringify(value).length;
        }
        else if (value instanceof Array) {
            const stringified = value.map(item => JSON.stringify(item));
            count = stringified.join('').length
        }
        else if (typeof value === 'string') {
            count = value.length;
        }
        else if (typeof value === 'number') {
            count = value.toString().length;
        }
        else if (
            value === undefined
            || value === null
            || Checks.isEmpty(value) === true
        ) {
            count = 0;
        }

        return count;
    }

    public static getInputMetrics(args: Record<string,any>): { bytesIn: number, startTime: number} {
        let bytesIn: number = 0;

        if (
            args !== undefined
            && Checks.isEmpty(args) === false
        ) {
            bytesIn = CommandManager.getByteCount(args);
        }

        return {
            bytesIn,
            startTime: Date.now()
        }
    }

    public static getOutputMetrics<R>(output: R, startTime: number): { bytesOut: number, duration: number, endTime: number } {
        let bytesOut: number = 0;

        if (
            output !== undefined
        ) {
            bytesOut = CommandManager.getByteCount(output);
        }

        const endTime = Date.now();
        const duration = endTime - startTime;

        return {
            bytesOut,
            duration,
            endTime
        }
    }
}


export {
    type CommandEntry,
    type RunCommandEntry,
    Command,
    CommandFactory,
    CommandStorage,
    CommandManager,
    CommandsManagerParameters
};