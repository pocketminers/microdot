import { Checks } from "@/utils";
import { ArgumentSpec, ParameterSpec } from "@template/spec/v0/config";


/**
 * 
 */
class Argument<T = any> {
    type: string;
    name: string;
    value: T;

    constructor({
        type,
        name,
        value
    }: {
        type?: string,
        name: string,
        value: T
    }) {
        if (
            type !== undefined
            && Checks.hasType(value, type) === false
        ) {
            throw new TypeError(`Argument:constructor: The value type does not match the expected type: ${type}`);
        }

        this.type = typeof value;
        this.name = name;
        this.value = value;
    }

    public toKeyValue(): {
        [key: string]: T
    } {
        return {
            [this.name]: this.value
        };
    }
}

class Parameter<T = any> {
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
        type?: string,
        name: string,
        required?: boolean,
        description?: string,
        defaultValue?: T,
        optionalValues?: T[]
    }) {
        if (
            defaultValue !== undefined
            && type !== undefined
            && Checks.hasType(defaultValue, type) === false
        ) {
            throw new TypeError(`Parameter:constructor: The default value type does not match the expected type: ${type}`);
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


class Properties {
    public args: Argument<any>[] = [];
    public params: Parameter<any>[] = [];

    constructor({
        args = [],
        params = []
    }: {
        args?: { name: string, value: any, type?: string }[],
        params?: { name: string, id: string, defaultValue?: undefined, optionalValues?: undefined}[]
    } = {}) {
        this.args = args !== undefined ? args.map(arg => new Argument(arg)) : [];
        this.params = params !== undefined ? params.map(param => new Parameter(param)) : [];
    }

    private findArg<T = any>(name: string): Argument<T> | undefined {
        return this.args.find(arg => arg.name === name);
    }

    private findParam<T = any>(name: string): Parameter<T> | undefined {
        return this.params.find(param => param.name === name);
    }

    private getArgValue<T = any>(name: string): T | undefined {
        const arg = this.findArg(name);
        const param = this.findParam(name);
        if (
            arg === undefined
            && param === undefined
        ) {
            throw new Error(`Argument not found: ${name}`);
        }
        else if (
            arg !== undefined
            && param !== undefined
        ) {
            return param.getValue(arg.value);
        }
        else if (
            arg !== undefined
            && param === undefined
        ) {
            return arg.value;
        }
        else if (
            arg === undefined
            && param !== undefined
        ) {
            return param.getValue();
        }
    }

    private getAllNames(): string[] {
        const names = [];
        for (const arg of this.args) {
            names.push(arg.name);
        }
        for (const param of this.params) {
            names.push(param.name);
        }

        return names;

    }

    private hasUniqueNames(): string[] {
        const names = this.getAllNames();
        const isDuplicate = names.some((name, index) => names.indexOf(name) !== index);
        if (isDuplicate) {
            throw new Error(`Duplicate names found: ${names}`);
        }

        return names;
    }

    public getValue<T = any>(name: string): T | undefined {
        return this.getArgValue<T>(name);
    }

    public getNames(): string[] {
        return this.hasUniqueNames();
    }

    public toKeyValue(): {
        [key: string]: any
    } {
        const names = this.getNames();

        const keyValue = new Map<string, any>();
        for (const name of names) {
            keyValue.set(name, this.getValue(name))
        }

        return keyValue;
    }
}

export {
    Argument,
    Parameter,
    Properties
};