import { Argument } from "./argument";
import { Parameter } from "./parameter";
class PropertyStore extends Array {
    constructor(items = []) {
        if (!Array.isArray(items)) {
            throw new TypeError("Items must be an array");
        }
        if (!PropertyStore.hasUniqueNames({ items })) {
            throw new Error("Items must have unique names");
        }
        const artifacts = [];
        for (const item of items) {
            artifacts.push(PropertyStore.fromEntry(item));
        }
        super(...artifacts);
    }
    static hasUniqueNames({ items }) {
        const names = new Set();
        for (const item of items) {
            if (names.has(item.name)) {
                return false;
            }
            names.add(item.name);
        }
        return true;
    }
    static fromEntry(entry) {
        if (Object.prototype.hasOwnProperty.call(entry, 'value')) {
            return new Argument(entry);
        }
        else if (Object.prototype.hasOwnProperty.call(entry, 'defaultValue')) {
            return new Parameter(entry);
        }
        else {
            throw new Error("Entry must have a unique name");
        }
    }
    addEntry(entry) {
        const artifact = PropertyStore.fromEntry(entry);
        this.addArtifact(artifact);
    }
    addArtifact(artifact) {
        if (this.getEntry(artifact.getName())) {
            throw new Error(`Entry already exists: ${artifact.getName()}`);
        }
        this.push(artifact);
    }
    add(artifactsOrEntries) {
        for (const item of artifactsOrEntries) {
            if (item instanceof Argument || item instanceof Parameter) {
                this.addArtifact(item);
            }
            else {
                this.addEntry(item);
            }
        }
    }
    getEntry(name) {
        return this.find((entry) => entry.getName() === name);
    }
    getEntries() {
        return this;
    }
    getNames() {
        const names = [];
        for (const entry of this) {
            names.push(entry.getName());
        }
        return names;
    }
    removeEntryByName(name) {
        const index = this.findIndex((entry) => entry.getName() === name);
        try {
            if (index !== -1) {
                this.splice(index, 1);
            }
        }
        catch (error) {
            throw new Error(`Error removing entry: ${name}`);
        }
    }
    removeEntry(entry) {
        this.removeEntryByName(entry.getName());
    }
    updateEntry(entry) {
        const index = this.findIndex((item) => item.getName() === entry.getName());
        if (index === -1) {
            throw new Error(`Entry not found: ${entry.getName()}`);
        }
        this[index] = entry;
    }
}
export { PropertyStore };
//# sourceMappingURL=store.js.map