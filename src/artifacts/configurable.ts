
import { Argument, ArgumentEntry } from "@artifacts/argument";
import { PropertyStore } from "@artifacts/store";
import { Parameter, ParameterEntry } from "@artifacts/parameter";
import { Identifiable, IdentifiableEntry } from "@artifacts/identifiable";
import { checkIsEmpty } from "@/utils";


/**
 * Configuration entry interface that is used to create a configurable instance
 * @summary Configuration entry interface that is used to create a configurable instance
 */
interface ConfigurableEntry
    extends
        Pick<IdentifiableEntry<any>, 'id' | 'name'>,
        Partial<Pick<IdentifiableEntry<any>, 'description'>>,
        Partial<Record<'parameters', (ParameterEntry<any> | Parameter<any>)[]>>,
        Partial<Record<'args', (ArgumentEntry<any> | Argument<any>)[]>> {}


/**
 * Configurable Class that extends Identifiable and adds parameters and arguments as data
 * @summary Configurable class that extends Identifiable
 */
class Configurable
    extends
        Identifiable<{ args: PropertyStore<Argument<any>>, parameters: PropertyStore<Parameter<any>> }>
{
    constructor(
        {
            id,
            name = 'Configurable',
            description = 'A configurable object that can be set by arguments',
            args = [],
            parameters = []
        }: ConfigurableEntry
    ) {
        const argumentStore = new PropertyStore<Argument<any>>();
        argumentStore.add(args);

        const paramStore = new PropertyStore<Parameter<any>>();
        paramStore.add(parameters);

        super({id, name, description, data: { args: argumentStore, parameters: paramStore }});
    }

    public get arguments(): PropertyStore<Argument<any>> {
        return this.data.args;
    }

    public get parameters(): PropertyStore<Parameter<any>> {
        return this.data.parameters;
    }

    public isValidArgumentName(arg: Argument<any>): boolean {
        const paramNames = this.parameters.getNames();
        return paramNames.includes(arg.name);
    }

    public isValidArgumentValue(arg: Argument<any>): boolean {
        const param = this.parameters.getEntry(arg.name);

        if (!param) {
            return false;
        }

        return param.isValueInOptionalValues(arg.value);
    }

    public setArgument<T>(arg: Argument<T>): void {
        if (!this.isValidArgumentName(arg)) {
            throw new Error(`Invalid argument name: ${arg.name}`);
        }

        if (!this.isValidArgumentValue(arg)) {
            throw new Error(`Invalid argument value: ${arg.value}`);
        }

        if (this.arguments.getEntry(arg.name)) {
            this.arguments.updateEntry(arg);
        }
        else {
            this.arguments.addArtifact(arg);
        }
    }

    public setArgumentFromEntry(entry: ArgumentEntry<any>): void {
        this.setArgument(new Argument(entry));
    }

    public setArguments(args: (ArgumentEntry<any> | Argument<any>)[]): void {
        for (const arg of args) {
            if (arg instanceof Argument) {
                this.setArgument(arg);
            }
            else {
                this.setArgumentFromEntry(arg);
            }
        }
    }

    public getValue<T = any>(name: string): T {
        const param = this.parameters.getEntry(name);

        if (
            param === undefined
            || checkIsEmpty(param) === true
        ) {
            throw new Error(`Parameter ${name} not found in ${this.name}(${this.id})`);
        }

        const arg = this.arguments.getEntry(name);

        return param.getValue(arg?.value);
    }

    public getRequiredValueRecords(): Record<string, any> {
        const records: Record<string, any> = {};

        for (const param of this.parameters.getEntries()) {
            if (param.required === true) {
                records[param.name] = this.getValue(param.name);
            }
        }

        return records;
    }

    public getAllValueRecords(): Record<string, any> {
        const records: Record<string, any> = {};

        for (const param of this.parameters.getEntries()) {
            records[param.name] = this.getValue(param.name);
        }

        return records;
    }

}


export {
    type ConfigurableEntry,
    Configurable
}