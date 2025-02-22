import { ConfigSpec, Metadata, MetadataEntry } from "@/template";
import { Properties, PropertiesEntry } from "@component/properties";
import { Component } from "@/component";


interface Configuration<T = any>
    extends
        Pick<ConfigSpec, "id" | "name" | "description">,
        Partial<Record<"data", T>>,
        Partial<Record<"metadata", Metadata>>,
        Partial<Record<"properties", Properties>> {}


interface ConfigurableEntry<D>
    extends
        Partial<Pick<ConfigSpec, "id" | "name" | "description">>,
        Partial<Record<"properties", PropertiesEntry>>,
        Partial<Record<"data", D>>,
        Partial<Record<"metadata", MetadataEntry>> {}


class Configurable<T = any, D extends Record<string, any> = any | undefined>
    extends Component<T, D>
{
    constructor({
        // id = "",
        // name = "",
        // description = "",
        id,
        name,
        description,
        properties = new Properties(),
        data = {} as D,
        metadata = new Metadata()
    }: ConfigurableEntry<D> = {}) {
        super({
            data: {
                id,
                name,
                description,
                properties: properties instanceof Properties ? properties : new Properties(properties),
                ...data
            },
            meta: metadata instanceof Metadata ? metadata : new Metadata(metadata)
        });

        console.log(`Configurable: ${JSON.stringify(this, null, 2)}`);

        // this.data.properties.args.forEach(arg => Object.freeze(arg));
        // this.data.properties.params.forEach(param => Object.freeze(param));
        // Object.freeze(this.data);
        // Object.freeze(this);
        // Object.freeze(this.data.properties);
        // Object.freeze(this.data.properties.args);
        // Object.freeze(this.data.properties.params); 
    }

    public get id(): string {
        return this.data.id !== undefined ? this.data.id : "";
    }

    public get name(): string {
        return this.data.name !== undefined ? this.data.name : "";
    }

    public get description(): string {
        return this.data.description !== undefined ? this.data.description : "";
    }

    public get properties(): Properties {
        return this.data.properties !== undefined ? this.data.properties : new Properties();
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