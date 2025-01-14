import { Configuration } from '../artifacts/configuration';
import { Arguments } from '../artifacts/arguments';
import { ArgumentEntry, Argument } from '../artifacts/argument';
import { ParameterEntry } from '../artifacts/parameter';
import { Hashable } from '../artifacts/hashable';
import { PropertyEntry } from '../artifacts/property';
interface ExecutionMetrics extends Record<'startTime', number>, Record<'endTime', number>, Record<'duration', number>, Record<'bytesReceived', number>, Record<'bytesReturned', number> {
}
interface CommandResultEntry<R, T> extends Record<'command', Command<R, T>['name']>, Record<'args', Arguments>, Record<'output', R | Error | null>, Record<'metrics', ExecutionMetrics> {
}
declare class CommandResult<R, T> implements CommandResultEntry<R, T> {
    command: Command<R, T>['name'];
    args: Arguments;
    output: R | Error | null;
    metrics: ExecutionMetrics;
    constructor({ command, args, output, metrics }: CommandResultEntry<R, T>);
    toJSON: () => CommandResultEntry<R, T>;
    toString: () => string;
}
type TaskRunner<R = any, T = any> = (instance: T | undefined, args?: Record<string, any>) => Promise<R>;
declare const defaultTaskRunner: TaskRunner<any, any>;
declare class Command<R = any, // Result
T = any> extends Hashable {
    name: string;
    description: string;
    taskRunner: TaskRunner<R, T>;
    config: Configuration;
    constructor({ name, description, taskRunner, config, properties, parameters, args }?: {
        name?: string;
        description?: string;
        taskRunner?: TaskRunner<R, T>;
        config?: Configuration;
        properties?: PropertyEntry<any>[];
        parameters?: ParameterEntry<any>[];
        args?: ArgumentEntry<any>[];
    });
    setArguments(args: ArgumentEntry<any>[]): void;
    getArguments(): Arguments;
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