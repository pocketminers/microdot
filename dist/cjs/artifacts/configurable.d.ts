import { ArgumentEntry } from "./argument";
import { Arguments } from "./arguments";
import { Configuration } from "./configuration";
import { Hashable } from "./hashable";
import { ParameterEntry } from "./parameter";
import { PropertyEntry } from "./property";
interface ConfigurableEntry extends Record<'id', string>, Record<'name', string>, Record<'description', string>, Record<'configuration', Configuration>, Record<'properties', PropertyEntry<any>[]>, Record<'parameters', ParameterEntry<any>[]>, Record<'args', ArgumentEntry<any>[] | Arguments>, Record<'useArgs', boolean> {
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
    constructor({ id, name, description, configuration, properties, parameters, args, useArgs }: {
        id?: string;
        name?: string;
        description?: string;
        configuration?: Configuration;
        properties?: PropertyEntry<any>[];
        parameters?: ParameterEntry<any>[];
        args?: ArgumentEntry<any>[] | Arguments;
        useArgs?: boolean;
    });
    setArguments(args: ArgumentEntry<any>[] | Arguments, asProperties?: boolean): void;
    getArguments(): Arguments;
}
export { type ConfigurableEntry, Configurable };
//# sourceMappingURL=configurable.d.ts.map