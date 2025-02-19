import { Configurable } from "@/component/configurable";
import { ArgumentEntry, Properties } from "./properties";


class IdentityFactory {
    public static createIdentifier(
        format?: string,
        options?: {
            prefix?: string,
            suffix?: string 
        }
    ): string {
        const prefix = options?.prefix || "";
        const suffix = options?.suffix || "";

        let identifier = prefix

        switch (format) {
            case "uuid":
                identifier += IdentityFactory.createUUID();
                break;
            case "random":
                identifier += IdentityFactory.createRandom();
                break;
            case "timestamp":
                identifier += IdentityFactory.createTimestamp();
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
        defaultValue: "uuid",
        required: false,
        optionalValues: ["uuid", "random", "timestamp"]
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

    public createId(format?: string, options?: { prefix?: string, suffix?: string }): string {
        format = format !== undefined ? format : this.properties.getValue("defaultFormat");
        const id = IdentityFactory.createIdentifier(format, options);

        this.addId(id);
        
        return id;
    }
}


export {
    IdentityManagerParameters,
    IdentityFactory,
    IdentityStore,
    IdentityManager
}

