import { BaseTypes, Storage } from "../base";
import { Command } from "./command";


class CommandStorage
    extends Storage<BaseTypes.Command, Command>
{
    constructor(commands: Command[] = []) {
        super(BaseTypes.Command);

        for (const command of commands) {
            this.addItem({index: command.name, item: command});
        }
    }
}


export {
    CommandStorage
};