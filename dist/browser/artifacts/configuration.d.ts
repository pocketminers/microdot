import { Property } from "./property";
declare class Configuration extends Map<string, Property<any>> {
    constructor(properties?: Property<any>[]);
    get<T = any>(name: string): Property<T> | undefined;
    set<T = any>(name: string, value: Property<T>): this;
    getValue<T = any>(name: string): T | undefined;
    toJSON(): {
        [key: string]: any;
    };
    toString(): string;
    toRecord(): Record<string, any>;
}
export { Configuration };
//# sourceMappingURL=configuration.d.ts.map