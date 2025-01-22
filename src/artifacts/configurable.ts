
import { Argument, ArgumentEntry } from "./argument";
import { ArtifactStore } from "./store";
import { Parameter, ParameterEntry } from "./parameter";
import { Identifiable, IdentifiableEntry } from "./identifiable";

interface ConfigurableEntry
    extends
        IdentifiableEntry<any>,
        Partial<Record<'parameters', ParameterEntry<any>[] | Parameter<any>[]>>,
        Partial<Record<'args', ArgumentEntry<any>[] | Argument<any>[]>> {}


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
        const argumentStore = new ArtifactStore<Argument<any>>();
        argumentStore.add(args );

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

    public static isValidArgumentName(params: ArtifactStore<Parameter<any>>, arg: Argument<any>): boolean {
        const paramNames = params.getNames();
        return paramNames.includes(arg.getName());
    }

    public static isValidArgumentValue(params: ArtifactStore<Parameter<any>>, arg: Argument<any>): boolean {
        const param = params.getEntry(arg.getName());

        if (!param) {
            return false;
        }

        return param.isValueInOptionalValues(arg.getValue());
    }

    public getValue(name: string): any {
        const param = this.getParameters().getEntry(name);
        const arg = this.getArguments().getEntry(name);
        return param?.getValue(arg?.getValue());
    }


}


export {
    type ConfigurableEntry,
    Configurable
}