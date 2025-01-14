import {
    Argument,
    type ArgumentEntry
} from "./argument";


/**
 * Arguments Class
 * @category Arguments
 * @summary A class to manage a list of arguments
 */
class Arguments
    extends
        Array<Argument<any>>
{
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
    public constructor(
        entryOrObject: ArgumentEntry<any> | ArgumentEntry<any>[] | Record<string, any> | [] = []
    ) {
        super();
        this.add(entryOrObject);
    }

    /**
     * Check if an argument exists in the list by name
     */
    private hasArgument(name: string): boolean {
        return this.some(arg => arg.name === name);
    }

    /**
     * Get an argument from the list by name
     */
    private getArgumentByName<T = any>(name: string): Argument<T> {
        return this.find(arg => arg.name === name) as Argument<T>;
    }

    /**
     * Get an argument entry by name
     */
    private getArgumentEntry<T = any>(name: string): ArgumentEntry<T> | undefined {
        return this.getArgumentByName<T>(name);
    }

    /**
     * Get an argument value by name
     */
    private getArgumentValue<T = any>(name: string): T {
        return this.getArgumentByName<T>(name).value;
    }

    /**
     * Get an argument by name
     */
    public get<T = any>(name: string, entry: boolean = false): T | ArgumentEntry<T> | undefined {
        if (this.hasArgument(name)) {
            return entry === true ? this.getArgumentEntry<T>(name) : this.getArgumentValue<T>(name);
        }
        return undefined;
    }

    /**
     * Check if an entry is an ArgumentEntry
     */
    private isEntry<T>(arg: ArgumentEntry<T> | Record<string, T>): boolean {
        if (typeof arg === "object") {
            return "name" in arg && "value" in arg;
        }
        return false;
    }

    /**
     * Add an argument from an entry
     */
    private addArgumentFromEntry<T>(arg: ArgumentEntry<T>): void {

        if (this.hasArgument(arg.name)) {
            throw new Error(`Duplicate argument name: ${arg.name}`);
        }

        this.push(new Argument<T>(arg));
    }

    /**
     * Add an argument from an object
     */
    private addArgumentFromObject<T>(arg: Record<string, T>): void {
        for (const [name, value] of Object.entries(arg)) {
            this.addArgumentFromEntry<T>({ name, value });
        }
    }

    /**
     * Add an argument
     * @summary Add an argument to the list of arguments from an entry, object, or array of entries or objects
     */
    public add<T>(entries: ArgumentEntry<T>[]): void;
    public add<T>(entry: ArgumentEntry<T>): void;
    public add<T>(object: Record<string, T>): void;
    public add<T>(objects: Record<string, T>[]): void;
    public add<T>(entryOrObject: ArgumentEntry<T> | ArgumentEntry<T>[] | Record<string, T> | [] = []): void {
        if (Array.isArray(entryOrObject)) {
            for (const arg of entryOrObject) {
                this.add<T>(arg);
            }
        }
        else {
            if (this.isEntry<T>(entryOrObject)) {
                this.addArgumentFromEntry<T>(entryOrObject as ArgumentEntry<T>);
            }
            else {
                this.addArgumentFromObject<T>(entryOrObject as Record<string, T>);
            }
        }
    }

    /**
     * Remove an argument
     * @summary Remove an argument from the list of arguments by name or array of names
     */
    public remove(name: string): void;
    public remove(names: string[]): void;
    public remove(nameOrNames: string | string[]): void {
        if (Array.isArray(nameOrNames)) {
            nameOrNames.forEach(name => this.remove(name));
        } else {
            const index = this.findIndex(arg => arg.name === nameOrNames);
            if (index !== -1) {
                this.splice(index, 1);
            }
        }
    }

    /**
     * Export the Arguments as a JSON object
     * @summary Convert the arguments to a JSON object and return it
     */
    public toJSON(): {name: string, value: any}[] {
        const obj: {name: string, value: any}[] = [];
        for (const arg of this) {
            obj.push(arg.toJSON());
        }
        return obj;

    }

    /**
     * Export the Arguments as a string
     * @summary Convert the arguments to a pre-formatted string and return it
     */
    public override toString(): string {
        return this.map(arg => arg.toString()).join("\n");
    }

    /**
     * Export the Arguments as a Record
     * @summary Convert the arguments to a record and return it
     */
    public toRecord(): Record<string, any> {
        return this.reduce((acc, arg) => {
            acc[arg.name] = arg.value;
            return acc;
        }, {} as Record<string, any>);
    }
}


export {
    Arguments
};