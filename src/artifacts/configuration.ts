import { Property } from "./property";

class Configuration
    extends
        Map<string, Property<any>>
{
    public constructor(
        properties: Property<any>[] = []
    ) {
        super();
        for (const property of properties) {
            this.set(property.name, property);
        }
    }

    public get<T = any>(name: string): Property<T> | undefined {
        return super.get(name);
    }

    public set<T = any>(name: string, value: Property<T>): this {
        super.set(name, value);
        return this;
    }

    public getValue<T = any>(name: string): T | undefined {
        return this.get<T>(name)?.getValue();
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