"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configurable = void 0;
const configuration_1 = require("./configuration");
const hashable_1 = require("./hashable");
/**
 * Configurable is a class that can be configured by arguments.
 * A 'configurable' is a hashable object that can be set by arguments.
 * If an argument exists for a property, then the value of the property is set to the value of the argument.
 * This allows the property to be set by the argument.
 */
class Configurable extends hashable_1.Hashable {
    name;
    description;
    config;
    createdAt = new Date();
    constructor({ id, name = 'Configurable', description = 'A configurable object that can be set by arguments', configuration = undefined, properties = [], parameters = [], args = [], useArgs = false }) {
        super({ id, data: { name, description, configuration, properties, parameters, args, useArgs } });
        this.name = name;
        this.description = description;
        if (configuration !== undefined) {
            this.config = configuration;
            this.config.addEntries({ entries: [...properties, ...parameters], args });
            this.config.setArguments(args, true);
        }
        else {
            this.config = new configuration_1.Configuration({ name, description, properties, parameters, args });
        }
    }
    setArguments(args, asProperties = false) {
        this.config.setArguments(args, asProperties);
    }
    getArguments() {
        return this.config.toArguments();
    }
}
exports.Configurable = Configurable;
//# sourceMappingURL=configurable.js.map