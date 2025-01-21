import { Identifier } from "../utils";
import { ArgumentEntry } from "./argument";
import { Arguments } from "./arguments";
import { Configuration, ConfigurationEntry } from "./configuration";
import { Hashable } from "./hashable";
import { PropertyEntry } from "./property";
import { ParameterEntry } from "./parameter";
interface ConfigurableEntry extends Record<'id', Identifier>, Partial<Record<'configuration', Configuration>>, ConfigurationEntry {
}
/**
 * Configurable is a class that can be configured by arguments.
 * A 'configurable' is a hashable object that can be set by arguments.
 * If an argument exists for a property, then the value of the property is set to the value of the argument.
 * This allows the property to be set by the argument.
 */
declare class Configurable extends Hashable<{
    name: string;
    description: string;
    configuration?: Configuration;
    properties?: PropertyEntry<any>[];
    parameters: ParameterEntry<any>[];
    args?: ArgumentEntry<any>[] | Arguments | {
        [key: string]: any;
    };
    useArgs: boolean;
}> {
    readonly name: string;
    readonly description: string;
    config: Configuration;
    readonly createdAt: Date;
    constructor({ id, name, description, configuration, properties, parameters, args, useArgs }: ConfigurableEntry);
    setArguments(args: ArgumentEntry<any>[] | Arguments, asProperties?: boolean): void;
    getArguments(): Arguments;
}
export { type ConfigurableEntry, Configurable };
//# sourceMappingURL=configurable.d.ts.map