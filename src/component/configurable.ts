import { ConfigSpec, Metadata, MetadataEntry } from "@/template";
import { Properties, PropertiesEntry } from "./properties";
import { Component } from ".";


interface Configuration
    extends
        Pick<ConfigSpec, "id" | "name" | "description">,
        Record<"properties", Properties> {}


interface ConfigurableEntry<T = any>
    extends
        Partial<Pick<ConfigSpec, "id" | "name" | "description">>,
        Partial<Record<"properties", PropertiesEntry>>,
        Partial<Record<"data", T>>,
        Partial<Record<"metadata", MetadataEntry>> {}


class Configurable<T>
    extends Component<Configuration>
{
    constructor({
        id = "",
        name = "",
        description = "",
        properties = {},
        data = {} as T,
        metadata = {}
    }: ConfigurableEntry<T> = {}) {
        super({
            data: {
                id,
                name,
                description,
                properties: new Properties(properties),
                ...data
            },
            meta: metadata
        });

        // this.data.properties.args.forEach(arg => Object.freeze(arg));
        // this.data.properties.params.forEach(param => Object.freeze(param));
        // Object.freeze(this.data);
        // Object.freeze(this);
        // Object.freeze(this.data.properties);
        // Object.freeze(this.data.properties.args);
        // Object.freeze(this.data.properties.params); 
    }

    public get id(): string {
        return this.data.id;
    }

    public get name(): string {
        return this.data.name;
    }

    public get description(): string {
        return this.data.description;
    }

    public get properties(): Properties {
        return this.data.properties;
    }

    public get metadata(): Metadata {
        return this.meta;
    }

    
}



export {
    type Configuration,
    type ConfigurableEntry,
    Configurable
};