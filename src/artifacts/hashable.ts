import { createIdentifier } from "@/utils";
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
        id: string = '',
        ...values: any[]
    ) {
        this.id = id === "" ? createIdentifier("UUID", { prefix: "Hashable-" }) : id;
        this.hash = this.createHash(values);
    }

    private createHash(...values: any[]): string {
        let str: string = "";

        // if (Array.isArray(values)) {
            

        for (const item in values) {

            if (this.isString(item) === true) {
                str += item as string;
            }
            else {
                str += JSON.stringify(item);
            }
        }

        return Hashable.hashString(str);
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
    public checkHash(...hashOrValues: any[]): boolean;
    public checkHash(hashOrValues: string): boolean {

        if (
            this.isHash(hashOrValues) === true
            && this.hash !== hashOrValues
        ) {
            throw new Error("Hash mismatch");
        }

        else if (
            this.isString(hashOrValues) === true
            && this.isHash(hashOrValues) === false
            && this.hash !== this.createHash(hashOrValues)
        ) {
            throw new Error("Hash mismatch");
        }

        else if(
            Array.isArray(hashOrValues)
            && hashOrValues.length > 0
        ) {
            if (this.hash !== this.createHash(hashOrValues)) {
                throw new Error("Hash mismatch");
            }
        }

        // else if (
        //     this.isHash(hashOrValues) === false
        //     && this.isString(hashOrValues) === false
        // ) {
        //     throw new Error("Invalid hash value");
        // }

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