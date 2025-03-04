import { BaseTypes } from "@component/base";
import { Factory } from "@component/factory";
import { Storage } from "@component/storage";
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
    extends Factory<BaseTypes.Identity, Identifier>
{
    constructor() {
        super(BaseTypes.Identity);
    }

    public create({
        format,
        options = {
            prefix: "",
            suffix: ""
        }
    }: {
        format?: IdentifierFormat,
        options?: {
            prefix?: string,
            suffix?: string
        }
    } = {}): Identifier {
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

        return identifier;
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


class IdentityStorage
    extends Storage<BaseTypes.Identity, Identifier>
{
    constructor(items: Identifier[] = []) {
        super({ type: BaseTypes.Identity, items });
    }

    public get ids(): Set<Identifier> {
        return new Set(this.listItems());
    }

    public addId(identifier: Identifier): void {
        this.addItem({index: identifier, item: identifier});
    }

    public hasId(identifier: Identifier): boolean {
        try {
            if (this.getItem(identifier)) {
                return true;
            }
        } catch (error) {
            return false;
        }

        return false;
    }

    public removeId(identifier: Identifier): void {
        this.removeItem({item: identifier} );
    }

    public listIds(): Identifier[] {
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
    extends Manager
    <
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

    public createId(format?: IdentifierFormat, options?: { prefix?: string, suffix?: string }): string {
        format = format !== undefined ? format : this.properties.getValue("defaultFormat");
        const id = this.factory.create({format, options});

        this.storage.addId(id);
        
        return id;
    }
}


export {
    type Identifier,
    IdentifierFormats,
    type IdentifierFormat,
    IdentityManagerParameters,
    IdentityFactory,
    IdentityStorage,
    IdentityManager
}

