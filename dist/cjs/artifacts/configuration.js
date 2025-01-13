"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Configuration extends Map {
    constructor(properties = []) {
        super();
        properties.forEach(property => this.set(property.name, property));
    }
    get(name) {
        return super.get(name);
    }
    set(name, value) {
        this.get(name)?.setValue(value);
        return this;
    }
    getValue(name) {
        return this.get(name)?.getValue();
    }
    toJSON() {
        const json = {};
        this.forEach((property, name) => {
            json[name] = property.toJSON();
        });
        return json;
    }
    toString() {
        let str = "";
        this.forEach(property => {
            str += `${property.toString()}\n`;
        });
        return str;
    }
    toRecord() {
        const record = {};
        this.forEach((property, name) => {
            record[name] = property.toRecord();
        });
        return record;
    }
}
//# sourceMappingURL=configuration.js.map