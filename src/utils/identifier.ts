import { v4 as uuidv4 } from "uuid";


type Identifier = string;

enum IdentifierTypes {
    UUID = "UUID",
    Random = "Random",
    Name = "Name",
    Password = "Password"
}

type IdentifierType = keyof typeof IdentifierTypes;

const createIdentifier = (
    type: IdentifierType = "UUID",
    {prefix, suffix} : {prefix?: string, suffix?: string} = {}
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