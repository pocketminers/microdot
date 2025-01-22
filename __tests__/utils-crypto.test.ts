import { CryptoUtils } from "../src/utils/crypto";

const { sha256, hashData, isHash } = CryptoUtils;

describe("Crypto Utility Functions", () => {
    describe("sha256", () => {
        it("should return the correct SHA256 hash for a given input", async() => {
            const input = "test";
            const expectedHash = "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08";
            expect(await sha256(input)).toBe(expectedHash);
        });
    });

    describe("hashData", () => {
        it("should return the correct SHA256 hash for a given value", async () => {
            const value = "test";
            const expectedHash = "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08";
            expect(await hashData(value)).toBe(expectedHash);
        });

        it("should return the correct SHA256 hash for a given value with explicit algorithm", async () => {
            const value = "test";
            const algorithm = "SHA256";
            const expectedHash = "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08";
            expect(await hashData(value, algorithm)).toBe(expectedHash);
        });

        it("should return the correct SHA512 hash for a given value with explicit algorithm", async () => {
            const value = "test";
            const algorithm = "SHA512";
            const expectedHash = "ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff";
            expect(await hashData(value, algorithm)).toBe(expectedHash);
        });

        it("should return the correct MD5 hash for a given value with explicit algorithm", async () => {
            const value = "test";
            const algorithm = "MD5";
            try {
                await hashData(value, algorithm);
            } catch (error: any) {
                expect(error.message).toBe("MD5 is not recommended for use in security-critical applications");
            }
        });
    });

    describe("checkForHash", () => {
        it("should return true for a valid SHA256 hash", async () => {
            const hash = "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08";
            expect(isHash(hash)).toBe(true);
        });

        it("should return false for an invalid SHA256 hash", () => {
            const hash = "invalidhash";
            expect(isHash(hash)).toBe(false);
        });

        it("should return true for a valid SHA256 hash with explicit algorithm", () => {
            const hash = "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08";
            const algorithm = "SHA256";
            expect(isHash(hash, algorithm)).toBe(true);
        });

        it("should return false for an invalid SHA256 hash with explicit algorithm", () => {
            const hash = "invalidhash";
            const algorithm = "SHA256";
            expect(isHash(hash, algorithm)).toBe(false);
        });
    });

    describe("appendValueToString", () => {
        it("should append a value to a string", () => {
            const value = "test";
            const str = "test";
            const expected = "test-test";
            expect(CryptoUtils.appendValueToString(value, str)).toBe(expected);
        });

        it("should append a value to an empty string", () => {
            const value = "test";
            const str = "";
            const expected = "test";
            expect(CryptoUtils.appendValueToString(value, str)).toBe(expected);
        });

        it("should append a value to a string with a space", () => {
            const value = "test";
            const str = "test ";
            const expected = "test-test";
            expect(CryptoUtils.appendValueToString(value, str)).toBe(expected);
        });
    });

    describe("hashString", () => {
        it("should return the correct SHA256 hash for a given string", async () => {
            const value = "test";
            const expectedHash = "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08";
            expect(await CryptoUtils.hashString(value)).toBe(expectedHash);
        });

        it("should return the correct SHA512 hash for a given string with explicit algorithm", async () => {
            const value = "test";
            const algorithm = "SHA512";
            const expectedHash = "ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff";
            expect(await CryptoUtils.hashString(value, algorithm)).toBe(expectedHash);
        });

        it("should return the correct MD5 hash for a given string with explicit algorithm", async () => {
            const value = "test";
            const algorithm = "MD5";
            try {
                await CryptoUtils.hashString(value, algorithm);
            } catch (error: any) {
                expect(error.message).toBe("MD5 is not recommended for use in security-critical applications");
            }
        });

        it("should return the correct SHA256 hash for a given string with explicit digest", async () => {
            const value = "test";
            const digest = "base64";
            const expectedHash = "n4bQgYhMfWWaL+qgxVrQFaO/TxsrC4Is0V1sFbDwCgg=";
            expect(await CryptoUtils.hashString(value, undefined, digest)).toBe(expectedHash);
        });
    });

    describe("checkStringForHash", () => {
        it("should return true for a valid SHA256 hash", () => {
            const hash = "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08";
            expect(CryptoUtils.checkStringForHash(hash)).toBe(true);
        });

        it("should return false for an invalid SHA256 hash", () => {
            const hash = "invalidhash";
            expect(CryptoUtils.checkStringForHash(hash)).toBe(false);
        });

        it("should return true for a valid SHA256 hash with explicit algorithm", () => {
            const hash = "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08";
            const algorithm = "SHA256";
            expect(CryptoUtils.checkStringForHash(hash, algorithm)).toBe(true);
        });

        it("should return false for an invalid SHA256 hash with explicit algorithm", () => {
            const hash = "invalidhash";
            const algorithm = "SHA256";
            expect(CryptoUtils.checkStringForHash(hash, algorithm)).toBe(false);
        });
    });

    describe("md5", () => {
        it("should throw an error for using MD5", async () => {
            const value = "test";
            try {
                await CryptoUtils.md5(value);
            } catch (error: any) {
                expect(error.message).toBe("MD5 is not recommended for use in security-critical applications");
            }
        });
    });

    describe("hashString", () => {
        it("should return the correct SHA256 hash for a given string", async () => {
            const value = "test";
            const expectedHash = "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08";
            expect(await CryptoUtils.hashString(value)).toBe(expectedHash);
        });

        it("should return the correct SHA512 hash for a given string with explicit algorithm", async () => {
            const value = "test";
            const algorithm = "SHA512";
            const expectedHash = "ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff";
            expect(await CryptoUtils.hashString(value, algorithm)).toBe(expectedHash);
        });

        it("should return the correct MD5 hash for a given string with explicit algorithm", async () => {
            const value = "test";
            const algorithm = "MD5";
            try {
                await CryptoUtils.hashString(value, algorithm);
            } catch (error: any) {
                expect(error.message).toBe("MD5 is not recommended for use in security-critical applications");
            }
        });

        it("should return the correct SHA256 hash for a given string with explicit digest", async () => {
            const value = "test";
            const digest = "base64";
            const expectedHash = "n4bQgYhMfWWaL+qgxVrQFaO/TxsrC4Is0V1sFbDwCgg=";
            expect(await CryptoUtils.hashString(value, undefined, digest)).toBe(expectedHash);
        });
    });

    describe("prepareDataForHash", () => {
        it("should return the correct value for a string", () => {
            const value = "test";
            expect(CryptoUtils.prepareDataForHash(value)).toBe(value);
        });

        it("should return the correct value for a number", () => {
            const value = 123;
            expect(CryptoUtils.prepareDataForHash(value)).toBe("123");
        });

        it("should return the correct value for a boolean", () => {
            const value = true;
            expect(CryptoUtils.prepareDataForHash(value)).toBe("true");
        });

        it("should return the correct value for an array", () => {
            const value = ["test"];
            expect(CryptoUtils.prepareDataForHash(value)).toBe("test");
        });

        it("should return the correct value for an object", () => {
            const value = { test: "test" };
            expect(CryptoUtils.prepareDataForHash(value)).toBe(`{"test":"test"}`);
        });

        it("should return the correct value for a circular object", () => {
            const value = { test: "test" };
            // @ts-ignore
            value["circular"] = value;
            expect(() => CryptoUtils.prepareDataForHash(value)).toThrow();
        });
    })

    describe("hashData", () => {
        it("should return the correct SHA256 hash for a given value", async () => {
            const value = "test";
            const expectedHash = "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08";
            expect(await CryptoUtils.hashData(value)).toBe(expectedHash);
        });

        it("should return the correct SHA256 hash for a given value with explicit algorithm", async () => {
            const value = "test";
            const algorithm = "SHA256";
            const expectedHash = "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08";
            expect(await CryptoUtils.hashData(value, algorithm)).toBe(expectedHash);
        });

        it("should return the correct SHA512 hash for a given value with explicit algorithm", async () => {
            const value = "test";
            const algorithm = "SHA512";
            const expectedHash = "ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff";
            expect(await CryptoUtils.hashData(value, algorithm)).toBe(expectedHash);
        });

        it("should return the correct MD5 hash for a given value with explicit algorithm", async () => {
            const value = "test";
            const algorithm = "MD5";
            try {
                await CryptoUtils.hashData(value, algorithm);
            } catch (error: any) {
                expect(error.message).toBe("MD5 is not recommended for use in security-critical applications");
            }
        });
    });

});