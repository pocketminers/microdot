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
import { checkHasEmpties } from "./checks";
/**
 * Decorator to check if the input is not empty
 */
function IsNotEmpty(target, propertyKey, descriptor) {
    if (descriptor === void 0) { descriptor = {}; }
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log("".concat(target.name, ":").concat(propertyKey, ":input is: ").concat(args));
        // if (args === undefined || args === null || args.length === 0 || checkIsEmpty(args) === true) {
        //     // console.log(`${target.name}:${propertyKey}:input cannot be empty.`);
        //     throw new Error(`${target.name}:${propertyKey}:input cannot be empty.`);
        // }
        if (checkHasEmpties.apply(void 0, __spreadArray([], __read(args), false)) === true) {
            // console.log(`${target.name}:${propertyKey}:input ${args.toString()} cannot be empty.`);
            throw new Error("".concat(target.name, ":").concat(propertyKey, ":input cannot be empty."));
        }
        return originalMethod.apply(this, args || []);
    };
    return descriptor;
}
export { IsNotEmpty };
//# sourceMappingURL=decorators.js.map