var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
import { checkIsEmpty, checkIsString } from "../utils/checks";
import { IsNotEmpty } from "../utils/decorators";
import { CryptoUtils } from "../utils/crypto";
/**
 * Hashable Class
 * @summary Hashable class that can be extended by other classes
 */
var Hashable = /** @class */ (function () {
    /**
     * Hashable Constructor to create a new Hashable instance from a data
     * @param data
     * @summary Create a new Hashable instance
     */
    function Hashable(_a) {
        var _b = _a.hash, hash = _b === void 0 ? undefined : _b, data = _a.data;
        if (checkIsEmpty(data)) {
            throw new Error("Hashable:constructor:data cannot be empty.");
        }
        this.data = data;
        this.hash = hash;
    }
    Hashable.prototype.getData = function () {
        return this.data;
    };
    Hashable.prototype.getHash = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(checkIsEmpty(this.hash) === true)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, Hashable.hashData(this.data)];
                    case 1:
                        _a.hash = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, this.hash];
                }
            });
        });
    };
    /**
     * hashData static Method - Hash the given data using the default hashing algorithm and digest
     */
    Hashable.hashData = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, CryptoUtils.hashData(data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * initialize Method
     * @summary Initialize the hashable instance
     */
    Hashable.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.hash === undefined)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, Hashable.hashData(this.data)];
                    case 1:
                        _a.hash = _b.sent();
                        _b.label = 2;
                    case 2:
                        if (this.hasEqualHash(this.hash) === false) {
                            throw new Error("Hash mismatch");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * checkHash Method
     * @summary Check if the original hash matches the current hash
     */
    Hashable.prototype.hasEqualHash = function (hash) {
        return this.hash === hash;
    };
    /**
     * checkFromValue Method - Check if the original hash matches the current hash
     * @summary Check if the original hash matches the current hash
     */
    Hashable.prototype.hasEqualData = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.hash;
                        return [4 /*yield*/, Hashable.hashData(data)];
                    case 1: return [2 /*return*/, _a === (_b.sent())];
                }
            });
        });
    };
    /**
     * checkFromHashOrData Method - Check if the original hash matches the current hash or a given data
     */
    Hashable.prototype.checkFromHashOrData = function (hashOrData) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(checkIsString(hashOrData) === true
                            && CryptoUtils.isHash(hashOrData) === true
                            && this.hasEqualHash(hashOrData) === false)) return [3 /*break*/, 1];
                        throw new Error("Input hash does not match the current hash of the data");
                    case 1:
                        _a = CryptoUtils.isHash(hashOrData) === false;
                        if (!_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.hasEqualData(hashOrData)];
                    case 2:
                        _a = (_b.sent()) === false;
                        _b.label = 3;
                    case 3:
                        if (_a) {
                            throw new Error("When hashing the input data, the hash does not match the current hash of the data");
                        }
                        else if (CryptoUtils.isHash(hashOrData) === false
                            && CryptoUtils.isHash(hashOrData) === false) {
                            throw new Error("Input is not a hash or matcheable data");
                        }
                        _b.label = 4;
                    case 4: return [2 /*return*/, true];
                }
            });
        });
    };
    /**
     * checkHash Method - Check if the original hash matches the current hash
     * @summary Check if the original hash matches the current hash
     */
    // @IsNotEmpty
    Hashable.prototype.checkHash = function (hashOrData) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (checkIsEmpty(hashOrData) === true) {
                            throw new Error("Hash or data cannot be empty");
                        }
                        return [4 /*yield*/, this.checkFromHashOrData(hashOrData)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_1 = _a.sent();
                        throw new Error(error_1.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * hashString static Method - Hash the given string using the default hashing algorithm and digest
     */
    Hashable.hashString = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, CryptoUtils.hashData(value)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_2 = _a.sent();
                        throw new Error(error_2.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        IsNotEmpty,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], Hashable, "hashString", null);
    return Hashable;
}());
export { Hashable };
//# sourceMappingURL=hashable.js.map