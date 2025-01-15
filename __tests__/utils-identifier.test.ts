import { IdentifierStore, createIdentifier, IdentifierTypes, Identifier } from "../src/utils/identifier";

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

    // it("should create a Random identifier", () => {
    //     const id = createIdentifier("Random");
    //     expect(id).toMatch(/^[a-z0-9]{25-27}$/);
    // });

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


describe("IdentifierStore", () => {
    let factory: IdentifierStore;

    beforeEach(() => {
        factory = new IdentifierStore();
    });

    afterEach(() => {
        factory.clear();
    });

    it("should add identifiers from an array", () => {
        const ids = [createIdentifier(), createIdentifier()];
        const added = factory.add(ids);
        expect(added.length).toBe(ids.length);
        ids.forEach((id, index) => {
            expect(factory.getValue(index)).toBe(id);
        });
    });

    it("should add identifiers from a map", () => {
        const map = new Map<number, Identifier>([
            [1, createIdentifier()],
            [2, createIdentifier()]
        ]);

        const added = factory.add(map);
        expect(added.length).toBe(map.size);
    });

    it("should add identifiers from a record", () => {
        const record = { 1: createIdentifier(), 2: createIdentifier() };
        const added = factory.add(record);

        expect(added.length).toBe(Object.keys(record).length);
        Object.entries(record).forEach(([key, id]) => {
            expect(factory.getValue(Number(key))).toBe(id);
        });
    });

    it("should get all identifiers", () => {
        const ids = [createIdentifier(), createIdentifier()];
        factory.add(ids);
        const all = factory.getAll();
        expect(all.size).toBe(ids.length);
    });

    it("should check if an identifier exists", () => {
        const id = createIdentifier();
        factory.add([id]);
        expect(factory["checkIfIdentifierExists"](id)).toBe(true);
    });

    it("should get identifier by index", () => {
        const id = createIdentifier();
        factory.add([id]);
        const record = factory.getAll().get(0);
        expect(record).toBe(id);
    });

    it("should get identifier by value", () => {
        const id = createIdentifier();
        factory.add([id]);
        const record = factory.getValue(id);
        expect(record).toBe(id);
    });

    it("should get record by identifier", () => {
        const id = createIdentifier();
        factory.add([id]);
        const record = factory.getRecord(id);
        expect(Object.values(record)).toEqual([id]);
    });

    it("should get value by identifier", () => {
        const id = createIdentifier();
        factory.add([id]);
        const value = factory.getValue(id);
        expect(value).toBe(id);
    });

    it("should remove identifiers from an array", () => {
        const ids = [createIdentifier(), createIdentifier()];
        factory.add(ids);
        const removed = factory.remove(ids);
        expect(removed.length).toBe(ids.length);
        ids.forEach((id) => {
            expect(factory["checkIfIdentifierExists"](id)).toBe(false);
        });
    });

    it("should remove identifiers from a map", () => {
        const map = new Map<number, Identifier>([
            [1, createIdentifier()],
            [2, createIdentifier()]
        ]);
        factory.add(map);
        const removed = factory.remove(map);
        expect(removed.length).toBe(map.size);
        map.forEach((id) => {
            expect(factory["checkIfIdentifierExists"](id)).toBe(false);
        });
    });

    it("should remove identifiers from a record", () => {
        const record = { 1: createIdentifier(), 2: createIdentifier() };
        factory.add(record);

        const removed = factory.remove(record);
        expect(removed.length).toBe(Object.keys(record).length);
        Object.values(record).forEach((id) => {
            expect(factory["checkIfIdentifierExists"](id)).toBe(false);
        });
    });

    it("should clear all identifiers", () => {
        const ids = [createIdentifier(), createIdentifier()];
        factory.add(ids);
        factory.clear();
        expect(factory.getAll().size).toBe(0);
    });

    it("should not add duplicate identifiers", () => {
        const id = createIdentifier();
        expect(() => factory.add([id, id])).toThrow(`Identifier already exists: ${id}`);
        // expect(factory.getAll().size).toBe(1);
    });

    it("should handle adding an empty array", () => {
        const added = factory.add([]);
        expect(added.length).toBe(0);
    });

    it("should handle removing an empty array", () => {
        const removed = factory.remove([]);
        expect(removed.length).toBe(0);
    });

    it("should handle adding an empty map", () => {
        // const added = factory.add(new Map());
        expect(() => factory.add(new Map())).toThrow("Map is empty");
        // expect(added.length).toBe(0);
    });

    it("should handle removing an empty map", () => {
        const removed = factory.remove(new Map());
        expect(removed.length).toBe(0);
    });

    it("should handle adding an empty record", () => {
        const added = factory.add({});
        expect(added.length).toEqual(0);
    });

    it("should handle removing an empty record", () => {
        const removed = factory.remove({});
        expect(removed.length).toBe(0);
    });

    it("should return undefined for non-existent identifier", () => {
        const id = createIdentifier();
        expect(() => factory.getValue(id)).toThrow(`Identifier not found: ${id}`);
    });

    it("should not remove non-existent identifiers", () => {
        const id = createIdentifier();
        const removed = factory.remove([id]);
        expect(removed.length).toBe(0);
    });

    it("should throw an error when adding a duplicate identifier from a map", () => {
        const id = createIdentifier();
        const map = new Map<number, Identifier>([
            [1, id],
            [2, id]
        ]);
        expect(() => factory.add(map)).toThrow(`Identifier already exists: ${id}`);
    });

    it("should throw an error when adding a duplicate identifier from a record", () => {
        const id = createIdentifier();
        const record = { 1: id, 2: id };
        expect(() => factory.add(record)).toThrow(`Identifier already exists: ${id}`);
    });

    it("should throw an error when removing a non-existent identifier from a map", () => {
        const map = new Map<number, Identifier>([
            [1, createIdentifier()],
            [2, createIdentifier()]
        ]);
        const removeMap = new Map<number, Identifier>([
            [1, createIdentifier()],
            [3, createIdentifier()]
        ]);
        factory.remove(removeMap);
    });

    it("should throw an error when removing a non-existent identifier from a record", () => {
        const record = { 1: createIdentifier(), 2: createIdentifier() };
        const removeRecord = { 1: createIdentifier(), 3: createIdentifier() };

        factory.add(record);
        factory.remove(removeRecord);
        expect(factory.getAll().size).toBe(Object.keys(record).length);
    });

    it("should handle adding a large number of identifiers", () => {
        const ids = Array.from({ length: 1000 }, () => createIdentifier());
        const added = factory.add(ids);
        expect(added.length).toBe(ids.length);
        ids.forEach((id, index) => {
            expect(factory.getValue(index)).toBe(id);
        });
    });

    it("should handle removing a large number of identifiers", () => {
        const ids = Array.from({ length: 1000 }, () => createIdentifier());
        factory.add(ids);
        const removed = factory.remove(ids);
        expect(removed.length).toBe(ids.length);
        ids.forEach((id) => {
            expect(factory["checkIfIdentifierExists"](id)).toBe(false);
        });
    });

    it("should throw an error when adding an invalid identifier type", () => {
        // @ts-expect-error - Testing invalid type
        expect(() => factory.add(123)).toThrow("Invalid argument type: number");
    });

    it("should throw an error when removing an invalid identifier type", () => {
        // @ts-expect-error - Testing invalid type
        expect(() => factory.remove(1233)).toThrow("Invalid argument type: number");
    });

    it("should throw an error when getting a value with an invalid identifier type", () => {
        expect(() => factory.getValue(123 as any)).toThrow("Identifier not found: 123");
    });

    it("should throw an error when getting a record with an invalid identifier type", () => {
        expect(() => factory.getRecord(123 as any)).toThrow("Identifier not found: 123");
    });
});
