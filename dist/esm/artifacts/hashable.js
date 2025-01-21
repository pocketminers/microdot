var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { checkHasEmpties, checkIsEmpty, checkIsString, createIdentifier } from "../utils";
import { IsNotEmpty } from "../utils/decorators";
import { CryptoUtils } from "../utils/crypto";
/**
 * Hashable Class
 * @summary Hashable class that can be extended by other classes
 */
class Hashable {
    id;
    data;
    hash;
    /**
     * Hashable Constructor to create a new Hashable instance from a data
     * @param data
     * @summary Create a new Hashable instance
     */
    constructor({ id = createIdentifier("UUID", { prefix: "Hashable-" }), hash = undefined, data }) {
        this.id = id;
        this.hash = hash;
        if (checkHasEmpties(data) === true) {
            throw new Error("Data cannot be empty");
        }
        this.data = data;
    }
    async initialize() {
        if (this.hash === undefined) {
            this.hash = await CryptoUtils.hashValue(this.data);
        }
        else {
            await this.checkHash(this.hash);
        }
    }
    /**
     * checkHash Method
     * @summary Check if the original hash matches the current hash
     */
    hasEqualHash(hash) {
        if (this.hash !== hash) {
            // throw new Error("Hash mismatch");
            return false;
        }
        return true;
    }
    /**
     * checkFromValue Method - Check if the original hash matches the current hash
     * @summary Check if the original hash matches the current hash
     */
    async hasEqualValue(data) {
        if (this.hash !== await CryptoUtils.hashValue(data)) {
            // throw new Error("Hash mismatch");
            return false;
        }
        return true;
    }
    /**
     * isEquivalent Method
     * @summary Check if the given values are equivalent to the current
     */
    async isEquivalent(data) {
        return this.hash === await CryptoUtils.hashValue(data);
    }
    /**
     * checkFromHashOrValue Method
     * @summary Check if the original hash matches the current hash
     */
    async checkFromHashOrValue(hashOrValues) {
        if (CryptoUtils.isValueHash(hashOrValues) === true
            && this.hasEqualHash(hashOrValues) === false) {
            throw new Error("Hash mismatch");
        }
        else if (checkIsString(hashOrValues) === true
            && CryptoUtils.isValueHash(hashOrValues) === false
            && await this.isEquivalent(hashOrValues) === false) {
            throw new Error("Hash mismatch");
        }
        else if (Array.isArray(hashOrValues)
            && hashOrValues[0].length > 0) {
            if (await this.isEquivalent(hashOrValues) === false) {
                throw new Error("Hash mismatch");
            }
        }
        return true;
    }
    /**
     * checkHash Method
     * @summary Check if the original hash matches the current hash
     */
    async checkHash(hashOrValues) {
        try {
            if (checkIsEmpty(hashOrValues) === true) {
                throw new Error("Hash or data cannot be empty");
            }
            return await this.checkFromHashOrValue(hashOrValues);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    /**
     * hashString static Method - Hash the given string using sha256
     * @summary Hash the given string using sha256
     */
    static async hashString(data) {
        try {
            return await CryptoUtils.hashValue(data);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    static async create(values) {
        const id = createIdentifier("UUID", { prefix: "Hashable-" });
        const hash = await this.hashString(JSON.stringify(values));
        return new Hashable({ id, hash, data: values });
    }
}
__decorate([
    IsNotEmpty,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Hashable.prototype, "checkHash", null);
__decorate([
    IsNotEmpty,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], Hashable, "hashString", null);
export { Hashable };
//# sourceMappingURL=hashable.js.map