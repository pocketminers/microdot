import { checkForHash, hashValue } from "@utils/crypto";


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
class Hashable
    implements
        Record<'id', string>,
        Partial<Record<"hash", string>>
{
    public readonly id: string;
    public readonly hash?: string;

    /**
     * Hashable Constructor to create a new Hashable instance from a value
     * @param value
     * @summary Create a new Hashable instance
     */
    constructor(
        value: any,
        id: string = ''
    ) {
        this.id = id;
        let str: string;


        if (this.isString(value)) {
            str = value as string;
        }
        else {
            str = JSON.stringify(value);
        }

        this.hash = Hashable.hashString(str);
    }

    /**
     * isString Method
     * @param value
     * @returns boolean
     * @summary Check if the value is a string
     */
    private isString(value: any): boolean {
        return typeof value === "string";
    }

    /**
     * isHash Method
     * @param value
     * @returns boolean
     * @summary Check if the value is a hash, which is the result of a sha256 hash
     */
    private isHash(value: any): boolean {
        if (
            checkForHash(value)
        ) {
            return true;
        }
        else {
            return false;
        }
    }


    /**
     * check if a hash is the same as the hash of the value
     * @overload checkHash
     * @example
     * const hashable = new Hashable("myValue");
     * hashable.checkHash("myHash");
     */
    public checkHash(hash: string): boolean;
    /**
     * check if a string is the same as the hash of the value
     * @overload checkHash
     * @example
     * const hashable = new Hashable("myValue");
     * hashable.checkHash("myValue");
     */
    public checkHash(value: string): boolean;
    public checkHash(hashOrValue: string): boolean {

        if (
            this.isHash(hashOrValue) === true
            && this.hash !== hashOrValue
        ) {
            throw new Error("Hash mismatch");
        }

        else if (
            this.isString(hashOrValue) === true
            && this.isHash(hashOrValue) === false
            && this.hash !== Hashable.hashString(hashOrValue)
        ) {
            throw new Error("Hash mismatch");
        }

        else if (
            this.isHash(hashOrValue) === false
            && this.isString(hashOrValue) === false
        ) {
            throw new Error("Invalid hash value");
        }

        return true;
    }

    /**
     * hashString Method
     * @param value
     * @returns string
     * @summary Hash the given string using sha256
     */
    public static hashString(value: string): string {
        return hashValue(value);
    }
}

export {
    Hashable
};