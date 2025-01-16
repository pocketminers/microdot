import { checkIsEmpty } from "@/utils";
import { Argument } from "./argument";
import { Parameter, ParameterEntry } from "./parameter";


/**
 * Property entry interface
 * An object that contains the properties of a property.
 */
interface PropertyEntry<T = any> 
    extends
        ParameterEntry<T>,
        Partial<Record<'value', T>> {}

/**
 * The Property class is a Parameter with an Argument
 */
class Property<T = any>
    extends Parameter<T>
{
    /**
     * The Argument for the Property
     */
    public argument?: Argument<T>;

    /**
     * Create a new Property instance from a PropertyEntry
     */
    public constructor({
        id = '',
        name,
        value,
        description = '',
        required = true,
        defaultValue = undefined,
        optionalValues = []
    }: PropertyEntry<T>) {
        super({ id, name, description, required, defaultValue, optionalValues });

        if (
            checkIsEmpty([value]) === false
            && value !== undefined
            && this.checkOptionalValues(value)
        ) {
            this.argument = new Argument<T>({ id, name, value });
        }
    }

    /**
     * Get the value of the Property.
     * If no value is set in attribute field, then return the default value.
     */
    public getValue(): T {
        return super.getValue(this.argument?.value);
    }

    /**
     * Set the value of the Property
     * If the value is not in the optional values, then throw an error.
     * If the value is required and is undefined, then throw an error.
     * If the value is the same as the current value, then return.
     */
    public setValue(value: T): void {
        if (!this.checkOptionalValues(value)) {
            throw new Error(`Value is not in optional values: ${this.name}`);
        }

        if (
            this.required === true
            && value === undefined

        ) {
            throw new Error(`Value is required: ${this.name}`);
        }

        if (this.argument !== undefined
            && value === this.argument.value
        ) {
            return;
        }

        this.argument = new Argument({ name: this.name, value });
    }

    /**
     * Convert the Property to a JSON object.
     * The JSON object contains the name of the property, the required flag, the description, the default value, the optional values, and the value.
     * If the value is not set, then the default value is returned as the value.
     */
    public override toJSON(): { name: string, required: boolean, description: string, defaultValue: T | undefined, optionalValues: T[] | undefined, value?: T } {
        return {
            ...super.toJSON(),
            value: this.getValue()
        };
    }

    /**
     * Convert the Property to a string.
     * The string contains the name of the property and the value of the property.
     */
    public override toString(): string {
        return `${this.name}: ${this.getValue()}`;
    }

    /**
     * Convert the Property to a Record.
     * The record exports the current state of the Property.
     * Note: The record does not contain the Argument, instead it contains the value of the Argument, if it exists.
     * The Record contains the name of the property, the required flag, the description, the default value, the optional values, and the value in the argument field.
     */
    public override toRecord(): Record<"name" | "required" | "description" | "defaultValue" | "optionalValues" | "value", any> {
        return {
            name: this.name,
            required: this.required,
            description: this.description,
            defaultValue: this.defaultValue,
            optionalValues: this.optionalValues,
            value: this.argument?.value
        };
    }

    /**
     * Convert the Property to a KeyValuePair.
     * The KeyValuePair contains the name of the property and the value of the property.
     */
    public toKeyValuePair(): Record<string, T> {
        return {
            [this.name]: this.getValue()
        };
    }
}

export {
    type PropertyEntry,
    Property
};