type HashAlgorithm = "SHA256" | "SHA512" | "MD5";
type HashDigest = "hex" | "base64";
declare class CryptoUtils {
    /**
     * Convert an ArrayBuffer to a hex string
     */
    private static arrayBufferToHex;
    /**
     * Format a digest into the desired format (hex or base64)
     */
    private static formatDigest;
    /**
     * Create a SHA-256 hash of the input string wiuth the given digest format
     */
    static sha256(input: string, digest?: HashDigest): Promise<string>;
    /**
     * Create a SHA-512 hash of the input string with the given digest format
     */
    static sha512(input: string, digest?: HashDigest): Promise<string>;
    /**
     * MD5
     * @summary MD5 hashing algorithm
     */
    static md5(input: string, digest?: HashDigest): Promise<string>;
    /**
     * Hash a value
     * @summary Hash the given value using the hashing algorithm
     * @example
     * hashValue("myValue");
     */
    static hashString(value: string, algorithm?: HashAlgorithm, digest?: HashDigest): Promise<string>;
    /**
     * Check a value for a hash
     * @summary Check if the hash is in the valid format
     * @example
     * checkForHash("myHash");
     */
    static checkStringForHash(str: string, algorithm?: string, digest?: HashDigest): boolean;
    static appendValueToString<T>(value: T, str: string): string;
    static prepareDataForHash<T>(value: T): string;
    static hashData<T>(data: T, algorithm?: HashAlgorithm, digest?: HashDigest): Promise<string>;
    static isHash<T>(value: any, algorithm?: HashAlgorithm, digest?: HashDigest): boolean;
}
export { CryptoUtils };
//# sourceMappingURL=crypto.d.ts.map