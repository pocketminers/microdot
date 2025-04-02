/**
 * Check if a value is an array. Empty arrays will return false.
 */
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var checkIsArray = function (value) {
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
/**
 * Check if a value is a boolean. Empty values will return false.
 */
var checkIsBoolean = function (value) {
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
/**
 * Check if a value is a string. Empty strings will return false.
 */
var checkIsString = function (value) {
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
/**
 * Check if a value is an object. Empty objects will return false.
 */
var checkIsObject = function (value) {
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
var checkIsNumber = function (value) {
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
var checkForCircularReference = function (obj) {
    var seen = new WeakSet();
    var hasCircular = function (obj) {
        if (obj !== null && typeof obj === "object") {
            if (seen.has(obj)) {
                return true;
            }
            seen.add(obj);
            for (var key in obj) {
                if (hasCircular(obj[key])) {
                    return true;
                }
            }
        }
        return false;
    };
    return hasCircular(obj);
};
/**
 * Check if an item is empty.
 */
var checkIsEmpty = function (value) {
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
/**
 * Check if an item has empties.
 */
var checkHasEmpties = function () {
    var e_1, _a, e_2, _b;
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    var itemChecks = [];
    try {
        try {
            for (var values_1 = __values(values), values_1_1 = values_1.next(); !values_1_1.done; values_1_1 = values_1.next()) {
                var item = values_1_1.value;
                itemChecks.push(checkIsEmpty(item));
                if (checkIsArray(item) === true) {
                    try {
                        for (var item_1 = (e_2 = void 0, __values(item)), item_1_1 = item_1.next(); !item_1_1.done; item_1_1 = item_1.next()) {
                            var value = item_1_1.value;
                            itemChecks.push(checkIsEmpty(value));
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (item_1_1 && !item_1_1.done && (_b = item_1.return)) _b.call(item_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
                if (checkIsObject(item) === true) {
                    for (var key in item) {
                        itemChecks.push(checkIsEmpty(item[key]));
                    }
                }
                // else if (checkIsEmpty(item) === true) {
                //     return true;
                // }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (values_1_1 && !values_1_1.done && (_a = values_1.return)) _a.call(values_1);
            }
            finally { if (e_1) throw e_1.error; }
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
// const checkIsEmpty = (value: any): boolean => {
//     console.log('value: ', value);
//     const itemChecks: boolean[] = [];
//     if (value === null || value === undefined || value === '' || value === ' ') {
//         itemChecks.push(true);
//     }
//     else if (Array.isArray(value)) {
//         // itemChecks.push(value.every(item => checkIsEmpty(item)));
//         for (const item of value) {
//             itemChecks.push(checkIsEmpty(item));
//         }
//     }
//     else if (typeof value === 'object'){
//         // itemChecks.push(Object.keys(value).every(key => checkIsEmpty(value[key])));
//         for (const key in value) {
//             itemChecks.push(checkIsEmpty(value[key]));
//         }
//     }
//     else if (
//         (value instanceof String && value.trim() !== '')
//         || (value instanceof Number)
//         || (value instanceof Boolean)
//         || (typeof value === 'object' && value.constructor.name === 'String' && value.trim() !== '')
//         || (typeof value === 'object' && value instanceof String && value.trim() !== '')
//     ) {
//         itemChecks.push(true);
//     }
//     if (itemChecks.length > 0) {
//         console.log('itemChecks: ', itemChecks);
//         return itemChecks.includes(true);
//     }
//     return false;
// }
export { checkIsArray, checkIsBoolean, checkIsObject, checkForCircularReference, checkIsEmpty, checkHasEmpties, checkIsString, };
//# sourceMappingURL=checks.js.map