
import { CryptoUtils } from "@utils/crypto";
import { Metadata, MetadataEntry } from "@template/meta";


enum ComponentType {
    QUEUE = "queue",
    RUNNER = "runner",
    MANAGER = "manager",
    MESSAGE = "message",
    CONFIGMAP = "configmap",
    SECRET = "secret"
}

interface ComponentEntry<T = any>
    extends
        Record<"data", T>,
        Partial<Record<"meta", MetadataEntry>> {}

/**
 */
class Component<T> {
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

    // private setMetadata(meta: MetadataEntry): void {
    //     this.meta = new Metadata(meta);
    // }

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
    Component
};

export * from './configurable';
export * from './properties';