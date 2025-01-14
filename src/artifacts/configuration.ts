import { Argument, ArgumentEntry } from "./argument";
import { Property, PropertyEntry } from "./property";

class Configuration
    extends
        Map<string, Property<any>>
{
    public constructor(
        properties: PropertyEntry<any>[] = [],
        args: ArgumentEntry<any>[] = []
    ) {
        super();
        for (const property of properties) {
            if (args.length > 0) {
                const arg = args.find(arg => arg.name === property.name);
                
                /**
                 * If an argument exists for the property
                 * then set the value of the property to the value of the argument.
                 * This will allow the property to be set by the argument.
                 */
                if (
                    arg !== undefined
                    && arg.value !== undefined
                ) {
                    property.value = arg.value;
                }
            }
            this.set(property.name, new Property(property));
        }
    }

    public getValue<T = any>(name: string): T | undefined {
        if (this.has(name)) {
            const value = super.get(name)?.getValue();
            console.log(`Configuration: ${name} value: ${value}`);
            return value;
        }
    }

    public toJSON(): { [key: string]: any } {
        const json: Record<string, any> = {};
        for (const [name, property] of this) {
            json[name] = property.toJSON();
        }
        return json;
    }

    public toString(): string {
        let str = "";
        for (const [name, property] of this) {
            str += `${name}: ${property.getValue()}\n`;
        }
        return str;
    }

    public toRecord(): Record<string, any> {
        const record: Record<string, any> = {};
        for (const [name, property] of this) {
            record[name] = property.toRecord();
        }
        return record;
    }
}

export {
    Configuration
};