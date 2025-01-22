import { Configurable, ConfigurableEntry } from "../artifacts";
import { Command, CommandResult } from "./command";
interface JobEntry extends ConfigurableEntry, Record<'commands', Map<number, Command<any, any>>> {
}
declare class Job extends Configurable {
    status: string;
    readonly commands: Map<number, Command<any, any>>;
    results: Map<number, CommandResult<any, any>>;
    constructor({ id, name, description, configuration, properties, parameters, args, useArgs }: JobEntry);
}
export { type JobEntry, Job };
//# sourceMappingURL=job.d.ts.map