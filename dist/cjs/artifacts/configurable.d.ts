import { Argument, ArgumentEntry } from "./argument";
import { ArtifactStore } from "./store";
import { Parameter, ParameterEntry } from "./parameter";
import { Identifiable, IdentifiableEntry } from "./identifiable";
interface ConfigurableEntry extends Pick<IdentifiableEntry<any>, 'id' | 'name' | 'description'>, Partial<Record<'parameters', ParameterEntry<any>[] | Parameter<any>[]>>, Partial<Record<'args', ArgumentEntry<any>[] | Argument<any>[]>> {
}
declare class Configurable extends Identifiable<{
    args: ArtifactStore<Argument<any>>;
    parameters: ArtifactStore<Parameter<any>>;
}> {
    constructor({ id, name, description, args, parameters }: ConfigurableEntry);
    getArguments(): ArtifactStore<Argument<any>>;
    getParameters(): ArtifactStore<Parameter<any>>;
    static isValidArgumentName(params: ArtifactStore<Parameter<any>>, arg: Argument<any>): boolean;
    static isValidArgumentValue(params: ArtifactStore<Parameter<any>>, arg: Argument<any>): boolean;
    getValue<T = any>(name: string): T;
}
export { type ConfigurableEntry, Configurable };
//# sourceMappingURL=configurable.d.ts.map