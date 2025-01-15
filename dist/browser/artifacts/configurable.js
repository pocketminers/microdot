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
import { Configuration } from "./configuration";
import { Hashable } from "./hashable";
/**
 * Configurable is a class that can be configured by arguments.
 * A 'configurable' is a hashable object that can be set by arguments.
 * If an argument exists for a property, then the value of the property is set to the value of the argument.
 * This allows the property to be set by the argument.
 */
var Configurable = /** @class */ (function (_super) {
    __extends(Configurable, _super);
    function Configurable(_a) {
        var id = _a.id, _b = _a.name, name = _b === void 0 ? 'Configurable' : _b, _c = _a.description, description = _c === void 0 ? 'A configurable object that can be set by arguments' : _c, _d = _a.configuration, configuration = _d === void 0 ? undefined : _d, _e = _a.properties, properties = _e === void 0 ? [] : _e, _f = _a.parameters, parameters = _f === void 0 ? [] : _f, _g = _a.args, args = _g === void 0 ? [] : _g, _h = _a.useArgs, useArgs = _h === void 0 ? false : _h;
        var _this = _super.call(this, id, name, description, configuration, properties, parameters, args, useArgs) || this;
        _this.createdAt = new Date();
        _this.name = name;
        _this.description = description;
        if (configuration !== undefined) {
            _this.config = configuration;
            _this.config.addEntries({ entries: __spreadArray(__spreadArray([], __read(properties), false), __read(parameters), false), args: args });
            _this.config.setArguments(args, true);
        }
        else {
            _this.config = new Configuration({ name: name, description: description, properties: properties, parameters: parameters, args: args });
        }
        return _this;
    }
    Configurable.prototype.setArguments = function (args, asProperties) {
        if (asProperties === void 0) { asProperties = false; }
        this.config.setArguments(args, asProperties);
    };
    Configurable.prototype.getArguments = function () {
        return this.config.toArguments();
    };
    return Configurable;
}(Hashable));
export { Configurable };
//# sourceMappingURL=configurable.js.map