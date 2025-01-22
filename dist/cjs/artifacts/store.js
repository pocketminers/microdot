"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtifactStore = void 0;
const argument_1 = require("./argument");
const parameter_1 = require("./parameter");
class ArtifactStore extends Array {
    constructor(items = []) {
        if (!ArtifactStore.hasUniqueNames(items)) {
            throw new Error("Items must have unique names");
        }
        const artifacts = items.map((item) => ArtifactStore.fromEntry(item));
        super(...artifacts);
    }
    static hasUniqueNames(items) {
        const names = items.map((item) => item.getName());
        const uniqueNames = new Set(names);
        return names.length === uniqueNames.size;
    }
    static fromEntry(entry) {
        if (Object.prototype.hasOwnProperty.call(entry, 'value')) {
            return new argument_1.Argument(entry);
        }
        else if (Object.prototype.hasOwnProperty.call(entry, 'defaultValue')) {
            return new parameter_1.Parameter(entry);
        }
        else {
            throw new Error("Entry must have a unique name");
        }
    }
    addEntry(entry) {
        const artifact = ArtifactStore.fromEntry(entry);
        this.addArtifact(artifact);
    }
    addArtifact(artifact) {
        if (ArtifactStore.hasUniqueNames([artifact, ...this]) === false) {
            throw new Error(`Artifact already exists: ${artifact.getName()}`);
        }
        this.push(artifact);
    }
    add(artifactsOrEntries) {
        for (const item of artifactsOrEntries) {
            if (item instanceof argument_1.Argument || item instanceof parameter_1.Parameter) {
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
        return this.map((entry) => entry.getName());
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
}
exports.ArtifactStore = ArtifactStore;
//# sourceMappingURL=store.js.map