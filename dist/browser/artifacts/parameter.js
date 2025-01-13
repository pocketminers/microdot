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
import { createIdentifier } from "../utils/identifier";
import { Hashable } from "./hashable";
/**
 * A paramter class holds the name, required flag, description, default value, and optional values
 * @summary A parameter specifies a value that can be passed to a service"s method
 */
var Parameter = /** @class */ (function (_super) {
    __extends(Parameter, _super);
    /**
     * Parameter Constructor that creates a new instance of a parameter from the given parameter entry
     * @summary Create a new Parameter instance
     * @example
     * const param = new Parameter<number>({ name: "param1", required: true, description: "A parameter", defaultValue: 123, optionalValues: [123, 456] }, true);
     * console.log(param);
     * `Parameter {
     *    hash: "<insert sha256 hash here>",
     *    name: "param1",
     *    required: true,
     *    description: "A parameter",
     *    defaultValue: 123,
     *    optionalValues: [123, 456]
     * }`
     */
    function Parameter(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.name, name = _c === void 0 ? createIdentifier("Name", { prefix: "Parameter-" }) : _c, _d = _b.required, required = _d === void 0 ? false : _d, _e = _b.description, description = _e === void 0 ? "A parameter" : _e, defaultValue = _b.defaultValue, _f = _b.optionalValues, optionalValues = _f === void 0 ? [] : _f;
        var _this = _super.call(this, { name: name, required: required, description: description, defaultValue: defaultValue, optionalValues: optionalValues }) || this;
        _this.name = name;
        _this.required = required;
        _this.description = description;
        _this.defaultValue = defaultValue;
        _this.optionalValues = optionalValues;
        _this.checkOptionalValues();
        return _this;
    }
    /**
     * Check if the Default Value or a Given Value is in the Optional Values
     * @summary Check if the value is in the optional values
     */
    Parameter.prototype.checkOptionalValues = function (value) {
        value = value !== undefined ? value : this.defaultValue;
        if (this.optionalValues !== undefined
            && this.optionalValues.length > 0
            && value !== undefined
            && !this.optionalValues.includes(value)) {
            throw new Error("Value is not in optional values: ".concat(this.name));
        }
        return true;
    };
    /**
     * Get the value from the parameter and a given value
     * @summary Get the value of the parameter which will be the default value if the given value is undefined
     */
    Parameter.prototype.getValue = function (value) {
        if (value === undefined &&
            this.defaultValue === undefined) {
            throw new Error("Value is required: ".concat(this.name));
        }
        if (value === undefined &&
            this.defaultValue !== undefined) {
            return this.defaultValue;
        }
        if (!this.checkOptionalValues(value)) {
            throw new Error("Value is not in optional values: ".concat(this.name));
        }
        return value;
    };
    /**
     * Set Method **Not Implemented!**
     * @summary Method not implemented
     * @throws Error
     */
    Parameter.prototype.set = function (value) {
        throw new Error("Method not implemented.");
    };
    /**
     * Convert the Parameter to a JSON object
     * @summary Convert the parameter to a JSON object
     */
    Parameter.prototype.toJSON = function () {
        return {
            name: this.name,
            required: this.required,
            description: this.description,
            defaultValue: this.defaultValue,
            optionalValues: this.optionalValues
        };
    };
    /**
     * Convert the Parameter to a string
     * @summary Convert the parameter to a string
     * @example
     * const param = new Parameter<number>({ name: "param1", required: true, description: "A parameter", defaultValue: 123, optionalValues: [123, 456] }, true);
     * console.log(param.toString());
     * `name: param1
     *  description: A parameter
     *  required: true
     *  default: 123
     *  options: 123, 456
     *  hash: <insert sha256 hash here>`
     */
    Parameter.prototype.toString = function () {
        return "name: ".concat(this.name, "\n description: ").concat(this.description, "\n required: ").concat(this.required, " ").concat(this.defaultValue ? "\ndefault: ".concat(this.defaultValue) : "", " ").concat(this.optionalValues !== undefined && this.optionalValues.length > 0 ? "\noptions: ".concat(this.optionalValues.join(", ")) : "", " ").concat(this.hash ? "\nhash: ".concat(this.hash) : "");
    };
    /**
     * Export the Parameter as a Record
     * @summary Convert the parameter to a record and return it
     */
    Parameter.prototype.toRecord = function () {
        return {
            name: this.name,
            required: this.required,
            description: this.description,
            defaultValue: this.defaultValue,
            optionalValues: this.optionalValues
        };
    };
    return Parameter;
}(Hashable));
export { Parameter };
