/**
 * SHA256
 * @summary SHA256 hashing algorithm
 */
declare function sha256(input: string): string;
/**
 * Hash a value
 * @summary Hash the given value using the hashing algorithm
 * @example
 * hashValue("myValue");
 */
declare const hashValue: (value: string, algorithm?: string) => string;
/**
 * Check a value for a hash
 * @summary Check if the hash is in the valid format
 * @example
 * checkForHash("myHash");
 */
declare const checkForHash: (hash: string, algorithm?: string) => boolean;
export { hashValue, checkForHash, sha256 };
//# sourceMappingURL=crypto.d.ts.map