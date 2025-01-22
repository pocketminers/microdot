import { checkHasEmpties, checkIsEmpty } from "@/utils";
import { Hashable, HashableEntry } from "./hashable";

interface IdentifiableEntry<T>
    extends
        Record<"id", string>,
        Record<"name", string>,
        Partial<Record<"description", string>>,
        HashableEntry<T> {}



/**
 * Identifiable Class that extends Hashable and adds an id property,  The id property is a string that is used to identify the object and it is not included in the hash. Additionally, the Identifiable class has a name and description property - both of which are strings and are not included in the hash.
 * @summary Identifiable class that extends Hashable
 */
class Identifiable<T>
    extends Hashable<T>
{
    public readonly id: string;
    public readonly name: string;
    public readonly description: string;
    public readonly createdAt: Date = new Date();

    constructor({
        id,
        name,
        description = "",
        data,
        hash = undefined
    }: IdentifiableEntry<T>) {
        if (checkHasEmpties([id, name, data]) === true) {
            throw new Error("Identifiable:constructor:id, name or data cannot be empty.");
        }

        super({ hash, data});
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }
}

export { Identifiable, IdentifiableEntry };