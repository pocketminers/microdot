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
import { checkIsEmpty } from "../utils/checks";
import { Hashable } from "./hashable";
/**
 * Argument Class
 * @summary An argument specifies the value of a Parameter by name
 */
var Argument = /** @class */ (function (_super) {
    __extends(Argument, _super);
    /**
     * Argument Constructor
     * @summary Create a new Argument instance
     * @example
     * const arg = new Argument<number>({ name: "arg1", value: 123 });
     * console.log(arg);
     * `Argument {
     *  hash: "391c5d93777313d8399678d8967923f46d2a8abfc12cb04205f7df723f1278fd",
     *  name: "arg1",
     *  value: 123
     * }`
     */
    function Argument(_a) {
        var name = _a.name, value = _a.value;
        var _this = this;
        if (Argument.isEmtpty({ name: name, value: value })) {
            throw new Error("Argument name or value cannot be empty.");
        }
        _this = _super.call(this, name, value) || this;
        _this.name = name;
        _this.value = value;
        return _this;
    }
    /**
     * Set Method **Not Implemented!**
     * @summary Method not implemented
     * @throws Error
     */
    Argument.prototype.set = function (value) {
        throw new Error("Method not implemented. Unable to set value: ".concat(value));
    };
    /**
     * Get Method
     * @summary Get the value of the argument
     */
    Argument.prototype.get = function () {
        return this.value;
    };
    /**
     * Check Hash Method
     * @summary Check if the original hash matches the current hash
     * @override Hashable.checkHash
     */
    Argument.prototype.checkHash = function () {
        return _super.prototype.checkHash.call(this, this.name, this.value);
    };
    /**
     * Check if the Argument is empty
     * @summary Check if the argument is an empty object, or if the name or value is empty
     */
    Argument.isEmtpty = function (_a) {
        var name = _a.name, value = _a.value;
        return checkIsEmpty([name, value]);
    };
    /**
     * Export the Argument as a JSON object
     * @summary Convert the argument to a JSON object and return it
     */
    Argument.prototype.toJSON = function () {
        return {
            name: this.name,
            value: this.value
        };
    };
    /**
     * Export the Argument as a string
     * @summary Convert the argument to a pre-formatted string and return it
     */
    Argument.prototype.toString = function () {
        return "".concat(this.name, ": ").concat(this.value);
    };
    /**
     * Export the Argument as a Record
     * @summary Convert the argument to a record and return it
     */
    Argument.prototype.toRecord = function () {
        var _a;
        return _a = {},
            _a[this.name] = this.value,
            _a;
    };
    /**
     * Create an Argument from a Record
     * @summary Create an argument from a record object
     */
    Argument.fromRecord = function (record) {
        return new Argument({ name: Object.keys(record)[0], value: Object.values(record)[0] });
    };
    return Argument;
}(Hashable));
export { Argument };
//# sourceMappingURL=argument.js.map