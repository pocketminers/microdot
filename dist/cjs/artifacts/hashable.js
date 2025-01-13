"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hashable = void 0;
const crypto_1 = require("../utils/crypto");
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
class Hashable {
    hash;
    /**
     * Hashable Constructor to create a new Hashable instance from a value
     * @param value
     * @summary Create a new Hashable instance
     */
    constructor(value) {
        let str;
        if (this.isString(value)) {
            str = value;
        }
        else {
            str = JSON.stringify(value);
        }
        this.hash = Hashable.hashString(str);
    }
    /**
     * isString Method
     * @param value
     * @returns boolean
     * @summary Check if the value is a string
     */
    isString(value) {
        return typeof value === "string";
    }
    /**
     * isHash Method
     * @param value
     * @returns boolean
     * @summary Check if the value is a hash, which is the result of a sha256 hash
     */
    isHash(value) {
        if ((0, crypto_1.checkForHash)(value)) {
            return true;
        }
        else {
            return false;
        }
    }
    checkHash(hashOrValue) {
        if (this.isHash(hashOrValue) === true
            && this.hash !== hashOrValue) {
            throw new Error("Hash mismatch");
        }
        else if (this.isString(hashOrValue) === true
            && this.isHash(hashOrValue) === false
            && this.hash !== Hashable.hashString(hashOrValue)) {
            throw new Error("Hash mismatch");
        }
        else if (this.isHash(hashOrValue) === false
            && this.isString(hashOrValue) === false) {
            throw new Error("Invalid hash value");
        }
        return true;
    }
    /**
     * hashString Method
     * @param value
     * @returns string
     * @summary Hash the given string using sha256
     */
    static hashString(value) {
        return (0, crypto_1.hashValue)(value);
    }
}
exports.Hashable = Hashable;
//# sourceMappingURL=hashable.js.map