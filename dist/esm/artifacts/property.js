import { Argument } from "./argument";
import { Parameter } from "./parameter";
/**
 * The Property class is a Parameter with an Argument
 */
class Property extends Parameter {
    argument;
    constructor({ name, value, description = '', required = true, defaultValue = undefined, optionalValues = [] }) {
        super({ name, description, required, defaultValue, optionalValues });
        if (value !== undefined && super.checkOptionalValues(value)) {
            console.log(`Property: ${name} value: ${value}`);
            this.argument = new Argument({ name, value });
            console.log(`Property: ${name} argument: ${this.argument}`);
        }
    }
    getValue() {
        return super.getValue(this.argument?.value);
    }
    setValue(value) {
        if (!this.checkOptionalValues(value)) {
            throw new Error(`Value is not in optional values: ${this.name}`);
        }
        if (this.required && value === undefined) {
            throw new Error(`Value is required: ${this.name}`);
        }
        if (this.argument !== undefined
            && value === this.argument.value) {
            return;
        }
        this.argument = new Argument({ name: this.name, value });
    }
    toJSON() {
        return {
            ...super.toJSON(),
            value: this.getValue()
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
            value: this.argument?.value
        };
    }
}
export { Property };
//# sourceMappingURL=property.js.map