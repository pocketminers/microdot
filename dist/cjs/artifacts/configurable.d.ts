import { Argument, ArgumentEntry } from "./argument";
import { PropertyStore } from "./store";
import { Parameter, ParameterEntry } from "./parameter";
import { Identifiable, IdentifiableEntry } from "./identifiable";
/**
 * Configuration entry interface that is used to create a configurable instance
 * @summary Configuration entry interface that is used to create a configurable instance
 */
interface ConfigurableEntry extends Pick<IdentifiableEntry<any>, 'id' | 'name'>, Partial<Pick<IdentifiableEntry<any>, 'description'>>, Partial<Record<'parameters', (ParameterEntry<any> | Parameter<any>)[]>>, Partial<Record<'args', (ArgumentEntry<any> | Argument<any>)[]>> {
}
/**
 * Configurable Class that extends Identifiable and adds parameters and arguments as data
 * @summary Configurable class that extends Identifiable
 */
declare class Configurable extends Identifiable<{
    args: PropertyStore<Argument<any>>;
    parameters: PropertyStore<Parameter<any>>;
}> {
    constructor({ id, name, description, args, parameters }: ConfigurableEntry);
    getArguments(): PropertyStore<Argument<any>>;
    getParameters(): PropertyStore<Parameter<any>>;
    isValidArgumentName(arg: Argument<any>): boolean;
    isValidArgumentValue(arg: Argument<any>): boolean;
    setArgument<T>(arg: Argument<T>): void;
    setArgumentFromEntry(entry: ArgumentEntry<any>): void;
    getValue<T = any>(name: string): T;
}
export { type ConfigurableEntry, Configurable };
//# sourceMappingURL=configurable.d.ts.map