import { Argument, ArgumentEntry } from "./argument";
import { Parameter, ParameterEntry } from "./parameter";
declare class ArtifactStore<T extends Argument<any> | Parameter<any> = Argument<any> | Parameter<any>> extends Array<T> {
    constructor(items?: Array<ArgumentEntry<any> | ParameterEntry<any>>);
    private static hasUniqueNames;
    static fromEntry(entry: ArgumentEntry<any> | ParameterEntry<any>): Argument<any> | Parameter<any>;
    addEntry(entry: ArgumentEntry<any> | ParameterEntry<any>): void;
    addArtifact(artifact: T): void;
    add(artifactsOrEntries: (ArgumentEntry<any> | Argument<any> | ParameterEntry<any> | Parameter<any>)[]): void;
    getEntry(name: string): T | undefined;
    getEntries(): T[];
    getNames(): string[];
    removeEntryByName(name: string): void;
    removeEntry(entry: T): void;
}
export { ArtifactStore };
//# sourceMappingURL=store.d.ts.map