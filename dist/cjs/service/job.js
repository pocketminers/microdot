"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = void 0;
const artifacts_1 = require("@/artifacts");
;
class Job extends artifacts_1.Configurable {
    status = 'pending';
    commands = new Map();
    results = new Map();
    constructor({ id, name = 'Job', description = 'A job To be ran by the job runner', configuration = new artifacts_1.Configuration({ name: 'Job Configuration' }), properties = [], parameters = [], args = [], useArgs = false }) {
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
exports.Job = Job;
//# sourceMappingURL=job.js.map