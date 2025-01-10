import { sha256 } from "@utils/crypto";
/**
 * HASHING_ENABLED
 * @summary Enable hashing for the Hashable class
 * @default false
 */
const HASHING_ENABLED = process.env.HASHING_ENABLED !== undefined ? process.env.HASHING_ENABLED === "TRUE" ? true : false : false;
/**
 * HASHING_ALGORITHM
 * @summary Hashing algorithm to use for the Hashable class
 * @default SHA256
 */
const HASHING_ALGORITHM = process.env.HASHING_ALGORITHM !== undefined ? process.env.HASHING_ALGORITHM : "SHA256";
/**
 * Hash Method
 * @summary Hash the given value using sha256
 * @example
 * hash('myValue');
 */
const hash = (value) => {
    switch (HASHING_ALGORITHM) {
        case "SHA256":
            return sha256(value);
        default:
            return sha256(value);
    }
};
/**
 * Check Method
 * @summary Check if the hash is in the valid format
 * @example
 * check('myHash');
 */
const check = (hash) => {
    switch (HASHING_ALGORITHM) {
        case "SHA256":
            return /^[a-f0-9]{64}$/.test(hash);
        default:
            return /^[a-f0-9]{64}$/.test(hash);
    }
};
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
     * Constructor
     * @param value
     * @param force [optional] Force hashing
     * @summary Create a new Hashable instance
     */
    constructor(value, force = false) {
        let string;
        if (HASHING_ENABLED === true
            || force === true) {
            if (this.isString(value)) {
                string = value;
            }
            else {
                string = JSON.stringify(value);
            }
            this.hash = Hashable.hashString(string);
        }
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
        if (check(value)) {
            return true;
        }
        else {
            return false;
        }
    }
    checkHash(hashOrValue) {
        if (HASHING_ENABLED === true
            && this.isHash(hashOrValue) === true
            && this.hash !== hashOrValue) {
            throw new Error("Hash mismatch");
        }
        else if (HASHING_ENABLED === true
            && this.isString(hashOrValue) === true
            && this.isHash(hashOrValue) === false
            && this.hash !== Hashable.hashString(hashOrValue)) {
            throw new Error("Hash mismatch");
        }
        else if (HASHING_ENABLED === true
            && this.isHash(hashOrValue) === false
            && this.isString(hashOrValue) === false) {
            throw new Error("Invalid hash value");
        }
        else if (HASHING_ENABLED === false) {
            throw new Error("Method not implemented.");
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
        return hash(value);
    }
}
export { hash, check, Hashable };
