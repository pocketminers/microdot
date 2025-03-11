import { BaseTypes, StorageItemSchema } from "@/component";
import { HashedStorageItem } from "@/component/base/hash";
import { CryptoUtils } from "@/utils";

class MerkleTree<
    T extends BaseTypes,
    D extends StorageItemSchema,
    E extends HashedStorageItem<T,D> = HashedStorageItem<T,D>,
> {
    private leaves: E[];
    private tree: string[][];

    constructor(items: E[]) {
        this.leaves = items;
        this.tree = [];
    }

    public async initialize(): Promise<void> {
        await this.buildTree();
    }

    private async buildTree(): Promise<void> {
        let currentLevel = await Promise.all(this.leaves.map(item => item.hashData()));
        this.tree.push(currentLevel);

        while (currentLevel.length > 1) {
            currentLevel = await this.hashLevel(currentLevel);
            this.tree.push(currentLevel);
        }
    }

    private async hashLevel(level: string[]): Promise<string[]> {
        const hashedLevel: string[] = [];

        for (let i = 0; i < level.length; i += 2) {
            if (i + 1 < level.length) {
                const combinedHash = await CryptoUtils.hashData(level[i] + level[i + 1]);
                hashedLevel.push(combinedHash);
            } else {
                hashedLevel.push(level[i]);
            }
        }

        return hashedLevel;
    }

    public getRoot(): string {
        if (this.tree.length === 0) {
            throw new Error("Merkle tree has not been built.");
        }
        return this.tree[this.tree.length - 1][0];
    }
}

export { MerkleTree };