"use strict";
// import { Configuration } from './configuration';
// import { Arguments } from './arguments';
// import { ArgumentEntry, Argument } from './argument';
// import { ParameterEntry } from './parameter';
// import { Hashable } from './hashable';
// import { PropertyEntry } from './property';
// interface ExecutionMetrics
//     extends
//         Record<'startTime', number>,
//         Record<'endTime', number>,
//         Record<'duration', number>,
//         Record<'bytesReceived', number>,
//         Record<'bytesReturned', number> {}
// interface CommandResultEntry<R, T>
//     extends
//         Record<'command', Command<R, T>['name']>,
//         Record<'args', Arguments>,
//         Record<'result', R>,
//         Record<'metrics', ExecutionMetrics> {}
// class CommandResult<R, T>
//     implements
//         CommandResultEntry<R, T>
// {
//     public command: Command<R, T>['name'];
//     public args: Arguments;
//     public result: R;
//     public metrics: ExecutionMetrics;
//     constructor({
//         command,
//         args,
//         result,
//         metrics
//     }: CommandResultEntry<R, T>) {
//         this.command = command;
//         this.args = args;
//         this.result = result;
//         this.metrics = metrics;
//     }
//     public toJSON = (): CommandResultEntry<R, T> => {
//         return {
//             command: this.command,
//             args: this.args,
//             result: this.result,
//             metrics: this.metrics
//         }
//     }
//     public toString = (): string => {
//         return JSON.stringify(this, null, 2);
//     }
// }
// type TaskRunner<R = any, T = any> = (instance: T | undefined, args?: Record<string, any>) => Promise<R>;
// const defaultTaskRunner: TaskRunner<any, any> = async (instance, args) => {
//     return await instance(args);
// }
// class Command
// <
//     R = any,    // Result
//     T = any   // TaskRunner Instance
// >
//     extends
//         Hashable
// {
//     public taskRunner: TaskRunner<R, T>;
//     public config: Configuration;
//     constructor({
//         name = 'Base Command',
//         description = 'The Base Command Class',
//         taskRunner = defaultTaskRunner,
//         config,
//         args = []
//     }: {
//         name?: string,
//         description?: string,
//         taskRunner?: TaskRunner<R, T>,
//         config?: Configuration,
//         args?: ArgumentEntry<any>[]
//     } = {}) {
//         super({name, description, args});
//         this.config = config || new Configuration();
//         this.taskRunner = taskRunner;
//         this.addProperties(properties);
//     }
//     public execute = async ({
//         instance,
//         args
//     }:{
//         instance?: T,
//         args?: ArgumentEntry<any>[]
//     } = {}): 
//         Promise<R> =>
//     {
//         this.setArguments(args || []);
//         return await this.taskRunner(instance, this.getArguments());
//     }
//     public run = async ({
//         instance,
//         args
//     }:{
//         instance?: T,
//         args?: ArgumentEntry<any>[]
//     } = {}): 
//         Promise<
//            CommandResult<R, T>
//     > => {
//         const startTime = Date.now();
//         let endTime: number;
//         let duration: number = 0;
//         let result: R | undefined;
//         let bytesReceived: number = 0;
//         let bytesReturned: number = 0;
//         if (args !== undefined) {
//             bytesReceived = JSON.stringify(args).length;
//         }
//         try {
//             result = await this.execute({instance, args});
//         }
//         catch (error: any) {
//             result = error;
//         }
//         if (result === undefined || result === null) {
//             bytesReturned = 0;
//         }
//         else {
//             bytesReturned = JSON.stringify(result).length;
//         }
//         endTime = Date.now();
//         duration = endTime - startTime;
//         return {
//                 command: this.name,
//                 args: this.arguments,
//                 result: result || null,
//                 metrics: {
//                     startTime,
//                     endTime,
//                     duration,
//                     bytesReceived,
//                     bytesReturned
//                 }
//         } as CommandResult<R, T>;
//     }
// }
// interface QueuedCommand {
//     processName?: string;
//     commandName: string;
//     args?: Argument<any>[];
// }
// export {
//     Command,
//     type CommandResult,
//     type ExecutionMetrics,
//     type TaskRunner,
//     type QueuedCommand,
//     defaultTaskRunner
// }
//# sourceMappingURL=command.js.map