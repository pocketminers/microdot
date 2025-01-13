import { Property } from "./property";

class Configuration
    extends
        Map<string, Property<any>>
{
    public constructor(
        properties: Property<any>[] = []
    ) {
        super();
        properties.forEach(property => this.set(property.name, property));
    }

    public get<T = any>(name: string): Property<T> | undefined {
        return super.get(name);
    }

    public set<T = any>(name: string, value: Property<T>): this {
        this.get<Property<T>>(name)?.setValue(value);
        return this;
    }

    public getValue<T = any>(name: string): T | undefined {
        return this.get<T>(name)?.getValue();
    }

    public toJSON(): { [key: string]: any } {
        const json: Record<string, any> = {};
        this.forEach((property, name) => {
            json[name] = property.toJSON();
        });
        return json;
    }

    public toString(): string {
        let str = "";
        this.forEach(property => {
            str += `${property.toString()}\n`;
        });
        return str;
    }

    public toRecord(): Record<string, any> {
        const record: Record<string, any> = {};
        this.forEach((property, name) => {
            record[name] = property.toRecord();
        });
        return record;
    }
}
