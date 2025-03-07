import { ArgumentEntry, Base, BaseTypes, Manager } from "../base";
import { ProcessStorage } from "@component/processor/process.storage";
import { ProcessFactory } from "@component/processor/process.factory";
import { IdentityManager } from "../identifier";
import { CommandManager } from "../commands";
import { ProcessEntry, ProcessType, ProcessTypes } from "./process.types";
import { ProcessInstance } from "./processInstance";
import { ProcessConfigParameters } from "@/template";

class ProcessManager<T extends ProcessTypes>
    extends Manager<
        BaseTypes.Process,
        ProcessFactory,
        ProcessStorage<T, Base<BaseTypes.Identity | BaseTypes.Command>[]>,
        [IdentityManager, CommandManager]
    >
{
    constructor({
        args = [],
        processEntries = [],
        dependencies
    }:{
        args?: ArgumentEntry[],
        processEntries?: ProcessEntry<ProcessTypes, Base<BaseTypes.Identity | BaseTypes.Command>[]>[],
        dependencies: [IdentityManager, CommandManager]
    }) {
        super({
            type: BaseTypes.Process,
            factory: new ProcessFactory(),
            storage: new ProcessStorage(),
            parameters: ProcessConfigParameters,
            args,
            dependencies
        });

        for (const processEntry of processEntries) {
            this.createProcess(processEntry);
        }
    }

    public addProcessInstance<T extends ProcessType, D extends Base<BaseTypes.Identity | BaseTypes.Command>[]>(
        processInstance: ProcessInstance<T, D>
    ): void {
        this.storage.addItem({ index: processInstance.id, item: processInstance as T extends ProcessTypes ? ProcessInstance<T, D> : never });
    }

    public createProcess<
        T extends ProcessType,
        // D extends Base<BaseTypes.Identity | BaseTypes.Command>[] = Base<BaseTypes.Identity | BaseTypes.Command>[]
        D extends Base<BaseTypes.Identity | BaseTypes.Command>[]
    >(
        processEntry: ProcessEntry<T, D>
    ): ProcessInstance<T, D> {
        const processInstance = this.factory.create<T, D>(processEntry);
        this.storage.addItem({index: processInstance.id, item: processInstance as T extends ProcessTypes ? ProcessInstance<T, D> : never});
        return processInstance as ProcessInstance<T, D>;
    }

    // private async runWithRetryAndTimeout<R>({
    //     commandName,
    //     args
    // }:{
    //     commandName: string,
    //     args: ArgumentEntry[]
    // }): Promise<Map<number, R | undefined | Error>> {
    //     const properties = new Properties({type: 'Process', params: ProcessParameters, args});

    //     const retry: boolean = properties.getValue('retry');
    //     const retryCount: number = properties.getValue('retryCount');
    //     const retryDelay: number = properties.getValue('retryDelay');

    //     let retries = 0;
    //     let results: Map<number, R | undefined | Error> = new Map();


    //     if (retry) {
    //         do {
    //             const result = await this.runWithTimeout<R>({
    //                 commandName,
    //                 args
    //             });
    //             results.set(retries + 1, result);
    //             retries++;

    //             await new Promise((resolve) => setTimeout(resolve, retryDelay));


    //         }
    //         while (retries < retryCount);
    //     }
    //     else {

    //         const result = await this.runWithTimeout<R>({
    //             commandName,
    //             args
    //         });
    //         results.set(retries + 1, result);
    //     }

    //     return results;
    // }

    // private async runWithTimeout<R>({
    //     command,
    //     args
    // }:{
    //     command: Command<R>,
    //     args: ArgumentEntry[]
    // }): Promise<R | undefined | Error> {

    //     const properties = new Properties({type: BaseTypes.Process, params: ProcessParameters, args});

    //     const timeout: number = this.properties.getValue('timeout');
    //     const timeoutAction: string = this.properties.getValue('timeoutAction');

    //     if (timeout > 0) {
    //         return new Promise((resolve, reject) => {
    //             const timer = setTimeout(async () => {

    //                 if (timeoutAction === 'retry') {
    //                     resolve(this.runCommand<R>({
    //                         command,
    //                         args
    //                     }));
    //                 }
    //                 else {
    //                     this.status = ProcessStatuses.Error;
    //                     reject(new Error(`Process ${this.id} timed out`));
    //                 }
    //             }, timeout);

    //             timer.unref();

    //             this.runCommand<R>({
    //                 command,
    //                 args
    //             })
    //                 .then((result: R | undefined | Error) => {
    //                     clearTimeout(timer);
    //                     this.status = ProcessStatuses.Completed;
    //                     resolve(result);
    //                 })
    //                 .catch((error: any) => {

    //                     clearTimeout(timer);
    //                     this.status = ProcessStatuses.Error;
    //                     reject(error);
    //                 });
    //         });
    //     }
    //     else {
    //         const result = await this.runCommand<R>({
    //             command,
    //             args
    //         });
    //         this.status = ProcessStatuses.Completed;
    //         return result;
    //     }
    // }

    // private async runCommand<R>({
    //     command,
    //     args
    // }:{
    //     command: Command<R>,
    //     args: ArgumentEntry[]
    // }): Promise<R | undefined | Error> {
    //     this.status = ProcessStatuses.Running;

    //     // if (command === undefined) {
    //     //     this.status = ProcessStatuses.CommandNotFound;
    //     //     throw new Error(`Command ${commandName} not found`);
    //     // }

    //     const properties = new Properties<BaseTypes.Process>({type: BaseTypes.Process, params: command?.properties.params, args: [...args, ...command?.properties.args]});

    //     // const result = await this.executeCommand<R>({
    //     //     command,
    //     //     instance: this.instance,
    //     //     args: properties.toKeyValue()
    //     // });

    //     const result = await command.run<R>({
            

    //     this.status = ProcessStatuses.Completed;

    //     return {} as R;

    //     // return result;
    // }

    // public async run<R>({
    //     commandName,
    //     args
    // }:{
    //     commandName: string,
    //     args: ArgumentEntry[]
    // }): Promise<CommandResultSpec<R | undefined | Error>> {

    //     let output: Map<number, R | undefined | Error> = new Map();
    //     const { startTime, bytesIn } = CommandManager.getInputMetrics(new Properties({type: 'Process', args}).toKeyValue());

    //     try {
    //         output = await this.runWithRetryAndTimeout<R>({
    //             commandName,
    //             args
    //         });
    //     }
    //     catch (error: any) {
    //         this.status = ProcessStatuses.Error;
    //         output.set(1, error);
    //     }

    //     const { endTime, bytesOut, duration } = CommandManager.getOutputMetrics(output.get(output.size), startTime);

    //     return {
    //         run: {
    //             processId: this.id,
    //             commandName,
    //             args: new Properties<'Process'>({type: 'Process', args}).toKeyValue(),
    //             instance: this.instance
    //         },
    //         output: output.get(output.size) as R | undefined | Error,
    //         metrics: {
    //             start: startTime,
    //             end: endTime,
    //             duration,
    //             bytesIn,
    //             bytesOut
    //         }
    //     } as CommandResultSpec<R | undefined | Error>;
    // }
}

export {
    ProcessManager
}