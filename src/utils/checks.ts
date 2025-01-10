
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

const checkIsEmpty = (values: any[]): boolean => {
    if (
        values !== undefined &&
        values !== null
    ) {
        for (let i = 0; i < values.length; i++) {
            if (
                values[i] === undefined ||
                values[i] === null ||
                values[i] === ""
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