import { Argument, ArgumentEntry } from "./argument";
import { Parameter, ParameterEntry } from "./parameter";

class ArtifactStore<T extends Argument<any> | Parameter<any> = Argument<any> | Parameter<any>> 
    extends Array<T>
{
    constructor(items: Array<ArgumentEntry<any> | ParameterEntry<any>> = []) {
        if (!ArtifactStore.hasUniqueNames(items)) {
            throw new Error("Items must have unique names");
        }

        const artifacts = items.map((item) => ArtifactStore.fromEntry(item));

        super(...artifacts as T[]);
    }

    private static hasUniqueNames(items: any[]): boolean {
        const names = items.map((item) => item.getName());
        const uniqueNames = new Set(names);

        return names.length === uniqueNames.size;
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
        const artifact = ArtifactStore.fromEntry(entry);

        this.addArtifact(artifact as T);
    }

    public addArtifact(artifact: T): void {
        if (ArtifactStore.hasUniqueNames([artifact, ...this]) === false) {
            throw new Error(`Artifact already exists: ${artifact.getName()}`);
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
        return this.map((entry) => entry.getName());
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

}

export {
    ArtifactStore
}