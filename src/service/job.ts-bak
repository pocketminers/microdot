import { Configurable, ConfigurableEntry, Configuration, Parameter } from "@/artifacts";
import { Command, CommandResult } from "./command";


interface JobEntry
    extends ConfigurableEntry,
        Record<'commands', Map<number, Command<any, any>>> {};

class Job
    extends Configurable
{
    public status: string = 'pending';
    public readonly commands: Map<number, Command<any, any>> = new Map();
    public results: Map<number, CommandResult<any, any>> = new Map();

    constructor(
        {
            id,
            name = 'Job',
            description = 'A job To be ran by the job runner',
            configuration = new Configuration({name: 'Job Configuration'}),
            properties = [],
            parameters = [],
            args = [],
            useArgs = false
        } : JobEntry
    ) {
        super({
            id,
            name,
            description,
            configuration,
            properties,
            parameters,
            args,
            useArgs
        });
    }
}

export {
    type JobEntry,
    Job
}