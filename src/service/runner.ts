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

    public getCommand(commandName: string): CommandSpec | undefined {
        return this.commands.get(commandName);
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
    }: CommandRunSpec): Promise<CommandResultSpec<R>> {

        const command = this.getCommand(commandName);

        if (command === undefined) {
            throw new Error(`Command ${commandName} not found`);
        }


        const startTime = Date.now();
        let duration: number = 0;
        let output: R | undefined;
        let bytesIn: number = 0;
        let bytesOut: number = 0;
        
        if (
            args !== undefined
            && Checks.isEmpty(args) === false
        ) {
            console.log(`args`, args);
            bytesIn = JSON.stringify(args).length;
            console.log(`bytesIn`, bytesIn);
        }
        
        try {
            output = await command.run({instance, args});
        }
        catch (error: any) {
            output = error;
        }

        if (
            output === undefined
            || output === null
            || Checks.isEmpty(output) === true
        ) {
            bytesOut = 0;
        }
        else {
            if (output instanceof Error) {
                bytesOut = JSON.stringify(output.message).length;
            }
            else if (
                output instanceof Object
                || output instanceof Map
                || output instanceof Set
                || output instanceof WeakMap
                || output instanceof WeakSet
                || output instanceof Function
            ) {
                bytesOut = JSON.stringify(output).length;
            }
            else if (output instanceof Array) {
                const stringified = output.map(item => JSON.stringify(item));
                bytesOut = stringified.join('').length
            }
            else if (typeof output === 'string') {
                bytesOut = output.length;
            }
        }

        const endTime = Date.now();
        duration = endTime - startTime;

        return {
            run: {
                processId,
                commandName,
                jobId: jobId !== undefined ? jobId : `${commandName}-${Date.now()}`,
                args,
                instance
            },
            output: output as R || null,
            metrics: {
                start: startTime,
                end: endTime,
                duration,
                bytesIn,
                bytesOut
            }
        } as CommandResultSpec<R>;
    }
}


export {
    defaultTaskRunner,
    CommandRunner,
}