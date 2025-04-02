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
import { Argument } from "./argument";
/**
 * Arguments Class
 * @category Arguments
 * @summary A class to manage a list of arguments
 */
var Arguments = /** @class */ (function (_super) {
    __extends(Arguments, _super);
    /**
     * Arguments Constructor
     * @summary Create a new Arguments instance
     * @example
     * const args = new Arguments({ name: "arg1", value: 123 });
     * console.log(args);
     * `Arguments [ Argument {
     *      hash: "391c5d93777313d8399678d8967923f46d2a8abfc12cb04205f7df723f1278fd",
     *      name: "arg1",
     *      value: 123
     * }]`
     */
    function Arguments(entryOrObject) {
        if (entryOrObject === void 0) { entryOrObject = []; }
        var _this = _super.call(this) || this;
        _this.add(entryOrObject);
        return _this;
    }
    /**
     * Check if an argument exists in the list by name
     */
    Arguments.prototype.hasArgument = function (name) {
        return this.some(function (arg) { return arg.name === name; });
    };
    /**
     * Get an argument from the list by name
     */
    Arguments.prototype.getArgumentByName = function (name) {
        return this.find(function (arg) { return arg.name === name; });
    };
    /**
     * Get an argument entry by name
     */
    Arguments.prototype.getArgument = function (name) {
        return this.getArgumentByName(name);
    };
    /**
     * Get an argument value by name
     */
    Arguments.prototype.getArgumentValue = function (name) {
        return this.getArgumentByName(name).value;
    };
    /**
     * Get an argument by name
     */
    Arguments.prototype.get = function (name, entry) {
        if (entry === void 0) { entry = false; }
        if (this.hasArgument(name)) {
            return entry === true ? this.getArgument(name) : this.getArgumentValue(name);
        }
        return undefined;
    };
    /**
     * Check if an entry is an ArgumentEntry
     */
    Arguments.prototype.isEntry = function (arg) {
        if (typeof arg === "object") {
            return "name" in arg && "value" in arg;
        }
        return false;
    };
    /**
     * Add an argument from an entry
     */
    Arguments.prototype.addArgumentFromEntry = function (arg) {
        if (this.hasArgument(arg.name)) {
            throw new Error("Duplicate argument name: ".concat(arg.name));
        }
        this.push(new Argument(arg));
    };
    /**
     * Add an argument from an object
     */
    Arguments.prototype.addArgumentFromObject = function (arg) {
        var e_1, _a;
        try {
            for (var _b = __values(Object.entries(arg)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), name_1 = _d[0], value = _d[1];
                this.addArgumentFromEntry({ name: name_1, value: value });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    Arguments.prototype.add = function (entryOrObject) {
        var e_2, _a;
        if (entryOrObject === void 0) { entryOrObject = []; }
        if (Array.isArray(entryOrObject)) {
            try {
                for (var entryOrObject_1 = __values(entryOrObject), entryOrObject_1_1 = entryOrObject_1.next(); !entryOrObject_1_1.done; entryOrObject_1_1 = entryOrObject_1.next()) {
                    var arg = entryOrObject_1_1.value;
                    this.add(arg);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (entryOrObject_1_1 && !entryOrObject_1_1.done && (_a = entryOrObject_1.return)) _a.call(entryOrObject_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        else {
            if (this.isEntry(entryOrObject)) {
                this.addArgumentFromEntry(entryOrObject);
            }
            else {
                this.addArgumentFromObject(entryOrObject);
            }
        }
    };
    Arguments.prototype.remove = function (nameOrNames) {
        var _this = this;
        if (Array.isArray(nameOrNames)) {
            nameOrNames.forEach(function (name) { return _this.remove(name); });
        }
        else {
            var index = this.findIndex(function (arg) { return arg.name === nameOrNames; });
            if (index !== -1) {
                this.splice(index, 1);
            }
        }
    };
    /**
     * Export the Arguments as a JSON object
     * @summary Convert the arguments to a JSON object and return it
     */
    Arguments.prototype.toJSON = function () {
        var e_3, _a;
        var obj = [];
        try {
            for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                var arg = _c.value;
                obj.push(arg.toJSON());
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return obj;
    };
    /**
     * Export the Arguments as a string
     * @summary Convert the arguments to a pre-formatted string and return it
     */
    Arguments.prototype.toString = function () {
        return this.map(function (arg) { return arg.toString(); }).join("\n");
    };
    /**
     * Export the Arguments as a Record
     * @summary Convert the arguments to a record and return it
     */
    Arguments.prototype.toRecord = function () {
        return this.reduce(function (acc, arg) {
            acc[arg.name] = arg.value;
            return acc;
        }, {});
    };
    return Arguments;
}(Array));
export { Arguments };
//# sourceMappingURL=arguments.js.map