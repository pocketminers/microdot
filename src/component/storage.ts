import { Metadata, MetadataEntry } from "@/template";
import { Base, BaseType } from "./base";
import { CryptoUtils } from "@/utils";

type StorageItemIndex = string | number;
type StorageItems<D = any> = Map<StorageItemIndex, D>;

class Storage<T extends BaseType, D = any>
    extends Base<T>
{
    private readonly _items: StorageItems<D> = new Map();

    constructor({type, items = []}: {type: T, items?: D[]}) {
        super(type);
        items.forEach((item, index) => {
            this.addItem({index: index, item});
        });
    }

    public addNextItem(item: D): void {
        this._items.set(this._items.size, item);
    }

    public addItemByKey({index, item}: {index: StorageItemIndex, item: D}): void {
        this._items.set(index, item);
    }

    public addItem({item}: {item: D}): void;
    public addItem({index, item}: {index: StorageItemIndex, item: D}): void;
    public addItem({index, item}: {index?: StorageItemIndex, item: D}): void {
        if (index === undefined) {
            this.addNextItem(item);
        }
        else {
            this.addItemByKey({index, item});
        }
    }

    public getItem(id: StorageItemIndex): D {
        const item = this._items.get(id);
        if (item === undefined) {
            throw new Error(`Component ${id} not found`);
        }
        return item;
    }

    public removeItemByKey(id: StorageItemIndex): boolean {
        return this._items.delete(id);
    }

    public removeItemByValue(item: D): boolean {
        for (const [key, value] of this._items) {
            if (value === item) {
                return this._items.delete(key);
            }
        }
        return false;
    }

    public removeItem({id}:{id: StorageItemIndex}): boolean;
    public removeItem({item}: {item: D}): boolean;
    public removeItem({id, item}: {id?: StorageItemIndex, item?: D}): boolean {
        if (id === undefined && item === undefined) {
            throw new Error("id or item must be provided, but neither was");
        }

        if (id !== undefined && item !== undefined) {
            throw new Error("id and item cannot both be provided");
        }

        if (id !== undefined) {
            return this.removeItemByKey(id);
        }
        if (item !== undefined) {
            return this.removeItemByValue(item);
        }
        return false;
    }

    public listItems(): D[] {
        return Array.from(this._items.values());
    }

    public listItemKeys(): (StorageItemIndex)[] {
        return Array.from(this._items.keys());
    }

    public get size(): number {
        return this._items.size;
    }

    public clear(): void {
        this._items.clear();
    }
}

class HashedStorageItem<D = any> {
    public readonly data: D;
    public readonly meta: Metadata;

    constructor({data, meta}: {data: D, meta: MetadataEntry}) {
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

class HashedStorage<T extends BaseType, D>
    extends Storage<T, HashedStorageItem<D>>
{

    constructor({type, items = []}: {type: T, items?: HashedStorageItem<D>[]}) {
        super({type, items});
    }

    public async hashItems(): Promise<void> {
        for (const item of this.listItems()) {
            await item.hashData();
        }
    }
}


export {
    type StorageItemIndex,
    type StorageItems,
    Storage,
    HashedStorageItem,
    HashedStorage
};