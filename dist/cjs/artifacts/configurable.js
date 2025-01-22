"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configurable = void 0;
const store_1 = require("./store");
const identifiable_1 = require("./identifiable");
class Configurable extends identifiable_1.Identifiable {
    constructor({ id, name = 'Configurable', description = 'A configurable object that can be set by arguments', args = [], parameters = [] }) {
        const argumentStore = new store_1.ArtifactStore();
        argumentStore.add(args);
        const paramStore = new store_1.ArtifactStore();
        paramStore.add(parameters);
        super({ id, name, description, data: { args: argumentStore, parameters: paramStore } });
    }
    getArguments() {
        return this.getData().args;
    }
    getParameters() {
        return this.getData().parameters;
    }
    static isValidArgumentName(params, arg) {
        const paramNames = params.getNames();
        return paramNames.includes(arg.getName());
    }
    static isValidArgumentValue(params, arg) {
        const param = params.getEntry(arg.getName());
        if (!param) {
            return false;
        }
        return param.isValueInOptionalValues(arg.getValue());
    }
    getValue(name) {
        const param = this.getParameters().getEntry(name);
        if (!param) {
            throw new Error(`Parameter ${name} not found in ${this.getName()}(${this.getId()})`);
        }
        const arg = this.getArguments().getEntry(name);
        return param.getValue(arg?.getValue());
    }
}
exports.Configurable = Configurable;
//# sourceMappingURL=configurable.js.map