
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
 * 
 */
const checkIsEmpty = (values: any[]): boolean => {
    if (
        values !== undefined
        && values !== null
        && values.length > 0
    ) {
        for (const value of values) {
            if (
                value === undefined ||
                value === null ||
                value === ""
            ) {
                return true;
            }
        }
    }
    else {
        return true;
    }

    return false;
};

export {
    checkForCircularReference,
    checkIsEmpty
};