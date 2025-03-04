import { BaseType, BaseTypes } from "@component/base";
import { Factory } from "@component/factory";
import { Storage, StorageItemIndex } from "@component/storage";
import { ArgumentEntry, ParameterEntry } from "@component/properties";
import { Manager } from "@component/manager";


/**
 * The IdentifierFormats enum is a string enumeration that represents the available identifier formats.
 */
enum IdentifierFormats {
    UUID = "UUID",
    Random = "Random",
    Name = "Name",
    Timestamp = "Timestamp",
    Password = "Password"
}


/**
 * The IdentifierFormats type is a string that is used to specify the type of identifier to create.
 */
type IdentifierFormat = keyof typeof IdentifierFormats;


/**
 * The Identifier type is a string that represents a unique identifier.
 */
type Identifier = string;


class IdentityFactory
    extends Factory<BaseTypes.Identity, {id: Identifier, type: IdentifiableBaseTypes}>
{
    constructor() {
        super(BaseTypes.Identity);
    }

    public create({
        format,
        options = {
            prefix: "",
            suffix: ""
        },
        type = undefined
    }: {
        format?: IdentifierFormat,
        options?: {
            prefix?: string,
            suffix?: string
        },
        type?: IdentifiableBaseTypes
    } = {}): {
        id: Identifier,
        type: IdentifiableBaseTypes
    } {
        const prefix = options?.prefix || "";
        const suffix = options?.suffix || "";

        let identifier = prefix

        switch (format) {
            case "UUID":
                identifier += IdentityFactory.createUUID();
                break;
            case "Random":
                identifier += IdentityFactory.createRandom();
                break;
            case "Timestamp":
                identifier += IdentityFactory.createTimestamp();
                break;
            case "Name":
                identifier += IdentityFactory.createName();
                break;
            default:
                throw new Error(`Invalid identifier format: ${format}`);
        }

        identifier += suffix;

        if (type === undefined) {
            return {
                id: identifier,
                type: BaseTypes.Custom
            };
        }

        return {
            id: identifier,
            type
        };
    }

    private static createUUID(): string {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    private static createRandom(): string {
        return Math.random().toString(36).substring(2);
    }

    private static createTimestamp(): string {
        return Date.now().toString();
    }

    private static createName(): string {
        return Math.random().toString(36).substring(2);
    }

}

type IdentifiableBaseTypes = BaseTypes.Command | BaseTypes.Message | BaseTypes.Job | BaseTypes.Custom;


interface IdentityStorageItem
    extends 
        Record<"id", Identifier>,
        Record<'type', IdentifiableBaseTypes> {}


class IdentityStorage
    extends Storage<BaseTypes.Identity, IdentityStorageItem>
{
    constructor(items: IdentityStorageItem[] = []) {
        super({ type: BaseTypes.Identity, items });
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
            if (this.getItem({value: identifier})) {
                return true;
            }
        } catch (error) {
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


const IdentityManagerParameters: ParameterEntry[] = [
    {
        name: "defaultFormat",
        description: "The default format of the identifier.",
        type: "string",
        defaultValue: "UUID",
        required: false,
        optionalValues: [...Object.keys(IdentifierFormats)]
    }
];


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
            parameters: IdentityManagerParameters,
            args
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
}


export {
    type Identifier,
    IdentifierFormats,
    type IdentifierFormat,
    IdentityManagerParameters,
    type IdentifiableBaseTypes,
    type IdentityStorageItem,
    IdentityFactory,
    IdentityStorage,
    IdentityManager
}

