import { Command } from './command';
import { Configuration } from '../artifacts/configuration';
import { ArgumentEntry } from '../artifacts/argument';
import { ParameterEntry } from '../artifacts/parameter';
import { ErrorMessage, Message } from './message';
import { PropertyEntry } from '../artifacts';
import { Configurable } from '../artifacts/configurable';
declare enum ProcessStatuses {
    New = "New",
    Ready = "Ready",
    Initializing = "Initializing",
    Initialized = "Initialized",
    Idle = "Idle",
    Running = "Running",
    Stopped = "Stopped",
    Paused = "Paused",
    Error = "Error",
    Completed = "Completed",
    Unknown = "Unknown"
}
type ProcessStatus = keyof typeof ProcessStatuses;
type ProcessResult = Message | ErrorMessage;
declare class Process<T> extends Configurable {
    instance?: T;
    status: ProcessStatus;
    commands: Array<Command<any, T>>;
    constructor({ name, description, configuration, properties, parameters, args, instance, commands }: {
        name?: string;
        description?: string;
        configuration?: Configuration;
        properties?: PropertyEntry<any>[];
        parameters?: ParameterEntry<any>[];
        args?: ArgumentEntry<any>[];
        instance?: T;
        commands?: Array<Command<any, T>>;
    });
    initialize(): Promise<void>;
    initializeInstance(): Promise<void>;
    runCommand: <R>(command: Command<R, T>, args?: ArgumentEntry<any>[]) => Promise<Message | ErrorMessage>;
    run: (commandName: string, args?: ArgumentEntry<any>[]) => Promise<Message | ErrorMessage>;
    getCommand: (name: string) => Command<any, T> | ErrorMessage;
}
export { Process, type ProcessStatus, ProcessStatuses, type ProcessResult };
//# sourceMappingURL=process.d.ts.map