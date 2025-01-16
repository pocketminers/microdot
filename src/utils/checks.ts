const checkIsArray = (value: any): boolean => {
    try {
        if (
            value !== undefined
            && value !== null
            && Array.isArray(value)
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
            // || (value !instanceof Number && value !instanceof Boolean && value !instanceof Array && value !instanceof Object)
            && (
                (typeof value === "string" && value.trim() !== "")
                || typeof value === "object" && value.constructor.name === 'String' && value.trim() !== ""
                || typeof value === "object" && value instanceof String && value.trim() !== ""
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
 * Check if an array is empty or contains empty values.
 */
function checkIsEmpty(value: any): boolean {
    const itemChecks: boolean[] = [];

    if (value === null || value === undefined || value === '') {
        return true;
    }

    if (Array.isArray(value)) {
        itemChecks.push(value.every(item => checkIsEmpty(item)));
    }

    if (typeof value === 'object'){
        itemChecks.push(Object.keys(value).every(key => checkIsEmpty(value[key])));
    }

    if (typeof value === 'string') {
        itemChecks.push(value.trim() === '');
    }

    if (itemChecks.length > 0) {
        return itemChecks.includes(true);
    }

    return false;
}

export {
    checkIsArray,
    checkForCircularReference,
    checkIsEmpty,
    checkIsString,
};