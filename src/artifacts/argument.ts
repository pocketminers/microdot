import { checkIsEmpty } from "@utils/checks";
import { Hashable } from "@artifacts/hashable";


/**
 * Argument Entry Interface
 * @summary Argument entry interface that is used to create an argument
 */
interface ArgumentEntry<T>
    extends
        Record<"name", string>,
        Record<"value", T> {}


/**
 * Argument Class
 * @summary An argument specifies the value of a Parameter by name
 */
class Argument<T>
    extends
        Hashable
    implements
        ArgumentEntry<T>
{
    /**
     * Argument Name
     * @summary The name of the argument
     */
    public readonly name: string;

    /**
     * Argument Value
     * @summary The value of the argument
     * @type T
     */
    public readonly value: T;

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
    constructor(
        {
            name,
            value
        }: ArgumentEntry<T>
    ) {
        if (Argument.isEmtpty({ name, value })) {
            throw new Error("Argument name or value cannot be empty.");
        }

        super({ name, value });
        this.name = name;
        this.value = value as T;
    }

    /**
     * Set Method **Not Implemented!**
     * @summary Method not implemented
     * @throws Error
     */
    public set<T>(value: T): void {
        throw new Error(`Method not implemented. Unable to set value: ${value}`);
    }

    /**
     * Get Method
     * @summary Get the value of the argument
     */
    public get(): T {
        return this.value;
    }

    /**
     * Check Hash Method
     * @summary Check if the original hash matches the current hash
     * @override Hashable.checkHash
     */
    public override checkHash(): boolean {
       return super.checkHash(JSON.stringify({ name: this.name, value: this.value }));
    }

    /**
     * Check if the Argument is empty
     * @summary Check if the argument is an empty object, or if the name or value is empty
     */
    private static isEmtpty<T>({name, value}:{name: string, value: T}): boolean {
        return checkIsEmpty([name, value]);
    }

    /**
     * Export the Argument as a JSON object
     * @summary Convert the argument to a JSON object and return it
     */
    public toJSON(): { name: string, value: T } {
        return {
            name: this.name,
            value: this.value
        };
    }

    /**
     * Export the Argument as a string
     * @summary Convert the argument to a pre-formatted string and return it
     */
    public toString(): string {
        return `${this.name}: ${this.value}`;
    }

    /**
     * Export the Argument as a Record
     * @summary Convert the argument to a record and return it
     */
    public toRecord(): Record<string, T> {
        return {
            [this.name]: this.value
        };
    }

    /**
     * Create an Argument from a Record
     * @summary Create an argument from a record object
     */
    public static fromRecord<T>(record: Record<string, T>): Argument<T> {
        return new Argument<T>({ name: Object.keys(record)[0], value: Object.values(record)[0] });
    }
}


export {
    type ArgumentEntry,
    Argument
};