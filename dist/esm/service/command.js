import { Configuration } from '../artifacts/configuration';
import { Hashable } from '../artifacts/hashable';
import { checkIsEmpty } from '../utils/checks';
/**
 * Command result class.
 * A class that contains the result of a command that has completed execution.
 */
class CommandResult {
    jobId;
    command;
    args;
    output;
    metrics;
    constructor({ jobId, command, args, output, metrics }) {
        this.jobId = jobId;
        this.command = command;
        this.args = args;
        this.output = output;
        this.metrics = metrics;
    }
    toJSON() {
        return {
            command: this.command,
            args: this.args,
            output: this.output,
            metrics: this.metrics
        };
    }
    toString() {
        return JSON.stringify(this, null, 2);
    }
}
const defaultTaskRunner = async (instance, args) => {
    return await instance(args);
};
class Command extends Hashable {
    name;
    description;
    taskRunner;
    config;
    constructor({ name = 'Base Command', description = 'The Base Command Class', taskRunner = defaultTaskRunner, config, properties = [], parameters = [], args = [] } = {}) {
        super({ name, description, config, properties, parameters, args });
        this.name = name;
        this.description = description;
        if (config !== undefined) {
            this.config = config;
            this.config.addEntries({ entries: [...properties, ...parameters], args });
            this.config.setArguments(args, true);
        }
        else {
            this.config = new Configuration({ properties, parameters, args });
        }
        this.taskRunner = taskRunner;
    }
    setArguments(args, fromArgs = false) {
        this.config.setArguments(args, fromArgs);
    }
    getArguments() {
        return this.config.toArguments();
    }
    execute = async ({ instance, args } = {}) => {
        this.setArguments(args || []);
        return await this.taskRunner(instance, this.config);
    };
    run = async ({ instance, args } = {}) => {
        const startTime = Date.now();
        let endTime;
        let duration = 0;
        let output;
        let bytesReceived = 0;
        let bytesReturned = 0;
        if (args !== undefined
            && checkIsEmpty([args])) {
            bytesReceived = JSON.stringify(args).length;
        }
        try {
            output = await this.execute({ instance, args });
        }
        catch (error) {
            output = error;
        }
        if (output === undefined
            || output === null
            || checkIsEmpty([output])) {
            bytesReturned = 0;
        }
        else {
            if (output instanceof Error) {
                bytesReturned = JSON.stringify(output.message).length;
            }
            else if (output instanceof Object
                || output instanceof Map
                || output instanceof Set
                || output instanceof WeakMap
                || output instanceof WeakSet
                || output instanceof Function) {
                bytesReturned = JSON.stringify(output).length;
            }
            else if (output instanceof Array) {
                const stringified = output.map(item => JSON.stringify(item));
                bytesReturned = stringified.join('').length;
            }
            else if (typeof output === 'string') {
                bytesReturned = output.length;
            }
        }
        endTime = Date.now();
        duration = endTime - startTime;
        return new CommandResult({
            command: this.name,
            args: this.config.toArguments(),
            output: output || null,
            metrics: {
                startTime,
                endTime,
                duration,
                bytesReceived,
                bytesReturned
            }
        });
    };
}
export { Command, defaultTaskRunner };
//# sourceMappingURL=command.js.map