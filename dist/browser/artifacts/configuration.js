var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { checkIsEmpty } from "../utils";
import { Parameter } from "./parameter";
import { Property } from "./property";
/**
 * Configuration is a map of properties that can be set by arguments.
 * A 'property' is a parameter with an argument.
 * If an argument exists for a property, then the value of the property is set to the value of the argument.
 * This allows the property to be set by the argument.
 */
var Configuration = /** @class */ (function (_super) {
    __extends(Configuration, _super);
    /**
     * Create a new Configuration instance
     * Both, properties and arguments can be passed to the constructor.
     */
    function Configuration(properties, parameters, args) {
        if (properties === void 0) { properties = []; }
        if (parameters === void 0) { parameters = []; }
        if (args === void 0) { args = []; }
        var _this = _super.call(this) || this;
        _this.addEntries(__spreadArray(__spreadArray([], __read(properties), false), __read(parameters), false), args);
        return _this;
    }
    /**
     * Add a property to the configuration from a property entry and an argument entry.
     * If the property is already in the configuration, then throw an error.
     * If an argument exists for the property, then set the value of the property.
     * If the entry is a parameter, then create a new property.
     * If the entry is not a parameter or a property, then throw an error.
     */
    Configuration.prototype.addEntry = function (entry, args, overwrite) {
        if (args === void 0) { args = []; }
        if (overwrite === void 0) { overwrite = false; }
        var property;
        // If the entry is a parameter, then create a new property
        if (entry instanceof Property) {
            property = entry;
        }
        else if (entry instanceof Parameter) {
            property = new Property(entry);
        }
        else {
            throw new Error("Invalid entry: ".concat(entry));
        }
        // Check if the property is already in the configuration
        if (overwrite === false
            && property !== undefined
            && this.has(property.name)) {
            throw new Error("Property already exists: ".concat(property.name));
        }
        // Check if an argument exists for the property
        var arg = args.find(function (arg) { return arg.name === (property === null || property === void 0 ? void 0 : property.name); });
        // If the property is already in the configuration and the overwrite flag is true, then delete the property
        if (overwrite === true) {
            this.delete(property.name);
        }
        // If an argument exists, then set the value of the property
        if (args !== undefined
            && arg !== undefined
            && checkIsEmpty([arg]) === false) {
            property.setValue(arg.value);
        }
        // Add the property to the configuration
        this.set(property.name, property);
    };
    /**
     * Add properties to the configuration from a list of property entries and a list of argument entries.
     * If the property is already in the configuration, then throw an error.
     * If an argument exists for the property, then set the value of the property.
     * If the entry is a parameter, then create a new property.
     * If the entry is not a parameter or a property, then throw an error.
     */
    Configuration.prototype.addEntries = function (entries, args) {
        var e_1, _a;
        if (args === void 0) { args = []; }
        //check the input entries for duplicates
        var names = entries.map(function (entry) { return entry.name; });
        var duplicates = names.filter(function (name, index) { return names.indexOf(name) !== index; });
        if (duplicates.length > 0) {
            throw new Error("Duplicate entries: ".concat(duplicates));
        }
        try {
            for (var entries_1 = __values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
                var entry = entries_1_1.value;
                this.addEntry(entry, args);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (entries_1_1 && !entries_1_1.done && (_a = entries_1.return)) _a.call(entries_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /**
     * Get a property from the configuration by name
     */
    Configuration.prototype.getValue = function (name) {
        var _a;
        if (this.has(name)) {
            var value = (_a = _super.prototype.get.call(this, name)) === null || _a === void 0 ? void 0 : _a.getValue();
            return value;
        }
    };
    /**
     * Get the required property values from the configuration
     */
    Configuration.prototype.getRequiredValues = function () {
        var e_2, _a;
        var values = {};
        try {
            for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), name_1 = _d[0], property = _d[1];
                if (property.required) {
                    values[name_1] = property.getValue();
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return values;
    };
    /**
     * Convert the configuration to a JSON object.
     * The JSON object contains the name of the property and the property object.
     */
    Configuration.prototype.toJSON = function () {
        var e_3, _a;
        var json = {};
        try {
            for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), name_2 = _d[0], property = _d[1];
                json[name_2] = property.toJSON();
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return json;
    };
    /**
     * Convert the configuration to a string.
     * The string contains the name of the property and the value of the property.
     */
    Configuration.prototype.toString = function () {
        var e_4, _a;
        var str = "";
        try {
            for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), name_3 = _d[0], property = _d[1];
                str += "".concat(name_3, ": ").concat(property.getValue(), "\n");
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return str;
    };
    /**
     * Convert the configuration to a record.
     * The record contains the name of the property and the property object.
     */
    Configuration.prototype.toRecord = function () {
        var e_5, _a;
        var record = {};
        try {
            for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), name_4 = _d[0], property = _d[1];
                record[name_4] = property.toRecord();
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return record;
    };
    return Configuration;
}(Map));
export { Configuration };
//# sourceMappingURL=configuration.js.map