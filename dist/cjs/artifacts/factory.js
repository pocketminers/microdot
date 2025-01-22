"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtifactsFactory = void 0;
const hashable_1 = require("./hashable");
const argument_1 = require("./argument");
const identifiable_1 = require("./identifiable");
const parameter_1 = require("./parameter");
class ArtifactsFactory {
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
}
exports.ArtifactsFactory = ArtifactsFactory;
//# sourceMappingURL=factory.js.map