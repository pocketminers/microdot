import { ArgumentEntry, BaseTypes, Manager, StorageItemIndex } from "@component/base";
import { IdentityFactory } from "./identifier.factory";
import { IdentifiableBaseTypes, Identifier, IdentifierFormat } from "./identifier.types";
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
            storage: new IdentityStorage({
                type: BaseTypes.Identity,
                params: new IdentityManagerParameters()
            })
        })
    }

    public createId({
        format,
        options,
        type = BaseTypes.Custom,
    }:{
        format?: IdentifierFormat,
        options?: { prefix?: string, suffix?: string }
        type?: IdentifiableBaseTypes
    } = {}): {
        index:  StorageItemIndex,
        item: { id: Identifier, type: IdentifiableBaseTypes }
     } {
        format = format !== undefined ? format : this.properties.getValue("defaultFormat");
        const id: {id: Identifier, type: IdentifiableBaseTypes } = this.factory.create({format, options, type});

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
        type?: IdentifiableBaseTypes
    }): Identifier[] {
        const ids: Identifier[] = [];

        for (let i = 0; i < count; i++) {
            ids.push(this.createId({format, options, type}).item.id);
        }

        return ids;
    }

    public getStorage() {
        return this.storage
    }
}

export {
    IdentityManager
}

