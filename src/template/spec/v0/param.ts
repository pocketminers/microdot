import { Checks } from "@utils/checks";

class ParameterSpec<T = any> {
    name: string;
    required: boolean;
    description: string;
    defaultValue: T | undefined;
    optionalValues: T[];
    type: string;

    constructor({
        type,
        name,
        required = true,
        description = "",
        defaultValue,
        optionalValues = []
    }: {
        type?: string;
        name: string;
        required?: boolean;
        description?: string;
        defaultValue?: T | undefined;
        optionalValues?: T[] | undefined;
    }) {
        if (
            defaultValue !== undefined
            && type !== undefined
            && Checks.hasType(defaultValue, type) === false
        ) {
            throw new TypeError(`ParameterSpec:constructor: The default value type does not match the expected type: ${type}`);
        }

        this.name = name;
        this.required = required;
        this.description = description;
        this.defaultValue = defaultValue;
        this.optionalValues = optionalValues
        this.type = type || typeof defaultValue !== "undefined" ? typeof defaultValue : typeof optionalValues[0] ! == "undefined" ? typeof optionalValues[0] : "any";
    };

    public isValueInOptionalValues(value: T): boolean {
        const optionalValues = this.optionalValues;

        if (
            optionalValues !== undefined
            && optionalValues.length > 0
            && optionalValues.includes(value) === false
        ) {
            throw new Error(`Value is not in optional values: ${this.name}`);
        }

        return true;
    }

    public getValue(value?: T): T {
        if (value !== undefined) {
            this.isValueInOptionalValues(value);
            return value;
        }

        const defaultValue = this.defaultValue;
        if (defaultValue !== undefined) {
            return defaultValue;
        }

        throw new Error("Value is required: " + this.name);
    }
}


export {
    ParameterSpec
};