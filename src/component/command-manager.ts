import { Checks } from "@/utils";
import { CommandResultSpec, CommandRunSpec, CommandSpec } from "@template/spec/v0/command";


class CommandManager {
    private commands: Map<string, CommandSpec> = new Map();

    public registerCommand(command: CommandSpec): void {
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


    public async executeCommand<R, T>(
        commandName: string,
        instance: T,
        args: Record<string, any>
    ): Promise<CommandResultSpec<R>> {

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
            bytesIn = JSON.stringify(args).length;
        }
        
        try {
            output = await command.taskRunner({instance, args});
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
                name: commandName,
                jobId: `${commandName}-${Date.now()}`,
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
    CommandManager,
}