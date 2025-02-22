import { Checks } from "@/utils";
import { ArgumentSpec, ParameterSpec, PropertiesSpec } from "@template/spec/v0/config";


/**
 * This class is used as the input for the Argument class.
 * It is a subset of the ArgumentSpec interface.
 * @summary used to create a new instance of the Argument class.
 * @see {@link ArgumentSpec}
 * @see {@link Argument}
 */
interface ArgumentEntry<T = any>
    extends 
        Pick<ArgumentSpec<T>, "name" | "value">,
        Partial<Pick<ArgumentSpec<T>, "type">> {}


/**
 * An Argument is a type checked key-value pair that is passed to a component.
 */
class Argument<T = any> {
    public readonly type: string;
    public readonly name: string;
    public readonly value: T;

    constructor({
        type = undefined,
        name,
        value
    }: ArgumentEntry<T>) {
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


/**
 * This class is used as the input for the Parameter class.
 * It is a subset of the ParameterSpec interface.
 * @summary used to create a new instance of the Parameter class.
 * @see {@link ParameterSpec}
 * @see {@link Parameter}
 */
interface ParameterEntry<T = any>
    extends
        Pick<ParameterSpec<T>, "name">,
        Partial<Pick<ParameterSpec<T>, "type" | "description" | "required" | "defaultValue" | "optionalValues">> {}

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
    }: ParameterEntry<T>) {
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
        let selectedValue = undefined;

        if (value !== undefined) {
            this.isValueInOptionalValues(value);
            selectedValue = value;
        }

        const defaultValue = this.defaultValue;
        if (defaultValue !== undefined) {
            selectedValue = defaultValue;
        }

        if (this.required && selectedValue === undefined) {
            throw new Error("Value is required: " + this.name);
        }

        return selectedValue as T;
    }
}


/**
 * This class is used as the input for the Properties class.
 * It is a subset of the Properties interface.
 * @summary used to create a new instance of the Properties class.
 * @see {@link PropertiesSpec}
 * @see {@link Properties}
 */
interface PropertiesEntry
    extends
        Partial<Record<'params', ParameterEntry[]>>,
        Partial<Record<'args', ArgumentEntry[]>> {}


/**
 * Properties are the arguments and parameters that are held by the `ConfigSpec` interface.
 * @summary Properties are the arguments and parameters that are held by the `ConfigSpec` interface.
 * @see {@link PropertiesSpec}
 * @see {@link PropertiesEntry}
 * @see {@link Properties}
 */
class Properties {
    public args: Argument<any>[] = [];
    public params: Parameter<any>[] = [];

    constructor({
        args = [],
        params = []
    }: PropertiesEntry = {}) {
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
        const names: string[] = [];
        const args = this.args;
        const params = this.params;
            
        for (const arg of args) {
            names.push(arg.name);
        }
        for (const param of params) {
            if (!names.includes(param.name)) {
                names.push(param.name);
            }
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

    public getAllValues(): Map<string, any> {
        const names = this.hasUniqueNames();

        const values = new Map<string, any>();
        for (const name of names) {
            values.set(name, this.getValue(name))
        }

        return values;
    }

    public getValue<T = any>(name: string): T {
        const value = this.getArgValue<T>(name);

        console.log("value", value);

        if (value === undefined) {
            throw new Error(`Value not found: ${name}`);
        }

        return value;
    }

    public getNames(): string[] {
        return this.hasUniqueNames();
    }

    public toKeyValue(): {
        [key: string]: any
    } {
        const names = this.getNames();

        const keyValue: { [key: string]: any } = {};
        for (const name of names) {
            const value = this.getValue(name)

            if (
                this.params.find(param => ( param.name === name && param.required === true)) !== undefined
                && value === undefined
            ) {
                throw new Error(`Value is required: ${name}`);
            }

            if (value !== undefined) {
                keyValue[name] = value;
            }

        }

        return keyValue;
    }
}

export {
    type ArgumentEntry,
    type ParameterEntry,
    type PropertiesEntry,
    Argument,
    Parameter,
    Properties
};