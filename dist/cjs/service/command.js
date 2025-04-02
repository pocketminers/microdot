"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultTaskRunner = exports.Command = void 0;
const checks_1 = require("../utils/checks");
const configurable_1 = require("../artifacts/configurable");
const utils_1 = require("../utils");
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
exports.defaultTaskRunner = defaultTaskRunner;
/**
 * The Command class is a configurable class that can be executed.
 */
class Command extends configurable_1.Configurable {
    taskRunner;
    /**
     * The Command class is a configurable class that can be executed.
     */
    constructor({ id = (0, utils_1.createIdentifier)(), name = 'Base Command', description = 'The Base Command Class', taskRunner = defaultTaskRunner, configuration, properties = [], parameters = [], args = [] }) {
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
        let duration = 0;
        let output;
        let bytesReceived = 0;
        let bytesReturned = 0;
        if (args !== undefined
            && (0, checks_1.checkIsEmpty)([args])) {
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
            || (0, checks_1.checkIsEmpty)([output])) {
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
        const endTime = Date.now();
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
exports.Command = Command;
//# sourceMappingURL=command.js.map