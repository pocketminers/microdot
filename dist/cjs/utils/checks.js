"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIsEmpty = exports.checkForCircularReference = void 0;
const checkForCircularReference = (obj) => {
    const seen = new WeakSet();
    const hasCircular = (obj) => {
        if (obj !== null && typeof obj === "object") {
            if (seen.has(obj)) {
                return true;
            }
            seen.add(obj);
            for (const key in obj) {
                if (hasCircular(obj[key])) {
                    return true;
                }
            }
        }
        return false;
    };
    return hasCircular(obj);
};
exports.checkForCircularReference = checkForCircularReference;
/**
 * Check if an array is empty or contains empty values.
 *
 */
const checkIsEmpty = (values) => {
    if (values !== undefined
        && values !== null
        && values.length > 0) {
        for (const value of values) {
            if (value === undefined ||
                value === null ||
                value === "") {
                return true;
            }
        }
    }
    else {
        return true;
    }
    return false;
};
exports.checkIsEmpty = checkIsEmpty;
//# sourceMappingURL=checks.js.map