import { ParameterEntry } from "../base";
import { IdentifierFormats } from "./identifier.types";

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


export {
    IdentityManagerParameters
}