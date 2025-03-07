import { Storage, StorageItemIndex } from "../base";
import { BaseTypes } from "../base/base.types";

import { IdentifiableBaseTypes, Identifier, IdentityStorageItem } from "./identifier.types";

class IdentityStorage
    extends Storage<BaseTypes.Identity, IdentityStorageItem>
{
    constructor(items: IdentityStorageItem[] = []) {
        super(BaseTypes.Identity);

        items.forEach((item) => {
            this.addItem({item});
        });
    }

    public get ids(): Set<IdentityStorageItem> {
        return new Set(this.listItems());
    }

    public addId({
        identifier,
        type
    }:{
        identifier: Identifier,
        type: IdentifiableBaseTypes
    }):  {index: StorageItemIndex, item: IdentityStorageItem} {
        return this.addItem({item: {id: identifier, type}});
    }

    public hasId(identifier: {id: Identifier, type: IdentifiableBaseTypes}): boolean {
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

    public removeId(identifier: {id: Identifier, type: IdentifiableBaseTypes}): void {
        this.removeItem({item: identifier} );
    }

    public listIds(): IdentityStorageItem[] {
        return this.listItems();
    }
}


export {
    IdentityStorage
};
