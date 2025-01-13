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
const checkIsEmpty = (values) => {
    if (values !== undefined &&
        values !== null) {
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
