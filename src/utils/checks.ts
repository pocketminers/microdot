class Checks {
    static isArray(value: any): boolean {
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

    static isBoolean(value: any): boolean {
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

    static isString(value: any): boolean {
        try {
            if (
                value !== undefined
                && value !== null
                && Checks.isArray(value) === false
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

        return false;
    }

    static isObject(value: any): boolean {
        try {
            if (
                value !== undefined
                && value !== null
                && Checks.isArray(value) === false
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

    static isNumber(value: any): boolean {
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

    static forCircularReference(obj: any): boolean {
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
    }

    static isEmpty(value: any): boolean {
        try {
            if (
                value === undefined || value === null
                || ( Checks.isString(value) === false && Checks.isArray(value) === false && Checks.isObject(value) === false && Checks.isBoolean(value) === false && Checks.isNumber(value) === false)
            ) {
                return true;
            }
        } catch (error: any) {
            console.error(error.message);
        }

        return false;
    }

    static hasEmpties(...values: any[]): boolean {
        const itemChecks: boolean[] = [];

        try {
            for (const item of values) {
                itemChecks.push(Checks.isEmpty(item));

                if (Checks.isArray(item) === true) {
                    for (const value of item) {
                        itemChecks.push(Checks.isEmpty(value));
                    }
                }

                if (Checks.isObject(item) === true) {
                    for (const key in item) {
                        itemChecks.push(Checks.isEmpty(item[key]));
                    }
                }
            }
        } catch (error: any) {
            console.error(error.message);
        }

        if (itemChecks.length > 0) {
            return itemChecks.includes(true);
        }

        return true;
    }

    static hasType(value?: any, type?: string): boolean {
        if (
            ( type === undefined || type === null )
            && ( value === undefined || value === null )
        ) {
            return true;
        }

        return typeof value === type;
    }
}

export {
    Checks
}
