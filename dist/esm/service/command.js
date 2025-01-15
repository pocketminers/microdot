import { checkIsEmpty } from '../utils/checks';
import { Configurable } from '../artifacts/configurable';
import { createIdentifier } from '../utils';
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
/**
 * The Command class is a configurable class that can be executed.
 */
class Command extends Configurable {
    taskRunner;
    /**
     * The Command class is a configurable class that can be executed.
     */
    constructor({ id = createIdentifier(), name = 'Base Command', description = 'The Base Command Class', taskRunner = defaultTaskRunner, configuration, properties = [], parameters = [], args = [] }) {
        super({ id, name, description, configuration, properties, parameters, args });
        this.taskRunner = taskRunner;
    }
    /**
     * Execute the command.
     */
    execute = async ({ instance, args } = {}) => {
        this.setArguments(args || []);
        return await this.taskRunner(instance, this.config.toRecord());
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