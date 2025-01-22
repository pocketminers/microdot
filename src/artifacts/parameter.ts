import { Hashable } from "@artifacts/hashable";
import { ArgumentEntry } from "@artifacts/argument";


/**
 * An entry interface for a parameter
 * @summary Parameter entry interface that is used to create a parameter
 */
interface ParameterEntry<T>
    extends
        Pick<ArgumentEntry<T>, "name">,
        Partial<Record<"required", boolean>>,
        Partial<Record<"description", string>>,
        Partial<Record<"defaultValue", T>>,
        Partial<Record<"optionalValues", T[]>> {}


/**
 * A paramter class holds the name, required flag, description, default value, and optional values
 * @summary A parameter specifies a value that can be passed to a service"s method
 */
class Parameter<T>
    extends
        Hashable<{
            name: string,
            required: boolean,
            description: string,
            optionalValues: T[],
            defaultValue: T | undefined,
        }>
{
    /**
     * Parameter Constructor that creates a new instance of a parameter from the given parameter entry
     * @summary Create a new Parameter instance
     * @example
     * const param = new Parameter<number>({ name: "param1", required: true, description: "A parameter", defaultValue: 123, optionalValues: [123, 456] }, true);
     * console.log(param);
     * `Parameter {
     *    hash: "<insert sha256 hash here>",
     *    name: "param1",
     *    required: true,
     *    description: "A parameter",
     *    defaultValue: 123,
     *    optionalValues: [123, 456]
     * }`
     */
    constructor(
        {
            // id = createIdentifier("Name", { prefix: "Parameter-" }),
            name,
            required = false,
            description = "",
            defaultValue = undefined,
            optionalValues = []
        }: ParameterEntry<T>,
    ) {
        super({data: {name, required, description, defaultValue, optionalValues}});

        this.isDefaultValueInOptionalValues();
    }

    /**
     * Check if the Default Value or a Given Value is in the Optional Values
     * @summary Check if the value is in the optional values
     */
    public isDefaultValueInOptionalValues(): boolean {
        const defaultValue = this.getDefaultValue();

        if ( defaultValue !== undefined ) {
            return this.isValueInOptionalValues(defaultValue);
        }

        return true;
    }

    public isValueInOptionalValues(value: T): boolean {
        const optionalValues = this.getOptionalValues();

        if (
            optionalValues !== undefined
            && optionalValues.length > 0
            && optionalValues.includes(value) === false
        ) {
            throw new Error(`Value is not in optional values: ${this.getName()}`);
        }

        return true;
    }

    public getName(): string {
        return this.getData().name;
    }

    public getRequired(): boolean {
        return this.getData().required;
    }

    public getDescription(): string {
        return this.getData().description;
    }

    public getDefaultValue(): T | undefined {
        return this.getData().defaultValue;
    }

    public getOptionalValues(): T[] {
        return this.getData().optionalValues;
    }

    public getValue(value?: T): T {
        if (value !== undefined) {
            this.isValueInOptionalValues(value);
            return value;
        }

        const defaultValue = this.getDefaultValue();
        if (defaultValue !== undefined) {
            return defaultValue;
        }

        throw new Error("Value is required: " + this.getName());
    }

    /**
     * Convert the Parameter to a JSON object
     * @summary Convert the parameter to a JSON object
     */
    public toJSON(): { name: string, required: boolean, description: string, defaultValue: T | undefined, optionalValues: T[] | undefined } {
        const { name, required, description, defaultValue, optionalValues } = this.getData();
        
        return {
            name,
            required,
            description,
            defaultValue,
            optionalValues
        };
    }

    /**
     * Convert the Parameter to a string
     * @summary Convert the parameter to a string
     * @example
     * const param = new Parameter<number>({ name: "param1", required: true, description: "A parameter", defaultValue: 123, optionalValues: [123, 456] }, true);
     * console.log(param.toString());
     * `name: param1
     *  description: A parameter
     *  required: true
     *  default: 123
     *  options: 123, 456
     */
    public toString(): string {
        const { name, required, description, defaultValue, optionalValues } = this.getData();

        return `name: ${name}\ndescription: ${description}\nrequired: ${required} ${defaultValue ? `\ndefault: ${defaultValue}` : ""} ${optionalValues !== undefined && optionalValues.length > 0 ? `\noptions: ${optionalValues.join(", ")}` : ""}`;
    }

    /**
     * Export the Parameter as a Record
     * @summary Convert the parameter to a record and return it
     */
    public toRecord():
        | Record<"name", string>
        | Record<"required", boolean>
        | Record<"description", string>
        | Record<"defaultValue", T | undefined>
        | Record<"optionalValues", T[] | undefined>
     {
        const { name, required, description, defaultValue, optionalValues } = this.getData();

        return {
            name,
            required,
            description,
            defaultValue,
            optionalValues
        };
    }
}

export {
    type ParameterEntry,
    Parameter
};
