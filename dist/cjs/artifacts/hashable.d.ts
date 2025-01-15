/**
 * Hashable Class
 * @summary Hashable class that can be extended by other classes
 * @example
 * class MyClass extends Hashable {
 *    constructor(value: any) {
 *       super(value);
 *   }
 * }
 */
declare class Hashable implements Record<'id', string>, Partial<Record<"hash", string>> {
    readonly id: string;
    readonly hash?: string;
    /**
     * Hashable Constructor to create a new Hashable instance from a value
     * @param value
     * @summary Create a new Hashable instance
     */
    constructor(value: any, id?: string);
    /**
     * isString Method
     * @param value
     * @returns boolean
     * @summary Check if the value is a string
     */
    private isString;
    /**
     * isHash Method
     * @param value
     * @returns boolean
     * @summary Check if the value is a hash, which is the result of a sha256 hash
     */
    private isHash;
    /**
     * check if a hash is the same as the hash of the value
     * @overload checkHash
     * @example
     * const hashable = new Hashable("myValue");
     * hashable.checkHash("myHash");
     */
    checkHash(hash: string): boolean;
    /**
     * check if a string is the same as the hash of the value
     * @overload checkHash
     * @example
     * const hashable = new Hashable("myValue");
     * hashable.checkHash("myValue");
     */
    checkHash(value: string): boolean;
    /**
     * hashString Method
     * @param value
     * @returns string
     * @summary Hash the given string using sha256
     */
    static hashString(value: string): string;
}
export { Hashable };
//# sourceMappingURL=hashable.d.ts.map