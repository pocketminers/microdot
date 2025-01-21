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
const hashable_1 = require("./hashable");
const decorators_1 = require("../utils/decorators");
/**
 * Argument Class
 * @summary An argument specifies the value of a Parameter by name
 */
class Argument extends hashable_1.Hashable {
    /**
     * Argument Name
     * @summary The name of the argument
     */
    name;
    /**
     * Argument Value
     * @summary The value of the argument
     * @type T
     */
    value;
    /**
     * Argument Constructor
     * @summary Create a new Argument instance
     * @example
     * const arg = new Argument<number>({ name: "arg1", value: 123 });
     * console.log(arg);
     * `Argument {
     *  hash: "391c5d93777313d8399678d8967923f46d2a8abfc12cb04205f7df723f1278fd",
     *  name: "arg1",
     *  value: 123
     * }`
     */
    constructor({ id, name, value }) {
        if ((0, checks_1.checkHasEmpties)([name, value])) {
            throw new Error("Argument:constructor:name or value cannot be empty.");
        }
        super({ id, data: { name, value } });
        this.name = name;
        this.value = value;
    }
    /**
     * Set Method **Not Implemented!**
     * @summary Method not implemented
     * @throws Error
     */
    set(value) {
        throw new Error(`Method not implemented. Unable to set value: ${value}`);
    }
    /**
     * Get Method
     * @summary Get the value of the argument
     */
    get() {
        return this.value;
    }
    /**
     * Check Hash Method
     * @summary Check if the original hash matches the current hash
     * @override Hashable.checkHash
     */
    async checkHash() {
        return await super.checkHash({ name: this.name, value: this.value });
    }
    /**
     * Export the Argument as a JSON object
     * @summary Convert the argument to a JSON object and return it
     */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            value: this.value
        };
    }
    /**
     * Export the Argument as a string
     * @summary Convert the argument to a pre-formatted string and return it
     */
    toString() {
        return `${this.name}: ${this.value}`;
    }
    /**
     * Export the Argument as a Record
     * @summary Convert the argument to a record and return it
     */
    toRecord() {
        return {
            [this.name]: this.value
        };
    }
    /**
     * Create an Argument from a Record
     * @summary Create an argument from a record object
     */
    static async fromRecord(record, id = undefined) {
        const [name, value] = Object.entries(record)[0];
        const arg = new Argument({ id, name, value });
        await arg.initialize();
        return arg;
    }
}
exports.Argument = Argument;
__decorate([
    decorators_1.IsNotEmpty,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Argument, "fromRecord", null);
//# sourceMappingURL=argument.js.map