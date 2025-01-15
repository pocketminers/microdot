import { Identifier } from "@/utils";
import { ArgumentEntry } from "./argument";
import { Arguments } from "./arguments";
import { Configuration, ConfigurationEntry } from "./configuration";
import { Hashable } from "./hashable";


interface ConfigurableEntry
    extends
        Record<'id', Identifier>,
        Partial<Record<'configuration', Configuration>>,
        ConfigurationEntry {}

/**
 * Configurable is a class that can be configured by arguments.
 * A 'configurable' is a hashable object that can be set by arguments.
 * If an argument exists for a property, then the value of the property is set to the value of the argument.
 * This allows the property to be set by the argument.
 */
class Configurable
    extends Hashable
{
    public readonly name: string;
    public readonly description: string;
    public config: Configuration;
    public readonly createdAt: Date = new Date();

    constructor(
        {
            id,
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
            this.config = new Configuration({name, description,  properties, parameters, args});
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