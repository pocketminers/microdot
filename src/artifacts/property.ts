import { CryptoUtils } from "@/utils";
import { Metadata, MetadataEntry } from "@artifacts/metadata";


class Property<T> {
    public readonly data: T;
    public readonly meta: Metadata;

    constructor({
        data,
        meta
    }: {
        data: T,
        meta?: MetadataEntry | Metadata
    }) {
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
    Property
};