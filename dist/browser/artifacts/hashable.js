import { createIdentifier } from "../utils";
import { checkForHash, hashValue } from "../utils/crypto";
/**
 * Hashable Class
 * @summary Hashable class that can be extended by other classes
 * @example
 * class MyClass extends Hashable {
 *    constructor(value: any) {
 *       super(value);
 *   }
 * }
 */
var Hashable = /** @class */ (function () {
    /**
     * Hashable Constructor to create a new Hashable instance from a value
     * @param value
     * @summary Create a new Hashable instance
     */
    function Hashable(id) {
        if (id === void 0) { id = ''; }
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        this.id = id === "" ? createIdentifier("UUID", { prefix: "Hashable-" }) : id;
        this.hash = this.createHash(values);
    }
    Hashable.prototype.createHash = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var str = "";
        // if (Array.isArray(values)) {
        for (var item in values) {
            if (this.isString(item) === true) {
                str += item;
            }
            else {
                str += JSON.stringify(item);
            }
        }
        return Hashable.hashString(str);
    };
    /**
     * isString Method
     * @param value
     * @returns boolean
     * @summary Check if the value is a string
     */
    Hashable.prototype.isString = function (value) {
        return typeof value === "string";
    };
    /**
     * isHash Method
     * @param value
     * @returns boolean
     * @summary Check if the value is a hash, which is the result of a sha256 hash
     */
    Hashable.prototype.isHash = function (value) {
        if (checkForHash(value)) {
            return true;
        }
        else {
            return false;
        }
    };
    Hashable.prototype.checkHash = function (hashOrValues) {
        if (this.isHash(hashOrValues) === true
            && this.hash !== hashOrValues) {
            throw new Error("Hash mismatch");
        }
        else if (this.isString(hashOrValues) === true
            && this.isHash(hashOrValues) === false
            && this.hash !== this.createHash(hashOrValues)) {
            throw new Error("Hash mismatch");
        }
        else if (Array.isArray(hashOrValues)
            && hashOrValues.length > 0) {
            if (this.hash !== this.createHash(hashOrValues)) {
                throw new Error("Hash mismatch");
            }
        }
        // else if (
        //     this.isHash(hashOrValues) === false
        //     && this.isString(hashOrValues) === false
        // ) {
        //     throw new Error("Invalid hash value");
        // }
        return true;
    };
    /**
     * hashString Method
     * @param value
     * @returns string
     * @summary Hash the given string using sha256
     */
    Hashable.hashString = function (value) {
        return hashValue(value);
    };
    return Hashable;
}());
export { Hashable };
//# sourceMappingURL=hashable.js.map