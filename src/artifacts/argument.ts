import { checkIsArray, checkIsEmpty } from "@utils/checks";
import { Hashable, HashableEntry } from "@artifacts/hashable";
import { IsNotEmpty } from "@/utils/decorators";


/**
 * Argument Entry Interface
 * @summary Argument entry interface that is used to create an argument
 */
interface ArgumentEntry<T>
    extends
        HashableEntry<T>,
        Partial<Pick<HashableEntry<T>, "id" | "value">>,
        Record<"name", string> {}


/**
 * Argument Class
 * @summary An argument specifies the value of a Parameter by name
 */
class Argument<T>
    extends
        Hashable
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
            id,
            name,
            value
        }: ArgumentEntry<T>
    ) {
        if (checkIsEmpty([name, value])) {
            throw new Error("Argument:constructor:name or value cannot be empty.");
        }

        super(id, name, value);
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
        return super.checkHash(this.id, this.name, this.value);
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
    @IsNotEmpty
    public static fromRecord<T>(record: Record<string, T>): Argument<T> {

        if (checkIsArray(record)) {
            for (const entry in record) {
                return new Argument<T>({ name: entry, value: record[entry] });
            }
        }
        // decompose the record into name and value
        else {
            for (const [name, value] of Object.entries(record)) {
                return new Argument<T>({ name, value });
            }
        }

        // throw new Error("Argument:fromRecord:input cannot be empty.");
        throw new Error(`${this.name}:${this.fromRecord.name}:name or value cannot be empty.`);
        
    }
}


export {
    type ArgumentEntry,
    Argument
};