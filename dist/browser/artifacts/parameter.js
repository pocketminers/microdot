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
        var 
        // id = createIdentifier("Name", { prefix: "Parameter-" }),
        name = _a.name, _b = _a.required, required = _b === void 0 ? false : _b, _c = _a.description, description = _c === void 0 ? "" : _c, _d = _a.defaultValue, defaultValue = _d === void 0 ? undefined : _d, _e = _a.optionalValues, optionalValues = _e === void 0 ? [] : _e;
        var _this = _super.call(this, { data: { name: name, required: required, description: description, defaultValue: defaultValue, optionalValues: optionalValues } }) || this;
        _this.isDefaultValueInOptionalValues();
        return _this;
    }
    /**
     * Check if the Default Value or a Given Value is in the Optional Values
     * @summary Check if the value is in the optional values
     */
    Parameter.prototype.isDefaultValueInOptionalValues = function () {
        var defaultValue = this.getDefaultValue();
        if (defaultValue !== undefined) {
            return this.isValueInOptionalValues(defaultValue);
        }
        return true;
    };
    Parameter.prototype.isValueInOptionalValues = function (value) {
        var optionalValues = this.getOptionalValues();
        if (optionalValues !== undefined
            && optionalValues.length > 0
            && optionalValues.includes(value) === false) {
            throw new Error("Value is not in optional values: ".concat(this.getName()));
        }
        return true;
    };
    Parameter.prototype.getName = function () {
        return this.getData().name;
    };
    Parameter.prototype.getRequired = function () {
        return this.getData().required;
    };
    Parameter.prototype.getDescription = function () {
        return this.getData().description;
    };
    Parameter.prototype.getDefaultValue = function () {
        return this.getData().defaultValue;
    };
    Parameter.prototype.getOptionalValues = function () {
        return this.getData().optionalValues;
    };
    Parameter.prototype.getValue = function (value) {
        if (value !== undefined) {
            this.isValueInOptionalValues(value);
            return value;
        }
        var defaultValue = this.getDefaultValue();
        if (defaultValue !== undefined) {
            return defaultValue;
        }
        throw new Error("Value is required: " + this.getName());
    };
    /**
     * Convert the Parameter to a JSON object
     * @summary Convert the parameter to a JSON object
     */
    Parameter.prototype.toJSON = function () {
        var _a = this.getData(), name = _a.name, required = _a.required, description = _a.description, defaultValue = _a.defaultValue, optionalValues = _a.optionalValues;
        return {
            name: name,
            required: required,
            description: description,
            defaultValue: defaultValue,
            optionalValues: optionalValues
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
     */
    Parameter.prototype.toString = function () {
        var _a = this.getData(), name = _a.name, required = _a.required, description = _a.description, defaultValue = _a.defaultValue, optionalValues = _a.optionalValues;
        return "name: ".concat(name, "\ndescription: ").concat(description, "\nrequired: ").concat(required, " ").concat(defaultValue ? "\ndefault: ".concat(defaultValue) : "", " ").concat(optionalValues !== undefined && optionalValues.length > 0 ? "\noptions: ".concat(optionalValues.join(", ")) : "");
    };
    /**
     * Export the Parameter as a Record
     * @summary Convert the parameter to a record and return it
     */
    Parameter.prototype.toRecord = function () {
        var _a = this.getData(), name = _a.name, required = _a.required, description = _a.description, defaultValue = _a.defaultValue, optionalValues = _a.optionalValues;
        return {
            name: name,
            required: required,
            description: description,
            defaultValue: defaultValue,
            optionalValues: optionalValues
        };
    };
    return Parameter;
}(Hashable));
export { Parameter };
//# sourceMappingURL=parameter.js.map