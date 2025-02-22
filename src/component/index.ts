
import { CryptoUtils } from "@utils/crypto";
import { Metadata, MetadataEntry } from "@template/meta";


enum ComponentTypes {
    QUEUE = "QUEUE",

}

interface ComponentEntry<D>
    extends
        Record<"data", D>,
        Partial<Record<"meta", MetadataEntry>> {}

/**
 */
class Component<D = undefined> {
    public readonly data: D;
    public meta: Metadata;

    constructor({
        data,
        meta
    }: ComponentEntry<D>) {
        this.data = data
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

    public getDataValue<K extends keyof D>(key: K): D[K] {
        return this.data[key];
    }

    public get metadata(): Metadata {
        return this.meta;
    }

    public async hashData(): Promise<string> {
        const hashedData = await CryptoUtils.hashData(this.data);
        const storedHash = this.meta.annotations.hash;

        if (storedHash === 'not-set'
            || storedHash === undefined
            || storedHash === hashedData
        ) {
            this.meta.annotations.set('hash',  hashedData);
        }
        
        else if (
            storedHash !== 'not-set'
            && storedHash !== undefined
            && storedHash !== hashedData
        ) {
            throw new Error(`Hash mismatch: ${storedHash} !== ${hashedData}`);
        }

        return hashedData;
    }
}



export {
    type ComponentEntry,
    Component
};

export * from './configurable';
export * from './properties';