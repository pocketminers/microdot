
import { BaseTypes, Factory } from "../base";
import { IdentifiableBaseTypes, Identifier, IdentifierFormat } from "./identifier.types";



class IdentityFactory
    extends Factory<BaseTypes.Identity>
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


export {
    IdentityFactory,
}

