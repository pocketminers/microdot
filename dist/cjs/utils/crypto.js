"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForHash = exports.hashValue = void 0;
exports.sha256 = sha256;
const crypto_1 = require("crypto");
/**
 * SHA256
 * @summary SHA256 hashing algorithm
 */
function sha256(input) {
    return (0, crypto_1.createHash)("sha256").update(input).digest("hex");
}
/**
 * Hash a value
 * @summary Hash the given value using the hashing algorithm
 * @example
 * hashValue("myValue");
 */
const hashValue = (value, algorithm = "SHA256") => {
    switch (algorithm) {
        case "SHA256":
            return sha256(value);
        default:
            return sha256(value);
    }
};
exports.hashValue = hashValue;
/**
 * Check a value for a hash
 * @summary Check if the hash is in the valid format
 * @example
 * checkForHash("myHash");
 */
const checkForHash = (hash, algorithm = "SHA256") => {
    switch (algorithm) {
        case "SHA256":
            return /^[a-f0-9]{64}$/.test(hash);
        default:
            return /^[a-f0-9]{64}$/.test(hash);
    }
};
exports.checkForHash = checkForHash;
