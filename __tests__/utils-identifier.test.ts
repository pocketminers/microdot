import { createIdentifier, IdentifierTypes } from "../src/utils/identifier";

describe("createIdentifier", () => {
    it("should create a UUID identifier by default", () => {
        const id = createIdentifier();
        expect(id).toMatch(
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
        );
    });

    it("should create a Name identifier", () => {
        const id = createIdentifier("Name");
        expect(id).toMatch(/^\d{1,6}$/);
    });

    it("should create a Random identifier", () => {
        const id = createIdentifier("Random");
        expect(id).toMatch(/^[a-z0-9]{26}$/);
    });

    it("should create a Password identifier", () => {
        const id = createIdentifier("Password");
        expect(id).toMatch(/^[a-z0-9]{2}-[a-z0-9]{2}-[a-z0-9]{2}-[a-z0-9]{2}$/);
    });

    it("should create an identifier with a prefix", () => {
        const prefix = "prefix-";
        const id = createIdentifier("UUID", { prefix });
        expect(id.startsWith(prefix)).toBe(true);
    });

    it("should create an identifier with a suffix", () => {
        const suffix = "-suffix";
        const id = createIdentifier("UUID", { suffix });
        expect(id.endsWith(suffix)).toBe(true);
    });

    it("should create an identifier with both prefix and suffix", () => {
        const prefix = "prefix-";
        const suffix = "-suffix";
        const id = createIdentifier("UUID", { prefix, suffix });
        expect(id.startsWith(prefix)).toBe(true);
        expect(id.endsWith(suffix)).toBe(true);
    });

    it("should default to UUID if an invalid type is provided", () => {
        const id = createIdentifier("InvalidType" as any);
        expect(id).toMatch(
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
        );
    });

    it("should return the UUID type", () => {
        const type = IdentifierTypes.UUID;
        expect(type).toBe("UUID");
    });

    it("should return the Random type", () => {
        const type = IdentifierTypes.Random;
        expect(type).toBe("Random");
    });

    it("should return the Name type", () => {
        const type = IdentifierTypes.Name;
        expect(type).toBe("Name");
    });

    it("should return the Password type", () => {
        const type = IdentifierTypes.Password;
        expect(type).toBe("Password");
    });

    it("should return the UUID type as a key", () => {
        const type = "UUID";
        expect(IdentifierTypes[type]).toBe("UUID");
    });
});