import { BaseTypes } from "@component/base";

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


type IdentifiableBaseTypes = BaseTypes.Command | BaseTypes.Message | BaseTypes.Job | BaseTypes.Custom;


interface IdentityStorageItem
    extends 
        Record<"id", Identifier>,
        Record<'type', IdentifiableBaseTypes> {}



export {
    type Identifier,
    IdentifierFormats,
    type IdentifierFormat,
    type IdentifiableBaseTypes,
    type IdentityStorageItem
}

