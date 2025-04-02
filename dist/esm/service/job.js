import { Configurable, Configuration } from "../artifacts";
;
class Job extends Configurable {
    status = 'pending';
    commands = new Map();
    results = new Map();
    constructor({ id, name = 'Job', description = 'A job To be ran by the job runner', configuration = new Configuration({ name: 'Job Configuration' }), properties = [], parameters = [], args = [], useArgs = false }) {
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
export { Job };
//# sourceMappingURL=job.js.map