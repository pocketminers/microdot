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
var Configuration = /** @class */ (function (_super) {
    __extends(Configuration, _super);
    function Configuration(properties) {
        if (properties === void 0) { properties = []; }
        var _this = _super.call(this) || this;
        properties.forEach(function (property) { return _this.set(property.name, property); });
        return _this;
    }
    Configuration.prototype.get = function (name) {
        return _super.prototype.get.call(this, name);
    };
    Configuration.prototype.set = function (name, value) {
        var _a;
        (_a = this.get(name)) === null || _a === void 0 ? void 0 : _a.setValue(value);
        return this;
    };
    Configuration.prototype.getValue = function (name) {
        var _a;
        return (_a = this.get(name)) === null || _a === void 0 ? void 0 : _a.getValue();
    };
    Configuration.prototype.toJSON = function () {
        var json = {};
        this.forEach(function (property, name) {
            json[name] = property.toJSON();
        });
        return json;
    };
    Configuration.prototype.toString = function () {
        var str = "";
        this.forEach(function (property) {
            str += "".concat(property.toString(), "\n");
        });
        return str;
    };
    Configuration.prototype.toRecord = function () {
        var record = {};
        this.forEach(function (property, name) {
            record[name] = property.toRecord();
        });
        return record;
    };
    return Configuration;
}(Map));
export {};
//# sourceMappingURL=configuration.js.map