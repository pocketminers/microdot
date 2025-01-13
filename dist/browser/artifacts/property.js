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
import { Argument } from "./argument";
import { Parameter } from "./parameter";
/**
 * The Property class is a Parameter with an Argument
 */
var Property = /** @class */ (function (_super) {
    __extends(Property, _super);
    function Property(_a) {
        var name = _a.name, value = _a.value, description = _a.description, required = _a.required, defaultValue = _a.defaultValue, optionalValues = _a.optionalValues;
        var _this = _super.call(this, { name: name, description: description, required: required, defaultValue: defaultValue, optionalValues: optionalValues }) || this;
        _this.argument = new Argument({ name: name, value: value });
        return _this;
    }
    Property.prototype.getValue = function () {
        return _super.prototype.getValue.call(this, this.argument.value);
    };
    Property.prototype.setValue = function (value) {
        if (!this.checkOptionalValues(value)) {
            throw new Error("Value is not in optional values: ".concat(this.name));
        }
        if (this.required && value === undefined) {
            throw new Error("Value is required: ".concat(this.name));
        }
        if (value === this.argument.value) {
            return;
        }
        this.argument = new Argument({ name: this.name, value: value });
    };
    Property.prototype.toJSON = function () {
        return __assign(__assign({}, _super.prototype.toJSON.call(this)), { value: this.argument.value });
    };
    Property.prototype.toString = function () {
        return "".concat(this.name, ": ").concat(this.getValue());
    };
    Property.prototype.toRecord = function () {
        return {
            name: this.name,
            required: this.required,
            description: this.description,
            defaultValue: this.defaultValue,
            optionalValues: this.optionalValues,
            value: this.argument.value
        };
    };
    return Property;
}(Parameter));
export { Property };
//# sourceMappingURL=property.js.map