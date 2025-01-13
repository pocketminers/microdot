import { v4 as uuidv4 } from "uuid";
import { checkIsEmpty } from "./checks";
var IdentifierTypes;
(function (IdentifierTypes) {
    IdentifierTypes["UUID"] = "UUID";
    IdentifierTypes["Random"] = "Random";
    IdentifierTypes["Name"] = "Name";
    IdentifierTypes["Password"] = "Password";
})(IdentifierTypes || (IdentifierTypes = {}));
/**
 * Creates a new identifier.
 * @summary Creates a new identifier with the specified type.
 * @param type The type of identifier to create.
 * @param prefix The prefix to add to the identifier.
 * @param suffix The suffix to add to the identifier.
 * @returns The new identifier.
 */
const createIdentifier = (type = "UUID", { prefix, suffix } = {}) => {
    let id = "";
    switch (type) {
        case "UUID":
            id = uuidv4();
            break;
        case "Name":
            id = `${Math.floor(Math.random() * 1000000)}`;
            break;
        case "Random":
            id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            break;
        case "Password":
            id = Math.random().toString(36).substring(2, 4) + "-" + Math.random().toString(36).substring(2, 4) + "-" + Math.random().toString(36).substring(2, 4) + "-" + Math.random().toString(36).substring(2, 4);
            break;
        default:
            id = createIdentifier("UUID");
            break;
    }
    return `${prefix ? prefix : ""}${id}${suffix ? suffix : ""}`;
};
class IdentifierFactory extends Map {
    constructor(identifiers = []) {
        super();
        if (typeof identifiers === "object") {
            if (Array.isArray(identifiers)) {
                identifiers.forEach(id => this.add(id));
            }
            else {
                identifiers.forEach((id, key) => this.set(key, id));
            }
        }
        else {
            throw new Error("Invalid argument type: identifiers");
        }
    }
    checkIfIdentifierExists(id) {
        let exists = false;
        this.forEach((value) => {
            if (value === id) {
                exists = true;
            }
        });
        return exists;
    }
    addFromRecord(record) {
        const added = new Array();
        for (const [key, id] of Object.entries(record)) {
            if (this.checkIfIdentifierExists(id)) {
                throw new Error(`Identifier already exists: ${id}`);
            }
            super.set(Number(key), id);
            added.push({ [key]: id });
        }
        return added;
    }
    addFromIdentifier(id) {
        if (this.checkIfIdentifierExists(id)) {
            throw new Error(`Identifier already exists: ${id}`);
        }
        const key = this.size;
        super.set(key, id);
        return { [key]: id };
    }
    addFromArrayOfIdentifiers(ids) {
        const added = new Array();
        ids.forEach(id => {
            const completed = this.addFromIdentifier(id);
            added.push(completed);
        });
        return added;
    }
    addFromArrayOfRecords(ids) {
        const added = new Array();
        for (const id of ids) {
            const completed = this.addFromRecord(id);
            added.push(...completed);
        }
        return added;
    }
    addFromMap(map) {
        const added = new Array();
        if (map.size === 0) {
            throw new Error("Map is empty");
        }
        for (const [key, id] of map.entries()) {
            if (checkIsEmpty([id, key])) {
                throw new Error(`Identifier or key is empty: ${id}, ${key}`);
            }
            if (this.checkIfIdentifierExists(id)) {
                throw new Error(`Identifier already exists: ${id}`);
            }
            const completed = this.addFromRecord({ [key]: id });
            added.push(...completed);
        }
        return added;
    }
    add(idsOrRecords) {
        const added = new Array();
        if (Array.isArray(idsOrRecords)) {
            for (const id of idsOrRecords) {
                const completed = this.add(id);
                added.push(...completed);
            }
        }
        else if (idsOrRecords instanceof Map) {
            const completed = this.addFromMap(idsOrRecords);
            added.push(...completed);
        }
        else if (typeof idsOrRecords === 'object') {
            const record = this.addFromRecord(idsOrRecords);
            added.push(...record);
        }
        else if (typeof idsOrRecords === 'string') {
            const record = this.addFromIdentifier(idsOrRecords);
            added.push(record);
        }
        return added;
    }
    getAll() {
        return this;
    }
    getIdentifierByIndex(index) {
        const identifiers = this.getAll();
        if (index >= 0
            && identifiers.has(index)) {
            const id = identifiers.get(index);
            if (id) {
                return { [index]: id };
            }
        }
    }
    getIdentifierByValue(value) {
        for (const [key, id] of this.getAll().entries()) {
            if (id === value) {
                return { [key]: id };
            }
        }
    }
    getRecord(identifier) {
        let id = undefined;
        if (typeof identifier === "number") {
            id = this.getIdentifierByIndex(identifier);
        }
        else {
            id = this.getIdentifierByValue(identifier);
        }
        if (!id) {
            throw new Error(`Identifier not found: ${identifier}`);
        }
        return id;
    }
    getValue(identifier) {
        const id = this.getRecord(identifier);
        return Object.values(id)[0];
    }
    remove(idsOrRecords) {
        const removed = new Array();
        if (Array.isArray(idsOrRecords)
            && idsOrRecords.length > 0) {
            for (const id of idsOrRecords) {
                const completed = this.remove(id);
                removed.push(...completed);
            }
        }
        else if (idsOrRecords instanceof Map) {
            for (const [key, id] of idsOrRecords.entries()) {
                if (this.checkIfIdentifierExists(id)) {
                    super.delete(key);
                    removed.push({ [key]: id });
                }
            }
        }
        else if (typeof idsOrRecords === 'object') {
            const record = idsOrRecords;
            for (const [key, id] of Object.entries(record)) {
                if (this.checkIfIdentifierExists(id)) {
                    super.delete(Number(key));
                    removed.push({ [key]: id });
                }
            }
        }
        else if (typeof idsOrRecords === 'string') {
            const id = idsOrRecords;
            if (this.checkIfIdentifierExists(id)) {
                const key = Number(Object.keys(this.getRecord(id))[0]);
                super.delete(key);
                removed.push({ [key]: id });
            }
        }
        return removed;
    }
}
export { createIdentifier, IdentifierTypes, IdentifierFactory };
//# sourceMappingURL=identifier.js.map