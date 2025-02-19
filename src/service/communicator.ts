import { ArgumentEntry, Component, Configurable, ParameterEntry, Properties } from "@/component";
import { MessageLevel, MessageLevels, MessageSpec, MessageStatus, MessageStatuses } from "@/template/spec/v0/comms";

const CommunicatorConfigParameters: ParameterEntry[] = [
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
    L extends MessageLevels = MessageLevels.Info,
    S extends number = MessageStatuses.Success,
    T = any | undefined
>
    implements MessageSpec<L, T, S>
{
    public level: L;
    public properties: Properties;
    public body: T;
    public status: S;
    public timestamp: Date = new Date();

    constructor({
        level = MessageLevels.Info as L,
        body,
        status = MessageStatuses.Success as S,
        args
    }: {
        level: L,
        body: T,
        status: number,
        args: ArgumentEntry[]
    }) {
        this.level = level;
        this.properties = new Properties({ params: MessageConfigParameters, args });
        this.body = body;
        this.status = status as S;

        this.checkStatus();

        this.print();
        this.throw();
    }

    private checkStatus(): void {
        if (
            this.status >= MessageStatuses.BadRequest
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


interface MessageEntry<L = MessageLevel, S = number, T = any | undefined>
    extends
        Record<'body', T>,
        Record<'args', ArgumentEntry[]>,
        Record<'level', L>,
        Record<"status", S> {}



class MessageFactory {
    public static createMessage<
        L extends MessageLevel,
        S extends number,
        T = any | undefined
    >({
        level,
        body,
        status = MessageStatuses.Success as S,
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
        L extends MessageLevel,
        S extends number,
        T = any | undefined
    >(
        message: Message<L, S, T>): void
    {
        this.messages.push(message);
    }

    public clear(): void {
        this.messages = [];
    }
}




class MessageManager
    extends MessageStore
{
    private properties: Properties;

    constructor(args: ArgumentEntry[] = []) {
        super();

        this.properties = new Properties({ params: CommunicatorConfigParameters, args });
    }

    
    public createMessage<
        L extends MessageLevel = MessageLevels.Info,
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