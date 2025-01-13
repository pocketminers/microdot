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
    Arguments.prototype.getArgumentEntry = function (name) {
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
            return entry === true ? this.getArgumentEntry(name) : this.getArgumentValue(name);
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
        for (var _i = 0, _a = Object.entries(arg); _i < _a.length; _i++) {
            var _b = _a[_i], name_1 = _b[0], value = _b[1];
            this.addArgumentFromEntry({ name: name_1, value: value });
        }
    };
    Arguments.prototype.add = function (entryOrObject) {
        if (entryOrObject === void 0) { entryOrObject = []; }
        if (Array.isArray(entryOrObject)) {
            for (var _i = 0, entryOrObject_1 = entryOrObject; _i < entryOrObject_1.length; _i++) {
                var arg = entryOrObject_1[_i];
                this.add(arg);
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
        var obj = [];
        for (var _i = 0, _a = this; _i < _a.length; _i++) {
            var arg = _a[_i];
            obj.push(arg.toJSON());
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
