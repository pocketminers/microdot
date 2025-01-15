
import { ErrorMessage, Message } from '@service/message';
import { Configuration } from '@artifacts/configuration';
import { ArgumentEntry } from '@artifacts/argument';
import { ParameterEntry } from '@artifacts/parameter';
import { Command, QueuedCommand, CommandResult } from '@service/command';
import { Process } from '@service/process';
import { Configurable } from '@/artifacts/configurable';


/**
 * ServiceTypes
 * @summary
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
 * @summary
 * Describes the type of service
 * - enum: ['Internal', 'External']
 */
type ServiceType = keyof typeof ServiceTypes;

/**
 * ServiceConfig
 * @summary
 * Configuration for a Service
 */
const ServiceConfig = new Configuration({
    parameters: [
        { name: 'keepHistory', required: true, description: 'Keep history of bodys', defaultValue: true },
        { name: 'historyLimit', required: true, description: 'Limit of bodys to keep', defaultValue: 10 },
        { name: 'queueLimit', required: true, description: 'Limit of commands to run in parallel', defaultValue: 100 },
        { name: 'queueInterval', required: true, description: 'Interval to run commands in parallel', defaultValue: 1000 },
        { name: 'queueInSeries', required: true, description: 'Run commands in series', defaultValue: false },
        { name: 'startQueue', required: true, description: 'Start the queue', defaultValue: false },
    ]
});

/**
 * ServiceResponse
 * @summary
 * Describes the response from a service
 */
type ServiceResponse = Message | ErrorMessage;


/**
 * Service Class
 * @summary
 * A service is a collection of processes and commands that can be run
 */
class Service
<
    T = ServiceType,        // Type - enum: ['Internal', 'External']
    U = any                 // Instance - example: DbPsqlProcessInstance | UserTransactionsInstance
>
    extends
        Configurable
{
    public readonly type: T;
    private processes: Map<string, Process<U>>;
    public commands: Array<Command<any, any>>;
    public queue: Array<QueuedCommand> = new Array<QueuedCommand>();
    public queueStatus: 'Started' | 'Stopped' = 'Stopped';
    public history: Array<ServiceResponse>;

    constructor({
        name,
        description,
        type,
        parameters,
        args,
        processes = new Map<string, Process<U>>(),
        commands = []
    }: {
        name?: string,
        description?: string,
        type: T,
        parameters: ParameterEntry<any>[],
        args: ArgumentEntry<any>[],
        processes?: Map<string, Process<U>>,    
        commands?: Array<Command<any, any>>
    }) {
        super({name, description, parameters, args});
        this.type = type;
        this.processes = processes || new Map<string, Process<U>>();

        this.commands = commands;
        this.history = [];
    }

    public async initialize(args?: Record<string, any>): Promise<void> {
        for (const process of this.processes.values()) {
            await process.initialize();
        }
    }

    public getProcesses(): Map<Process<U>['name'], Process<U>> {
        return this.processes;
    }

    public getProcess(name: Process<U>['name']): Process<U> | undefined {
        return this.processes.get(name);
    }

    private addToHistory(body: Message | ErrorMessage): void {
        const historyLimit: number = this.config.getValue<number>('historyLimit');

        if (this.history.length >= historyLimit) {
            this.history.shift();
        }

        this.history.push(body);
    }

    public addToQueue(command: QueuedCommand): void {
        if (this.queue.length >= this.config.getValue<number>('queueLimit')) {
            ErrorMessage.create<'Warn'>({
                action: 'Service:AddToQueue',
                body: 'Queue limit reached',
                status: 400,
                throwError: true
            });
        }

        this.queue.push(command);
    }

    public getCommand(name: string): Command | ErrorMessage {
        const command: Command | undefined = this.commands.find(command => command.name === name);
        if (!command) {
            return ErrorMessage.create<'Warn'>({
                action: 'Service:GetCommand',
                body: `Command not found: ${name}`,
                status: 404,
                throwError: false
            });
        }
        return command;
    }

    public getProcessCommand(processName: string, commandName: string): Command | ErrorMessage {
        const process = this.processes.get(processName);
        if (process) {
            return process.getCommand(commandName);
        }
        else {
            return ErrorMessage.create<'Warn'>({
                action: 'Service:GetSubCommand',
                body: `Process not found: ${processName}`,
                status: 404,
                throwError: false
            });
        }
    }

    public async runServiceCommand(commandName: Command['name'], args: ArgumentEntry<any>[] = []): Promise<ServiceResponse> {
        const action: string = 'Service:Run';
        let result: Message | ErrorMessage = ErrorMessage.create<'Warn'>({
            action,
            body: 'Command not found',
            status: 404,
            throwError: false
        });
        const command = this.getCommand(commandName);

        if (command instanceof Command) {
            const output = await command.run({args});

            if (output instanceof ErrorMessage) {
                result = output;
            }
            else {
                result = Message.create<'Info', CommandResult<any, any>>({
                    action,
                    body: 'Command executed',
                    status: 200,
                    data: output
                });
            }
        }
        else {
            return command;
        }

        this.addToHistory(result);
        return result;
    }

    public async runProcessCommand(processName: Process<any>['name'], commandName: Command['name'], args: ArgumentEntry<any>[] = []): Promise<Message | ErrorMessage> {
        
        const process = this.processes.get(processName);

        if (!process) {
            return ErrorMessage.create<'Warn'>({
                action: 'Service:Run',
                body: `Process not found: ${processName}`,
                status: 404,
                throwError: false
            });
        }

        const result = await process.run(commandName, args);
        this.addToHistory(result);
        return result;
    }

    public async run(commandName: Command['name'], args: ArgumentEntry<any>[]): Promise<Message | ErrorMessage>
    public async run(commandName: Command['name'], args: ArgumentEntry<any>[], processName?: Process<any>['name'] | undefined,): Promise<Message | ErrorMessage >
    public async run(...args: any[]): Promise<Message | ErrorMessage> {
        let result: Message | ErrorMessage;

        if (args.length === 2) {
            result = await this.runServiceCommand(args[0], args[1]);
        }
        else if (args.length === 3) {
            result = await this.runProcessCommand(args[2], args[0], args[1]);
        }
        else {
            result = ErrorMessage.create<'Warn'>({
                action: 'Service:Run',
                body: 'Invalid arguments',
                status: 400,
                throwError: false
            });
        }
        return result;
    }

    public async runQueueInParallel(limit: number = 100): Promise<void> {
        const queue = this.queue.slice(0, limit);
        this.queue = this.queue.slice(limit);

        await Promise.all(queue.map(async command => {
            await this.run(command.commandName, command.args || [], command.processName);
        }));

        this.queue = [];
    }

    public async runQueueInSeries(): Promise<void> {
        for (const command of this.queue) {
            await this.run(command.commandName, command.args || [], command.processName);
            this.queue.shift();
        }
    }

    public async startQueue(sequence: 'Parallel' | 'Series' = "Series"): Promise<void> {
        if (this.queueStatus === 'Started') {
            return;
        }

        this.queueStatus = 'Started';
        try {
            while (this.queueStatus === 'Started') {

                if (sequence === 'Series') {
                    await this.runQueueInSeries();
                    this.queueStatus = 'Stopped';
                }
                else {
                    await this.runQueueInParallel();
                    this.queueStatus = 'Stopped';
                }
            }
            this.queueStatus = 'Stopped';
        }
        catch (error: any) {
            this.queueStatus = 'Stopped';
            ErrorMessage.create<'Error'>({
                action: 'Service:Queue',
                body: 'Queue error',
                status: 500,
                data: error,
                throwError: true
            });
        }
    }

    public async stopQueue(): Promise<void> {
        if (this.queueStatus === 'Stopped') {
            return;
        }

        this.queueStatus = 'Stopped';
    }

    public async queueManager(
        {forceStart = false, forceStop = false, forceConfig = false, config = undefined}:
        {forceStart?: boolean, forceStop?: boolean, forceConfig?: boolean, config?: object | undefined} =
        {}
    ): Promise<void> {
        const startQueue: boolean = this.config.getValue<boolean>('startQueue');
        const queueInterval: number = this.config.getValue<number>('queueInterval');
        const queueInSeries: boolean = this.config.getValue<boolean>('queueInSeries');

        if (
            forceStart === true &&
            forceStop === true
        ) {
            ErrorMessage.create<'Warn'>({
                action: 'Service:QueueManager',
                body: 'Invalid arguments: forceStart and forceStop cannot be true at the same time',
                status: 400,
                throwError: true
            });
        }
           

        if (
            startQueue === true ||
            ( 
                forceStart === true &&
                this.queueStatus === 'Stopped'
            )
        ) {
            if (queueInSeries) {
                await this.startQueue('Series');
            }
            else {
                await this.startQueue('Parallel');
            }
        }
        else if (
            forceStop === true ||
            (
                forceStart === false &&
                forceStop === false &&
                this.queueStatus === 'Started'
            )
        ) {
            await this.stopQueue();
        }

        setTimeout(async () => {
            await this.queueManager({forceStart, forceStop});
        }, queueInterval);
    }
    

    public async start(): Promise<void> {
        await this.initialize();
        await this.queueManager();
    }
        
}


export {
    ServiceTypes,
    type ServiceType,
    type ServiceResponse,
    ServiceConfig,
    Service,
}


export * from "./command"
export * from "./job"
export * from "./message"
export * from "./process"
export * from "./status"