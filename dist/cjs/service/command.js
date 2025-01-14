"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultTaskRunner = exports.Command = void 0;
const configuration_1 = require("../artifacts/configuration");
const hashable_1 = require("../artifacts/hashable");
const checks_1 = require("../utils/checks");
class CommandResult {
    command;
    args;
    output;
    metrics;
    constructor({ command, args, output, metrics }) {
        this.command = command;
        this.args = args;
        this.output = output;
        this.metrics = metrics;
    }
    toJSON = () => {
        return {
            command: this.command,
            args: this.args,
            output: this.output,
            metrics: this.metrics
        };
    };
    toString = () => {
        return JSON.stringify(this, null, 2);
    };
}
const defaultTaskRunner = async (instance, args) => {
    return await instance(args);
};
exports.defaultTaskRunner = defaultTaskRunner;
class Command extends hashable_1.Hashable {
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
            this.config.setArguments(args);
        }
        else {
            this.config = new configuration_1.Configuration(properties, parameters, args);
        }
        this.taskRunner = taskRunner;
    }
    setArguments(args) {
        this.config.setArguments(args);
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
exports.Command = Command;
//# sourceMappingURL=command.js.map