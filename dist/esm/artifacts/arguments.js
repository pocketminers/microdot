import { Argument } from "./argument";
/**
 * Arguments Class
 * @category Arguments
 * @summary A class to manage a list of arguments
 */
class Arguments extends Array {
    /**
     * Arguments Constructor
     * @summary Create a new Arguments instance
     * @example
     * const args = new Arguments({ name: "arg1", value: 123 });
     * console.log(args);
     * `Arguments [ Argument {
     *      hash: "391c5d93777313d8399678d8967923f46d2a8abfc12cb04205f7df723f1278fd",
     *      name: "arg1",
     *      value: 123
     * }]`
     */
    constructor(entryOrObject = []) {
        super();
        this.add(entryOrObject);
    }
    /**
     * Check if an argument exists in the list by name
     */
    hasArgument(name) {
        return this.some(arg => arg.name === name);
    }
    /**
     * Get an argument from the list by name
     */
    getArgumentByName(name) {
        return this.find(arg => arg.name === name);
    }
    /**
     * Get an argument entry by name
     */
    getArgumentEntry(name) {
        return this.getArgumentByName(name);
    }
    /**
     * Get an argument value by name
     */
    getArgumentValue(name) {
        return this.getArgumentByName(name).value;
    }
    /**
     * Get an argument by name
     */
    get(name, entry = false) {
        if (this.hasArgument(name)) {
            return entry === true ? this.getArgumentEntry(name) : this.getArgumentValue(name);
        }
        return undefined;
    }
    /**
     * Check if an entry is an ArgumentEntry
     */
    isEntry(arg) {
        if (typeof arg === "object") {
            return "name" in arg && "value" in arg;
        }
        return false;
    }
    /**
     * Add an argument from an entry
     */
    addArgumentFromEntry(arg) {
        if (this.hasArgument(arg.name)) {
            throw new Error(`Duplicate argument name: ${arg.name}`);
        }
        this.push(new Argument(arg));
    }
    /**
     * Add an argument from an object
     */
    addArgumentFromObject(arg) {
        for (const [name, value] of Object.entries(arg)) {
            this.addArgumentFromEntry({ name, value });
        }
    }
    add(entryOrObject = []) {
        if (Array.isArray(entryOrObject)) {
            for (const arg of entryOrObject) {
                this.add(arg);
            }
        }
        else {
            if (this.isEntry(entryOrObject)) {
                this.addArgumentFromEntry(entryOrObject);
            }
            else {
                this.addArgumentFromObject(entryOrObject);
            }
        }
    }
    remove(nameOrNames) {
        if (Array.isArray(nameOrNames)) {
            nameOrNames.forEach(name => this.remove(name));
        }
        else {
            const index = this.findIndex(arg => arg.name === nameOrNames);
            if (index !== -1) {
                this.splice(index, 1);
            }
        }
    }
    /**
     * Export the Arguments as a JSON object
     * @summary Convert the arguments to a JSON object and return it
     */
    toJSON() {
        const obj = [];
        for (const arg of this) {
            obj.push(arg.toJSON());
        }
        return obj;
    }
    /**
     * Export the Arguments as a string
     * @summary Convert the arguments to a pre-formatted string and return it
     */
    toString() {
        return this.map(arg => arg.toString()).join("\n");
    }
    /**
     * Export the Arguments as a Record
     * @summary Convert the arguments to a record and return it
     */
    toRecord() {
        return this.reduce((acc, arg) => {
            acc[arg.name] = arg.value;
            return acc;
        }, {});
    }
}
export { Arguments };
//# sourceMappingURL=arguments.js.map