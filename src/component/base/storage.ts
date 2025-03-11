import { Base, BaseType } from "./base.types";


/**
 * An Index value used to reference a `StorageItem`
 * - This can be a string or a number
 * - This is used to reference a single item of data in a `Storage`
 */
type StorageItemIndex = string | number;

/**
 * A schema for a `StorageItem`
 * - This is the item stored in a `StorageItem`
 * - This can be any type of item
 */
type StorageItemSchema<T = any> = T;


/**
 * A `StorageItem` is a single item of data in a `Storage`
 */
class StorageItem
<
    /**
     * The type of data stored in the `StorageItem`
     */
    T = any,

    /**
     * The schema for the item stored in the `StorageItem`
     */
    D extends StorageItemSchema<T> = StorageItemSchema<T>
> {
    /**
     * The index of the `StorageItem`
     */
    private _index: StorageItemIndex;
    
    /**
     * The data of item stored in the `StorageItem`
     */    
    public data: D;

    /**
     * Create a new `StorageItem`
     * - This is a single item in a `Storage`
     * - The index is frozen to prevent modification
     */
    constructor({
        /**
         * The index of the `StorageItem`
         */
        index,
        /**
         * The item of data stored in the `StorageItem`
         */
        data
    }: {
        index: StorageItemIndex,
        data: D
    }) {
        this._index = index;
        this.data = data;

        Object.freeze(this._index);
    }

    /**
     * Get the index of the `StorageItem`
     */
    public get index(): StorageItemIndex {
        return this._index;
    }

    /**
     * The Set method for the index of the `StorageItem`
     * - This is not allowed
     */
    public set index(index: StorageItemIndex) {
        throw new Error("Index cannot be changed");
    }
}

// /**
//  * The `StorageItems` is a collection of `StorageItem`s
//  * - This is a map of `StorageItemIndex` to `StorageItem`
//  */
class StorageItems<
    T = any,
    D extends StorageItemSchema<T> = StorageItemSchema<T>
> 
    extends 
        Map<StorageItemIndex, D>
{
    constructor({
        items = []
    }: {
        items: [StorageItemIndex, D][]
    }) {
        super(items);
    }
}



/**
 * The Storage Class manages a collection of items
 */
class Storage<
    T extends BaseType,
    D = any,
    S extends StorageItem<D> = StorageItem<D>
>
    extends Base<T>
{
    private readonly _items: StorageItems<D> = new StorageItems<D>({items: []});

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
        data
    }: {
        index: StorageItemIndex,
        data: D
    }): StorageItemIndex {
        this._items.set(index, data);
        return index;
    }

    public addItem({item}: {item: D}): {index: StorageItemIndex, item: D};
    // public addItem({index, item}: {index: StorageItemIndex, item: D}): StorageItem<T>;
    public addItem({index, item}: {index?: StorageItemIndex, item: D}): {index: StorageItemIndex, item: D} {
        let storedIndex: StorageItemIndex = -1;
        
        if (index === undefined) {
            storedIndex = this.addNextItem(item);
        }
        else {
            storedIndex = this.addItemByIndex({index, data: item});
        }

        return {
            index: storedIndex,
            item
        };
    }

    private getItemByIndex(index: StorageItemIndex, allow: any[]): StorageItem<D> {
        const item = this._items.get(index) ?? allow[0];

        return new StorageItem({index, data: item});
    }

    
    private getItemByValue(item: D): StorageItem<D> {
        let index: StorageItemIndex = -1;

        for (const [key, value] of this._items) {
            if (value === item) {
                index = key;
                break;
            }
        }
        
        return new StorageItem({index, data: item});
    }

    private getItemByIndexOrValue({
        index,
        data = undefined,
        allow = []
    }: {
        index?: StorageItemIndex,
        data?: D | undefined,
        allow?: any[]
    // }): { index: StorageItemIndex, item: D | keyof typeof allow } {
    }): StorageItem<D> {
        if (index !== undefined) {
            return this.getItemByIndex(index, allow);
        }
        // if (item !== undefined) {
        //     return this.getItemByValue(item);
        // }
        return new StorageItem({
            index: -1,
            data: allow[0] as D
        });
    }

    public getItem<T>({index}:{index: StorageItemIndex}): StorageItem<D>;
    // public getItem<T>({item}:{item: D}): StorageItem<D>;
    public getItem<T>({
        index = undefined,
        data = undefined,
        allow = [undefined]
    }: {
        index?: StorageItemIndex,
        data?: D,
        allow?: any[]
    } = {}): StorageItem<D> {

        return this.getItemByIndexOrValue({index, data, allow});
        // let 
        // let data: D | keyof typeof allow = allow[0];

        // if (foundIndex !== undefined) {
        //     data = this.getItemByIndex(foundIndex, allow);
        // }
        // else if (data !== undefined) {
        //     data =  this.getItemByValue(foundItem as D);
        // }

        // if (
        //     allow.length > 0
        //     && allow.includes(item.value) === false
        // ) {
        //     throw new Error(`Component ${String(item.value)} not found`);
        // }
    }
        

    private removeItemByIndex(index: StorageItemIndex): boolean {
        if (this.getItemByIndex(index, []).data) {
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


export {
    type StorageItemSchema,
    type StorageItemIndex,
    StorageItem,
    type StorageItems,
    Storage
};