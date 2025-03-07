import { Metadata, MetadataEntry } from "@/template";
import { Base, BaseType, BaseTypes } from "./base.types";
import { Storage } from "./storage";
import { CryptoUtils } from "@/utils";

class HashedStorageItem<
    T extends BaseTypes = BaseTypes.Custom,
    D = any
>
    extends Base<T>
{
    public readonly data: D;
    public readonly meta: Metadata;

    constructor({
        type = BaseTypes.Custom as T,
        data,
        meta
    }: {
        type: T,
        data: D,
        meta: MetadataEntry
    }) {
        super(type);
        this.data = data;
        this.meta = new Metadata(meta);
    }

    // public get id(): string {
    //     return this.meta.labels.get('id') || "";
    // }

    // public get name(): string {
    //     return this.meta.labels.get('name') || "";
    // }

    // public get description(): string {
    //     return this.meta.annotations.get('description') || "";
    // }

    public get hash(): string {
        return this.meta.labels.get('hash') || "";
    }

    public set hash(value: string) {
        this.meta.labels.set('hash', value);
    }

    public async hashData(): Promise<string> {
        const hashedData = await CryptoUtils.hashData(this.data);
        const storedHash = this.hash;

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

class HashedStorage<
    T extends BaseTypes,
    D,
    E extends HashedStorageItem<T, D>
>
    extends Storage<T, E>
{

    constructor({type, items = []}: {type: T, items?: E[]}) {
        super(type);

        for (const item of items) {
            this.addItem({item});
        }
    }

    public async hashItems(): Promise<void> {
        for (const item of this.listItems()) {
            await item.hashData();
        }
    }
}


export {
    HashedStorageItem,
    HashedStorage
};