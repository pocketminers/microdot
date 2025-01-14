import { hashValue, checkForHash, sha256 } from "../src/utils/crypto";

describe("Crypto Utility Functions", () => {
    describe("sha256", () => {
        it("should return the correct SHA256 hash for a given input", () => {
            const input = "test";
            const expectedHash = "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08";
            expect(sha256(input)).toBe(expectedHash);
        });
    });

    describe("hashValue", () => {
        it("should return the correct SHA256 hash for a given value", () => {
            const value = "test";
            const expectedHash = "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08";
            expect(hashValue(value)).toBe(expectedHash);
        });

        it("should return the correct SHA256 hash for a given value with explicit algorithm", () => {
            const value = "test";
            const algorithm = "SHA256";
            const expectedHash = "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08";
            expect(hashValue(value, algorithm)).toBe(expectedHash);
        });
    });

    describe("checkForHash", () => {
        it("should return true for a valid SHA256 hash", () => {
            const hash = "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08";
            expect(checkForHash(hash)).toBe(true);
        });

        it("should return false for an invalid SHA256 hash", () => {
            const hash = "invalidhash";
            expect(checkForHash(hash)).toBe(false);
        });

        it("should return true for a valid SHA256 hash with explicit algorithm", () => {
            const hash = "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08";
            const algorithm = "SHA256";
            expect(checkForHash(hash, algorithm)).toBe(true);
        });

        it("should return false for an invalid SHA256 hash with explicit algorithm", () => {
            const hash = "invalidhash";
            const algorithm = "SHA256";
            expect(checkForHash(hash, algorithm)).toBe(false);
        });
    });
});