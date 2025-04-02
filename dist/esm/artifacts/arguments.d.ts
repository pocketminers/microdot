import { Argument, type ArgumentEntry } from "./argument";
/**
 * Arguments Class
 * @category Arguments
 * @summary A class to manage a list of arguments
 */
declare class Arguments extends Array<Argument<any>> {
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
    constructor(entryOrObject?: Argument<any> | ArgumentEntry<any> | ArgumentEntry<any>[] | Record<string, any> | []);
    /**
     * Check if an argument exists in the list by name
     */
    private hasArgument;
    /**
     * Get an argument from the list by name
     */
    private getArgumentByName;
    /**
     * Get an argument entry by name
     */
    private getArgument;
    /**
     * Get an argument value by name
     */
    private getArgumentValue;
    /**
     * Get an argument by name
     */
    get<T = any>(name: string, entry?: boolean): T | Argument<T> | undefined;
    /**
     * Check if an entry is an ArgumentEntry
     */
    private isEntry;
    /**
     * Add an argument from an entry
     */
    private addArgumentFromEntry;
    /**
     * Add an argument from an object
     */
    private addArgumentFromObject;
    /**
     * Add an argument
     * @summary Add an argument to the list of arguments from an entry, object, or array of entries or objects
     */
    add<T>(entries: ArgumentEntry<T>[]): void;
    add<T>(entry: ArgumentEntry<T>): void;
    add<T>(object: Record<string, T>): void;
    add<T>(objects: Record<string, T>[]): void;
    /**
     * Remove an argument
     * @summary Remove an argument from the list of arguments by name or array of names
     */
    remove(name: string): void;
    remove(names: string[]): void;
    /**
     * Export the Arguments as a JSON object
     * @summary Convert the arguments to a JSON object and return it
     */
    toJSON(): {
        name: string;
        value: any;
    }[];
    /**
     * Export the Arguments as a string
     * @summary Convert the arguments to a pre-formatted string and return it
     */
    toString(): string;
    /**
     * Export the Arguments as a Record
     * @summary Convert the arguments to a record and return it
     */
    toRecord(): Record<string, any>;
}
export { Arguments };
//# sourceMappingURL=arguments.d.ts.map