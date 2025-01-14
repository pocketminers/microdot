import { ArgumentEntry, Configuration, Hashable, ParameterEntry, PropertyEntry } from "@/artifacts";
import { Identifier } from "@/utils";
import { Command, CommandResult } from "./command";


class Job
    extends Hashable
{
    public id: Identifier;
    public status: string = 'pending';
    public readonly commands: Map<number, Command<any, any>> = new Map();
    public results: Map<number, CommandResult<any, any>> = new Map();

    constructor(
        {
            id,
            name = 'Job',
            description = 'A job To be ran by the job runner',
            properties = [],
            parameters = [],
            args = [],
            useArgs = false
        } : {
            id: Identifier,
            name?: string,
            description?: string,
            properties?: PropertyEntry<any>[],
            parameters?: ParameterEntry<any>[],
            args?: ArgumentEntry<any>[],
            useArgs?: boolean
        }
    ) {
        super({
            name,
            description,
            properties,
            parameters,
            args,
            useArgs
        });
        this.id = id;
    }
}

export {
    Job
}