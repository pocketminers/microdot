import { BaseTypes} from "@component/base/base.types";
import { Storage } from "@component/base/storage";
import { Command } from "@component/commands/command";


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