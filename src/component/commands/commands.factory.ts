import { BaseTypes, Factory } from "../base/index";
import { Command } from "./command";
import { CommandEntry } from "./command.types";


class CommandFactory
    extends Factory<BaseTypes.Command>
{
    constructor() {
        super(BaseTypes.Command);
    }

    public create<R, T>({
        name,
        description,
        parameters,
        run
    }: CommandEntry<R, T>): Command<R, T> {
        return new Command<R, T>({name, description, parameters, run});
    }
}

export {
    CommandFactory
};