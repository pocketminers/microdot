import { ArgumentEntry } from "./argument";
import { Arguments } from "./arguments";
import { Configuration } from "./configuration";
import { Hashable } from "./hashable";
import { Parameter, ParameterEntry } from "./parameter";
import { PropertyEntry } from "./property";
interface ConfigurableEntry extends Partial<Record<'id', string>>, Partial<Record<'name', string>>, Partial<Record<'description', string>>, Partial<Record<'configuration', Configuration>>, Partial<Record<'properties', PropertyEntry<any>[] | PropertyEntry<any>[]>>, Partial<Record<'parameters', ParameterEntry<any>[] | Parameter<any>[]>>, Partial<Record<'args', ArgumentEntry<any>[] | Arguments>>, Partial<Record<'useArgs', boolean>> {
}
/**
 * Configurable is a class that can be configured by arguments.
 * A 'configurable' is a hashable object that can be set by arguments.
 * If an argument exists for a property, then the value of the property is set to the value of the argument.
 * This allows the property to be set by the argument.
 */
declare class Configurable extends Hashable {
    name: string;
    description: string;
    config: Configuration;
    readonly createdAt: Date;
    constructor({ id, name, description, configuration, properties, parameters, args, useArgs }: ConfigurableEntry);
    setArguments(args: ArgumentEntry<any>[] | Arguments, asProperties?: boolean): void;
    getArguments(): Arguments;
}
export { type ConfigurableEntry, Configurable };
//# sourceMappingURL=configurable.d.ts.map