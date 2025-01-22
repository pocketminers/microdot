import { Argument, ArgumentEntry } from "@artifacts/argument";
import { Parameter, ParameterEntry } from "@artifacts/parameter";

class PropertyStore
<
    T extends Argument<any> | Parameter<any> = Argument<any> | Parameter<any>
> 
    extends Array<T>
{
    constructor(items: (ArgumentEntry<any> | ParameterEntry<any>)[] = []) {
        
        if (!Array.isArray(items)) {
            throw new TypeError("Items must be an array");
        }

        if (!PropertyStore.hasUniqueNames({ items })) {
            throw new Error("Items must have unique names");
        }

        const artifacts = []
        for (const item of items) {
            artifacts.push(PropertyStore.fromEntry(item));
        }

        super(...artifacts as T[]);
    }

    private static hasUniqueNames({ items }: { items: Array<ArgumentEntry<any> | ParameterEntry<any>> }): boolean {
        const names = new Set<string>();
        for (const item of items) {
            if (names.has(item.name)) {
                return false;
            }
            names.add(item.name);
        }
        return true;
    }

    public static fromEntry(entry: ArgumentEntry<any> | ParameterEntry<any>): Argument<any> | Parameter<any> {
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
        if (this.getEntry(artifact.getName())) {
            throw new Error(`Entry already exists: ${artifact.getName()}`);
        }

        this.push(artifact);
    }

    public add(artifactsOrEntries: (ArgumentEntry<any> | Argument<any> | ParameterEntry<any> | Parameter<any>)[]): void {
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
        return this.find((entry) => entry.getName() === name);
    }

    public getEntries(): T[] {
        return this;
    }

    public getNames(): string[] {
        const names: string[] = [];
        for (const entry of this) {
            names.push(entry.getName());
        }
        return names;
    }

    public removeEntryByName(name: string): void {
        const index = this.findIndex((entry) => entry.getName() === name);
        try {
            if (index !== -1) {
                this.splice(index, 1);
            }
        } 
        catch (error: any) {
            throw new Error(`Error removing entry: ${name}`);
        }
    }

    public removeEntry(entry: T): void {
        this.removeEntryByName(entry.getName());
    }

    public updateEntry(entry: T): void {
        const index = this.findIndex((item) => item.getName() === entry.getName());

        if (index === -1) {
            throw new Error(`Entry not found: ${entry.getName()}`);
        }

        this[index] = entry;
    }

}

export {
    PropertyStore
}