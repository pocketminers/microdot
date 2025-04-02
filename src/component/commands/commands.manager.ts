import { Checks } from "@/utils";
import { ArgumentEntry, BaseTypes, Manager } from "@component/base/index";
import { Command } from "@component/commands/command";
import { CommandEntry, RunCommandEntry } from "@component/commands/command.types";
import { CommandFactory } from "./commands.factory";
import { CommandsManagerParameters } from "./commands.params";
import { CommandStorage } from "./commands.storage";
import { IdentityManager } from "../identifier";



class CommandManager
    extends Manager<
        BaseTypes.Command,
        CommandFactory,
        CommandStorage,
        [IdentityManager]
    >
{
    constructor({
        args = [],
        commandEntries = [],
        dependencies
    }:{
        args?: ArgumentEntry[]
        commandEntries?: CommandEntry[],
        dependencies: [IdentityManager]
    }) {
        super({
            type: BaseTypes.Command,
            factory: new CommandFactory(),
            storage: new CommandStorage(),
            parameters: CommandsManagerParameters,
            args,
            dependencies
        });

        for (const commandEntry of commandEntries) {
            this.storage.addItem({index: commandEntry.name, item: this.factory.create(commandEntry)});
        }
    }

    public createCommand(commandEntry: CommandEntry): Command {
        const command = this.factory.create(commandEntry);
        this.storage.addItem({index: commandEntry.name, item: command});
        return command;
    }

    public async executeCommand<R>({
        commandName,
        instance,
        args
    }: RunCommandEntry): Promise<R | Error | undefined> {
        let output: R | Error |undefined;
        
        try {
            const command = this.storage.getItem({index: commandName}).value;
            if (command instanceof Command) {
                output = await command.run({instance, args});
            } else {
                throw new Error(`Command ${commandName} not found or invalid type`);
            }
        }
        catch (error: any) {
            output = error;
        }

        return output;
    }

    public static getByteCount(value: any): number {
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

    public static getInputMetrics(args: Record<string,any>): { bytesIn: number, startTime: number} {
        let bytesIn: number = 0;

        if (
            args !== undefined
            && Checks.isEmpty(args) === false
        ) {
            bytesIn = CommandManager.getByteCount(args);
        }

        return {
            bytesIn,
            startTime: Date.now()
        }
    }

    public static getOutputMetrics<R>(output: R, startTime: number): { bytesOut: number, duration: number, endTime: number } {
        let bytesOut: number = 0;

        if (
            output !== undefined
        ) {
            bytesOut = CommandManager.getByteCount(output);
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
    CommandManager
};