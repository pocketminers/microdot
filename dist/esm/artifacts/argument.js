import { checkIsEmpty } from "../utils/checks";
import { Hashable } from "./hashable";
/**
 * Argument Class
 * @summary An argument specifies the value of a Parameter by name
 */
class Argument extends Hashable {
    /**
     * Argument Name
     * @summary The name of the argument
     */
    name;
    /**
     * Argument Value
     * @summary The value of the argument
     * @type T
     */
    value;
    /**
     * Argument Constructor
     * @summary Create a new Argument instance
     * @example
     * const arg = new Argument<number>({ name: "arg1", value: 123 });
     * console.log(arg);
     * `Argument {
     *  hash: "391c5d93777313d8399678d8967923f46d2a8abfc12cb04205f7df723f1278fd",
     *  name: "arg1",
     *  value: 123
     * }`
     */
    constructor({ name, value }) {
        if (Argument.isEmtpty({ name, value })) {
            throw new Error("Argument name or value cannot be empty.");
        }
        super({ name, value });
        this.name = name;
        this.value = value;
    }
    /**
     * Set Method **Not Implemented!**
     * @summary Method not implemented
     * @throws Error
     */
    set(value) {
        throw new Error(`Method not implemented. Unable to set value: ${value}`);
    }
    /**
     * Get Method
     * @summary Get the value of the argument
     */
    get() {
        return this.value;
    }
    /**
     * Check Hash Method
     * @summary Check if the original hash matches the current hash
     * @override Hashable.checkHash
     */
    checkHash() {
        return super.checkHash(JSON.stringify({ name: this.name, value: this.value }));
    }
    /**
     * Check if the Argument is empty
     * @summary Check if the argument is an empty object, or if the name or value is empty
     */
    static isEmtpty({ name, value }) {
        return checkIsEmpty([name, value]);
    }
    /**
     * Export the Argument as a JSON object
     * @summary Convert the argument to a JSON object and return it
     */
    toJSON() {
        return {
            name: this.name,
            value: this.value
        };
    }
    /**
     * Export the Argument as a string
     * @summary Convert the argument to a pre-formatted string and return it
     */
    toString() {
        return `${this.name}: ${this.value}`;
    }
    /**
     * Export the Argument as a Record
     * @summary Convert the argument to a record and return it
     */
    toRecord() {
        return {
            [this.name]: this.value
        };
    }
    /**
     * Create an Argument from a Record
     * @summary Create an argument from a record object
     */
    static fromRecord(record) {
        return new Argument({ name: Object.keys(record)[0], value: Object.values(record)[0] });
    }
}
export { Argument };
//# sourceMappingURL=argument.js.map