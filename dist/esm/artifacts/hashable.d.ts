interface HashableEntry<T = any> extends Record<"data", T>, Partial<Record<"id", string>>, Partial<Record<"hash", string>> {
}
/**
 * Hashable Class
 * @summary Hashable class that can be extended by other classes
 */
declare class Hashable<T> implements Record<'id', string>, Record<'data', T>, Partial<Record<"hash", string | undefined>> {
    readonly id: string;
    readonly data: T;
    hash?: string;
    /**
     * Hashable Constructor to create a new Hashable instance from a data
     * @param data
     * @summary Create a new Hashable instance
     */
    constructor({ id, hash, data }: HashableEntry<T>);
    initialize(): Promise<void>;
    /**
     * checkHash Method
     * @summary Check if the original hash matches the current hash
     */
    hasEqualHash(hash: string): boolean;
    /**
     * checkFromValue Method - Check if the original hash matches the current hash
     * @summary Check if the original hash matches the current hash
     */
    hasEqualValue<T>(data: T): Promise<boolean>;
    /**
     * isEquivalent Method
     * @summary Check if the given values are equivalent to the current
     */
    private isEquivalent;
    /**
     * checkFromHashOrValue Method
     * @summary Check if the original hash matches the current hash
     */
    private checkFromHashOrValue;
    /**
     * checkHash Method
     * @summary Check if the original hash matches the current hash
     */
    checkHash(hashOrValues: T | string): Promise<boolean>;
    /**
     * hashString static Method - Hash the given string using sha256
     * @summary Hash the given string using sha256
     */
    static hashString(data: string): Promise<string>;
    static create<T>(values: T): Promise<Hashable<T>>;
}
export { type HashableEntry, Hashable };
//# sourceMappingURL=hashable.d.ts.map