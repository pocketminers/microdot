/**
 * HashableEntry Interface
 * @summary Hashable entry interface that is used to create a hashable instance
 */
interface HashableEntry<T> extends Record<"data", T>, Partial<Record<"hash", string>> {
}
/**
 * Hashable Class
 * @summary Hashable class that can be extended by other classes
 */
declare class Hashable<T> {
    readonly data: T;
    hash?: string;
    /**
     * Hashable Constructor to create a new Hashable instance from a data
     * @param data
     * @summary Create a new Hashable instance
     */
    constructor({ hash, data }: HashableEntry<T>);
    getData(): T;
    getHash(): Promise<string>;
    /**
     * hashData static Method - Hash the given data using the default hashing algorithm and digest
     */
    static hashData<T>(data: T): Promise<string>;
    /**
     * initialize Method
     * @summary Initialize the hashable instance
     */
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
    hasEqualData<T>(data: T): Promise<boolean>;
    /**
     * checkFromHashOrData Method - Check if the original hash matches the current hash or a given data
     */
    private checkFromHashOrData;
    /**
     * checkHash Method - Check if the original hash matches the current hash
     * @summary Check if the original hash matches the current hash
     */
    checkHash(hashOrData: T | string): Promise<boolean>;
    /**
     * hashString static Method - Hash the given string using the default hashing algorithm and digest
     */
    static hashString(value: string): Promise<string>;
}
export { type HashableEntry, Hashable };
//# sourceMappingURL=hashable.d.ts.map