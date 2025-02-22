import { ArgumentEntry, Properties } from "./properties";

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


class IdentityFactory {
    public static createIdentifier({
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
    } = {}): string {
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


class IdentityStore {
    public ids: Set<string>;

    constructor() {
        this.ids = new Set();
    }

    public addId(identifier: string): void {
        this.ids.add(identifier);
    }

    public hasId(identifier: string): boolean {
        return this.ids.has(identifier);
    }

    public removeId(identifier: string): void {
        this.ids.delete(identifier);
    }

    public clear(): void {
        this.ids.clear();
    }

    public listIds(): string[] {
        return Array.from(this.ids);
    }

    public get size(): number {
        return this.ids.size;
    }
}


const IdentityManagerParameters = [
    {
        name: "defaultFormat",
        description: "The default format of the identifier.",
        type: "string",
        defaultValue: "UUID",
        required: false,
        optionalValues: ["UUID", "Random", "Name", "Timestamp", "Password"]
    }
];


class IdentityManager
    extends IdentityStore
{
    private properties: Properties;

    constructor(args: ArgumentEntry[] = []) {
        super();

        this.properties = new Properties({ params: IdentityManagerParameters, args });
    }

    public createId(format?: IdentifierFormat, options?: { prefix?: string, suffix?: string }): string {
        format = format !== undefined ? format : this.properties.getValue("defaultFormat");
        const id = IdentityFactory.createIdentifier({format, options});

        this.addId(id);
        
        return id;
    }
}


export {
    IdentifierFormats,
    type IdentifierFormat,
    IdentityManagerParameters,
    IdentityFactory,
    IdentityStore,
    IdentityManager
}

