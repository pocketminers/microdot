// import { IdentityManager } from "@/component/identity";
// import { MessageManager } from "@component/message";
// import { MessageStatuses } from "@/template/spec/v0/comms";
// import { Process } from "@/component/process";

import { ArgumentEntry } from "@/component";
import { Identifier, IdentityManager } from "@/component/identifier";


/**
 * ServiceTypes
 * Describes the type of service
 * - Internal: Service is private and not accessible from outside of the K8s cluster
 * - External: Service is public and accessible from outside of the K8s cluster
 */
enum ServiceTypes {
    Internal = 'Internal',
    External = 'External'
}

/**
 * ServiceType
 * Describes the type of service
 * - enum: ['Internal', 'External']
 */
type ServiceType = keyof typeof ServiceTypes;


class Service<
    T extends ServiceType = ServiceTypes.Internal
> {
    public readonly id: Identifier;
    public readonly type: T;
    public readonly identities: IdentityManager
    // public readonly messenger: MessageManager
    // public readonly commands: CommandManager
    // public readonly jobs: JobManager = new JobManager();

    constructor({
        type = ServiceTypes.Internal as T,
        args = []
    }: {
        type?: T,
        args?: Array<ArgumentEntry>
    }) {
        this.identities = new IdentityManager(args);
        // this.commands = new CommandManager({args});
        this.id = this.identities.createId().item.id;
        this.type = type;
    }
}



// class Service
// <
//     P extends Process<any> = any,
//     T extends ServiceType = ServiceTypes.Internal
// > {
//     public id: string;
//     public type: T;
//     private identifier: IdentityManager = new IdentityManager();
//     private messenger: MessageManager = new MessageManager({
//         args: [
//             { name: 'historyLimit', value: 100 },
//             { name: 'keepHistory', value: true },
//             { name: 'historyFilePath', value: './service-history.json' }
//         ],
//         identifier: this.identifier
//     });
//     private processes: P[] = [];

//     constructor({
//         id,
//         type = ServiceTypes.Internal as T
//     }: {
//         id: string,
//         type?: T
//     }) {
//         this.id = id !== undefined ? id : this.identifier.createId();
//         this.type = type;
//     }

//     async initialize(): Promise<void> {
//         await this.messenger.createMessage({
//             body: `[${this.id}] Service initialized`,
//             status: MessageStatuses.Created,
//         });
//     }
// }



// // /**
// //  * ServiceResponse
// //  * @summary
// //  * Describes the response from a service
// //  */
// // type ServiceResponse = Message | ErrorMessage;


// // interface ServiceEntry<T = ServiceType, U = any>
// //     extends
// //         ConfigurableEntry,
// //         Pick<ConfigurableEntry, 'id' | 'name' | 'description' | 'configuration'| 'properties' | 'parameters' | 'args' | 'useArgs'>,
// //         Record<'type', T>,
// //         Partial<Record<'processes', Map<string, Process<U>> | undefined>>,
// //         Partial<Record<'commands', Array<Command<any, any>> | undefined>> {}

// // const ServiceConfig = new Configuration({
// //     name: 'ServiceConfiguration',
// //     description: 'Service configuration',
// //     parameters: [
// //         ...HistorianConfig.toParameters(),
// //         ...MessengerConfig.toParameters(),
// //         ...JobQueueConfig.toParameters(),
// //     ]
// // });

// // /**
// //  * Service Class
// //  * @summary
// //  * A service is a collection of processes and commands that can be run the processes.
// //  */
// // class Service
// // <
// //     T extends ServiceType = ServiceTypes.Internal,        /// Type - enum: ['Internal', 'External']
// //     U = any                 /// Instance - example: DbPsqlProcessInstance | UserTransactionsInstance
// // >
// //     extends
// //         Configurable
// // {
// //     public readonly type: T;
// //     private processes: Map<string, Process<U>>;
// //     public commands: Array<Command<any, any>>;
// //     public queue: Array<QueuedCommand> = new Array<QueuedCommand>();
// //     public queueStatus: 'Started' | 'Stopped' = 'Stopped';
// //     public history: Array<ServiceResponse>;

// //     constructor({
// //         id,
// //         name,
// //         description = '',
// //         type = ServiceTypes.Internal as T,
// //         configuration = ServiceConfig,
// //         properties,
// //         parameters,
// //         args,
// //         processes = new Map<string, Process<U>>(),
// //         commands = []
// //     }: ServiceEntry<T, U>) {
// //         super({
// //             id,
// //             name,
// //             description,
// //             configuration,
// //             properties,
// //             parameters,
// //             args
// //         });
// //         this.type = type;
// //         this.processes = processes || new Map<string, Process<U>>();

// //         this.commands = commands;
// //         this.history = [];
// //     }

// //     public async initialize(args?: Record<string, any>): Promise<void> {
// //         for (const process of this.processes.values()) {
// //             await process.initialize();
// //         }
// //     }

// //     public getProcesses(): Map<Process<U>['name'], Process<U>> {
// //         return this.processes;
// //     }

// //     public getProcess(name: Process<U>['name']): Process<U> | undefined {
// //         return this.processes.get(name);
// //     }

// //     private addToHistory(body: Message | ErrorMessage): void {
// //         const historyLimit: number = this.config.getValue<number>('historyLimit');

// //         if (this.history.length >= historyLimit) {
// //             this.history.shift();
// //         }

// //         this.history.push(body);
// //     }

// //     public async addToQueue(command: QueuedCommand): Promise<void> {
// //         if (this.queue.length >= this.config.getValue<number>('queueLimit')) {
// //             await ErrorMessage.createMsg<'Warn'>({
// //                 action: 'Service:AddToQueue',
// //                 body: 'Queue limit reached',
// //                 status: 400,
// //                 throwError: true
// //             });
// //         }

// //         this.queue.push(command);
// //     }

// //     public getCommand(name: string): Command | ErrorMessage {
// //         const command: Command | undefined = this.commands.find(command => command.name === name);
// //         if (!command) {
// //             return ErrorMessage.createMsg<'Warn'>({
// //                 action: 'Service:GetCommand',
// //                 body: `Command not found: ${name}`,
// //                 status: 404,
// //                 throwError: false
// //             });
// //         }
// //         return command;
// //     }

// //     public getProcessCommand(processName: string, commandName: string): Command | ErrorMessage {
// //         const process = this.processes.get(processName);
// //         if (process) {
// //             return process.getCommand(commandName);
// //         }
// //         else {
// //             return ErrorMessage.createMsg<'Warn'>({
// //                 action: 'Service:GetSubCommand',
// //                 body: `Process not found: ${processName}`,
// //                 status: 404,
// //                 throwError: false
// //             });
// //         }
// //     }

// //     public async runServiceCommand(commandName: Command['name'], args: ArgumentEntry<any>[] = []): Promise<ServiceResponse> {
// //         const action: string = 'Service:Run';
// //         let result: Message | ErrorMessage = ErrorMessage.createMsg<'Warn'>({
// //             action,
// //             body: 'Command not found',
// //             status: 404,
// //             throwError: false
// //         });
// //         const command = this.getCommand(commandName);

// //         if (command instanceof Command) {
// //             const output = await command.run({args});

// //             if (output instanceof ErrorMessage) {
// //                 result = output;
// //             }
// //             else {
// //                 result = Message.createMsg<'Info', CommandResult<any, any>>({
// //                     action,
// //                     body: 'Command executed',
// //                     status: 200,
// //                     metadata: output
// //                 });
// //             }
// //         }
// //         else {
// //             return command;
// //         }

// //         this.addToHistory(result);
// //         return result;
// //     }

// //     public async runProcessCommand(processName: Process<any>['name'], commandName: Command['name'], args: ArgumentEntry<any>[] = []): Promise<Message | ErrorMessage> {
        
// //         const process = this.processes.get(processName);

// //         if (!process) {
// //             return ErrorMessage.createMsg<'Warn'>({
// //                 action: 'Service:Run',
// //                 body: `Process not found: ${processName}`,
// //                 status: 404,
// //                 throwError: false
// //             });
// //         }

// //         const result = await process.run(commandName, args);
// //         this.addToHistory(result);
// //         return result;
// //     }

// //     public async run(commandName: Command['name'], args: ArgumentEntry<any>[]): Promise<Message | ErrorMessage>
// //     public async run(commandName: Command['name'], args: ArgumentEntry<any>[], processName?: Process<any>['name'] | undefined,): Promise<Message | ErrorMessage >
// //     public async run(...args: any[]): Promise<Message | ErrorMessage> {
// //         let result: Message | ErrorMessage;

// //         if (args.length === 2) {
// //             result = await this.runServiceCommand(args[0], args[1]);
// //         }
// //         else if (args.length === 3) {
// //             result = await this.runProcessCommand(args[2], args[0], args[1]);
// //         }
// //         else {
// //             result = ErrorMessage.createMsg<'Warn'>({
// //                 action: 'Service:Run',
// //                 body: 'Invalid arguments',
// //                 status: 400,
// //                 throwError: false
// //             });
// //         }
// //         return result;
// //     }

// //     public async runQueueInParallel(limit: number = 100): Promise<void> {
// //         const queue = this.queue.slice(0, limit);
// //         this.queue = this.queue.slice(limit);

// //         await Promise.all(queue.map(async command => {
// //             await this.run(command.commandName, command.args || [], command.processName);
// //         }));

// //         this.queue = [];
// //     }

// //     public async runQueueInSeries(): Promise<void> {
// //         for (const command of this.queue) {
// //             await this.run(command.commandName, command.args || [], command.processName);
// //             this.queue.shift();
// //         }
// //     }

// //     public async startQueue(sequence: 'Parallel' | 'Series' = "Series"): Promise<void> {
// //         if (this.queueStatus === 'Started') {
// //             return;
// //         }

// //         this.queueStatus = 'Started';
// //         try {
// //             while (this.queueStatus === 'Started') {

// //                 if (sequence === 'Series') {
// //                     await this.runQueueInSeries();
// //                     this.queueStatus = 'Stopped';
// //                 }
// //                 else {
// //                     await this.runQueueInParallel();
// //                     this.queueStatus = 'Stopped';
// //                 }
// //             }
// //             this.queueStatus = 'Stopped';
// //         }
// //         catch (error: any) {
// //             this.queueStatus = 'Stopped';
// //             ErrorMessage.createMsg<'Error'>({
// //                 action: 'Service:Queue',
// //                 body: 'Queue error',
// //                 status: 500,
// //                 metadata: error,
// //                 throwError: true
// //             });
// //         }
// //     }

// //     public async stopQueue(): Promise<void> {
// //         if (this.queueStatus === 'Stopped') {
// //             return;
// //         }

// //         this.queueStatus = 'Stopped';
// //     }

// //     public async queueManager(
// //         {forceStart = false, forceStop = false, forceConfig = false, config = undefined}:
// //         {forceStart?: boolean, forceStop?: boolean, forceConfig?: boolean, config?: object | undefined} =
// //         {}
// //     ): Promise<void> {
// //         const startQueue: boolean = this.config.getValue<boolean>('startQueue');
// //         const queueInterval: number = this.config.getValue<number>('queueInterval');
// //         const queueInSeries: boolean = this.config.getValue<boolean>('queueInSeries');

// //         if (
// //             forceStart === true &&
// //             forceStop === true
// //         ) {
// //             ErrorMessage.createMsg<'Warn'>({
// //                 action: 'Service:QueueManager',
// //                 body: 'Invalid arguments: forceStart and forceStop cannot be true at the same time',
// //                 status: 400,
// //                 throwError: true
// //             });
// //         }
           

// //         if (
// //             startQueue === true ||
// //             ( 
// //                 forceStart === true &&
// //                 this.queueStatus === 'Stopped'
// //             )
// //         ) {
// //             if (queueInSeries) {
// //                 await this.startQueue('Series');
// //             }
// //             else {
// //                 await this.startQueue('Parallel');
// //             }
// //         }
// //         else if (
// //             forceStop === true ||
// //             (
// //                 forceStart === false &&
// //                 forceStop === false &&
// //                 this.queueStatus === 'Started'
// //             )
// //         ) {
// //             await this.stopQueue();
// //         }

// //         setTimeout(async () => {
// //             await this.queueManager({forceStart, forceStop});
// //         }, queueInterval);
// //     }
    

// //     public async start(): Promise<void> {
// //         await this.initialize();
// //         await this.queueManager();
// //     }
        
// // }


// export {
//     ServiceTypes,
//     // type ServiceEntry,
//     type ServiceType,
//     // type ServiceResponse,
//     // ServiceConfig,
//     Service,
// }

export {
    ServiceTypes,
    type ServiceType,
    Service
}

// export * from "./commands";
// export * from "./identifier";
// export * from "./messages";

// // export * from "./command";
// // export * from "./message";
// // export * from "./historian";
// // export * from "./job";
// // export * from "./messenger";
// // export * from "./process";
// // export * from "./queue";
// // export * from "./status";