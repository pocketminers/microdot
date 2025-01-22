import { Command } from './command';
import { ArgumentEntry } from '../artifacts/argument';
import { ErrorMessage, Message } from '../artifacts/message';
import { Configurable, ConfigurableEntry } from '../artifacts/configurable';
import { Identifier } from '../utils/identifier';
declare const ProcessConfig: (id: Identifier) => ConfigurableEntry;
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
interface ProcessEntry<T> extends ConfigurableEntry, Partial<Record<'instance', T>>, Partial<Record<'commands', Array<Command<any, T>>>> {
}
declare class Process<T> extends Configurable {
    instance?: T;
    status: ProcessStatus;
    commands: Array<Command<any, T>>;
    constructor({ id, name, description, configuration, properties, parameters, args, instance, commands }: ProcessEntry<T>);
    initialize(): Promise<void>;
    initializeInstance(): Promise<void>;
    runCommand: <R>(command: Command<R, T>, args?: ArgumentEntry<any>[]) => Promise<Message | ErrorMessage>;
    run: (commandName: string, args?: ArgumentEntry<any>[]) => Promise<Message | ErrorMessage>;
    getCommand: (name: string) => Command<any, T> | ErrorMessage;
}
export { Process, ProcessConfig, type ProcessStatus, type ProcessEntry, ProcessStatuses, type ProcessResult };
//# sourceMappingURL=process.d.ts.map