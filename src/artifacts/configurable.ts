
import { Argument, ArgumentEntry } from "@artifacts/argument";
import { ArtifactStore } from "@artifacts/store";
import { Parameter, ParameterEntry } from "@artifacts/parameter";
import { Identifiable, IdentifiableEntry } from "@artifacts/identifiable";



interface ConfigurableEntry
    extends
        Pick<IdentifiableEntry<any>, 'id' | 'name' | 'description'>,
        Partial<Record<'parameters', (ParameterEntry<any> | Parameter<any>)[]>>,
        Partial<Record<'args', (ArgumentEntry<any> | Argument<any>)[]>> {}


class Configurable
    extends
        Identifiable<{ args: ArtifactStore<Argument<any>>, parameters: ArtifactStore<Parameter<any>> }>
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
        console.log(`Configurable:constructor:args:`, args);

        const argumentStore = new ArtifactStore<Argument<any>>();
        argumentStore.add(args);

        const paramStore = new ArtifactStore<Parameter<any>>();
        paramStore.add(parameters);

        super({id, name, description, data: { args: argumentStore, parameters: paramStore }});
    }

    public getArguments(): ArtifactStore<Argument<any>> {
        return this.getData().args;
    }

    public getParameters(): ArtifactStore<Parameter<any>> {
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

    public getValue<T = any>(name: string): T {
        const param = this.getParameters().getEntry(name);

        if (!param) {
            throw new Error(`Parameter ${name} not found in ${this.getName()}(${this.getId()})`);
        }

        const arg = this.getArguments().getEntry(name);
        return param.getValue(arg?.getValue());
    }


}


export {
    type ConfigurableEntry,
    Configurable
}