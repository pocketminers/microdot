import { ArgumentEntry } from "./argument";
import { ParameterEntry } from "./parameter";
import { Property, PropertyEntry } from "./property";
import { Arguments } from "./arguments";
/**
 * Configuration is a map of properties that can be set by arguments.
 * A 'property' is a parameter with an argument.
 * If an argument exists for a property, then the value of the property is set to the value of the argument.
 * This allows the property to be set by the argument.
 */
declare class Configuration extends Map<Property['name'], Property<any>> {
    /**
     * Create a new Configuration instance
     * Both, properties and arguments can be passed to the constructor.
     */
    constructor(properties?: PropertyEntry<any>[], parameters?: ParameterEntry<any>[], args?: ArgumentEntry<any>[]);
    /**
     * Add a property to the configuration from a property entry and an argument entry.
     * If the property is already in the configuration, then throw an error.
     * If an argument exists for the property, then set the value of the property.
     * If the entry is a parameter, then create a new property.
     * If the entry is not a parameter or a property, then throw an error.
     */
    addEntry(entry: PropertyEntry<any> | ParameterEntry<any>, args?: ArgumentEntry<any>[], overwrite?: boolean): void;
    addEntryFromArg(arg: ArgumentEntry<any>): void;
    /**
     * Add properties to the configuration from a list of property entries and a list of argument entries.
     * If the property is already in the configuration, then throw an error.
     * If an argument exists for the property, then set the value of the property.
     * If the entry is a parameter, then create a new property.
     * If the entry is not a parameter or a property, then throw an error.
     */
    addEntries({ entries, args, overwrite }?: {
        entries?: PropertyEntry<any>[] | ParameterEntry<any>[] | ArgumentEntry<any>[];
        args?: ArgumentEntry<any>[];
        overwrite?: boolean;
    }): void;
    setArguments(args: ArgumentEntry<any>[], setProperties?: boolean): void;
    /**
     * Get a property from the configuration by name
     */
    getValue<T = any>(name: string): T | undefined;
    /**
     * Get the required property values from the configuration
     */
    getRequiredValues(): Record<string, any>;
    /**
     * Convert the configuration to a JSON object.
     * The JSON object contains the name of the property and the property object.
     */
    toJSON(): {
        [key: string]: any;
    };
    /**
     * Convert the configuration to a string.
     * The string contains the name of the property and the value of the property.
     */
    toString(): string;
    /**
     * Convert the configuration to a record.
     * The record contains the name of the property and the property object.
     */
    toRecord(): Record<string, any>;
    toArguments(): Arguments;
}
export { Configuration };
//# sourceMappingURL=configuration.d.ts.map