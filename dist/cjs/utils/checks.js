"use strict";
/**
 * Check if a value is an array. Empty arrays will return false.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIsString = exports.checkHasEmpties = exports.checkIsEmpty = exports.checkForCircularReference = exports.checkIsObject = exports.checkIsBoolean = exports.checkIsArray = void 0;
const checkIsArray = (value) => {
    try {
        if (value !== undefined
            && value !== null
            && Array.isArray(value)
            && value.length > 0) {
            return true;
        }
    }
    catch (error) {
        console.error(error.message);
    }
    return false;
};
exports.checkIsArray = checkIsArray;
/**
 * Check if a value is a boolean. Empty values will return false.
 */
const checkIsBoolean = (value) => {
    try {
        if (value !== undefined
            && value !== null
            && typeof value === "boolean") {
            return true;
        }
    }
    catch (error) {
        console.error(error.message);
    }
    return false;
};
exports.checkIsBoolean = checkIsBoolean;
/**
 * Check if a value is a string. Empty strings will return false.
 */
const checkIsString = (value) => {
    try {
        if (value !== undefined
            && value !== null
            && checkIsArray(value) === false
            && ((typeof value === "string" && value.trim() !== "")
                || (typeof value === "object" && value.constructor.name === 'String' && value.trim() !== "")
                || (typeof value === "object" && value instanceof String && value.trim() !== ""))) {
            return true;
        }
    }
    catch (error) {
        console.error(error.message);
    }
    return false;
};
exports.checkIsString = checkIsString;
/**
 * Check if a value is an object. Empty objects will return false.
 */
const checkIsObject = (value) => {
    try {
        if (value !== undefined
            && value !== null
            && checkIsArray(value) === false
            && typeof value === "object"
            && Object.keys(value).length > 0) {
            return true;
        }
    }
    catch (error) {
        console.error(error.message);
    }
    return false;
};
exports.checkIsObject = checkIsObject;
const checkIsNumber = (value) => {
    try {
        if (value !== undefined
            && value !== null
            && typeof value === "number") {
            return true;
        }
    }
    catch (error) {
        console.error(error.message);
    }
    return false;
};
/**
 * Check if an object has a circular reference.
 */
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
 * Check if an item is empty.
 */
const checkIsEmpty = (value) => {
    try {
        if (value === undefined || value === null
            || (checkIsString(value) === false && checkIsArray(value) === false && checkIsObject(value) === false && checkIsBoolean(value) === false && checkIsNumber(value) === false)) {
            return true;
        }
    }
    catch (error) {
        console.error(error.message);
    }
    return false;
};
exports.checkIsEmpty = checkIsEmpty;
/**
 * Check if an item has empties.
 */
const checkHasEmpties = (...values) => {
    const itemChecks = [];
    try {
        for (const item of values) {
            itemChecks.push(checkIsEmpty(item));
            if (checkIsArray(item) === true) {
                for (const value of item) {
                    itemChecks.push(checkIsEmpty(value));
                }
            }
            if (checkIsObject(item) === true) {
                for (const key in item) {
                    itemChecks.push(checkIsEmpty(item[key]));
                }
            }
            // else if (checkIsEmpty(item) === true) {
            //     return true;
            // }
        }
    }
    catch (error) {
        console.error(error.message);
    }
    if (itemChecks.length > 0) {
        // console.log('itemChecks: ', itemChecks);
        return itemChecks.includes(true);
    }
    return true;
};
exports.checkHasEmpties = checkHasEmpties;
//# sourceMappingURL=checks.js.map