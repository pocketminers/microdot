import { Metadata, MetadataEntry } from "@/template";
import { Base, BaseType, BaseTypes } from "./base";
import { CryptoUtils } from "@/utils";

type StorageItemIndex = string | number;
type StorageItems<D = any> = Map<StorageItemIndex, D>;

class Storage<T extends BaseType, D = any>
    extends Base<T>
{
    private readonly _items: StorageItems<D> = new Map<StorageItemIndex, D>();

    constructor(type: T) {
        super(type);
    }

    private addNextItem(item: D): number {
        const index = this._items.size;
        this._items.set(index, item);
        return index;
    }

    private addItemByIndex({
        index,
        item
    }: {
        index: StorageItemIndex,
        item: D
    }): StorageItemIndex {
        this._items.set(index, item);
        return index;
    }

    public addItem({item}: {item: D}): {index: StorageItemIndex, item: D};
    public addItem({index, item}: {index: StorageItemIndex, item: D}): {index: StorageItemIndex, item: D};
    public addItem({index, item}: {index?: StorageItemIndex, item: D}): {index: StorageItemIndex, item: D} {
        let storedIndex: StorageItemIndex = -1;
        
        if (index === undefined) {
            storedIndex = this.addNextItem(item);
        }
        else {
            storedIndex = this.addItemByIndex({index, item});
        }

        return {
            index: storedIndex,
            item
        };
    }

    private getItemByIndex(index: StorageItemIndex, allow: any[]): { index: StorageItemIndex, value: D | keyof typeof allow } {
        const value = this._items.get(index) ?? allow[0];

        return {
            index,
            value
        };
    }

    
    private getItemByValue(value: D): { index: StorageItemIndex, value: D } {
        let index: StorageItemIndex = -1;

        for (const [key, val] of this._items) {
            if (val === value) {
                index = key;
                break;
            }
        }

        return {
            index,
            value
        };
    }

    // public getItem({index}:{index: StorageItemIndex}): { index: StorageItemIndex, value: D };
    // public getItem({value}:{value: D}): { index: StorageItemIndex, value: D };
    public getItem({
        index,
        value,
        allow = []
    }: {
        index?: StorageItemIndex,
        value?: D,
        allow?: any[]
    } = {}): {
        index: StorageItemIndex,
        value: D | keyof typeof allow
    } {
        let item: { index: StorageItemIndex, value: D | keyof typeof allow } = {
            index: -1,
            value: allow[0]
        };

        if (index !== undefined) {
            item = this.getItemByIndex(index, allow);
        }
        else if (value !== undefined) {
            item =  this.getItemByValue(value);
        }

        if (
            allow.length > 0
            && allow.includes(item.value) === false
        ) {
            throw new Error(`Component ${String(item.value)} not found`);
        }

        return item;
    }
        

    private removeItemByIndex(index: StorageItemIndex): boolean {
        if (this.getItemByIndex(index, []).value) {
            return this._items.delete(index);
        }
        return false;
    }

    private removeItemByValue(item: D): boolean {
        for (const [key, value] of this._items) {
            if (value === item) {
                return this._items.delete(key);
            }
        }
        return false;
    }

    public removeItem({index}:{index: StorageItemIndex}): boolean;
    public removeItem({item}: {item: D}): boolean;
    public removeItem({index, item}: {index?: StorageItemIndex, item?: D}): boolean {
        if (
            ( index === undefined || index === -1)
            && item === undefined
        ) {
            throw new Error("id or item must be provided, but neither was");
        }

        if (index !== undefined && item !== undefined) {
            throw new Error("id and item cannot both be provided");
        }

        if (index !== undefined) {
            return this.removeItemByIndex(index);
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

class HashedStorageItem<T extends BaseType, D = any>
    extends Base<T>
{
    public readonly data: D;
    public readonly meta: Metadata;

    constructor({
        type,
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

    public get id(): string {
        return this.meta.labels.get('id') || "";
    }

    public get name(): string {
        return this.meta.labels.get('name') || "";
    }

    public get description(): string {
        return this.meta.annotations.get('description') || "";
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

class HashedStorage<T extends BaseTypes, D, E extends HashedStorageItem<T, D>>
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
    type StorageItemIndex,
    type StorageItems,
    Storage,
    HashedStorageItem,
    HashedStorage
};