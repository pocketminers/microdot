
import { CryptoUtils } from "@utils/crypto";
import { Metadata, MetadataEntry } from "@template/meta";


enum BaseTypes {
    Identity = "Identity",
    Command = "Command",
    Message = "Message",
    Job = "Job",
    Process = "Process",
    Custom = "Custom"
}

type BaseType = keyof typeof BaseTypes;

class Base<T extends BaseType = BaseTypes.Custom> {
    private readonly _type: BaseType;

    constructor(
        type: T
    ) {
        if (type in BaseTypes === false) {
            // throw new TypeError(`Base:constructor: The type is not a valid BaseTypes value: ${type}`);
            type = BaseTypes.Custom as T;
        }

        this._type = type;
    }

    public get type(): T {
        return this._type as T;
    }
}


interface ComponentEntry<T extends BaseType, D = any>
    extends
        Record<"data", D>,
        Record<"type", T>,
        Partial<Record<"meta", MetadataEntry>> {}

/**
 */
class Component<T extends BaseType, D = any> {
    public data: D;
    public meta: Metadata;

    constructor({
        type,
        data,
        meta
    }: ComponentEntry<T, D>) {
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

        this.setTypeName(type);
    }

    private setTypeName(type: T): void {
        this.meta.labels.set('componentType', type);
    }

    public getDataValue<K extends keyof D>(key: K): D[K] {
        return this.data[key];
    }

    public get metadata(): Metadata {
        return this.meta;
    }

    public async hashData(): Promise<string> {
        const hashedData = await CryptoUtils.hashData(this.data);
        const storedHash = this.meta.hash;

        if (storedHash === 'not-set'
            || storedHash === undefined
            || storedHash === hashedData
        ) {
            this.meta.labels.set('hash',  hashedData);
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
    type BaseType,
    BaseTypes,
    Base,
    type ComponentEntry,
    Component
};