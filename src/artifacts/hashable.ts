import { checkIsEmpty, checkIsString, createIdentifier } from "@/utils";
import { IsNotEmpty } from "@/utils/decorators";
import { checkForHash, hashValue } from "@utils/crypto";


interface HashableEntry<T = any>
    extends
        Partial<Record<"id", string>>,
        Partial<Record<"value", T>>
{
    id?: string;
    [key: string]: T | string | undefined;
}

/**
 * Hashable Class
 * @summary Hashable class that can be extended by other classes
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
        this.hash = this.createHash(id, ...values);
    }

    private appendValue(str: string, value: any): string {
        if (checkIsEmpty(value) === false) {
            str += "-";
        }

        if (typeof value === 'object') {
            return str + JSON.stringify(value);
        }
        else {
            return str + value;
        }
    }

    private createHashableString(values: any[]): string {
        let str = '';
        for (const value of values) {
            str = this.appendValue(str, value);
        }

        return str;
    }

    private createHash(...values: any[]): string {
        const str = this.createHashableString(values);
        return Hashable.hashString(str);
    }

    // /**
    //  * isString Method
    //  * @summary Check if the value is a string
    //  */
    // private isString(value: any): boolean {
    //     if (
    //         typeof value === "string"
    //         || (value instanceof String && checkIsEmpty([value]) === false)
    //         || (typeof value === "object" && value !== null && value.constructor.name === 'String')
    //         || (typeof value === "object" && value !== null && value instanceof String)
    //     ) {
    //         return true;
    //     }

    //     return false;
    // }

    /**
     * isHash Method
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
     * checkHash Method
     * @summary Check if the original hash matches the current hash
     */
    public checkFromHash(hash: string): boolean {
        if (this.hash !== hash) {
            throw new Error("Hash mismatch");
        }

        return true;
    }

    /**
     * checkFromValue Method - Check if the original hash matches the current hash
     * @summary Check if the original hash matches the current hash
     */
    public checkFromValues(...values: any[]): boolean {
        if (this.hash !== this.createHash(this.id, values)) {
            throw new Error("Hash mismatch");
        }

        return true;
    }

    public isEquivalent(...values: any[]): boolean {
        return this.hash === this.createHash(this.id, values);
    }

    public checkFromHashOrValue(...hashOrValues: any[]): boolean {
        if (
            this.isHash(hashOrValues) === true
            && this.hash !== hashOrValues[0]
        ) {
            throw new Error("Hash mismatch");
        }

        else if (
            checkIsString(hashOrValues) === true
            && this.isHash(hashOrValues) === false
            && this.isEquivalent(...hashOrValues) === false
        ) {
            throw new Error("Hash mismatch");
        }

        else if(
            Array.isArray(hashOrValues)
            && hashOrValues[0].length > 0
        ) {
            if (this.isEquivalent(hashOrValues) === false) {
                throw new Error("Hash mismatch");
            }
        }

        return true;
    }

    @IsNotEmpty
    public checkHash(...hashOrValues: any[]): boolean {
        this.checkFromHashOrValue(hashOrValues);
        return true;
    }



    // /**
    //  * check if a hash is the same as the hash of the value
    //  * @overload checkHash
    //  * @example
    //  * const hashable = new Hashable("myValue");
    //  * hashable.checkHash("myHash");
    //  */
    // public checkHash(hash: string): boolean;
    // /**
    //  * check if a string is the same as the hash of the value
    //  * @overload checkHash
    //  * @example
    //  * const hashable = new Hashable("myValue");
    //  * hashable.checkHash("myValue");
    //  */
    // public checkHash(value: string): boolean;
    // public checkHash(...hashOrValues: any[]): boolean;
    // public checkHash(hashOrValues: string): boolean {

    //     if (
    //         this.isHash(hashOrValues) === true
    //         && this.hash !== hashOrValues
    //     ) {
    //         throw new Error("Hash mismatch");
    //     }

    //     else if (
    //         this.isString(hashOrValues) === true
    //         && this.isHash(hashOrValues) === false
    //         && this.hash !== this.createHash(this.id, hashOrValues)
    //     ) {
    //         throw new Error("Hash mismatch");
    //     }

    //     else if(
    //         Array.isArray(hashOrValues)
    //         && hashOrValues.length > 0
    //     ) {
    //         if (this.hash !== this.createHash(this.id, hashOrValues)) {
    //             throw new Error("Hash mismatch");
    //         }
    //     }

    //     // else if (
    //     //     this.isHash(hashOrValues) === false
    //     //     && this.isString(hashOrValues) === false
    //     // ) {
    //     //     throw new Error("Invalid hash value");
    //     // }

    //     return true;
    // }

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
    type HashableEntry,
    Hashable
};