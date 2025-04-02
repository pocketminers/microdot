import { Metadata, MetadataEntry } from "@/template";
import { Base, BaseType, BaseTypes } from "./base.types";
import { Storage, StorageItem, StorageItemIndex, StorageItems } from "./storage";
import { CryptoUtils } from "@/utils";
import { MerkleTree } from "@/utils/merkle";

class HashedStorageItem<
    T extends BaseTypes,    // BaseTypes
    D = any                // StorageSchema
>
    extends Base<T>
{
    public readonly data: D;
    public readonly meta: Metadata;

    constructor({
        data,
        meta = {} as MetadataEntry,
        type = BaseTypes.Custom as T,
    }: {
        data?: D,
        meta?: MetadataEntry,
        type?: T
    } = {}) {
        super(type);

        if (data === undefined) {
            throw new Error("Data is required for HashedStorageItem");
        }

        this.data = data;
        this.meta = new Metadata(meta);
    }

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
    D = any,
    E extends HashedStorageItem<T, D> = HashedStorageItem<T, D>
>
    extends Storage<T, E>
{

    constructor({type, items = []}: {type: T, items?: E[]}) {
        super(type);

        for (const item of items) {
            this.addItem({item});
        }
    }

    public async hashTree(): Promise<MerkleTree<T, D, E>> {
        const tree = new MerkleTree<T,D,E>(this.listItems());
        await tree.initialize();
        return tree;
    }

    public getStoredItem({
        index
    }: {
        index: StorageItemIndex
    }): StorageItem {
        return this.getItem({index});
    }
}


export {
    HashedStorageItem,
    HashedStorage
};