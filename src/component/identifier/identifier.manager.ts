import { ArgumentEntry, BaseTypes, HashedStorageItem, Manager, StorageItemIndex, StorageSchema } from "@component/base";
import { IdentityFactory } from "./identifier.factory";
import { IdentifiableBaseType, Identifier, IdentifierFormat, IdentityStorageItem, IdentityStorageSchema } from "./identifier.types";
import { IdentityStorage } from "./identifier.storage";
import { IdentityManagerParameters } from "./identifier.params";


class IdentityManager
    extends Manager<
        BaseTypes.Identity,
        IdentityFactory,
        IdentityStorage
    >
{
    constructor(args: ArgumentEntry[] = []) {
        super({
            type: BaseTypes.Identity,
            factory: new IdentityFactory(),
            storage: new IdentityStorage(),
            args,
            parameters: IdentityManagerParameters,
            dependencies: []
        })
    }

    public createId({
        format,
        options,
        type = BaseTypes.Custom,
    }:{
        format?: IdentifierFormat,
        options?: { prefix?: string, suffix?: string }
        type?: IdentifiableBaseType
    } = {}): StorageSchema {
        format = format !== undefined ? format : this.properties.getValue("defaultFormat");
        const id: {id: Identifier, type: IdentifiableBaseType } = IdentityFactory.create({format, options, type});

        const indexedItem = this.storage.addId({identifier: id.id, type: id.type});
        
        return indexedItem;
    }

    public createBulkIds({
        count,
        format,
        options,
        type
    }:{
        count: number,
        format?: IdentifierFormat,
        options?: { prefix?: string, suffix?: string }
        type?: IdentifiableBaseType
    }): Identifier[] {
        const ids: Identifier[] = [];

        for (let i = 0; i < count; i++) {
            ids.push(this.createId({format, options, type}).item.id);
        }

        return ids;
    }

    public getId({
        index,
        type
    }: {
        index?: StorageItemIndex[],
        type?: IdentifiableBaseType
    } = {}): Array<IdentityStorageSchema> {

        const items: Array<IdentityStorageSchema> = [];

        if (
            index !== undefined
            && type !== undefined
        ) {
            items.push(this.storage.getItem({index}));

            for(const item of items) {
                if (item.type !== type) {
                    items.splice(items.indexOf(item), 1);
                }
            }
        }

        else if (
            index !== undefined
            && type === undefined
        ) {
            items.push(this.storage.getItem({index}));
        }

        else if (
            index === undefined
            && type !== undefined
        ) {
            items.push(...this.storage.listItems().filter((item) => item.type === type));
        }

        else {
            items.push(...this.storage.listItems());
        }

        return items;
    }
}

export {
    IdentityManager
}

