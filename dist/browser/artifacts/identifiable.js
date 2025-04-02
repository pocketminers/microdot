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
import { checkHasEmpties } from "../utils";
import { Hashable } from "./hashable";
/**
 * Identifiable Class that extends Hashable and adds an id property.
 * - The id property is a string that is used to identify the object and it is not included in the hash.
 * - Additionally, the Identifiable class has a name and description property - both of which are strings and are not included in the hash.
 * @summary Identifiable class that extends Hashable
 */
var Identifiable = /** @class */ (function (_super) {
    __extends(Identifiable, _super);
    function Identifiable(_a) {
        var id = _a.id, name = _a.name, _b = _a.description, description = _b === void 0 ? "" : _b, data = _a.data, _c = _a.hash, hash = _c === void 0 ? undefined : _c;
        var _this = this;
        if (checkHasEmpties(id, name) === true) {
            throw new Error("Identifiable:constructor:id, name or data cannot be empty.");
        }
        _this = _super.call(this, { hash: hash, data: data }) || this;
        _this.createdAt = new Date();
        _this.id = id;
        _this.name = name;
        _this.description = description;
        return _this;
    }
    Identifiable.prototype.getId = function () {
        return this.id;
    };
    Identifiable.prototype.getName = function () {
        return this.name;
    };
    Identifiable.prototype.getDescription = function () {
        return this.description;
    };
    Identifiable.prototype.getCreatedAt = function () {
        return this.createdAt;
    };
    return Identifiable;
}(Hashable));
export { Identifiable };
//# sourceMappingURL=identifiable.js.map