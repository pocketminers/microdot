import { Base, BaseTypes } from "../src/component/base/base.types";
import { HashedStorageItem, HashedStorage } from "../src/component/base/hash";
import { MetadataEntry } from "../src/template";
import { CryptoUtils, MerkleTree } from "../src/utils";


describe("HashedStorage [No Mocks]", () => {
    beforeAll(() => {
        jest.clearAllMocks();
    });

    it("should initialize with correct type and items", () => {
        const item = new HashedStorageItem({ type: BaseTypes.Custom, data: "test-data", meta: { labels: new Map(), annotations: new Map() } });
        const storage = new HashedStorage({ type: BaseTypes.Custom, items: [item] });

        expect(storage.listItems()).toHaveLength(1);
        expect(storage.listItems()[0]).toBe(item);

    });

    it("should create a Merkle tree and return the root hash", async () => {
        const item = new HashedStorageItem({ type: BaseTypes.Custom, data: "test-data", meta: { labels: new Map(), annotations: new Map() } });
        const storage = new HashedStorage({ type: BaseTypes.Custom, items: [item] });

        const tree: MerkleTree<BaseTypes.Custom, any > = await storage.hashTree();
        const rootHash = tree.getRoot();

        expect(rootHash).toBe("a186000422feab857329c684e9fe91412b1a5db084100b37a98cfc95b62aa867");
    });

    it("should handle an odd number of leaves", async () => {
        const items = [
            new HashedStorageItem({ type: BaseTypes.Custom, data: "a", meta: { labels: new Map(), annotations: new Map() } }),
            new HashedStorageItem({ type: BaseTypes.Custom, data: "b", meta: { labels: new Map(), annotations: new Map() } }),
            new HashedStorageItem({ type: BaseTypes.Custom, data: "c", meta: { labels: new Map(), annotations: new Map() } }),
        ];

        const storage = new HashedStorage({ type: BaseTypes.Custom, items });
        const tree = await storage.hashTree();

        expect(tree.getRoot()).toBe("d71dc32fa2cd95be60b32dbb3e63009fa8064407ee19f457c92a09a5ff841a8a");
    });
});