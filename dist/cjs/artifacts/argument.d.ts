import { Hashable } from "./hashable";
/**
 * Argument Entry Interface
 * @summary Argument entry interface that is used to create an argument
 */
interface ArgumentEntry<T> extends Record<"name", string>, Record<"value", T> {
}
/**
 * Argument Class
 * @summary An argument specifies the value of a Parameter by name
 */
declare class Argument<T> extends Hashable<{
    name: string;
    value: T;
}> {
    /**
     * Argument Constructor
     * @summary Create a new Argument instance
     * @example
     * const arg = new Argument<number>({ name: "arg1", value: 123 });
     * console.log(arg);
     * `Argument {
     *      name: "arg1",
     *      value: 123
     * }`
     */
    constructor({ name, value }: ArgumentEntry<T>);
    /**
     * returns the name of the argument
     * @summary Get the name of the argument
     */
    getName(): string;
    /**
     * returns the value of the argument
     * @summary Get the value of the argument
     */
    getValue(): T;
    getHash(): Promise<string>;
    /**
     * Export the Argument as a JSON object
     * @summary Convert the argument to a JSON object and return it
     */
    toJSON(): {
        name: string;
        value: T;
    };
    /**
     * Export the Argument as a string
     * @summary Convert the argument to a pre-formatted string and return it
     */
    toString(): string;
    /**
     * Export the Argument as a Record
     * @summary Convert the argument to a record and return it
     */
    toRecord(): Record<string, T>;
    /**
     * Create an Argument from a Record
     * @summary Create an argument from a record object
     */
    static fromRecord<T>(record: Record<string, T>): Argument<T>;
    /**
     * Create an Argument from a string
     * @summary Create an argument from a string
     */
    static fromString(str: string): Argument<string>;
}
export { type ArgumentEntry, Argument };
//# sourceMappingURL=argument.d.ts.map