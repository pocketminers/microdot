import { Configurable, Configuration, Parameter } from "@/artifacts";
import { Identifier } from "@/utils";

const JobQueueConfig: Configuration = new Configuration({
    name: 'JobQueueConfiguration',
    description: 'Job Queue configuration',
    parameters: [
        new Parameter<boolean>({
            name: "keepHistory",
            description: "Keep History of Jobs",
            defaultValue: true
        }),
        new Parameter<number>({
            name: "historyLimit",
            description: "History Limit",
            defaultValue: 100
        }),
        new Parameter<"FIFO" | "LIFO">({
            name: "runSequence",
            description: "Run Sequence",
            defaultValue: "FIFO",
            optionalValues: ["FIFO", "LIFO"]
        })
    ]
});

class JobQueue
    extends 
        Configurable
{
    constructor({
        id,
        config = JobQueueConfig
    }: {
        id: Identifier,
        config: Configuration
    }) {
        super({
            id,
            name: 'JobQueue',
            description: 'A queue of jobs',
            configuration: config
        });
    }
}

export {
    JobQueue,
    JobQueueConfig
}