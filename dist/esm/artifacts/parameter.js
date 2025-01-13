import { createIdentifier } from "../utils/identifier";
import { Hashable } from "./hashable";
/**
 * A paramter class holds the name, required flag, description, default value, and optional values
 * @summary A parameter specifies a value that can be passed to a service"s method
 */
class Parameter extends Hashable {
    name;
    required;
    description;
    defaultValue;
    optionalValues;
    /**
     * Parameter Constructor that creates a new instance of a parameter from the given parameter entry
     * @summary Create a new Parameter instance
     * @example
     * const param = new Parameter<number>({ name: "param1", required: true, description: "A parameter", defaultValue: 123, optionalValues: [123, 456] }, true);
     * console.log(param);
     * `Parameter {
     *    hash: "<insert sha256 hash here>",
     *    name: "param1",
     *    required: true,
     *    description: "A parameter",
     *    defaultValue: 123,
     *    optionalValues: [123, 456]
     * }`
     */
    constructor({ name = createIdentifier("Name", { prefix: "Parameter-" }), required = false, description = "A parameter", defaultValue, optionalValues = [] } = {}) {
        super({ name, required, description, defaultValue, optionalValues });
        this.name = name;
        this.required = required;
        this.description = description;
        this.defaultValue = defaultValue;
        this.optionalValues = optionalValues;
        this.checkOptionalValues();
    }
    /**
     * Check if the Default Value or a Given Value is in the Optional Values
     * @summary Check if the value is in the optional values
     */
    checkOptionalValues(value) {
        value = value !== undefined ? value : this.defaultValue;
        if (this.optionalValues !== undefined
            && this.optionalValues.length > 0
            && value !== undefined
            && !this.optionalValues.includes(value)) {
            throw new Error(`Value is not in optional values: ${this.name}`);
        }
        return true;
    }
    /**
     * Get the value from the parameter and a given value
     * @summary Get the value of the parameter which will be the default value if the given value is undefined
     */
    getValue(value) {
        if (value === undefined &&
            this.defaultValue === undefined) {
            throw new Error(`Value is required: ${this.name}`);
        }
        if (value === undefined &&
            this.defaultValue !== undefined) {
            return this.defaultValue;
        }
        if (!this.checkOptionalValues(value)) {
            throw new Error(`Value is not in optional values: ${this.name}`);
        }
        return value;
    }
    /**
     * Set Method **Not Implemented!**
     * @summary Method not implemented
     * @throws Error
     */
    set(value) {
        throw new Error("Method not implemented.");
    }
    /**
     * Convert the Parameter to a JSON object
     * @summary Convert the parameter to a JSON object
     */
    toJSON() {
        return {
            name: this.name,
            required: this.required,
            description: this.description,
            defaultValue: this.defaultValue,
            optionalValues: this.optionalValues
        };
    }
    /**
     * Convert the Parameter to a string
     * @summary Convert the parameter to a string
     * @example
     * const param = new Parameter<number>({ name: "param1", required: true, description: "A parameter", defaultValue: 123, optionalValues: [123, 456] }, true);
     * console.log(param.toString());
     * `name: param1
     *  description: A parameter
     *  required: true
     *  default: 123
     *  options: 123, 456
     *  hash: <insert sha256 hash here>`
     */
    toString() {
        return `name: ${this.name}\n description: ${this.description}\n required: ${this.required} ${this.defaultValue ? `\ndefault: ${this.defaultValue}` : ""} ${this.optionalValues !== undefined && this.optionalValues.length > 0 ? `\noptions: ${this.optionalValues.join(", ")}` : ""} ${this.hash ? `\nhash: ${this.hash}` : ""}`;
    }
    /**
     * Export the Parameter as a Record
     * @summary Convert the parameter to a record and return it
     */
    toRecord() {
        return {
            name: this.name,
            required: this.required,
            description: this.description,
            defaultValue: this.defaultValue,
            optionalValues: this.optionalValues
        };
    }
}
export { Parameter };
