"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Property = void 0;
const argument_1 = require("./argument");
const parameter_1 = require("./parameter");
/**
 * The Property class is a Parameter with an Argument
 */
class Property extends parameter_1.Parameter {
    argument;
    constructor({ name, value, description, required, defaultValue, optionalValues }) {
        super({ name, description, required, defaultValue, optionalValues });
        this.argument = new argument_1.Argument({ name, value });
    }
    getValue() {
        return super.getValue(this.argument.value);
    }
    setValue(value) {
        if (!this.checkOptionalValues(value)) {
            throw new Error(`Value is not in optional values: ${this.name}`);
        }
        if (this.required && value === undefined) {
            throw new Error(`Value is required: ${this.name}`);
        }
        if (value === this.argument.value) {
            return;
        }
        this.argument = new argument_1.Argument({ name: this.name, value });
    }
    toJSON() {
        return {
            ...super.toJSON(),
            value: this.argument.value
        };
    }
    toString() {
        return `${this.name}: ${this.getValue()}`;
    }
    toRecord() {
        return {
            name: this.name,
            required: this.required,
            description: this.description,
            defaultValue: this.defaultValue,
            optionalValues: this.optionalValues,
            value: this.argument.value
        };
    }
}
exports.Property = Property;
