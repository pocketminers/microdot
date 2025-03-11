import { BaseTypes, HashedStorageItem, StorageItemSchema, StorageSchema } from "@component/base";

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


/**
 * The IdentifiableBaseType enum is a string enumeration that represents the base types that can be identified.
 */
enum IdentifiableBaseTypes {
    Command = "Command",
    Message = "Message",
    Job = "Job",
    Custom = "Custom"
}

type IdentifiableBaseType = keyof typeof IdentifiableBaseTypes;


interface IdentityStorageSchema<T = string>
    extends
        StorageSchema,
        Record<"id", Identifier>,
        Record<'type', IdentifiableBaseType> {}


type IdentityStorageItem = HashedStorageItem<BaseTypes.Identity, IdentityStorageSchema>;



export {
    type Identifier,
    IdentifierFormats,
    type IdentifierFormat,
    type IdentifiableBaseType,
    type IdentifiableBaseTypes,
    type IdentityStorageSchema,
    type IdentityStorageItem
}

