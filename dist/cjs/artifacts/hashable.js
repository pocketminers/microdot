"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hashable = void 0;
const utils_1 = require("../utils");
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
    id;
    hash;
    /**
     * Hashable Constructor to create a new Hashable instance from a value
     * @param value
     * @summary Create a new Hashable instance
     */
    constructor(id = '', ...values) {
        this.id = id === "" ? (0, utils_1.createIdentifier)("UUID", { prefix: "Hashable-" }) : id;
        this.hash = this.createHash(values);
    }
    createHash(...values) {
        let str = "";
        // if (Array.isArray(values)) {
        for (const item in values) {
            if (this.isString(item) === true) {
                str += item;
            }
            else {
                str += JSON.stringify(item);
            }
        }
        return Hashable.hashString(str);
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
    checkHash(hashOrValues) {
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