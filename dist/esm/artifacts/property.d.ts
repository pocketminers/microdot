import { Argument } from "./argument";
import { Parameter } from "./parameter";
interface PropertyEntry<T = any> {
    name: string;
    value?: T;
    description?: string;
    required?: boolean;
    defaultValue?: T;
    optionalValues?: T[];
}
/**
 * The Property class is a Parameter with an Argument
 */
declare class Property<T = any> extends Parameter<T> {
    /**
     * The Argument for the Property
     */
    argument?: Argument<T>;
    /**
     * Create a new Property instance from a PropertyEntry
     */
    constructor({ name, value, description, required, defaultValue, optionalValues }: PropertyEntry<T>);
    /**
     * Get the value of the Property.
     * If no value is set in attribute field, then return the default value.
     */
    getValue(): T;
    /**
     * Set the value of the Property
     * If the value is not in the optional values, then throw an error.
     * If the value is required and is undefined, then throw an error.
     * If the value is the same as the current value, then return.
     */
    setValue(value: T): void;
    /**
     * Convert the Property to a JSON object.
     * The JSON object contains the name of the property, the required flag, the description, the default value, the optional values, and the value.
     * If the value is not set, then the default value is returned as the value.
     */
    toJSON(): {
        name: string;
        required: boolean;
        description: string;
        defaultValue: T | undefined;
        optionalValues: T[] | undefined;
        value?: T;
    };
    /**
     * Convert the Property to a string.
     * The string contains the name of the property and the value of the property.
     */
    toString(): string;
    /**
     * Convert the Property to a Record.
     * The record exports the current state of the Property.
     * Note: The record does not contain the Argument, instead it contains the value of the Argument, if it exists.
     * The Record contains the name of the property, the required flag, the description, the default value, the optional values, and the value in the argument field.
     */
    toRecord(): Record<"name" | "required" | "description" | "defaultValue" | "optionalValues" | "value", any>;
    /**
     * Convert the Property to a KeyValuePair.
     * The KeyValuePair contains the name of the property and the value of the property.
     */
    toKeyValuePair(): Record<string, T>;
}
export { type PropertyEntry, Property };
//# sourceMappingURL=property.d.ts.map