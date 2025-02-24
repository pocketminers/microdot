import { Checks } from "@utils/checks";
import {
    CommandResultSpec,
    CommandRunSpec,
    CommandSpec,
    TaskRunner
} from "@template/spec/v0/command";


interface CommandEntry
    extends
        Pick<CommandSpec, "name" | "description">,
        Partial<Pick<CommandSpec, "properties">> {}


/**
 * The default task runner
 * @param instance - The instance of the command
 * @param args - The arguments to the command
 * @returns The result of the command
 */
const defaultTaskRunner: TaskRunner<any, any> = async ({instance, args}) => {
    return await instance({args});
}


class CommandRunner {
    private commands: Map<string, CommandSpec> = new Map();

    public constructor(commands: CommandSpec[] = []) {
        for (const command of commands) {
            this.registerCommand(command);
        }
    }

    private checkCommandIsUnique(command: CommandSpec): void {
        if (this.commands.has(command.name)) {
            throw new Error(`Command ${command.name} already exists`);
        }
    }

    public registerCommand(command: CommandSpec): void {
        this.checkCommandIsUnique(command);

        this.commands.set(command.name, command);
    }

    public unregisterCommand(commandName: string): void {
        this.commands.delete(commandName);
    }

    public getCommand(commandName: string): CommandSpec {
        const command = this.commands.get(commandName);
        if (command === undefined) {
            throw new Error(`Command ${commandName} not found`);
        }
        return command;
    }

    public listCommands(): CommandSpec[] {
        return Array.from(this.commands.values());
    }

    public listCommandNames(): string[] {
        return Array.from(this.commands.keys());
    }


    public async executeCommand<R>({
        commandName,
        jobId,
        processId = 'default',
        instance,
        args
    }: CommandRunSpec): Promise<CommandResultSpec<R | Error | undefined>> {
        const { startTime, bytesIn } = this.getInputMetrics(args);
        let output: R | Error |undefined;
        
        try {
            const command = this.getCommand(commandName);
            output = await command.run({instance, args});
        }
        catch (error: any) {
            output = error;
            console.log(`error`, error);
        }

        const { bytesOut, duration, endTime } = this.getOutputMetrics<R | Error | undefined>(output, startTime);        

        return {
            run: {
                processId,
                commandName,
                jobId: jobId !== undefined ? jobId : `${commandName}-${Date.now()}`,
                args,
                instance
            },
            output: output as R | Error | undefined,
            metrics: {
                start: startTime,
                end: endTime,
                duration,
                bytesIn,
                bytesOut
            }
        } as CommandResultSpec<R | Error | undefined>;
    }

    private getByteCount(value: any): number {
        let count: number = 0;

        if (
            value instanceof Error
            && value.message !== undefined
        ) {
            const errorObject = value.message
            count = JSON.stringify(errorObject).length;
        }
        else if (
            value instanceof Object
            || value instanceof Map
            || value instanceof Set
            || value instanceof WeakMap
            || value instanceof WeakSet
            || value instanceof Function
        ) {
            count = JSON.stringify(value).length;
        }
        else if (value instanceof Array) {
            const stringified = value.map(item => JSON.stringify(item));
            count = stringified.join('').length
        }
        else if (typeof value === 'string') {
            count = value.length;
        }
        else if (typeof value === 'number') {
            count = value.toString().length;
        }
        else if (
            value === undefined
            || value === null
            || Checks.isEmpty(value) === true
        ) {
            count = 0;
        }

        return count;
    }

    public getInputMetrics(args: Record<string,any>): { bytesIn: number, startTime: number} {
        let bytesIn: number = 0;

        if (
            args !== undefined
            && Checks.isEmpty(args) === false
        ) {
            bytesIn = this.getByteCount(args);
        }

        return {
            bytesIn,
            startTime: Date.now()
        }
    }

    public getOutputMetrics<R>(output: R, startTime: number): { bytesOut: number, duration: number, endTime: number } {
        let bytesOut: number = 0;

        console.log(`output`, output);

        if (
            output !== undefined
            // && Checks.isEmpty(output) === false
        ) {
            console.log(`output is not empty`);
            bytesOut = this.getByteCount(output);
        }

        const endTime = Date.now();
        const duration = endTime - startTime;

        return {
            bytesOut,
            duration,
            endTime
        }
    }
}


export {
    defaultTaskRunner,
    CommandRunner,
}