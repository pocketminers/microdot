"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configurable = void 0;
const argument_1 = require("./argument");
const store_1 = require("./store");
const identifiable_1 = require("./identifiable");
/**
 * Configurable Class that extends Identifiable and adds parameters and arguments as data
 * @summary Configurable class that extends Identifiable
 */
class Configurable extends identifiable_1.Identifiable {
    constructor({ id, name = 'Configurable', description = 'A configurable object that can be set by arguments', args = [], parameters = [] }) {
        const argumentStore = new store_1.PropertyStore();
        argumentStore.add(args);
        const paramStore = new store_1.PropertyStore();
        paramStore.add(parameters);
        super({ id, name, description, data: { args: argumentStore, parameters: paramStore } });
    }
    getArguments() {
        return this.getData().args;
    }
    getParameters() {
        return this.getData().parameters;
    }
    isValidArgumentName(arg) {
        const paramNames = this.getParameters().getNames();
        return paramNames.includes(arg.getName());
    }
    isValidArgumentValue(arg) {
        const param = this.getParameters().getEntry(arg.getName());
        if (!param) {
            return false;
        }
        return param.isValueInOptionalValues(arg.getValue());
    }
    setArgument(arg) {
        if (!this.isValidArgumentName(arg)) {
            throw new Error(`Invalid argument name: ${arg.getName()}`);
        }
        if (!this.isValidArgumentValue(arg)) {
            throw new Error(`Invalid argument value: ${arg.getValue()}`);
        }
        if (this.getArguments().getEntry(arg.getName())) {
            this.getArguments().updateEntry(arg);
        }
        else {
            this.getArguments().addArtifact(arg);
        }
    }
    setArgumentFromEntry(entry) {
        this.setArgument(new argument_1.Argument(entry));
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