import { ArgumentEntry } from '@artifacts/argument';
import { Command, QueuedCommand } from '@service/command';
import { Process } from '@service/process';
import { Configurable, ConfigurableEntry } from '@/artifacts/configurable';
/**
 * ServiceTypes
 * @summary
 * Describes the type of service
 * - Internal: Service is private and not accessible from outside of the K8s cluster
 * - External: Service is public and accessible from outside of the K8s cluster
 */
declare enum ServiceTypes {
    Internal = "Internal",
    External = "External"
}
/**
 * ServiceType
 * @summary
 * Describes the type of service
 * - enum: ['Internal', 'External']
 */
type ServiceType = keyof typeof ServiceTypes;
/**
 * ServiceResponse
 * @summary
 * Describes the response from a service
 */
type ServiceResponse = Message | ErrorMessage;
interface ServiceEntry<T = ServiceType, U = any> extends ConfigurableEntry, Pick<ConfigurableEntry, 'id' | 'name' | 'description' | 'configuration' | 'properties' | 'parameters' | 'args' | 'useArgs'>, Record<'type', T>, Partial<Record<'processes', Map<string, Process<U>> | undefined>>, Partial<Record<'commands', Array<Command<any, any>> | undefined>> {
}
declare const ServiceConfig: any;
/**
 * Service Class
 * @summary
 * A service is a collection of processes and commands that can be run
 */
declare class Service<T extends ServiceType = ServiceTypes.Internal, /// Type - enum: ['Internal', 'External']
U = any> extends Configurable {
    readonly type: T;
    private processes;
    commands: Array<Command<any, any>>;
    queue: Array<QueuedCommand>;
    queueStatus: 'Started' | 'Stopped';
    history: Array<ServiceResponse>;
    constructor({ id, name, description, type, configuration, properties, parameters, args, processes, commands }: ServiceEntry<T, U>);
    initialize(args?: Record<string, any>): Promise<void>;
    getProcesses(): Map<Process<U>['name'], Process<U>>;
    getProcess(name: Process<U>['name']): Process<U> | undefined;
    private addToHistory;
    addToQueue(command: QueuedCommand): Promise<void>;
    getCommand(name: string): Command | ErrorMessage;
    getProcessCommand(processName: string, commandName: string): Command | ErrorMessage;
    runServiceCommand(commandName: Command['name'], args?: ArgumentEntry<any>[]): Promise<ServiceResponse>;
    runProcessCommand(processName: Process<any>['name'], commandName: Command['name'], args?: ArgumentEntry<any>[]): Promise<Message | ErrorMessage>;
    run(commandName: Command['name'], args: ArgumentEntry<any>[]): Promise<Message | ErrorMessage>;
    run(commandName: Command['name'], args: ArgumentEntry<any>[], processName?: Process<any>['name'] | undefined): Promise<Message | ErrorMessage>;
    runQueueInParallel(limit?: number): Promise<void>;
    runQueueInSeries(): Promise<void>;
    startQueue(sequence?: 'Parallel' | 'Series'): Promise<void>;
    stopQueue(): Promise<void>;
    queueManager({ forceStart, forceStop, forceConfig, config }?: {
        forceStart?: boolean;
        forceStop?: boolean;
        forceConfig?: boolean;
        config?: object | undefined;
    }): Promise<void>;
    start(): Promise<void>;
}
export { ServiceTypes, type ServiceEntry, type ServiceType, type ServiceResponse, ServiceConfig, Service, };
export * from "./command";
export * from "./historian";
export * from "./job";
export * from "./messenger";
export * from "./process";
export * from "./queue";
export * from "./status";
//# sourceMappingURL=index.d.ts.map