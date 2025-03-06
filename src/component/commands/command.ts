import { CommandSpec, TaskRunner } from "@/template";
import { Base, BaseTypes, Properties } from "../base";
import { CommandEntry, defaultTaskRunner } from "./command.types";


class Command<R = any, T = any>
    extends Base<BaseTypes.Command>
    implements CommandSpec<R, T>
{
    public readonly name: string;
    public readonly description: string;
    public readonly properties: Properties<BaseTypes.Command>;
    public readonly run: TaskRunner<R, T>;

    constructor({
        name,
        description,
        parameters,
        run
    }: CommandEntry<R, T>) {
        super(BaseTypes.Command);
        this.name = name;
        this.description = description;
        this.properties = new Properties({type: BaseTypes.Command, params: parameters});
        this.run = run !== undefined ? run : defaultTaskRunner;
    }
}


export {
    Command
}