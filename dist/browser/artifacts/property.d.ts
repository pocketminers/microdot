import { Argument } from "./argument";
import { Parameter } from "./parameter";
interface PropertyEntry<T = any> {
    name: string;
    value?: T;
    description?: string;
    required?: boolean;
    defaultValue?: T;
    optionalValues?: T[];
}
/**
 * The Property class is a Parameter with an Argument
 */
declare class Property<T = any> extends Parameter<T> {
    argument?: Argument<T>;
    constructor({ name, value, description, required, defaultValue, optionalValues }: PropertyEntry<T>);
    getValue(): T;
    setValue(value: T): void;
    toJSON(): {
        name: string;
        required: boolean;
        description: string;
        defaultValue: T | undefined;
        optionalValues: T[] | undefined;
        value?: T;
    };
    toString(): string;
    toRecord(): Record<"name" | "required" | "description" | "defaultValue" | "optionalValues" | "value", any>;
}
export { type PropertyEntry, Property };
//# sourceMappingURL=property.d.ts.map