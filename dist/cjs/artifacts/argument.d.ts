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
declare class Argument<T> extends Hashable {
    /**
     * Argument Name
     * @summary The name of the argument
     */
    readonly name: string;
    /**
     * Argument Value
     * @summary The value of the argument
     * @type T
     */
    readonly value: T;
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
    constructor({ name, value }: ArgumentEntry<T>);
    /**
     * Set Method **Not Implemented!**
     * @summary Method not implemented
     * @throws Error
     */
    set<T>(value: T): void;
    /**
     * Get Method
     * @summary Get the value of the argument
     */
    get(): T;
    /**
     * Check Hash Method
     * @summary Check if the original hash matches the current hash
     * @override Hashable.checkHash
     */
    checkHash(): boolean;
    /**
     * Check if the Argument is empty
     * @summary Check if the argument is an empty object, or if the name or value is empty
     */
    private static isEmtpty;
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
}
export { type ArgumentEntry, Argument };
//# sourceMappingURL=argument.d.ts.map