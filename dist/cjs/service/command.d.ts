import { Arguments } from '@artifacts/arguments';
import { ArgumentEntry, Argument } from '@artifacts/argument';
import { Configurable, ConfigurableEntry } from '@/artifacts/configurable';
/**
 * Command execution metrics interface.
 * An object that contains the execution metrics of a command that has completed execution.
 */
interface ExecutionMetrics extends Record<'startTime', number>, Record<'endTime', number>, Record<'duration', number>, Record<'bytesReceived', number>, Record<'bytesReturned', number> {
}
/**
 * Command result entry interface.
 * An object that contains the result of a command that has completed execution.
 */
interface CommandResultEntry<R, T> extends Partial<Record<'jobId', string>>, Record<'command', Command<R, T>['name']>, Record<'args', Arguments>, Record<'output', R | Error | null>, Record<'metrics', ExecutionMetrics> {
}
/**
 * Command result class.
 * A class that contains the result of a command that has completed execution.
 */
declare class CommandResult<R, T> implements CommandResultEntry<R, T> {
    jobId?: string;
    command: Command<R, T>['name'];
    args: Arguments;
    output: R | Error | null;
    metrics: ExecutionMetrics;
    constructor({ jobId, command, args, output, metrics }: CommandResultEntry<R, T>);
    toJSON(): {
        command: string;
        args: Arguments;
        output: R | Error | null;
        metrics: ExecutionMetrics;
    };
    toString(): string;
}
type TaskRunner<R = any, T = any> = (instance: T | undefined, args?: Record<string, any>) => Promise<R>;
declare const defaultTaskRunner: TaskRunner<any, any>;
interface CommandEntry<R, T> extends Partial<Pick<ConfigurableEntry, 'id' | 'name' | 'description' | 'configuration' | 'properties' | 'parameters' | 'args'>>, Record<'taskRunner', TaskRunner<R, T>> {
}
/**
 * The Command class is a configurable class that can be executed.
 */
declare class Command<R, // Result
T> extends Configurable {
    taskRunner: TaskRunner<R, T>;
    /**
     * The Command class is a configurable class that can be executed.
     */
    constructor({ id, name, description, taskRunner, configuration, properties, parameters, args }: CommandEntry<R, T>);
    /**
     * Execute the command.
     */
    execute: ({ instance, args }?: {
        instance?: T;
        args?: ArgumentEntry<any>[];
    }) => Promise<R>;
    run: ({ instance, args }?: {
        instance?: T;
        args?: ArgumentEntry<any>[];
    }) => Promise<CommandResult<R, T>>;
}
interface QueuedCommand {
    processName?: string;
    commandName: string;
    args?: Argument<any>[];
}
export { Command, type CommandResult, type ExecutionMetrics, type TaskRunner, type QueuedCommand, defaultTaskRunner };
//# sourceMappingURL=command.d.ts.map