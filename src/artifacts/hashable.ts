import { checkHasEmpties, checkIsEmpty, checkIsString, createIdentifier } from "@/utils";
import { IsNotEmpty } from "@/utils/decorators";
import { CryptoUtils } from "@utils/crypto";


interface HashableEntry<T = any>
    extends
        Record<"data", T>,
        Partial<Record<"id", string>>,
        Partial<Record<"hash", string>> {}

/**
 * Hashable Class
 * @summary Hashable class that can be extended by other classes
 */
class Hashable<T>
    implements
        Record<'id', string>,
        Record<'data', T>,
        Partial<Record<"hash", string | undefined>>
{
    public readonly id: string;
    public readonly data: T;
    public hash?: string;

    /**
     * Hashable Constructor to create a new Hashable instance from a data
     * @param data
     * @summary Create a new Hashable instance
     */
    constructor({
        id = createIdentifier("UUID", { prefix: "Hashable-" }),
        hash = undefined,
        data
    }: HashableEntry<T>) {
        this.id = id;
        this.hash = hash;

        // if (checkHasEmpties(data) === true) {
        //     throw new Error("Data cannot be empty");
        // }

        this.data = data;
    }

    public async initialize(): Promise<void> {
        if( this.hash === undefined) {
            this.hash = await CryptoUtils.hashValue<T>(this.data);
        }
        else {
            await this.checkHash(this.hash as string);
        }
    }

    /**
     * checkHash Method
     * @summary Check if the original hash matches the current hash
     */
    public hasEqualHash(hash: string): boolean {
        if (this.hash !== hash) {
            // throw new Error("Hash mismatch");
            return false;
        }

        return true;
    }

    /**
     * checkFromValue Method - Check if the original hash matches the current hash
     * @summary Check if the original hash matches the current hash
     */
    public async hasEqualValue<T>(data: T): Promise<boolean> {
        if (this.hash !== await CryptoUtils.hashValue<T>(data)) {
            // throw new Error("Hash mismatch");
            return false;
        }

        return true;
    }

    /**
     * isEquivalent Method
     * @summary Check if the given values are equivalent to the current
     */
    private async isEquivalent<T>(data: T): Promise<boolean> {
        return this.hash === await CryptoUtils.hashValue<T>(data);
    }

    /**
     * checkFromHashOrValue Method
     * @summary Check if the original hash matches the current hash
     */
    private async checkFromHashOrValue<T>(hashOrValues: T | string): Promise<boolean> {
        if (
            CryptoUtils.isValueHash<T>(hashOrValues) === true
            && this.hasEqualHash(hashOrValues as string) === false
        ) {
            throw new Error("Hash mismatch");
        }

        else if (
            checkIsString(hashOrValues) === true
            && CryptoUtils.isValueHash<T>(hashOrValues) === false
            && await this.isEquivalent<T>(hashOrValues as T) === false
        ) {
            throw new Error("Hash mismatch");
        }

        else if(
            Array.isArray(hashOrValues)
            && hashOrValues[0].length > 0
        ) {
            if ( await this.isEquivalent(hashOrValues) === false) {
                throw new Error("Hash mismatch");
            }
        }

        return true;
    }

    /**
     * checkHash Method
     * @summary Check if the original hash matches the current hash
     */
    @IsNotEmpty
    public async checkHash(hashOrValues: T | string): Promise<boolean> {
        try {
            if (checkIsEmpty(hashOrValues) === true) {
                throw new Error("Hash or data cannot be empty");
            }

            return await this.checkFromHashOrValue<T>(hashOrValues);
        }
        catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * hashString static Method - Hash the given string using sha256
     * @summary Hash the given string using sha256
     */
    @IsNotEmpty
    public static async hashString(data: string): Promise<string> {
        try {
            return await CryptoUtils.hashValue(data);
        }
        catch (error: any) {
            throw new Error(error.message);
        }
    }

    public static async create<T>(values: T): Promise<Hashable<T>> {
        const id = createIdentifier("UUID", { prefix: "Hashable-" });
        const hash = await this.hashString(JSON.stringify(values));
        return new Hashable<typeof values>({ id, hash, data: values });   

    }
}

export {
    type HashableEntry,
    Hashable
};