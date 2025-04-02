import { ParameterEntry } from "../base";

const MessageConfigParameters: ParameterEntry[] = [
    {
        name: "print",
        description: "Whether to print the message to the console.",
        type: "boolean",
        defaultValue: true,
        required: false
    },
    {
        name: "save",
        description: "Whether to save the message to the history.",
        type: "boolean",
        defaultValue: true,
        required: false
    },
    {
        name: "throw",
        description: "Whether to throw an error.",
        type: "boolean",
        defaultValue: false,
        required: false
    },
    {
        name: "publish",
        description: "Whether to publish the message.",
        type: "boolean",
        defaultValue: false,
        required: false
    },
    {
        name: "publishTo",
        description: "The destination to publish the message.",
        type: "string",
        defaultValue: "",
        required: false
    }
];


export {
    MessageConfigParameters
};