import { v4 as uuidv4 } from "uuid";

/**
 * The Identifier type is a string that is used to uniquely identify an object.
 */
type Identifier = string;

enum IdentifierTypes {
    UUID = "UUID",
    Random = "Random",
    Name = "Name",
    Password = "Password"
}

/**
 * The IdentifierType type is a string that is used to specify the type of identifier to create.
 */
type IdentifierType = keyof typeof IdentifierTypes;

/**
 * Creates a new identifier.
 * @summary Creates a new identifier with the specified type.
 * @param type The type of identifier to create.
 * @param prefix The prefix to add to the identifier.
 * @param suffix The suffix to add to the identifier.
 * @returns The new identifier.
 */
const createIdentifier = (
    type: IdentifierType = "UUID",
    {
        prefix,
        suffix
    } : {prefix?: string, suffix?: string} = {}
): Identifier => {
    let id = "";

    switch(type) {
        case "UUID":
            id = uuidv4();
            break;
        case "Name":
            id = `${Math.floor(Math.random() * 1000000)}`;
            break;
        case "Random":
            id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            break;
        case "Password":
            id =  Math.random().toString(36).substring(2, 4) + "-" + Math.random().toString(36).substring(2, 4) + "-" + Math.random().toString(36).substring(2, 4) + "-" + Math.random().toString(36).substring(2, 4);
            break;
        default:
            id = createIdentifier("UUID");
            break;
    }
    return `${prefix ? prefix : ""}${id}${suffix ? suffix : ""}`;
};

export {
    type Identifier,
    createIdentifier,
    type IdentifierType,
    IdentifierTypes
};