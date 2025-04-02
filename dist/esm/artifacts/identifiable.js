import { checkHasEmpties } from "../utils";
import { Hashable } from "./hashable";
/**
 * Identifiable Class that extends Hashable and adds an id property.
 * - The id property is a string that is used to identify the object and it is not included in the hash.
 * - Additionally, the Identifiable class has a name and description property - both of which are strings and are not included in the hash.
 * @summary Identifiable class that extends Hashable
 */
class Identifiable extends Hashable {
    id;
    name;
    description;
    createdAt = new Date();
    constructor({ id, name, description = "", data, hash = undefined }) {
        if (checkHasEmpties(id, name) === true) {
            throw new Error("Identifiable:constructor:id, name or data cannot be empty.");
        }
        super({ hash, data });
        this.id = id;
        this.name = name;
        this.description = description;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getDescription() {
        return this.description;
    }
    getCreatedAt() {
        return this.createdAt;
    }
}
export { Identifiable };
//# sourceMappingURL=identifiable.js.map