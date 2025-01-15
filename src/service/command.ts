import { Arguments } from '@artifacts/arguments';
import { ArgumentEntry, Argument } from '@artifacts/argument';
import { checkIsEmpty } from '@utils/checks';
import { Configurable, ConfigurableEntry } from '@/artifacts/configurable';
import { createIdentifier } from '@/utils';


/**
 * Command execution metrics interface.
 * An object that contains the execution metrics of a command that has completed execution.
 */
interface ExecutionMetrics
    extends
        Record<'startTime', number>,
        Record<'endTime', number>,
        Record<'duration', number>,
        Record<'bytesReceived', number>,
        Record<'bytesReturned', number> {}


/**
 * Command result entry interface.
 * An object that contains the result of a command that has completed execution.
 */
interface CommandResultEntry<R, T>
    extends
        Partial<Record<'jobId', string>>,
        Record<'command', Command<R, T>['name']>,
        Record<'args', Arguments>,
        Record<'output', R | Error | null>,
        Record<'metrics', ExecutionMetrics> {}


/**
 * Command result class.
 * A class that contains the result of a command that has completed execution.
 */
class CommandResult<R, T> {
    public jobId?: string;
    public command: Command<R, T>['name'];
    public args: Arguments;
    public output: R | Error | null;
    public metrics: ExecutionMetrics;

    constructor({
        jobId,
        command,
        args,
        output,
        metrics
    }: CommandResultEntry<R, T>) {
        this.jobId = jobId;
        this.command = command;
        this.args = args;
        this.output = output;
        this.metrics = metrics;
    }

    public toJSON(): {command: string, args: Arguments, output: R | Error | null, metrics: ExecutionMetrics} {
        return {
            command: this.command,
            args: this.args,
            output: this.output,
            metrics: this.metrics
        }
    }

    public toString(): string {
        return JSON.stringify(this, null, 2);
    }
}


type TaskRunner<R = any, T = any> = (instance: T | undefined, args?: Record<string, any>) => Promise<R>;

const defaultTaskRunner: TaskRunner<any, any> = async (instance, args) => {
    return await instance(args);
}

interface CommandEntry<R, T>
    extends
        ConfigurableEntry,
        Record<'taskRunner', TaskRunner<R, T>> {}

/**
 * The Command class is a configurable class that can be executed.
 */
class Command
<
    R = any,      // Result
    T = any       // TaskRunner Instance
>
    extends
        Configurable
{
    public taskRunner: TaskRunner<R, T>;

    /**
     * The Command class is a configurable class that can be executed.
     */
    constructor({
        id = createIdentifier(),
        name = 'Base Command',
        description = 'The Base Command Class',
        taskRunner = defaultTaskRunner,
        configuration,
        properties = [],
        parameters = [],
        args = []
    }: CommandEntry<R, T>) {
        super({id, name, description, configuration, properties, parameters, args});

        this.taskRunner = taskRunner;
    }

    /**
     * Execute the command.
     */
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
        return await this.taskRunner(instance, this.config.toRecord());
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
        let duration: number = 0;
        let output: R | undefined;
        let bytesReceived: number = 0;
        let bytesReturned: number = 0;
        
        if (
            args !== undefined
            && checkIsEmpty([args])
        ) {
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
            || checkIsEmpty([output])
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

        const endTime = Date.now();
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
    type CommandEntry,
    type CommandResultEntry,
    type CommandResult,
    type ExecutionMetrics,
    type TaskRunner,
    type QueuedCommand,
    defaultTaskRunner
}