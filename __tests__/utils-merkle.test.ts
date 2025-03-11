import { MerkleTree } from "../src/utils/merkle";
import { HashedStorageItem } from "../src/component/base/hash";
import { CryptoUtils } from "../src/utils";
import { BaseTypes } from "../src/component/base/base.types";
import { StorageItemSchema } from "../src/component/base";

jest.mock("@/utils/crypto");



class MockHashedStorageItem extends HashedStorageItem<BaseTypes.Custom, StorageItemSchema> {
    constructor(data: string) {
        super({
            type: BaseTypes.Custom,
            data: data as StorageItemSchema,
            meta: { labels: new Map(), annotations: new Map() },
        });
    }

    async hashData(): Promise<string> {
        return CryptoUtils.hashData(this.data);
    }
}

describe("MerkleTree", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should build the tree correctly", async () => {
        const items = [
            new MockHashedStorageItem("a"),
            new MockHashedStorageItem("b"),
            new MockHashedStorageItem("c"),
            new MockHashedStorageItem("d"),
        ];

        CryptoUtils.hashData = jest.fn().mockImplementation((data) => Promise.resolve(`hash(${data})`));

        const tree = new MerkleTree(items);
        await tree.initialize();

        expect(CryptoUtils.hashData).toHaveBeenCalledTimes(7);
        expect(tree.getRoot()).toBe("hash(hash(hash(a)hash(b))hash(hash(c)hash(d)))");
    });

    it("should handle an odd number of leaves", async () => {
        const items = [
            new MockHashedStorageItem("a"),
            new MockHashedStorageItem("b"),
            new MockHashedStorageItem("c"),
        ];

        CryptoUtils.hashData = jest.fn().mockImplementation((data) => Promise.resolve(`hash(${data})`));

        const tree = new MerkleTree(items);
        await tree.initialize();

        expect(CryptoUtils.hashData).toHaveBeenCalledTimes(5);
        expect(tree.getRoot()).toBe("hash(hash(hash(a)hash(b))hash(c))");
    });

    it("should throw an error if getRoot is called before the tree is built", () => {
        const items = [
            new MockHashedStorageItem("a"),
            new MockHashedStorageItem("b"),
        ];

        const tree = new MerkleTree(items);

        expect(() => tree.getRoot()).toThrow("Merkle tree has not been built.");
    });
});