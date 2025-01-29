import { checkHasEmpties} from "@utils/checks";
import { IsNotEmpty } from "@utils/decorators";
import { Hashable } from "@artifacts/hashable";
import { ArgumentSpec } from "@service/templates/manifest";


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
    extends Hashable<ArgumentEntry<T>>
{

    // public readonly name: string;
    // public readonly value: T;

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
    constructor({
        name,
        value
    }: ArgumentEntry<T>) {
        if (checkHasEmpties([name, value])) {
            throw new Error("Argument:constructor:name or value cannot be empty.");
        }

        super({ data: {name, value} });
    }

    /**
     * returns the name of the argument
     * @summary Get the name of the argument
     */
    public get name(): string {
        return this.data.name;
    }

    /**
     * returns the value of the argument
     * @summary Get the value of the argument
     */
    public get value (): T {
        return this.data.value;
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
        return `{${this.name}: ${this.value}}`;
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

    public toManifestSpec(): ArgumentSpec<T> {
        return new ArgumentSpec<T>({
            name: this.name,
            value: this.value
        });
    }

    /**
     * Create an Argument from a Record
     * @summary Create an argument from a record object
     */
    @IsNotEmpty
    public static fromRecord<T>(record: Record<string, T>): Argument<T> {
        const name = Object.keys(record)[0];
        const value = record[name];

        return new Argument<T>({ name, value });
    }

    /**
     * Create an Argument from a string
     * @summary Create an argument from a string
     */
    @IsNotEmpty
    public static fromString(str: string): Argument<string> {
        const record = JSON.parse(str);

        return Argument.fromRecord<string>(record);
    }
}


export {
    type ArgumentEntry,
    Argument
};