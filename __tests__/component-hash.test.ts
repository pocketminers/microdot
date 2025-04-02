import { Base, BaseTypes } from "../src/component/base/base.types";
import { HashedStorageItem, HashedStorage } from "../src/component/base/hash";
import { MetadataEntry } from "../src/template";
import { CryptoUtils, MerkleTree } from "../src/utils";

jest.mock("../src/utils/crypto");

describe("HashedStorageItem [Mocks]", () => {

    const mockData = "test-data";
    const mockMeta: MetadataEntry = { labels: new Map(), annotations: new Map() };
    const mockType = BaseTypes.Custom;

    it("should initialize with correct data and meta", () => {
        const item = new HashedStorageItem({ type: mockType, data: mockData, meta: mockMeta });
        expect(item.data).toBe(mockData);
        expect(item.meta).toBeDefined();
    });

    it("should hash data correctly", async () => {
        const hashedValue = "hashed-value";
        (CryptoUtils.hashData as jest.Mock).mockResolvedValue(hashedValue);

        const item = new HashedStorageItem({ type: mockType, data: mockData, meta: mockMeta });
        const hash = await item.hashData();

        expect(hash).toBe(hashedValue);
        expect(item.hash).toBe(hashedValue);
    });

    it("should throw error on hash mismatch", async () => {
        const hashedValue = "hashed-value";
        (CryptoUtils.hashData as jest.Mock).mockResolvedValue(hashedValue);

        const item = new HashedStorageItem({ type: mockType, data: mockData, meta: mockMeta });
        item.hash = "different-hash";

        await expect(item.hashData()).rejects.toThrow("Hash mismatch");
    });
});

describe("HashedStorage [Mocks]", () => {
    jest.mock("../src/utils/crypto");
    const mockData = "test-data";
    const mockMeta: MetadataEntry = { labels: new Map(), annotations: new Map() };
    const mockType = BaseTypes.Custom;

    it("should initialize with correct type and items", () => {
        const item = new HashedStorageItem({ type: mockType, data: mockData, meta: mockMeta });
        const storage = new HashedStorage({ type: mockType, items: [item] });

        expect(storage.listItems()).toHaveLength(1);
        expect(storage.listItems()[0]).toBe(item);
    });

    it("should create a Merkle tree and return the root hash", async () => {
        const item = new HashedStorageItem({ type: mockType, data: mockData, meta: mockMeta });
        const storage = new HashedStorage({ type: mockType, items: [item] });

        const hashedValue = "hashed-value";
        (CryptoUtils.hashData as jest.Mock).mockResolvedValue(hashedValue);

        const tree = await storage.hashTree();
        const rootHash = tree.getRoot();

        expect(rootHash).toBe(hashedValue);
    });
});