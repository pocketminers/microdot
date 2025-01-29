import { checkHasEmpties } from "@/utils";
import { Hashable, HashableEntry } from "./hashable";

interface IdentifiableEntry<T>
    extends
        Record<"id", string>,
        Record<"name", string>,
        Partial<Record<"description", string>>,
        Partial<HashableEntry<T>> {}



/**
 * Identifiable Class that extends Hashable and adds an id property.
 * - The id property is a string that is used to identify the object and it is not included in the hash.
 * - Additionally, the Identifiable class has a name and description property - both of which are strings and are not included in the hash.
 * @summary Identifiable class that extends Hashable
 */
class Identifiable<T>
    extends Hashable<IdentifiableEntry<T>>
{

    constructor({
        id,
        name,
        description = "",
        data,
        hash = undefined
    }: IdentifiableEntry<T>) {
        if (checkHasEmpties(id, name) === true) {
            throw new Error("Identifiable:constructor:id, name or data cannot be empty.");
        }

        super({ hash, data: {id, name, description, ...data} });
    }
}

export { Identifiable, type IdentifiableEntry };