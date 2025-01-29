
/**
 * Check if a value is an array. Empty arrays will return false.
 */

const checkIsArray = (value: any): boolean => {
    try {
        if (
            value !== undefined
            && value !== null
            && Array.isArray(value)
            && value.length > 0
        ) {
            return true;
        }
    } catch (error: any) {
        console.error(error.message);
    }

    return false;
}

/**
 * Check if a value is a boolean. Empty values will return false.
 */
const checkIsBoolean = (value: any): boolean => {
    try {
        if (
            value !== undefined
            && value !== null
            && typeof value === "boolean"
        ) {
            return true;
        }
    } catch (error: any) {
        console.error(error.message);
    }

    return false;
}



/**
 * Check if a value is a string. Empty strings will return false.
 */
const checkIsString = (value: any): boolean => {
    try {
        if (
            value !== undefined
            && value !== null
            && checkIsArray(value) === false
            && (
                (typeof value === "string" && value.trim() !== "")
                || (typeof value === "object" && value.constructor.name === 'String' && value.trim() !== "")
                || (typeof value === "object" && value instanceof String && value.trim() !== "")
            )
        ) {
            return true;
        }
    } catch (error: any) {
        console.error(error.message);
    }

    return false
};

/**
 * Check if a value is an object. Empty objects will return false.
 */
const checkIsObject = (value: any): boolean => {
    try {
        if (
            value !== undefined
            && value !== null
            && checkIsArray(value) === false
            && typeof value === "object"
            && Object.keys(value).length > 0
        ) {
            return true;
        }
    } catch (error: any) {
        console.error(error.message);
    }

    return false;
}

const checkIsNumber = (value: any): boolean => {
    try {
        if (
            value !== undefined
            && value !== null
            && typeof value === "number"
        ) {
            return true;
        }
    } catch (error: any) {
        console.error(error.message);
    }

    return false;
}


/**
 * Check if an object has a circular reference.
 */
const checkForCircularReference = (obj: any): boolean => {
    const seen = new WeakSet();
    const hasCircular = (obj: any): boolean => {
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

/**
 * Check if an item is empty.
 */
const checkIsEmpty = (value: any): boolean => {
    try {
        if (
            value === undefined || value === null
            || ( checkIsString(value) === false && checkIsArray(value) === false && checkIsObject(value) === false && checkIsBoolean(value) === false && checkIsNumber(value) === false)
         ) {
            return true;
        }
    } catch (error: any) {
        console.error(error.message);
    }

    return false;
}

/**
 * Check if an item has empties.
 */
const checkHasEmpties = (...values: any[]): boolean => {
    const itemChecks: boolean[] = [];

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
    } catch (error: any) {
        console.error(error.message);
    }

    if (itemChecks.length > 0) {
        // console.log('itemChecks: ', itemChecks);
        return itemChecks.includes(true);
    }
    
    return true
}

const checkType = (value?: any, type?: string): boolean => {
    if (
        ( type === undefined || type === null )
        && ( value === undefined || value === null )
    ) {
        return true;
    }

    return typeof value === type;
}


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

export {
    checkIsArray,
    checkIsBoolean,
    checkIsObject,
    checkForCircularReference,
    checkIsEmpty,
    checkHasEmpties,
    checkIsString,
    checkIsNumber,
    checkType
};