"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtifactFactory = void 0;
const hashable_1 = require("./hashable");
const argument_1 = require("./argument");
const identifiable_1 = require("./identifiable");
const parameter_1 = require("./parameter");
const configurable_1 = require("./configurable");
class ArtifactFactory {
    static async createHashable(entry) {
        const hashable = new hashable_1.Hashable(entry);
        await hashable.initialize();
        return hashable;
    }
    static async createIdentifiable(entry) {
        const identifiable = new identifiable_1.Identifiable(entry);
        await identifiable.initialize();
        return identifiable;
    }
    static createArgument(entry) {
        return new argument_1.Argument(entry);
    }
    static async createHashedArgument(entry) {
        const arg = new argument_1.Argument(entry);
        await arg.initialize();
        return arg;
    }
    static createParameter(entry) {
        return new parameter_1.Parameter(entry);
    }
    static async createHashedParameter(entry) {
        const param = new parameter_1.Parameter(entry);
        await param.initialize();
        return param;
    }
    static createConfigurable(entry) {
        return new configurable_1.Configurable(entry);
    }
    static async createHashedConfigurable(entry) {
        const configurable = new configurable_1.Configurable(entry);
        await configurable.initialize();
        return configurable;
    }
}
exports.ArtifactFactory = ArtifactFactory;
//# sourceMappingURL=factory.js.map