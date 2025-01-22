import { Factory } from "./factory";
import { Hashable } from "./hashable";
import { Store } from "./store";

class Manager
    implements
        Record<'store', Store<Hashable<T>>>,
        Record<'factory', Factory>
{
    public readonly store: Store<Hashable<T>>;
    public readonly factory: Factory;

    constructor({store: undefined, factory: factory = undefined}) {
        this.store = new Store<Hashable<T>>();
    }

    public async add(item: Hashable<T>): Promise<void> {
        await this.store.add(item.id, item);
    }

    public async get(id: Identifier): Promise<Hashable<T> | undefined> {
        return this.store.get(id);
    }

    public async remove(id: Identifier): Promise<void> {
        await this.store.remove(id);
    }

    public async has(id: Identifier): Promise<boolean> {
        return this.store.has(id);
    }

    public async clear(): Promise<void> {
        await this.store.clear();
    }

    public async size(): Promise<number> {
        return this.store.size();
    }

    public async values(): Promise<IterableIterator<Hashable<T>>> {
        return this.store.values();
    }

    public async hasValue(value: Hashable<T>): Promise<boolean> {
        return this.store.hasValue(value);
    }

    public async keys(): Promise<IterableIterator<string>> {
        return this.store.keys();
    }

    public async hasKey(key: string): Promise<boolean> {
        return this.store.hasKey(key);
    }

    public async entries(): Promise<IterableIterator<[string, Hashable<T>]>> {
        return this.store.entries();
    }
}