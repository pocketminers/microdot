"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsNotEmpty = IsNotEmpty;
const checks_1 = require("./checks");
/**
 * Decorator to check if the input is not empty
 */
function IsNotEmpty(target, propertyKey, descriptor = {}) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        // console.log(`${target.name}:${propertyKey}:input is: ${args}`);
        // if (args === undefined || args === null || args.length === 0 || checkIsEmpty(args) === true) {
        //     // console.log(`${target.name}:${propertyKey}:input cannot be empty.`);
        //     throw new Error(`${target.name}:${propertyKey}:input cannot be empty.`);
        // }
        if ((0, checks_1.checkHasEmpties)(...args) === true) {
            // console.log(`${target.name}:${propertyKey}:input ${args.toString()} cannot be empty.`);
            throw new Error(`${target.name}:${propertyKey}:input cannot be empty.`);
        }
        return originalMethod.apply(this, args || []);
    };
    return descriptor;
}
//# sourceMappingURL=decorators.js.map