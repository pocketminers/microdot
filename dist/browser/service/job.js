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
import { Hashable } from "../artifacts";
var Job = /** @class */ (function (_super) {
    __extends(Job, _super);
    function Job(_a) {
        var id = _a.id, _b = _a.name, name = _b === void 0 ? 'Job' : _b, _c = _a.description, description = _c === void 0 ? 'A job To be ran by the job runner' : _c, _d = _a.properties, properties = _d === void 0 ? [] : _d, _e = _a.parameters, parameters = _e === void 0 ? [] : _e, _f = _a.args, args = _f === void 0 ? [] : _f, _g = _a.useArgs, useArgs = _g === void 0 ? false : _g;
        var _this = _super.call(this, {
            name: name,
            description: description,
            properties: properties,
            parameters: parameters,
            args: args,
            useArgs: useArgs
        }) || this;
        _this.status = 'pending';
        _this.commands = new Map();
        _this.results = new Map();
        _this.id = id;
        return _this;
    }
    return Job;
}(Hashable));
export { Job };
//# sourceMappingURL=job.js.map