import { ArgumentSpec } from "./arg";
import { ParameterSpec } from "./param";


// interface ConfigEntry
//     extends
//         Partial<Record<'args', ArgumentSpec<any>[]>>,
//         Partial<Record<'params', ParameterSpec<any>[]>>{}


class PropertiesSpec {
    public args: ArgumentSpec<any>[] = [];
    public params: ParameterSpec<any>[] = [];

    constructor({
        args = [],
        params = []
    }: {
        args?: ArgumentSpec[],
        params?: ParameterSpec[]
    } = {}) {
        this.args = args;
        this.params = params;
    }

    private findArg<T = any>(name: string): ArgumentSpec<T> | undefined {
        return this.args.find(arg => arg.name === name);
    }

    private findParam<T = any>(name: string): ParameterSpec<T> | undefined {
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

    public getValue<T = any>(name: string): T | undefined {
        return this.getArgValue<T>(name);
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
   PropertiesSpec
};