import { Configurable, ConfigurableEntry, Parameter } from "@/artifacts";
import { Command, CommandResult, QueuedCommandEntry } from "@service/command";


interface JobEntry
    extends
        ConfigurableEntry,
        Record<'commands', Map<number, QueuedCommandEntry>> {};



const JobParameters = [
    new Parameter({ name: 'runSequential', defaultValue: true, description: 'Run commands in sequence' }),
    new Parameter({ name: 'retryFailed', defaultValue: true, description: 'Retry failed commands' }),
    new Parameter({ name: 'retryCount', defaultValue: 3, description: 'Number of times to retry failed commands' }),
]


/**
 * Job Class that extends Configurable and adds commands as data
 * @summary Job class that extends Configurable
 */
class Job
    extends Configurable
{
    public status: string = 'new';
    public readonly commands: Map<number, Command<any, any>> = new Map();
    public results: Map<number, CommandResult<any, any>> = new Map();

    constructor(
        {
            id,
            name = 'Job',
            description = 'A job To be ran by the job runner',
            args = [],
            commands = new Map<number, QueuedCommandEntry>()
        } : JobEntry
    ) {
        super({
            id,
            name,
            description,
            parameters: JobParameters,
            args
        });

        for (const [key, value] of commands) {

            // this.commands.set(key, ;
        }
    }
}

export {
    type JobEntry,
    Job
}