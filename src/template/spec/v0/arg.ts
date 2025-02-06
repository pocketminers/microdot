import { Checks } from '@utils/checks';

// TODO: Add a type parameter to the ArgumentSpec class

class ArgumentSpec<T = any> {
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
            throw new TypeError(`ArgumentSpec:constructor: The value type does not match the expected type: ${type}`);
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


export {
    ArgumentSpec,
};