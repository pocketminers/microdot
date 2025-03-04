// import { ConfigSpec, Metadata, MetadataEntry } from "@/template";
// import { Properties, PropertiesEntry } from "@component/properties";
// import { Component, BaseType, BaseTypes } from "@component/base";


// interface Configuration<D = any>
//     extends
//         Pick<ConfigSpec, "id" | "name" | "description">,
//         Partial<Record<"data", D>>,
//         Partial<Record<"metadata", Metadata>>,
//         Partial<Record<"properties", Properties>> {}


// interface ConfigurableEntry<T extends , D>
//     extends
//         Partial<Pick<ConfigSpec, "id" | "name" | "description">>,
//         Partial<Record<"type", T>>,
//         Partial<Record<"properties", PropertiesEntry | Properties>>,
//         Partial<Record<"data", D>>,
//         Partial<Record<"metadata", MetadataEntry>> {}


// class Configurable<T extends BaseTypes, D extends Record<string, any> = Record<string, any>>  
//     extends Component<'CONFIG', D>
// {
//     constructor({
//         id,
//         name,
//         description,
//         type,
//         properties = new Properties(),
//         data = {} as D,
//         metadata = new Metadata()
//     }: ConfigurableEntry<T, D> = {}) {
//         super({
//             type: 'CONFIG' as T,
//             data: {
//                 id,
//                 name,
//                 description,
//                 properties: properties instanceof Properties ? properties : new Properties(properties),
//                 ...data
//             },
//             meta: metadata instanceof Metadata ? metadata : new Metadata(metadata)
//         });
//     }

//     public get id(): string {
//         return this.data.id !== undefined ? this.data.id : "";
//     }

//     public get name(): string {
//         return this.data.name !== undefined ? this.data.name : "";
//     }

//     public get description(): string {
//         return this.data.description !== undefined ? this.data.description : "";
//     }

//     public get properties(): Properties {
//         return this.data.properties !== undefined ? this.data.properties : new Properties();
//     }

//     public get metadata(): Metadata {
//         return this.meta;
//     }

//     public get timestamp(): string | undefined {
//         return this.meta.annotations.createdAt;
//     }

    
// }



// export {
//     type Configuration,
//     type ConfigurableEntry,
//     Configurable
// };