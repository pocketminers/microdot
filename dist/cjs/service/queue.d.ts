import { Configurable, Configuration } from "../artifacts";
import { Identifier } from "../utils";
declare const JobQueueConfig: Configuration;
declare class JobQueue extends Configurable {
    constructor({ id, config }: {
        id: Identifier;
        config: Configuration;
    });
}
export { JobQueue, JobQueueConfig };
//# sourceMappingURL=queue.d.ts.map