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
import { PropertyStore } from "./store";
import { Identifiable } from "./identifiable";
/**
 * Configurable Class that extends Identifiable and adds parameters and arguments as data
 * @summary Configurable class that extends Identifiable
 */
var Configurable = /** @class */ (function (_super) {
    __extends(Configurable, _super);
    function Configurable(_a) {
        var id = _a.id, _b = _a.name, name = _b === void 0 ? 'Configurable' : _b, _c = _a.description, description = _c === void 0 ? 'A configurable object that can be set by arguments' : _c, _d = _a.args, args = _d === void 0 ? [] : _d, _e = _a.parameters, parameters = _e === void 0 ? [] : _e;
        var argumentStore = new PropertyStore();
        argumentStore.add(args);
        var paramStore = new PropertyStore();
        paramStore.add(parameters);
        return _super.call(this, { id: id, name: name, description: description, data: { args: argumentStore, parameters: paramStore } }) || this;
    }
    Configurable.prototype.getArguments = function () {
        return this.getData().args;
    };
    Configurable.prototype.getParameters = function () {
        return this.getData().parameters;
    };
    Configurable.prototype.isValidArgumentName = function (arg) {
        var paramNames = this.getParameters().getNames();
        return paramNames.includes(arg.getName());
    };
    Configurable.prototype.isValidArgumentValue = function (arg) {
        var param = this.getParameters().getEntry(arg.getName());
        if (!param) {
            return false;
        }
        return param.isValueInOptionalValues(arg.getValue());
    };
    Configurable.prototype.setArgument = function (arg) {
        if (!this.isValidArgumentName(arg)) {
            throw new Error("Invalid argument name: ".concat(arg.getName()));
        }
        if (!this.isValidArgumentValue(arg)) {
            throw new Error("Invalid argument value: ".concat(arg.getValue()));
        }
        if (this.getArguments().getEntry(arg.getName())) {
            this.getArguments().updateEntry(arg);
        }
        else {
            this.getArguments().addArtifact(arg);
        }
    };
    Configurable.prototype.setArgumentFromEntry = function (entry) {
        this.setArgument(new Argument(entry));
    };
    Configurable.prototype.getValue = function (name) {
        var param = this.getParameters().getEntry(name);
        if (!param) {
            throw new Error("Parameter ".concat(name, " not found in ").concat(this.getName(), "(").concat(this.getId(), ")"));
        }
        var arg = this.getArguments().getEntry(name);
        return param.getValue(arg === null || arg === void 0 ? void 0 : arg.getValue());
    };
    return Configurable;
}(Identifiable));
export { Configurable };
//# sourceMappingURL=configurable.js.map