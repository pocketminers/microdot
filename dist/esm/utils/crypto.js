// import { createHash } from "crypto";
import { checkIsEmpty } from "./checks";
const DEFUALT_ALGORITHM = "SHA256";
const DEFUALT_DIGEST = "hex";
class CryptoUtils {
    /**
     * Convert an ArrayBuffer to a hex string
     */
    static arrayBufferToHex(buffer) {
        return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
    }
    /**
     * Format a digest into the desired format (hex or base64)
     */
    static formatDigest(digest, format = 'hex') {
        switch (format) {
            case 'hex':
                return CryptoUtils.arrayBufferToHex(digest);
            case 'base64':
                return btoa(String.fromCharCode(...new Uint8Array(digest)));
            default:
                throw new Error(`Unsupported digest format: ${format}`);
        }
    }
    /**
     * Create a SHA-256 hash of the input string wiuth the given digest format
     */
    static async sha256(input, digest = 'hex') {
        const encoder = new TextEncoder();
        const data = encoder.encode(input);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = new Uint8Array(hashBuffer);
        return CryptoUtils.formatDigest(hashArray, digest);
    }
    /**
     * Create a SHA-512 hash of the input string with the given digest format
     */
    static async sha512(input, digest = "hex") {
        const encoder = new TextEncoder();
        const data = encoder.encode(input);
        const hashBuffer = await crypto.subtle.digest("SHA-512", data);
        const hashArray = new Uint8Array(hashBuffer);
        return CryptoUtils.formatDigest(hashArray, digest);
    }
    /**
     * MD5
     * @summary MD5 hashing algorithm
     */
    static async md5(input, digest = "hex") {
        throw new Error("MD5 is not recommended for use in security-critical applications");
        // const encoder = new TextEncoder();
        // const data = encoder.encode(input);
        // const hashBuffer = await crypto.subtle.digest("MD5", data);
        // const hashArray = new Uint8Array(hashBuffer);
        // return CryptoUtils.formatDigest(hashArray, digest);
    }
    /**
     * Hash a value
     * @summary Hash the given value using the hashing algorithm
     * @example
     * hashValue("myValue");
     */
    static async hashString(value, algorithm = DEFUALT_ALGORITHM, digest = DEFUALT_DIGEST) {
        switch (algorithm) {
            case "SHA256":
                return await CryptoUtils.sha256(value, digest);
            case "SHA512":
                return await CryptoUtils.sha512(value, digest);
            case "MD5":
                return await CryptoUtils.md5(value, digest);
            default:
                return await CryptoUtils.hashString(value, undefined, digest);
        }
    }
    ;
    /**
     * Check a value for a hash
     * @summary Check if the hash is in the valid format
     * @example
     * checkForHash("myHash");
     */
    static checkStringForHash(str, algorithm = "SHA256", digest = "hex") {
        switch (algorithm) {
            case "SHA256":
                return /^[a-f0-9]{64}$/.test(str);
            case "SHA512":
                return /^[a-f0-9]{128}$/.test(str);
            case "MD5":
                return /^[a-f0-9]{32}$/.test(str);
            default:
                return CryptoUtils.checkStringForHash(str, undefined, digest);
        }
    }
    ;
    static appendValueToString(value, str) {
        if (str.trim() !== str) {
            str = str.trim();
        }
        if (checkIsEmpty(str) === false
            && str.startsWith("-") === false) {
            str += "-";
        }
        if (typeof value === 'string') {
            str += value.trim().replace(/\s/g, '_');
        }
        else if (typeof value === 'number') {
            str += value.toString();
        }
        else if (typeof value === 'boolean') {
            str += value.toString();
        }
        else if (typeof value === 'undefined') {
            str += 'undefined';
        }
        else if (typeof value === 'bigint') {
            str += value.toString();
        }
        else if (typeof value === 'symbol') {
            str += value.toString();
        }
        else if (typeof value === 'function') {
            str += value.toString();
        }
        else if (typeof value === 'object') {
            str += JSON.stringify(value);
        }
        return str;
    }
    static prepareDataForHash(value) {
        let str = '';
        if (checkIsEmpty(value) === false
            // && typeof value === 'object'
            && Array.isArray(value) === true) {
            for (const val of value) {
                str += CryptoUtils.appendValueToString(val, str);
            }
        }
        else {
            str += CryptoUtils.appendValueToString(value, str);
        }
        return str;
    }
    static async hashData(data, algorithm = DEFUALT_ALGORITHM, digest = DEFUALT_DIGEST) {
        const str = CryptoUtils.prepareDataForHash(data);
        return await CryptoUtils.hashString(str, algorithm, digest);
    }
    static isHash(value, algorithm = DEFUALT_ALGORITHM, digest = DEFUALT_DIGEST) {
        const valueStr = CryptoUtils.prepareDataForHash(value);
        return CryptoUtils.checkStringForHash(valueStr, algorithm, digest);
    }
}
export { CryptoUtils };
//# sourceMappingURL=crypto.js.map