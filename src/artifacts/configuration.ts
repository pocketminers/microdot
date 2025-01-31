import { checkIsEmpty } from "@/utils";
import { Argument, ArgumentEntry } from "./argument";
import { Parameter, ParameterEntry } from "./parameter";
import { Property, PropertyEntry } from "./property";
import { Arguments } from "./arguments";

/**
 * Configuration is a map of properties that can be set by arguments.
 * A 'property' is a parameter with an argument.
 * If an argument exists for a property, then the value of the property is set to the value of the argument.
 * This allows the property to be set by the argument.
 */
class Configuration
    extends
        Map<Property['name'], Property<any>>
{
    /**
     * Create a new Configuration instance
     * Both, properties and arguments can be passed to the constructor.
     */
    public constructor(
        properties: PropertyEntry<any>[] = [],
        parameters: ParameterEntry<any>[] = [],
        args: ArgumentEntry<any>[] = []
    ) {
        super();
        this.addEntries({entries: [...properties, ...parameters], args});
    }

    /**
     * Add a property to the configuration from a property entry and an argument entry.  
     * If the property is already in the configuration, then throw an error.  
     * If an argument exists for the property, then set the value of the property.  
     * If the entry is a parameter, then create a new property. 
     * If the entry is not a parameter or a property, then throw an error.
     */
    public addEntry(
        entry: PropertyEntry<any> | ParameterEntry<any>,
        args: ArgumentEntry<any>[] = [],
        overwrite = false
    ): void {
        let property: Property<any> | undefined;

        // If the entry is a parameter, then create a new property
        if (entry instanceof Property) {
            property = entry;
        }
        else if (
            entry instanceof Parameter
        ) {
            property = new Property(entry);
        }
        else {
            throw new Error(`Invalid entry: ${entry}`);
        }

        // Check if the property is already in the configuration
        if (
            overwrite === false
            && property !== undefined
            && this.has(property.name)
        ) {
            throw new Error(`Property already exists: ${property.name}`);
        }

        // Check if an argument exists for the property
        const arg = args.find(arg => arg.name === property?.name);

        // If the property is already in the configuration and the overwrite flag is true, then delete the property
        if (
            overwrite === true
        ) {
            this.delete(property.name);
        }

        // If an argument exists, then set the value of the property
        if (
            args !== undefined
            && arg !== undefined
            && checkIsEmpty([arg]) === false
        ) {
            property.setValue(arg.value);
        }

        // Add the property to the configuration
        this.set(property.name, property);
    }

    public addEntryFromArg(
        arg: ArgumentEntry<any>
    ): void {
        const property = new Property({
            name: arg.name,
            required: false,
            description: ''
        });
        property.setValue(arg.value);
        this.set(property.name, property);
    }

    /**
     * Add properties to the configuration from a list of property entries and a list of argument entries.  
     * If the property is already in the configuration, then throw an error.  
     * If an argument exists for the property, then set the value of the property.  
     * If the entry is a parameter, then create a new property. 
     * If the entry is not a parameter or a property, then throw an error.
     */
    public addEntries({
        entries = [],
        args = [],
        overwrite = true
    }:{
        entries?: PropertyEntry<any>[] | ParameterEntry<any>[] | ArgumentEntry<any>[],
        args?: ArgumentEntry<any>[],
        overwrite?: boolean
    } = {}): void {
        //check the input entries for duplicates
        
        const names = entries.map(entry => entry.name);
        const duplicates = names.filter((name, index) => names.indexOf(name) !== index);
        if (duplicates.length > 0) {
            throw new Error(`Duplicate entries: ${duplicates}`);
        }

        for(const entry of entries) {
            if (
                entry instanceof Property
                || entry instanceof Parameter
            ) {
                this.addEntry(entry, args, overwrite);
            }
            else if (
                entry instanceof Argument
            ) {
                this.addEntryFromArg(entry);
            }
            else {
                throw new Error(`Invalid entry: ${entry}`);
            }
            this.addEntry(entry, args, overwrite);
        }
    }

    public setArguments(args: ArgumentEntry<any>[], setProperties: boolean = false): void {
        for (const [name, property] of this) {
            const arg = args.find(arg => arg.name === name);
            if (
                arg !== undefined
                && checkIsEmpty([arg]) === false
            ) {
                property.setValue(arg.value);
            }
        }

        // Check if any arguments were not set
        const unsetArgs = args.filter(arg => this.has(arg.name) === false);

        // If any arguments were not set, then throw an error
        if (
            unsetArgs.length > 0
            && setProperties === false
        ) {
            throw new Error(`Invalid arguments: ${unsetArgs.map(arg => arg.name)}`);
        }

        // If any arguments were not set, then add the arguments as properties
        if (
            unsetArgs.length > 0
            && setProperties === true
        ) {
            this.addEntries({
                entries: unsetArgs,
                args
            });
        }
    }

    /**
     * Get a property from the configuration by name
     */
    public getValue<T = any>(name: string): T | undefined {
        if (this.has(name)) {
            const value = super.get(name)?.getValue();
            return value;
        }
    }

    /**
     * Get the required property values from the configuration
     */
    public getRequiredValues(): Record<string, any> {
        const values: Record<string, any> = {};
        for (const [name, property] of this) {
            if (property.required) {
                values[name] = property.getValue();
            }
        }
        return values;
    }

    /**
     * Convert the configuration to a JSON object.
     * The JSON object contains the name of the property and the property object.
     */
    public toJSON(): { [key: string]: any } {
        const json: Record<string, any> = {};
        for (const [name, property] of this) {
            json[name] = property.toJSON();
        }
        return json;
    }

    /**
     * Convert the configuration to a string.
     * The string contains the name of the property and the value of the property.
     */
    public toString(): string {
        let str = "";
        for (const [name, property] of this) {
            str += `${name}: ${property.getValue()}\n`;
        }
        return str;
    }

    /**
     * Convert the configuration to a record.
     * The record contains the name of the property and the property object.
     */
    public toRecord(): Record<string, any> {
        const record: Record<string, any> = {};
        for (const [name, property] of this) {
            record[name] = property.toRecord();
        }
        return record;
    }

    public toArguments(): Arguments {
        const args: Arguments = new Arguments();
        for (const [name, property] of this) {
            args.add(new Argument({
                name,
                value: property.getValue()
            }));
        }
        return args
    }

}

export {
    Configuration
};