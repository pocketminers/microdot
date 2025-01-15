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
import { Argument } from "./argument";
import { Parameter } from "./parameter";
import { Property } from "./property";
import { Arguments } from "./arguments";
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
    function Configuration(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.name, name = _c === void 0 ? 'Configuration' : _c, _d = _b.description, description = _d === void 0 ? 'A configuration of properties that can be set by arguments' : _d, _e = _b.properties, properties = _e === void 0 ? [] : _e, _f = _b.parameters, parameters = _f === void 0 ? [] : _f, _g = _b.args, args = _g === void 0 ? [] : _g, _h = _b.useArgs, useArgs = _h === void 0 ? false : _h;
        var _this = _super.call(this) || this;
        _this.name = 'Configuration';
        _this.description = 'A configuration of properties that can be set by arguments';
        _this.name = name;
        _this.description = description;
        _this.addEntries({ entries: __spreadArray(__spreadArray([], __read(properties), false), __read(parameters), false), args: args, fromArgs: useArgs });
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
    Configuration.prototype.addEntryFromArg = function (arg) {
        var property = new Property({
            name: arg.name,
            required: false,
            description: '',
            value: arg.value
        });
        property.setValue(arg.value);
        this.set(property.name, property);
    };
    /**
     * Add properties to the configuration from a list of property entries and a list of argument entries.
     * If the property is already in the configuration, then throw an error.
     * If an argument exists for the property, then set the value of the property.
     * If the entry is a parameter, then create a new property.
     * If the entry is not a parameter or a property, then throw an error.
     */
    Configuration.prototype.addEntries = function (_a) {
        //check the input entries for duplicates
        var e_1, _b;
        var _c = _a === void 0 ? {} : _a, _d = _c.entries, entries = _d === void 0 ? [] : _d, _e = _c.args, args = _e === void 0 ? [] : _e, _f = _c.overwrite, overwrite = _f === void 0 ? true : _f, _g = _c.fromArgs, fromArgs = _g === void 0 ? false : _g;
        var names = entries.map(function (entry) { return entry.name; });
        var duplicates = names.filter(function (name, index) { return names.indexOf(name) !== index; });
        if (duplicates.length > 0) {
            throw new Error("Duplicate entries: ".concat(duplicates));
        }
        try {
            for (var entries_1 = __values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
                var entry = entries_1_1.value;
                if (entry instanceof Property
                    || entry instanceof Parameter) {
                    this.addEntry(entry, args, overwrite);
                }
                else if ((entry instanceof Argument
                    || typeof entry === 'object')
                    && fromArgs === true) {
                    this.addEntryFromArg(entry);
                }
                else if (Array.isArray(entry)) {
                    this.addEntries({ entries: entry, args: args, overwrite: overwrite });
                }
                else if (typeof entry === 'object'
                    && entry.name !== undefined
                    && entry.value !== undefined) {
                    this.addEntry(new Property({
                        name: entry.name,
                        value: entry.value,
                        required: entry.required,
                        description: entry.description,
                        defaultValue: entry.defaultValue,
                        optionalValues: entry.optionalValues
                    }), args, overwrite);
                }
                else {
                    throw new Error("Invalid entry: ".concat(entry));
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (entries_1_1 && !entries_1_1.done && (_b = entries_1.return)) _b.call(entries_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (fromArgs === true) {
            this.setArguments(args, true);
        }
    };
    Configuration.prototype.setArguments = function (args, setProperties) {
        var e_2, _a;
        var _this = this;
        if (setProperties === void 0) { setProperties = false; }
        var _loop_1 = function (name_1, property) {
            var arg = args.find(function (arg) { return arg.name === name_1; });
            if (arg !== undefined
                && checkIsEmpty([arg]) === false) {
                property.setValue(arg.value);
            }
        };
        try {
            for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), name_1 = _d[0], property = _d[1];
                _loop_1(name_1, property);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        // Check if any arguments were not set
        var unsetArgs = args.filter(function (arg) { return _this.has(arg.name) === false; });
        // If any arguments were not set, then throw an error
        if (unsetArgs.length > 0
            && setProperties === false) {
            throw new Error("Invalid arguments: ".concat(unsetArgs.map(function (arg) { return arg.name; })));
        }
        // If any arguments were not set, then add the arguments as properties
        if (unsetArgs.length > 0
            && setProperties === true) {
            this.addEntries({
                entries: unsetArgs,
                args: args
            });
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
        else {
            throw new Error("Property not found: ".concat(name));
        }
    };
    /**
     * Get the required property values from the configuration
     */
    Configuration.prototype.getRequiredValues = function () {
        var e_3, _a;
        var values = {};
        try {
            for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), name_2 = _d[0], property = _d[1];
                if (property.required) {
                    values[name_2] = property.getValue();
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return values;
    };
    /**
     * Convert the configuration to a JSON object.
     * The JSON object contains the name of the property and the property object.
     */
    Configuration.prototype.toJSON = function () {
        var e_4, _a;
        var json = {};
        try {
            for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), name_3 = _d[0], property = _d[1];
                json[name_3] = property.toJSON();
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return json;
    };
    /**
     * Convert the configuration to a string.
     * The string contains the name of the property and the value of the property.
     */
    Configuration.prototype.toString = function () {
        var e_5, _a;
        var str = "";
        try {
            for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), name_4 = _d[0], property = _d[1];
                str += "".concat(name_4, ": ").concat(property.getValue(), "\n");
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return str;
    };
    /**
     * Convert the configuration to a record.
     * The record contains the name of the property and the property object.
     */
    Configuration.prototype.toRecord = function () {
        var e_6, _a;
        var record = {};
        try {
            for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), name_5 = _d[0], property = _d[1];
                record[name_5] = property.toRecord();
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return record;
    };
    Configuration.prototype.toArguments = function () {
        var e_7, _a;
        var args = new Arguments();
        try {
            for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), name_6 = _d[0], property = _d[1];
                args.add(new Argument({
                    name: name_6,
                    value: property.getValue()
                }));
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_7) throw e_7.error; }
        }
        return args;
    };
    return Configuration;
}(Map));
export { Configuration };
//# sourceMappingURL=configuration.js.map