import { Hashable } from "./hashable";
/**
 * An entry interface for a parameter
 * @summary Parameter entry interface that is used to create a parameter
 */
interface ParameterEntry<T> extends Record<"name", string>, Partial<Record<"required", boolean>>, Partial<Record<"description", string>>, Partial<Record<"defaultValue", T>>, Partial<Record<"optionalValues", T[]>> {
}
/**
 * A paramter class holds the name, required flag, description, default value, and optional values
 * @summary A parameter specifies a value that can be passed to a service"s method
 */
declare class Parameter<T> extends Hashable implements ParameterEntry<T> {
    readonly name: string;
    readonly required: boolean;
    readonly description: string;
    readonly defaultValue: T | undefined;
    readonly optionalValues: T[] | undefined;
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
    constructor({ name, required, description, defaultValue, optionalValues }?: ParameterEntry<T>);
    /**
     * Check if the Default Value or a Given Value is in the Optional Values
     * @summary Check if the value is in the optional values
     */
    checkOptionalValues(value?: T | undefined): boolean;
    /**
     * Get the value from the parameter and a given value
     * @summary Get the value of the parameter which will be the default value if the given value is undefined
     */
    getValue(value?: T | undefined): T;
    /**
     * Set Method **Not Implemented!**
     * @summary Method not implemented
     * @throws Error
     */
    set<T>(value: T): void;
    /**
     * Convert the Parameter to a JSON object
     * @summary Convert the parameter to a JSON object
     */
    toJSON(): {
        name: string;
        required: boolean;
        description: string;
        defaultValue: T | undefined;
        optionalValues: T[] | undefined;
    };
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
    toString(): string;
    /**
     * Export the Parameter as a Record
     * @summary Convert the parameter to a record and return it
     */
    toRecord(): Record<"name", string> | Record<"required", boolean> | Record<"description", string> | Record<"defaultValue", T | undefined> | Record<"optionalValues", T[] | undefined>;
}
export { type ParameterEntry, Parameter };
//# sourceMappingURL=parameter.d.ts.map