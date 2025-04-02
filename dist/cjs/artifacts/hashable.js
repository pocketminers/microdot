"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hashable = void 0;
const checks_1 = require("../utils/checks");
const decorators_1 = require("../utils/decorators");
const crypto_1 = require("../utils/crypto");
/**
 * Hashable Class
 * @summary Hashable class that can be extended by other classes
 */
class Hashable {
    data;
    hash;
    /**
     * Hashable Constructor to create a new Hashable instance from a data
     * @param data
     * @summary Create a new Hashable instance
     */
    constructor({ hash = undefined, data }) {
        if ((0, checks_1.checkIsEmpty)(data)) {
            throw new Error("Hashable:constructor:data cannot be empty.");
        }
        this.data = data;
        this.hash = hash;
    }
    getData() {
        return this.data;
    }
    async getHash() {
        if ((0, checks_1.checkIsEmpty)(this.hash) === true) {
            this.hash = await Hashable.hashData(this.data);
        }
        return this.hash;
    }
    /**
     * hashData static Method - Hash the given data using the default hashing algorithm and digest
     */
    static async hashData(data) {
        return await crypto_1.CryptoUtils.hashData(data);
    }
    /**
     * initialize Method
     * @summary Initialize the hashable instance
     */
    async initialize() {
        if (this.hash === undefined) {
            this.hash = await Hashable.hashData(this.data);
        }
        if (this.hasEqualHash(this.hash) === false) {
            throw new Error("Hash mismatch");
        }
    }
    /**
     * checkHash Method
     * @summary Check if the original hash matches the current hash
     */
    hasEqualHash(hash) {
        return this.hash === hash;
    }
    /**
     * checkFromValue Method - Check if the original hash matches the current hash
     * @summary Check if the original hash matches the current hash
     */
    async hasEqualData(data) {
        return this.hash === await Hashable.hashData(data);
    }
    /**
     * checkFromHashOrData Method - Check if the original hash matches the current hash or a given data
     */
    async checkFromHashOrData(hashOrData) {
        if ((0, checks_1.checkIsString)(hashOrData) === true
            && crypto_1.CryptoUtils.isHash(hashOrData) === true
            && this.hasEqualHash(hashOrData) === false) {
            throw new Error("Input hash does not match the current hash of the data");
        }
        else if (crypto_1.CryptoUtils.isHash(hashOrData) === false
            && await this.hasEqualData(hashOrData) === false) {
            throw new Error("When hashing the input data, the hash does not match the current hash of the data");
        }
        else if (crypto_1.CryptoUtils.isHash(hashOrData) === false
            && crypto_1.CryptoUtils.isHash(hashOrData) === false) {
            throw new Error("Input is not a hash or matcheable data");
        }
        return true;
    }
    /**
     * checkHash Method - Check if the original hash matches the current hash
     * @summary Check if the original hash matches the current hash
     */
    // @IsNotEmpty
    async checkHash(hashOrData) {
        try {
            if ((0, checks_1.checkIsEmpty)(hashOrData) === true) {
                throw new Error("Hash or data cannot be empty");
            }
            return await this.checkFromHashOrData(hashOrData);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    /**
     * hashString static Method - Hash the given string using the default hashing algorithm and digest
     */
    static async hashString(value) {
        try {
            return await crypto_1.CryptoUtils.hashData(value);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.Hashable = Hashable;
__decorate([
    decorators_1.IsNotEmpty,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], Hashable, "hashString", null);
//# sourceMappingURL=hashable.js.map