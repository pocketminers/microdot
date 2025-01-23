
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

    public getArguments(): PropertyStore<Argument<any>> {
        return this.getData().args;
    }

    public getParameters(): PropertyStore<Parameter<any>> {
        return this.getData().parameters;
    }

    public isValidArgumentName(arg: Argument<any>): boolean {
        const paramNames = this.getParameters().getNames();
        return paramNames.includes(arg.getName());
    }

    public isValidArgumentValue(arg: Argument<any>): boolean {
        const param = this.getParameters().getEntry(arg.getName());

        if (!param) {
            return false;
        }

        return param.isValueInOptionalValues(arg.getValue());
    }

    public setArgument<T>(arg: Argument<T>): void {
        if (!this.isValidArgumentName(arg)) {
            throw new Error(`Invalid argument name: ${arg.getName()}`);
        }

        if (!this.isValidArgumentValue(arg)) {
            throw new Error(`Invalid argument value: ${arg.getValue()}`);
        }

        if (this.getArguments().getEntry(arg.getName())) {
            this.getArguments().updateEntry(arg);
        }
        else {
            this.getArguments().addArtifact(arg);
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
        const param = this.getParameters().getEntry(name);

        if (
            param === undefined
            || checkIsEmpty(param) === true
        ) {
            throw new Error(`Parameter ${name} not found in ${this.getName()}(${this.getId()})`);
        }

        const arg = this.getArguments().getEntry(name);

        return param.getValue(arg?.getValue());
    }

    public getRequiredValueRecords(): Record<string, any> {
        const records: Record<string, any> = {};

        for (const param of this.getParameters().getEntries()) {
            if (param.getRequired() === true) {
                records[param.getName()] = this.getValue(param.getName());
            }
        }

        return records;
    }

}


export {
    type ConfigurableEntry,
    Configurable
}