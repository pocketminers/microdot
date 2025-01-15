"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = void 0;
const utils_1 = require("@/utils");
const argument_1 = require("./argument");
const parameter_1 = require("./parameter");
const property_1 = require("./property");
const arguments_1 = require("./arguments");
/**
 * Configuration is a map of properties that can be set by arguments.
 * A 'property' is a parameter with an argument.
 * If an argument exists for a property, then the value of the property is set to the value of the argument.
 * This allows the property to be set by the argument.
 */
class Configuration extends Map {
    name = 'Configuration';
    description = 'A configuration of properties that can be set by arguments';
    /**
     * Create a new Configuration instance
     * Both, properties and arguments can be passed to the constructor.
     */
    constructor({ name = 'Configuration', description = 'A configuration of properties that can be set by arguments', properties = [], parameters = [], args = [], useArgs = false } = {}) {
        super();
        this.name = name;
        this.description = description;
        this.addEntries({ entries: [...properties, ...parameters], args, fromArgs: useArgs });
    }
    /**
     * Add a property to the configuration from a property entry and an argument entry.
     * If the property is already in the configuration, then throw an error.
     * If an argument exists for the property, then set the value of the property.
     * If the entry is a parameter, then create a new property.
     * If the entry is not a parameter or a property, then throw an error.
     */
    addEntry(entry, args = [], overwrite = false) {
        let property;
        // If the entry is a parameter, then create a new property
        if (entry instanceof property_1.Property) {
            property = entry;
        }
        else if (entry instanceof parameter_1.Parameter) {
            property = new property_1.Property(entry);
        }
        else {
            throw new Error(`Invalid entry: ${entry}`);
        }
        // Check if the property is already in the configuration
        if (overwrite === false
            && property !== undefined
            && this.has(property.name)) {
            throw new Error(`Property already exists: ${property.name}`);
        }
        // Check if an argument exists for the property
        const arg = args.find(arg => arg.name === property?.name);
        // If the property is already in the configuration and the overwrite flag is true, then delete the property
        if (overwrite === true) {
            this.delete(property.name);
        }
        // If an argument exists, then set the value of the property
        if (args !== undefined
            && arg !== undefined
            && (0, utils_1.checkIsEmpty)([arg]) === false) {
            property.setValue(arg.value);
        }
        // Add the property to the configuration
        this.set(property.name, property);
    }
    addEntryFromArg(arg) {
        const property = new property_1.Property({
            name: arg.name,
            required: false,
            description: '',
            value: arg.value
        });
        property.setValue(arg.value);
        this.set(property.name, property);
    }
    /**
     * Add properties to the configuration from a list of property entries and a list of argument entries.
     * If the property is already in the configuration, then throw an error.
     * If an argument exists for the property, then set the value of the property.
     * If the entry is a parameter, then create a new property.
     * If the entry is not a parameter or a property, then throw an error.
     */
    addEntries({ entries = [], args = [], overwrite = true, fromArgs = false } = {}) {
        //check the input entries for duplicates
        const names = entries.map(entry => entry.name);
        const duplicates = names.filter((name, index) => names.indexOf(name) !== index);
        if (duplicates.length > 0) {
            throw new Error(`Duplicate entries: ${duplicates}`);
        }
        for (const entry of entries) {
            if (entry instanceof property_1.Property
                || entry instanceof parameter_1.Parameter) {
                this.addEntry(entry, args, overwrite);
            }
            else if ((entry instanceof argument_1.Argument
                || typeof entry === 'object')
                && fromArgs === true) {
                this.addEntryFromArg(entry);
            }
            else if (Array.isArray(entry)) {
                this.addEntries({ entries: entry, args, overwrite });
            }
            else if (typeof entry === 'object'
                && entry.name !== undefined
                && entry.value !== undefined) {
                this.addEntry(new property_1.Property({
                    name: entry.name,
                    value: entry.value,
                    required: entry.required,
                    description: entry.description,
                    defaultValue: entry.defaultValue,
                    optionalValues: entry.optionalValues
                }), args, overwrite);
            }
            else {
                throw new Error(`Invalid entry: ${entry}`);
            }
        }
        if (fromArgs === true) {
            this.setArguments(args, true);
        }
    }
    setArguments(args, setProperties = false) {
        for (const [name, property] of this) {
            const arg = args.find(arg => arg.name === name);
            if (arg !== undefined
                && (0, utils_1.checkIsEmpty)([arg]) === false) {
                property.setValue(arg.value);
            }
        }
        // Check if any arguments were not set
        const unsetArgs = args.filter(arg => this.has(arg.name) === false);
        // If any arguments were not set, then throw an error
        if (unsetArgs.length > 0
            && setProperties === false) {
            throw new Error(`Invalid arguments: ${unsetArgs.map(arg => arg.name)}`);
        }
        // If any arguments were not set, then add the arguments as properties
        if (unsetArgs.length > 0
            && setProperties === true) {
            this.addEntries({
                entries: unsetArgs,
                args
            });
        }
    }
    /**
     * Get a property from the configuration by name
     */
    getValue(name) {
        if (this.has(name)) {
            const value = super.get(name)?.getValue();
            return value;
        }
    }
    /**
     * Get the required property values from the configuration
     */
    getRequiredValues() {
        const values = {};
        for (const [name, property] of this) {
            if (property.required) {
                values[name] = property.getValue();
            }
        }
        return values;
    }
    /**
     * Convert the configuration to a JSON object.
     * The JSON object contains the name of the property and the property object.
     */
    toJSON() {
        const json = {};
        for (const [name, property] of this) {
            json[name] = property.toJSON();
        }
        return json;
    }
    /**
     * Convert the configuration to a string.
     * The string contains the name of the property and the value of the property.
     */
    toString() {
        let str = "";
        for (const [name, property] of this) {
            str += `${name}: ${property.getValue()}\n`;
        }
        return str;
    }
    /**
     * Convert the configuration to a record.
     * The record contains the name of the property and the property object.
     */
    toRecord() {
        const record = {};
        for (const [name, property] of this) {
            record[name] = property.toRecord();
        }
        return record;
    }
    toArguments() {
        const args = new arguments_1.Arguments();
        for (const [name, property] of this) {
            args.add(new argument_1.Argument({
                name,
                value: property.getValue()
            }));
        }
        return args;
    }
}
exports.Configuration = Configuration;
//# sourceMappingURL=configuration.js.map