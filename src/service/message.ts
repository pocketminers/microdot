import { ArgumentEntry, Component, Configurable, ParameterEntry, Properties } from "@/component";
import { MessageLevel, MessageLevels, MessageSpec, MessageStatus, MessageStatuses } from "@/template/spec/v0/comms";


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
    }
];

interface MessageEntry<
    L extends MessageLevel = MessageLevels.Info,
    S extends MessageStatus = MessageStatuses.Success,
    T = any | undefined
>
    extends
        Record<'body', T>,
        Partial<Record<'args', ArgumentEntry[]>>,
        Partial<Record<'level', L>>,
        Partial<Record<"status", S>> {}



class Message<
    L extends MessageLevel = MessageLevels.Info,
    S extends MessageStatus = MessageStatuses.Success,
    T = any | undefined
> implements MessageEntry<L, S, T> {
    public level: L;
    public properties: Properties;
    public body: T;
    public status: S;
    public timestamp: Date = new Date();

    constructor({
        level,
        body,
        status,
        args
    }: {
        level?: L,
        body: T,
        status?: S,
        args?: ArgumentEntry[]
    }) {
        this.level = level as L;
        this.properties = new Properties({ params: MessageConfigParameters, args });
        this.body = body;
        this.status = status as S;

        // this.checkStatus();

        this.print();
        this.throw();
    }

    private checkStatus(): void {
        if (
            this.status !== 'Success'
            && (
                this.level !== MessageLevels.Error
                && this.level !== MessageLevels.Warn
            )
        ) {
            throw new Error(`Message:checkStatus: The message status is not an error or warning: ${this.status}`);
        }
    }

    public print(): void {
        if (this.properties.getValue("print") === true) {
            console.log(`${this.body}`);
        }
    }

    public throw(): void {
        if (
            this.properties.getValue("throw") === true
            && this.level === MessageLevels.Error
        ) {
            throw new Error(`${this.body}`);
        }
    }
}


class MessageFactory {

    public static createMessage<
        L extends MessageLevel = MessageLevels.Info,
        S extends MessageStatus = 'Success',
        T = any | undefined
    >({
        level,
        body,
        status,
        args
    }: MessageEntry<L, S, T>): Message<L, S, T> {
        return new Message<L,S,T>({ level, body, status, args });
    }
}


class MessageStore {
    public messages: Message<any, any>[] = [];

    constructor() {
        this.messages = [];
    }

    public addMessage(
        message: Message< any, any, any>): void
    {
        this.messages.push(message);
    }

    public clear(): void {
        this.messages = [];
    }

    public getMessages({
        level = 'All',
        status = 'All',
        date = {
            after: new Date(0),
            before: new Date(),
        },
        limit = 100
    }: {
        level?: MessageLevel | 'All',
        status?: MessageStatus | 'All',
        date?: {
            after: Date,
            before: Date
        },
        limit?: number
    } = {}): Message<any, any>[] {
        // Filter the messages by level or "All"
        let filteredMessages = [];

        switch (level) {
            case 'All':
                filteredMessages = this.messages;
                break;
            default:
                filteredMessages =  this.messages.filter((message) => message.level === level);
                break;
        }

        // Filter the messages by status or "All"
        switch (status) {
            case 'All':
                filteredMessages = filteredMessages;
                break;
            default:
                filteredMessages = filteredMessages.filter((message) => message.status === status);
        }

        // Filter the messages by date
        filteredMessages = filteredMessages.filter((message) => {
            return message.timestamp >= date.after && message.timestamp <= date.before;
        });

        // Limit the number of messages
        if (filteredMessages.length > limit) {
            filteredMessages = filteredMessages.slice(0, limit);
        }

        return filteredMessages;
    }
}


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
    }
];

class MessageManager
    extends MessageStore
{
    private properties: Properties;

    constructor(args: ArgumentEntry[] = []) {
        super();

        this.properties = new Properties({ params: MessageManagerConfigParameters, args });
    }

    
    public createMessage<
        L extends MessageLevel = MessageLevels.Info,
        S extends MessageStatuses = MessageStatuses.Success,
        T = any | undefined
    >({
        level,
        body,
        status = MessageStatuses.Success as S,
        args = [{ name: "save", value: true }]
    }: MessageEntry<L, S, T>): Message<L, S, T> {
        const managerSaveProperty = this.properties.getValue("keepHistory");
        const messageSaveProperty = args?.find((arg) => arg.name === "save")?.value;
        
        const message = MessageFactory.createMessage<L,S,T>({ level, body, status, args });

        if (
            (managerSaveProperty === true || messageSaveProperty === true)
            && this.messages.length < this.properties.getValue("historySize")
        ) {
            this.addMessage(message);
        }
        else if (
            this.messages.length >= this.properties.getValue("historySize")
        ) {
            this.messages.shift();
            this.addMessage(message);
        }

        return message;
    }
}


export {
    MessageManagerConfigParameters,
    MessageConfigParameters,
    Message,
    type MessageEntry,
    MessageFactory,
    MessageManager,
    MessageStore
}