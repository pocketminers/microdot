// import { Checks } from "@utils/checks";
// import {
//     CommandRunSpec,
//     CommandSpec,
//     TaskRunner
// } from "@template/spec/v0/command";


// interface CommandEntry
//     extends
//         Pick<CommandSpec, "name" | "description">,
//         Partial<Pick<CommandSpec, "properties">> {}


// /**
//  * The default task runner
//  * @returns The result of the command
//  */
// const defaultTaskRunner: TaskRunner<any, any> = async ({instance, args}) => {
//     return await instance({args});
// }


// class CommandRunner {
//     private commands: Map<string, CommandSpec> = new Map();

//     public constructor(commands: CommandSpec[] = []) {
//         for (const command of commands) {
//             this.registerCommand(command);
//         }
//     }

//     private checkCommandIsUnique(command: CommandSpec): void {
//         if (this.commands.has(command.name)) {
//             throw new Error(`Command ${command.name} already exists`);
//         }
//     }

//     public registerCommand(command: CommandSpec): void {
//         this.checkCommandIsUnique(command);

//         this.commands.set(command.name, command);
//     }

//     public unregisterCommand(commandName: string): void {
//         this.commands.delete(commandName);
//     }

//     public getCommand(commandName: string): CommandSpec {
//         const command = this.commands.get(commandName);
//         if (command === undefined) {
//             throw new Error(`Command ${commandName} not found`);
//         }
//         return command;
//     }

//     public listCommands(): CommandSpec[] {
//         return Array.from(this.commands.values());
//     }

//     public listCommandNames(): string[] {
//         return Array.from(this.commands.keys());
//     }


//     public async executeCommand<R>({
//         commandName,
//         instance,
//         args
//     }: CommandRunSpec): Promise<R | Error | undefined> {
//         let output: R | Error |undefined;
        
//         try {
//             const command = this.getCommand(commandName);
//             output = await command.run({instance, args});
//         }
//         catch (error: any) {
//             output = error;
//         }

//         return output;
//     }

//     public static getByteCount(value: any): number {
//         let count: number = 0;

//         if (
//             value instanceof Error
//             && value.message !== undefined
//         ) {
//             const errorObject = value.message
//             count = JSON.stringify(errorObject).length;
//         }
//         else if (
//             value instanceof Object
//             || value instanceof Map
//             || value instanceof Set
//             || value instanceof WeakMap
//             || value instanceof WeakSet
//             || value instanceof Function
//         ) {
//             count = JSON.stringify(value).length;
//         }
//         else if (value instanceof Array) {
//             const stringified = value.map(item => JSON.stringify(item));
//             count = stringified.join('').length
//         }
//         else if (typeof value === 'string') {
//             count = value.length;
//         }
//         else if (typeof value === 'number') {
//             count = value.toString().length;
//         }
//         else if (
//             value === undefined
//             || value === null
//             || Checks.isEmpty(value) === true
//         ) {
//             count = 0;
//         }

//         return count;
//     }

//     public static getInputMetrics(args: Record<string,any>): { bytesIn: number, startTime: number} {
//         let bytesIn: number = 0;

//         if (
//             args !== undefined
//             && Checks.isEmpty(args) === false
//         ) {
//             bytesIn = CommandRunner.getByteCount(args);
//         }

//         return {
//             bytesIn,
//             startTime: Date.now()
//         }
//     }

//     public static getOutputMetrics<R>(output: R, startTime: number): { bytesOut: number, duration: number, endTime: number } {
//         let bytesOut: number = 0;

//         if (
//             output !== undefined
//         ) {
//             bytesOut = CommandRunner.getByteCount(output);
//         }

//         const endTime = Date.now();
//         const duration = endTime - startTime;

//         return {
//             bytesOut,
//             duration,
//             endTime
//         }
//     }
// }


// export {
//     defaultTaskRunner,
//     CommandRunner,
// }