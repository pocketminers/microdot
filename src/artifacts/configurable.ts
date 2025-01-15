import { createIdentifier } from "@/utils";
import { ArgumentEntry } from "./argument";
import { Arguments } from "./arguments";
import { Configuration } from "./configuration";
import { Hashable } from "./hashable";
import { Parameter, ParameterEntry } from "./parameter";
import { PropertyEntry } from "./property";



interface ConfigurableEntry
    extends
        Partial<Record<'id', string>>,
        Partial<Record<'name', string>>,
        Partial<Record<'description', string>>,
        Partial<Record<'configuration', Configuration>>,
        Partial<Record<'properties', PropertyEntry<any>[] | PropertyEntry<any>[]>>,
        Partial<Record<'parameters', ParameterEntry<any>[] | Parameter<any>[]>>,
        Partial<Record<'args', ArgumentEntry<any>[] | Arguments>>,
        Partial<Record<'useArgs', boolean>> {}

/**
 * Configurable is a class that can be configured by arguments.
 * A 'configurable' is a hashable object that can be set by arguments.
 * If an argument exists for a property, then the value of the property is set to the value of the argument.
 * This allows the property to be set by the argument.
 */
class Configurable
    extends Hashable
{
    public name: string;
    public description: string;
    public config: Configuration;
    public readonly createdAt: Date = new Date();

    constructor(
        {
            id = createIdentifier(),
            name = 'Configurable',
            description = 'A configurable object that can be set by arguments',
            configuration = undefined,
            properties = [],
            parameters = [],
            args = [],
            useArgs = false
        } : ConfigurableEntry
    ) {
        super({id, name, description, configuration, properties, parameters, args, useArgs}, id);

        this.name = name;
        this.description = description;

        if (configuration !== undefined) {
            this.config = configuration;
            this.config.addEntries({entries: [...properties, ...parameters], args});
            this.config.setArguments(args, true);
        }
        else {
            this.config = new Configuration({properties, parameters, args});
        }
    }

    public setArguments(args: ArgumentEntry<any>[] | Arguments, asProperties: boolean = false): void {
        this.config.setArguments(args, asProperties);
    }

    public getArguments(): Arguments {
        return this.config.toArguments();
    }
}

export {
    type ConfigurableEntry,
    Configurable
}