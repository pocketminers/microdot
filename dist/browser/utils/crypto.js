// import { createHash } from "crypto";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { checkIsEmpty } from "./checks";
var DEFUALT_ALGORITHM = "SHA256";
var DEFUALT_DIGEST = "hex";
var CryptoUtils = /** @class */ (function () {
    function CryptoUtils() {
    }
    /**
     * Convert an ArrayBuffer to a hex string
     */
    CryptoUtils.arrayBufferToHex = function (buffer) {
        return Array.prototype.map.call(new Uint8Array(buffer), function (x) { return ('00' + x.toString(16)).slice(-2); }).join('');
    };
    /**
     * Format a digest into the desired format (hex or base64)
     */
    CryptoUtils.formatDigest = function (digest, format) {
        if (format === void 0) { format = 'hex'; }
        switch (format) {
            case 'hex':
                return CryptoUtils.arrayBufferToHex(digest);
            case 'base64':
                return btoa(String.fromCharCode.apply(String, __spreadArray([], __read(new Uint8Array(digest)), false)));
            default:
                throw new Error("Unsupported digest format: ".concat(format));
        }
    };
    /**
     * Create a SHA-256 hash of the input string wiuth the given digest format
     */
    CryptoUtils.sha256 = function (input_1) {
        return __awaiter(this, arguments, void 0, function (input, digest) {
            var encoder, data, hashBuffer, hashArray;
            if (digest === void 0) { digest = 'hex'; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        encoder = new TextEncoder();
                        data = encoder.encode(input);
                        return [4 /*yield*/, crypto.subtle.digest("SHA-256", data)];
                    case 1:
                        hashBuffer = _a.sent();
                        hashArray = new Uint8Array(hashBuffer);
                        return [2 /*return*/, CryptoUtils.formatDigest(hashArray, digest)];
                }
            });
        });
    };
    /**
     * Create a SHA-512 hash of the input string with the given digest format
     */
    CryptoUtils.sha512 = function (input_1) {
        return __awaiter(this, arguments, void 0, function (input, digest) {
            var encoder, data, hashBuffer, hashArray;
            if (digest === void 0) { digest = "hex"; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        encoder = new TextEncoder();
                        data = encoder.encode(input);
                        return [4 /*yield*/, crypto.subtle.digest("SHA-512", data)];
                    case 1:
                        hashBuffer = _a.sent();
                        hashArray = new Uint8Array(hashBuffer);
                        return [2 /*return*/, CryptoUtils.formatDigest(hashArray, digest)];
                }
            });
        });
    };
    /**
     * MD5
     * @summary MD5 hashing algorithm
     */
    CryptoUtils.md5 = function (input_1) {
        return __awaiter(this, arguments, void 0, function (input, digest) {
            if (digest === void 0) { digest = "hex"; }
            return __generator(this, function (_a) {
                throw new Error("MD5 is not recommended for use in security-critical applications");
            });
        });
    };
    /**
     * Hash a value
     * @summary Hash the given value using the hashing algorithm
     * @example
     * hashValue("myValue");
     */
    CryptoUtils.hashString = function (value_1) {
        return __awaiter(this, arguments, void 0, function (value, algorithm, digest) {
            var _a;
            if (algorithm === void 0) { algorithm = DEFUALT_ALGORITHM; }
            if (digest === void 0) { digest = DEFUALT_DIGEST; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = algorithm;
                        switch (_a) {
                            case "SHA256": return [3 /*break*/, 1];
                            case "SHA512": return [3 /*break*/, 3];
                            case "MD5": return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 1: return [4 /*yield*/, CryptoUtils.sha256(value, digest)];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3: return [4 /*yield*/, CryptoUtils.sha512(value, digest)];
                    case 4: return [2 /*return*/, _b.sent()];
                    case 5: return [4 /*yield*/, CryptoUtils.md5(value, digest)];
                    case 6: return [2 /*return*/, _b.sent()];
                    case 7: return [4 /*yield*/, CryptoUtils.hashValue(value, undefined, digest)];
                    case 8: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    ;
    /**
     * Check a value for a hash
     * @summary Check if the hash is in the valid format
     * @example
     * checkForHash("myHash");
     */
    CryptoUtils.checkStringForHash = function (str, algorithm, digest) {
        if (algorithm === void 0) { algorithm = "SHA256"; }
        if (digest === void 0) { digest = "hex"; }
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
    };
    ;
    CryptoUtils.appendValueToString = function (value, str) {
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
    };
    CryptoUtils.prepareValueForHash = function (value) {
        var e_1, _a;
        var str = '';
        if (checkIsEmpty(value) === false
            // && typeof value === 'object'
            && Array.isArray(value) === true) {
            try {
                for (var _b = __values(value), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var val = _c.value;
                    str += this.appendValueToString(val, str);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else {
            str += this.appendValueToString(value, str);
        }
        return str;
    };
    CryptoUtils.hashValue = function (value_1) {
        return __awaiter(this, arguments, void 0, function (value, algorithm, digest) {
            var str;
            if (algorithm === void 0) { algorithm = DEFUALT_ALGORITHM; }
            if (digest === void 0) { digest = DEFUALT_DIGEST; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        str = CryptoUtils.prepareValueForHash(value);
                        return [4 /*yield*/, CryptoUtils.hashString(str, algorithm, digest)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CryptoUtils.isValueHash = function (value, algorithm, digest) {
        if (algorithm === void 0) { algorithm = DEFUALT_ALGORITHM; }
        if (digest === void 0) { digest = DEFUALT_DIGEST; }
        var valueStr = CryptoUtils.prepareValueForHash(value);
        return CryptoUtils.checkStringForHash(valueStr, algorithm, digest);
    };
    return CryptoUtils;
}());
export { CryptoUtils };
//# sourceMappingURL=crypto.js.map