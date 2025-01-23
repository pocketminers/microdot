import { Argument, ArgumentEntry } from "@artifacts/argument";
import { Parameter, ParameterEntry } from "@artifacts/parameter";

type PropertyStoreEntryItem = Argument<any> | ArgumentEntry<any> | Parameter<any> | ParameterEntry<any>;
type PropertyStoreEntryItems = PropertyStoreEntryItem[];

type PropertyStoreItem = Argument<any> | Parameter<any>;
type PropertyStoreItems = PropertyStoreItem[];

class PropertyStore
<
    T extends PropertyStoreItem
> 
    extends Array<T>
{
    constructor(items: PropertyStoreEntryItems = []) {

        super();
        
        if (!Array.isArray(items)) {
            throw new TypeError("Items must be an array");
        }

        this.add(items)
    }

    // private static hasUniqueNames({ items }: { items: PropertyStoreItems }): boolean {
    //     const names = new Set<string>();
    //     for (const item of items) {
    //         if (
    //             names.has(item.name)) {
    //             return false;
    //         }
    //         else {
    //             names.add(item.name);
    //         }
    //         names.add(item.name);
    //     }
    //     return true;
    // }

    public static fromEntry(entry: ArgumentEntry<any> | ParameterEntry<any>): PropertyStoreItem {
        if( 
            Object.prototype.hasOwnProperty.call(entry, 'value')
        ) {
            return new Argument(entry as ArgumentEntry<any>);
        }
        else if (
            Object.prototype.hasOwnProperty.call(entry, 'defaultValue')
        ) {
            return new Parameter(entry as ParameterEntry<any>);
        }
        else {
            throw new Error("Entry must have a unique name");
        }
    }

    public addEntry(entry: ArgumentEntry<any> | ParameterEntry<any>): void {
        const artifact = PropertyStore.fromEntry(entry);

        this.addArtifact(artifact as T);
    }

    public addArtifact(artifact: T): void {
        if (this.getEntry(artifact.name)) {
            throw new Error(`Entry already exists: ${artifact.name}`);
        }

        this.push(artifact);
    }

    public add(artifactsOrEntries: PropertyStoreEntryItems): void {
        for (const item of artifactsOrEntries) {
            if (item instanceof Argument || item instanceof Parameter) {
                this.addArtifact(item as T);
            }
            else {
                this.addEntry(item);
            }
        }
    }

    public getEntry(name: string): T | undefined {
        return this.find((entry) => entry.name === name);
    }

    public getEntries(): T[] {
        return this;
    }

    public getNames(): string[] {
        const names: string[] = [];
        for (const entry of this) {
            names.push(entry.name);
        }
        return names;
    }

    public removeEntryByName(name: string): void {
        const index = this.findIndex((entry) => entry.name === name);
        try {
            if (index !== -1) {
                this.splice(index, 1);
            }
        } 
        catch (error: any) {
            throw new Error(`Error removing entry: ${name} - ${error.message}`);
        }
    }

    public removeEntry(entry: T): void {
        this.removeEntryByName(entry.name);
    }

    public updateEntry(entry: T): void {
        const index = this.findIndex((item) => item.name === entry.name);

        if (index === -1) {
            throw new Error(`Entry not found: ${entry.name}`);
        }

        this[index] = entry;
    }

    public getRequiredDefaults(): Record<string, any> {
        const defaults: Record<string, any> = {};
        for (const entry of this) {
            if (entry instanceof Parameter) {
                if (entry.defaultValue !== undefined && entry.required === true) {
                    defaults[entry.name] = entry.defaultValue;
                }
            }
        }
        return defaults;
    }

}

export {
    PropertyStore,
    type PropertyStoreEntryItem,
    type PropertyStoreEntryItems,
    type PropertyStoreItem,
    type PropertyStoreItems
}