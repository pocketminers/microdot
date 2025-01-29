import { checkType } from '@utils/checks';

class ArgumentSpec<T> {
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
            && checkType(value, type) === false
        ) {
            throw new TypeError(`ArgumentSpec:constructor: The value type does not match the expected type: ${type}`);
        }

        this.type = typeof value;
        this.name = name;
        this.value = value;
    }

    public static fromJSON({
        type = undefined,
        name,
        value
    }: {
        type?: string | undefined,
        name: string,
        value: any
    }): ArgumentSpec<typeof value> {
        return new ArgumentSpec<typeof value>({type, name, value});
    }

    public toJSON(): {
        type: string,
        name: string,
        value: T
    } {
        return {
            type: this.type,
            name: this.name,
            value: this.value
        };
    }
}


export {
    ArgumentSpec,
};