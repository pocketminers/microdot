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

class Message<
    L extends MessageLevel = MessageLevels,
    S extends number = MessageStatuses,
    T = any | undefined
> implements MessageSpec<L, S, T> {
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
        status?: number,
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
            this.status !== MessageStatuses.Success
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


interface MessageEntry<
    L extends MessageLevel = MessageLevels,
    S extends MessageStatuses = MessageStatuses,
    T = any | undefined
>
    extends
        Record<'body', T>,
        Record<'args', ArgumentEntry[]>,
        Record<'level', L>,
        Record<"status", S> {}



class MessageFactory {

    public static createMessage<
        L extends MessageLevels = MessageLevels,
        S extends MessageStatuses = MessageStatuses,
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

    public addMessage<
        L extends MessageLevels,
        S extends MessageStatuses,
        T = any | undefined
    >(
        message: Message<L, S, T>): void
    {
        this.messages.push(message);
    }

    public clear(): void {
        this.messages = [];
    }

    public getMessages({
        filter = MessageLevels.Info,
        status = 'All'
    }: {
        filter?: MessageLevels,
        status?: MessageStatuses | 'All'
    }): Message<any, any>[] {
        return this.messages.filter((message) => {
            return message.level === filter && message.status === status;
        });
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
        L extends MessageLevels = MessageLevels.Info,
        S extends number = MessageStatuses.Success,
        T = any | undefined
    >({
        level,
        body,
        status = MessageStatuses.Success as S,
        args
    }: MessageEntry<L, S, T>): Message<L, S, T> {
        const save = this.properties.getValue("save");
        
        const message = MessageFactory.createMessage<L,S,T>({ level, body, status, args });

        if (save === true) {
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