import { BaseTypes} from "@component/base/base.types";
import { Command } from "@component/commands/command";
import { HashedStorage } from "../base";
import { CommandEntry } from "./command.types";


class CommandStorage
    extends HashedStorage<BaseTypes.Command, CommandEntry, Command>
{
    constructor(commands: Command[] = []) {
        super({type: BaseTypes.Command, items: []});

        for (const command of commands) {
            this.addItem({index: command.name, item: command});
        }
    }

    public getCommand(name: string): Command | undefined | any {
        return this.getItem({index: name}).value;
    }
}


export {
    CommandStorage
};