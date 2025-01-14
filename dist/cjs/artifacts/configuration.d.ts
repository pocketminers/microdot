import { ArgumentEntry } from "./argument";
import { Property, PropertyEntry } from "./property";
declare class Configuration extends Map<string, Property<any>> {
    constructor(properties?: PropertyEntry<any>[], args?: ArgumentEntry<any>[]);
    getValue<T = any>(name: string): T | undefined;
    toJSON(): {
        [key: string]: any;
    };
    toString(): string;
    toRecord(): Record<string, any>;
}
export { Configuration };
//# sourceMappingURL=configuration.d.ts.map