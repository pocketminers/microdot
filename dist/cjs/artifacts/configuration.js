"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = void 0;
class Configuration extends Map {
    constructor(properties = []) {
        super();
        for (const property of properties) {
            this.set(property.name, property);
        }
    }
    get(name) {
        return super.get(name);
    }
    set(name, value) {
        super.set(name, value);
        return this;
    }
    getValue(name) {
        return this.get(name)?.getValue();
    }
    toJSON() {
        const json = {};
        for (const [name, property] of this) {
            json[name] = property.toJSON();
        }
        return json;
    }
    toString() {
        let str = "";
        for (const [name, property] of this) {
            str += `${name}: ${property.getValue()}\n`;
        }
        return str;
    }
    toRecord() {
        const record = {};
        for (const [name, property] of this) {
            record[name] = property.toRecord();
        }
        return record;
    }
}
exports.Configuration = Configuration;
//# sourceMappingURL=configuration.js.map