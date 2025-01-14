"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = void 0;
const property_1 = require("./property");
class Configuration extends Map {
    constructor(properties = [], args = []) {
        super();
        for (const property of properties) {
            if (args.length > 0) {
                const arg = args.find(arg => arg.name === property.name);
                /**
                 * If an argument exists for the property
                 * then set the value of the property to the value of the argument.
                 * This will allow the property to be set by the argument.
                 */
                if (arg !== undefined
                    && arg.value !== undefined) {
                    property.value = arg.value;
                }
            }
            this.set(property.name, new property_1.Property(property));
        }
    }
    getValue(name) {
        if (this.has(name)) {
            const value = super.get(name)?.getValue();
            console.log(`Configuration: ${name} value: ${value}`);
            return value;
        }
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