import { Hashable, HashableEntry } from "./hashable";
interface IdentifiableEntry<T> extends Record<"id", string>, Record<"name", string>, Partial<Record<"description", string>>, HashableEntry<T> {
}
/**
 * Identifiable Class that extends Hashable and adds an id property.
 * - The id property is a string that is used to identify the object and it is not included in the hash.
 * - Additionally, the Identifiable class has a name and description property - both of which are strings and are not included in the hash.
 * @summary Identifiable class that extends Hashable
 */
declare class Identifiable<T> extends Hashable<T> {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly createdAt: Date;
    constructor({ id, name, description, data, hash }: IdentifiableEntry<T>);
    getId(): string;
    getName(): string;
    getDescription(): string;
    getCreatedAt(): Date;
}
export { Identifiable, type IdentifiableEntry };
//# sourceMappingURL=identifiable.d.ts.map