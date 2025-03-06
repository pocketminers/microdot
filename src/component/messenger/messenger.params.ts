import { ParameterEntry } from "@component/base";


const MessageManagerConfigParameters: ParameterEntry[] = [
    {
        name: "keepHistory",
        description: "Whether to keep the history of the communicator.",
        type: "boolean",
        defaultValue: false,
        required: false
    },
    {
        name: "historySize",
        description: "The maximum size of the history.",
        type: "number",
        defaultValue: 100,
        required: false
    },
    {
        name: "historyFilePath",
        description: "The file path to save the history.",
        type: "string",
        defaultValue: "./history.json",
        required: false
    },
    {
        name: "publish",
        description: "Whether to publish the messages.",
        type: "boolean",
        defaultValue: false,
        required: false
    }
];

export {
    MessageManagerConfigParameters
};