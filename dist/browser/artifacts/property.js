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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { checkIsEmpty } from "../utils";
import { Argument } from "./argument";
import { Parameter } from "./parameter";
/**
 * The Property class is a Parameter with an Argument
 */
var Property = /** @class */ (function (_super) {
    __extends(Property, _super);
    /**
     * Create a new Property instance from a PropertyEntry
     */
    function Property(_a) {
        var _b = _a.id, id = _b === void 0 ? '' : _b, name = _a.name, value = _a.value, _c = _a.description, description = _c === void 0 ? '' : _c, _d = _a.required, required = _d === void 0 ? true : _d, _e = _a.defaultValue, defaultValue = _e === void 0 ? undefined : _e, _f = _a.optionalValues, optionalValues = _f === void 0 ? [] : _f;
        var _this = _super.call(this, { id: id, name: name, description: description, required: required, defaultValue: defaultValue, optionalValues: optionalValues }) || this;
        if (checkIsEmpty([value]) === false
            && value !== undefined
            && _this.checkOptionalValues(value)) {
            _this.argument = new Argument({ id: id, name: name, value: value });
        }
        return _this;
    }
    /**
     * Get the value of the Property.
     * If no value is set in attribute field, then return the default value.
     */
    Property.prototype.getValue = function () {
        var _a;
        return _super.prototype.getValue.call(this, (_a = this.argument) === null || _a === void 0 ? void 0 : _a.value);
    };
    /**
     * Set the value of the Property
     * If the value is not in the optional values, then throw an error.
     * If the value is required and is undefined, then throw an error.
     * If the value is the same as the current value, then return.
     */
    Property.prototype.setValue = function (value) {
        if (!this.checkOptionalValues(value)) {
            throw new Error("Value is not in optional values: ".concat(this.name));
        }
        if (this.required === true
            && value === undefined) {
            throw new Error("Value is required: ".concat(this.name));
        }
        if (this.argument !== undefined
            && value === this.argument.value) {
            return;
        }
        this.argument = new Argument({ name: this.name, value: value });
    };
    /**
     * Convert the Property to a JSON object.
     * The JSON object contains the name of the property, the required flag, the description, the default value, the optional values, and the value.
     * If the value is not set, then the default value is returned as the value.
     */
    Property.prototype.toJSON = function () {
        return __assign(__assign({}, _super.prototype.toJSON.call(this)), { value: this.getValue() });
    };
    /**
     * Convert the Property to a string.
     * The string contains the name of the property and the value of the property.
     */
    Property.prototype.toString = function () {
        return "".concat(this.name, ": ").concat(this.getValue());
    };
    /**
     * Convert the Property to a Record.
     * The record exports the current state of the Property.
     * Note: The record does not contain the Argument, instead it contains the value of the Argument, if it exists.
     * The Record contains the name of the property, the required flag, the description, the default value, the optional values, and the value in the argument field.
     */
    Property.prototype.toRecord = function () {
        var _a;
        return {
            name: this.name,
            required: this.required,
            description: this.description,
            defaultValue: this.defaultValue,
            optionalValues: this.optionalValues,
            value: (_a = this.argument) === null || _a === void 0 ? void 0 : _a.value
        };
    };
    /**
     * Convert the Property to a KeyValuePair.
     * The KeyValuePair contains the name of the property and the value of the property.
     */
    Property.prototype.toKeyValuePair = function () {
        var _a;
        return _a = {},
            _a[this.name] = this.getValue(),
            _a;
    };
    return Property;
}(Parameter));
export { Property };
//# sourceMappingURL=property.js.map