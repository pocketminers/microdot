import { checkType } from "@/utils";

class ParameterSpec<T> {
    name: string;
    required: boolean;
    description: string;
    defaultValue: T | undefined;
    optionalValues: T[];
    type: string;

    constructor({ type, name, required, description, defaultValue, optionalValues }: {
        type?: string;
        name: string;
        required: boolean;
        description: string;
        defaultValue?: T | undefined;
        optionalValues?: T[] | undefined;
    }) {
        if (
            defaultValue !== undefined
            && type !== undefined
            && checkType(defaultValue, type) === false
        ) {
            throw new TypeError(`ParameterSpec:constructor: The default value type does not match the expected type: ${type}`);
        }

        this.name = name;
        this.required = required;
        this.description = description;
        this.defaultValue = defaultValue;
        this.optionalValues = optionalValues || [];
        this.type = type || typeof defaultValue;
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

    public toJSON(): {
        name: string;
        required: boolean;
        description: string;
        defaultValue: T | undefined;
        optionalValues: T[];
        type: string;
    } {
        return {
            name: this.name,
            required: this.required,
            description: this.description,
            defaultValue: this.defaultValue,
            optionalValues: this.optionalValues,
            type: this.type
        };
    }

    public static fromJSON({
        type,
        name,
        required,
        description,
        defaultValue,
        optionalValues
    }: {
        type?: string;
        name: string;
        required: boolean;
        description: string;
        defaultValue?: any;
        optionalValues?: any[];
    }): ParameterSpec<any> {
        return new ParameterSpec<any>({type, name, required, description, defaultValue, optionalValues});
    }
}


export {
    ParameterSpec
};