import { HashedStorage, HashedStorageItem, Storage, StorageItemIndex } from "../base";
import { BaseTypes } from "../base/base.types";

import { IdentifiableBaseType, Identifier, IdentityStorageItem, IdentityStorageSchema } from "./identifier.types";




class IdentityStorage
    extends HashedStorage<BaseTypes.Identity, IdentityStorageSchema>
{
    constructor({
        items = []
    }: {
        items?: IdentityStorageItem[]
    } = {
        items: []
    }) {
        super({
            type: BaseTypes.Identity
        });

        items.forEach((item) => {
            this.addItem({item});
        });
    }

    public get ids(): Set<IdentityStorageSchema> {
        const idEntries: IdentityStorageItem[] = this.listItems();

        const formattedIds = new Set<IdentityStorageSchema>();

        idEntries.forEach((idEntry: IdentityStorageItem) => {
            formattedIds.add(idEntry.data);
        });

        return formattedIds;
    }

    public addId({
        identifier,
        type
    }:{
        identifier: Identifier,
        type: IdentifiableBaseType
    }): {index: StorageItemIndex, item: IdentityStorageItem} {
        const newItem: IdentityStorageSchema = {
            id: identifier,
            type
        };
        const item = new HashedStorageItem<BaseTypes.Identity, IdentityStorageSchema>({
            type: BaseTypes.Identity,
            data: newItem
        });
        return this.addItem({ item });
    }

    public hasId(identifier: {id: Identifier, type: IdentifiableBaseType}): boolean {
        try {
            const item = this.ids;
            if (item.has(identifier)) {
                return true;
            }
        }
        catch (error) {
            return false;
        }


        return false;
    }       

    public removeId(identifier: {id: Identifier, type: IdentifiableBaseType}): void {
        const item = this.listItems().find(item => item.data.id === identifier.id && item.data.type === identifier.type);
        if (item) {
            this.removeItem({ item });
        }
    }
}


export {
    IdentityStorage
};
