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
exports.Argument = void 0;
const checks_1 = require("../utils/checks");
const utils_1 = require("../utils");
const decorators_1 = require("../utils/decorators");
const hashable_1 = require("./hashable");
/**
 * Argument Class
 * @summary An argument specifies the value of a Parameter by name
 */
class Argument extends hashable_1.Hashable {
    // public readonly name: string;
    // public readonly value: T;
    /**
     * Argument Constructor
     * @summary Create a new Argument instance
     * @example
     * const arg = new Argument<number>({ name: "arg1", value: 123 });
     * console.log(arg);
     * `Argument {
     *      name: "arg1",
     *      value: 123
     * }`
     */
    constructor({ name, value }) {
        if ((0, checks_1.checkHasEmpties)([name, value])) {
            throw new Error("Argument:constructor:name or value cannot be empty.");
        }
        super({ data: { name, value } });
    }
    /**
     * returns the name of the argument
     * @summary Get the name of the argument
     */
    getName() {
        return this.getData().name;
    }
    /**
     * returns the value of the argument
     * @summary Get the value of the argument
     */
    getValue() {
        return this.getData().value;
    }
    async getHash() {
        return await utils_1.CryptoUtils.hashData(this.toJSON());
    }
    /**
     * Export the Argument as a JSON object
     * @summary Convert the argument to a JSON object and return it
     */
    toJSON() {
        return {
            name: this.getName(),
            value: this.getValue()
        };
    }
    /**
     * Export the Argument as a string
     * @summary Convert the argument to a pre-formatted string and return it
     */
    toString() {
        return `${this.getName()}: ${this.getValue()}`;
    }
    /**
     * Export the Argument as a Record
     * @summary Convert the argument to a record and return it
     */
    toRecord() {
        return {
            [this.getName()]: this.getValue()
        };
    }
    /**
     * Create an Argument from a Record
     * @summary Create an argument from a record object
     */
    static fromRecord(record) {
        const name = Object.keys(record)[0];
        const value = record[name];
        return new Argument({ name, value });
    }
    /**
     * Create an Argument from a string
     * @summary Create an argument from a string
     */
    static fromString(str) {
        const record = JSON.parse(str);
        return Argument.fromRecord(record);
    }
}
exports.Argument = Argument;
__decorate([
    decorators_1.IsNotEmpty,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Argument)
], Argument, "fromRecord", null);
__decorate([
    decorators_1.IsNotEmpty,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Argument)
], Argument, "fromString", null);
//# sourceMappingURL=argument.js.map