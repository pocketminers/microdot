"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = void 0;
const artifacts_1 = require("../artifacts");
class Job extends artifacts_1.Hashable {
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
exports.Job = Job;
//# sourceMappingURL=job.js.map