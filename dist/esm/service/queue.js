import { Configurable, Configuration, Parameter } from "../artifacts";
const JobQueueConfig = new Configuration({
    name: 'JobQueueConfiguration',
    description: 'Job Queue configuration',
    parameters: [
        new Parameter({
            name: "keepHistory",
            description: "Keep History of Jobs",
            defaultValue: true
        }),
        new Parameter({
            name: "historyLimit",
            description: "History Limit",
            defaultValue: 100
        }),
        new Parameter({
            name: "runSequence",
            description: "Run Sequence",
            defaultValue: "FIFO",
            optionalValues: ["FIFO", "LIFO"]
        })
    ]
});
class JobQueue extends Configurable {
    constructor({ id, config = JobQueueConfig }) {
        super({
            id,
            name: 'JobQueue',
            description: 'A queue of jobs',
            configuration: config
        });
    }
}
export { JobQueue, JobQueueConfig };
//# sourceMappingURL=queue.js.map