import { ArgumentEntry, Hashable, ParameterEntry, PropertyEntry } from "../artifacts";
import { Identifier } from "../utils";
import { Command, CommandResult } from "./command";
declare class Job extends Hashable {
    id: Identifier;
    status: string;
    readonly commands: Map<number, Command<any, any>>;
    results: Map<number, CommandResult<any, any>>;
    constructor({ id, name, description, properties, parameters, args, useArgs }: {
        id: Identifier;
        name?: string;
        description?: string;
        properties?: PropertyEntry<any>[];
        parameters?: ParameterEntry<any>[];
        args?: ArgumentEntry<any>[];
        useArgs?: boolean;
    });
}
export { Job };
//# sourceMappingURL=job.d.ts.map