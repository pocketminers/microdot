import { Hashable } from "../artifacts";
class Job extends Hashable {
    id;
    status = 'pending';
    commands = new Map();
    results = new Map();
    constructor({ id, name = 'Job', description = 'A job To be ran by the job runner', properties = [], parameters = [], args = [], useArgs = false }) {
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
export { Job };
//# sourceMappingURL=job.js.map