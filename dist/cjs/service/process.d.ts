import { Command } from '@service/command';
import { Configuration } from '@artifacts/configuration';
import { ArgumentEntry } from '@artifacts/argument';
import { ParameterEntry } from '@artifacts/parameter';
import { ErrorMessage, Message } from '@service/message';
import { Hashable, PropertyEntry } from '@/artifacts';
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
declare class Process<T> extends Hashable {
    name: string;
    description: string;
    instance?: T;
    commands: Array<Command<any, T>>;
    status: ProcessStatus;
    config: Configuration;
    constructor({ name, description, config, properties, parameters, args, instance, commands }: {
        name?: string;
        description?: string;
        config?: Configuration;
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