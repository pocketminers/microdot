import { checkIsEmpty, checkIsString } from "@utils/checks";
import { IsNotEmpty } from "@utils/decorators";
import { CryptoUtils } from "@utils/crypto";
import { Property } from "./property";


/**
 * HashableEntry Interface
 * @summary Hashable entry interface that is used to create a hashable instance
 */
interface HashableEntry<T>
    extends
        Record<"data", T>,
        Partial<Record<"hash", string>> {}

/**
 * Hashable Class
 * @summary Hashable class that can be extended by other classes
 */
class Hashable<T>
    extends Property<T>
{
    
    constructor({
        hash = undefined,
        data,
    }: HashableEntry<T>) {

        if (checkIsEmpty(data)) {
            throw new Error("Hashable:constructor:data cannot be empty.");
        }

        super({ data, meta: { hash } });
    }

    public get hash(): string | undefined {
        return this.meta.annotations.hash;
    }

    public set hash(value: string) {
        this.meta.annotations.hash = value;
    }

    public async getHash(): Promise<string> {
        if (
            checkIsEmpty(this.hash) === true
            || this.meta.annotations.hash === "not-set"
        ) {
            this.meta.annotations.hash = await Hashable.hashData<T>(this.data);
        }

        return this.meta.annotations.hash as string;
    }

    /**
     * hashData static Method - Hash the given data using the default hashing algorithm and digest
     */
    public static async hashData<T>(data: T): Promise<string> {
        return await CryptoUtils.hashData<T>(data);
    }

    /**
     * initialize Method
     * @summary Initialize the hashable instance
     */
    public async initialize(): Promise<void> {
        await this.getHash();
        
        if (this.hasEqualHash(this.meta.annotations.hash as string) === false) {
            throw new Error("Hash mismatch");
        }
    }

    /**
     * checkHash Method
     * @summary Check if the original hash matches the current hash
     */
    public hasEqualHash(hash: string): boolean {
        return this.meta.annotations.hash === hash;
    }

    /**
     * checkFromValue Method - Check if the original hash matches the current hash
     * @summary Check if the original hash matches the current hash
     */
    public async hasEqualData<T>(data: T): Promise<boolean> {
        return this.hash === await Hashable.hashData<T>(data);
    }

    /**
     * checkFromHashOrData Method - Check if the original hash matches the current hash or a given data
     */
    private async checkFromHashOrData<T>(hashOrData: T | string): Promise<boolean> {
        if (
            checkIsString(hashOrData) === true
            && CryptoUtils.isHash<T>(hashOrData) === true
            && this.hasEqualHash(hashOrData as string) === false
        ) {
            throw new Error("Input hash does not match the current hash of the data");
        }

        else if (
            CryptoUtils.isHash<T>(hashOrData) === false
            && await this.hasEqualData<T>(hashOrData as T) === false
        ) {
            throw new Error("When hashing the input data, the hash does not match the current hash of the data");
        }

        else if (
            CryptoUtils.isHash<T>(hashOrData) === false
            && CryptoUtils.isHash<T>(hashOrData as string) === false
        ) {
            throw new Error("Input is not a hash or matcheable data");
        }

        return true;
    }

    /**
     * checkHash Method - Check if the original hash matches the current hash
     * @summary Check if the original hash matches the current hash
     */
    // @IsNotEmpty
    public async checkHash(hashOrData: T | string): Promise<boolean> {
        try {
            if (checkIsEmpty(hashOrData) === true) {
                throw new Error("Hash or data cannot be empty");
            }

            return await this.checkFromHashOrData<T>(hashOrData);
        }
        catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * hashString static Method - Hash the given string using the default hashing algorithm and digest
     */
    @IsNotEmpty
    public static async hashString(value: string): Promise<string> {
        try {
            return await CryptoUtils.hashData<string>(value);
        }
        catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export {
    type HashableEntry,
    Hashable
};