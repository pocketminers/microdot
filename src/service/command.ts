import { Configuration } from '../artifacts/configuration';
import { Arguments } from '../artifacts/arguments';
import { ArgumentEntry, Argument } from '../artifacts/argument';
import { ParameterEntry } from '../artifacts/parameter';
import { Hashable } from '../artifacts/hashable';
import { PropertyEntry } from '../artifacts/property';


interface ExecutionMetrics
    extends
        Record<'startTime', number>,
        Record<'endTime', number>,
        Record<'duration', number>,
        Record<'bytesReceived', number>,
        Record<'bytesReturned', number> {}


interface CommandResultEntry<R, T>
    extends
        Record<'command', Command<R, T>['name']>,
        Record<'args', Arguments>,
        Record<'output', R | Error | null>,
        Record<'metrics', ExecutionMetrics> {}


class CommandResult<R, T>
    implements
        CommandResultEntry<R, T>
{
    public command: Command<R, T>['name'];
    public args: Arguments;
    public output: R | Error | null;
    public metrics: ExecutionMetrics;

    constructor({
        command,
        args,
        output,
        metrics
    }: CommandResultEntry<R, T>) {
        this.command = command;
        this.args = args;
        this.output = output;
        this.metrics = metrics;
    }

    public toJSON = (): CommandResultEntry<R, T> => {
        return {
            command: this.command,
            args: this.args,
            output: this.output,
            metrics: this.metrics
        }
    }

    public toString = (): string => {
        return JSON.stringify(this, null, 2);
    }
}


type TaskRunner<R = any, T = any> = (instance: T | undefined, args?: Record<string, any>) => Promise<R>;

const defaultTaskRunner: TaskRunner<any, any> = async (instance, args) => {
    return await instance(args);
}

class Command
<
    R = any,    // Result
    T = any   // TaskRunner Instance
>
    extends
        Hashable
{
    public name: string;
    public description: string;
    public taskRunner: TaskRunner<R, T>;
    public config: Configuration;

    constructor({
        name = 'Base Command',
        description = 'The Base Command Class',
        taskRunner = defaultTaskRunner,
        config,
        properties = [],
        parameters = [],
        args = []
    }: {
        name?: string,
        description?: string,
        taskRunner?: TaskRunner<R, T>,
        config?: Configuration,
        properties?: PropertyEntry<any>[],
        parameters?: ParameterEntry<any>[],
        args?: ArgumentEntry<any>[]
    } = {}) {
        super({name, description, config, properties, parameters, args});

        this.name = name;
        this.description = description;
        
        if (config !== undefined) {
            this.config = config;
            this.config.addEntries({entries: [...properties, ...parameters], args});
            this.config.setArguments(args);
        }
        else {
            this.config = new Configuration(properties, parameters, args);
        }

        this.taskRunner = taskRunner;

        
    }

    public setArguments = (args: ArgumentEntry<any>[]): void => {
        this.config.setArguments(args);
    }

    public getArguments = (): Arguments => {
        return this.config.toArguments();
    }

    public execute = async ({
        instance,
        args
    }:{
        instance?: T,
        args?: ArgumentEntry<any>[]
    } = {}): 
        Promise<R> =>
    {
        this.setArguments(args || []);
        return await this.taskRunner(instance, this.config);
    }

    public run = async ({
        instance,
        args
    }:{
        instance?: T,
        args?: ArgumentEntry<any>[]
    } = {}): 
        Promise<
           CommandResult<R, T>
    > => {
        const startTime = Date.now();
        let endTime: number;
        let duration: number = 0;
        let output: R | undefined;
        let bytesReceived: number = 0;
        let bytesReturned: number = 0;
        
        if (args !== undefined) {
            bytesReceived = JSON.stringify(args).length;
        }
        
        try {
            output = await this.execute({instance, args});
        }
        catch (error: any) {
            output = error;
        }

        if (
            output === undefined
            || output === null
        ) {
            bytesReturned = 0;
        }
        else {
            if (output instanceof Error) {
                bytesReturned = JSON.stringify(output.message).length;
            }
            else if (
                output instanceof Object
                || output instanceof Map
                || output instanceof Set
                || output instanceof WeakMap
                || output instanceof WeakSet
                || output instanceof Function
            ) {
                bytesReturned = JSON.stringify(output).length;
            }
            else if (output instanceof Array) {
                const stringified = output.map(item => JSON.stringify(item));
                bytesReturned = stringified.join('').length
            }
            else if (typeof output === 'string') {
                bytesReturned = output.length;
            }
        }

        endTime = Date.now();
        duration = endTime - startTime;

        return new CommandResult<R, T>({
                command: this.name,
                args: this.config.toArguments(),
                output: output as R || null,
                metrics: {
                    startTime,
                    endTime,
                    duration,
                    bytesReceived,
                    bytesReturned
                }
        })
    }
}

interface QueuedCommand {
    processName?: string;
    commandName: string;
    args?: Argument<any>[];
}

export {
    Command,
    type CommandResult,
    type ExecutionMetrics,
    type TaskRunner,
    type QueuedCommand,
    defaultTaskRunner
}