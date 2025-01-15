"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobQueueConfig = exports.JobQueue = void 0;
const artifacts_1 = require("../artifacts");
const JobQueueConfig = new artifacts_1.Configuration({
    name: 'JobQueueConfiguration',
    description: 'Job Queue configuration',
    parameters: [
        new artifacts_1.Parameter({
            name: "keepHistory",
            description: "Keep History of Jobs",
            defaultValue: true
        }),
        new artifacts_1.Parameter({
            name: "historyLimit",
            description: "History Limit",
            defaultValue: 100
        }),
        new artifacts_1.Parameter({
            name: "runSequence",
            description: "Run Sequence",
            defaultValue: "FIFO",
            optionalValues: ["FIFO", "LIFO"]
        })
    ]
});
exports.JobQueueConfig = JobQueueConfig;
class JobQueue extends artifacts_1.Configurable {
    constructor({ id, config = JobQueueConfig }) {
        super({
            id,
            name: 'JobQueue',
            description: 'A queue of jobs',
            configuration: config
        });
    }
}
exports.JobQueue = JobQueue;
//# sourceMappingURL=queue.js.map