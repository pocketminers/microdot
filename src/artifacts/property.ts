import { Argument } from "./argument";
import { Parameter } from "./parameter";


/**
 * The Property class is a Parameter with an Argument
 */
class Property<T = any> extends Parameter<T> {
    public argument: Argument<T>;

    public constructor({
        name,
        value,
        description,
        required,
        defaultValue,
        optionalValues
    }: { name: string, value: T, description: string, required: boolean, defaultValue?: T, optionalValues?: T[] }) {
        super({ name, description, required, defaultValue, optionalValues });
        this.argument = new Argument({ name, value });
    }

    public getValue(): T {
        return super.getValue(this.argument.value);
    }

    public setValue(value: T): void {
        if (!this.checkOptionalValues(value)) {
            throw new Error(`Value is not in optional values: ${this.name}`);
        }

        if (this.required && value === undefined) {
            throw new Error(`Value is required: ${this.name}`);
        }

        if (value === this.argument.value) {
            return;
        }

        this.argument = new Argument({ name: this.name, value });
    }

    public override toJSON(): { name: string, required: boolean, description: string, defaultValue: T | undefined, optionalValues: T[] | undefined, value: T } {
        return {
            ...super.toJSON(),
            value: this.argument.value
        };
    }

    public override toString(): string {
        return `${this.name}: ${this.getValue()}`;
    }

    public override toRecord(): Record<"name" | "required" | "description" | "defaultValue" | "optionalValues" | "value", any> {
        return {
            name: this.name,
            required: this.required,
            description: this.description,
            defaultValue: this.defaultValue,
            optionalValues: this.optionalValues,
            value: this.argument.value
        };
    }
}

export {
    Property
};