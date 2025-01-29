import { Metadata, MetadataEntry } from "./metadata";

class Property<T> {
    public data: T;
    public meta: Metadata;

    constructor({
        data,
        meta
    }: {
        data: T,
        meta?: MetadataEntry | Metadata
    }) {
        this.data = data;
        
        if (meta instanceof Metadata) {
            this.meta = meta;
        }
        else if (
            meta !== undefined
            && meta !== null
            && typeof meta === "object"
            && Object.keys(meta).length > 0
        ) {
            this.meta = new Metadata(meta);
        }
        else {
            this.meta = new Metadata();
        }
    }
}


export {
    Property
};