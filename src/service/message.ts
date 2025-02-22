import { promises as fs } from "fs";

import { ArgumentEntry, Component, Configurable, ConfigurableEntry, ParameterEntry, Properties } from "@/component";
import { MessageLevel, MessageLevels, MessageSpec, MessageStatus, MessageStatuses } from "@/template/spec/v0/comms";
import { Metadata, MetadataEntry } from "@/template";


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

interface MessageEntry<
    L extends MessageLevel = MessageLevels.Info,
    S extends MessageStatus = MessageStatuses.Success,
    B = any | undefined
>
    extends
        Record<'level', L>,
        Record<'body', B> ,
        Record<'status', S> {}


class Message<
    L extends MessageLevel = MessageLevels.Info,
    S extends MessageStatus = MessageStatuses.Success,
    B = any | undefined
> 
    extends
        Configurable<MessageEntry<L,S,B>>
{

    constructor({
        id,
        name,
        description,
        args,
        level = MessageLevels.Info as L,
        body = undefined as B,
        status = MessageStatuses.Success as S,
        metadata = new Metadata()
    }: {
        id?: string,
        name?: string,
        description?: string,
        args?: ArgumentEntry[],
        level?: L,
        body?: B
        status?: S,
        metadata?: MetadataEntry | Metadata
    }) {
        super({
            id,
            name,
            description,
            properties: new Properties({ params: MessageConfigParameters, args }),
            data: {
                level: level !== undefined ? level : MessageLevels.Info as L,
                body,
                status: status !== undefined ? status : MessageStatuses.Success as S
            } as MessageEntry<L,S,B>,
            metadata: metadata instanceof Metadata ? metadata : new Metadata(metadata)
        });

        console.log(`Message:constructor: ${JSON.stringify(this, null, 2)}`);
    }

    public get level(): L {
        return this.data.level as L;
    }

    public get status(): S {
        return this.data.status as S;
    }

    public get timestamp(): string{
        const timestamp =  this.meta.annotations.createdAt;

        if (timestamp === undefined) {
            throw new Error(`Message:timestamp: The timestamp is undefined`);
        }

        return timestamp;
    }

    // private checkStatus(): void {
    //     if (
    //         this.status !== 'Success'
    //         && (
    //             this.data.level !== MessageLevels.Error
    //             && this.level !== MessageLevels.Warn
    //         )
    //     ) {
    //         throw new Error(`Message:checkStatus: The message status is not an error or warning: ${this.status}`);
    //     }
    // }

    // public print(): void {
    //     if (this.properties.getValue("print") === true) {
    //         console.log(`${this.data.body}`);
    //     }
    // }

    // public throw(): void {
    //     if (
    //         this.properties.getValue("throw") === true
    //         && this.level === MessageLevels.Error
    //     ) {
    //         throw new Error(`${this.body}`);
    //     }
    // }
}


class MessageFactory {

    public static createMessage<
        L extends MessageLevel = MessageLevels.Info,
        S extends MessageStatus = 'Success',
        T = any | undefined
    >({
        id,
        name,
        description,
        level,
        body,
        status,
        args,
        metadata
    }: {
        id?: string,
        name?: string,
        description?: string,
        level?: L,
        body: T,
        status?: S,
        args?: ArgumentEntry[],
        metadata?: MetadataEntry
    }): Message<L, S, T> {
        return new Message<L, S, T>({
            id,
            name,
            description,
            args,
            level,
            body,
            status,
            metadata
        });
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
            return new Date(message.timestamp) >= date.after && new Date(message.timestamp) <= date.before;
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
    },
    {
        name: "publish",
        description: "Whether to publish the messages.",
        type: "boolean",
        defaultValue: false,
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

    
    public async createMessage<
        L extends MessageLevel = MessageLevels.Info,
        S extends MessageStatuses = MessageStatuses.Success,
        T = any | undefined
    >({
        id,
        name,
        description,
        args,
        level,
        body,
        status,
        metadata
    }: {
        id?: string,
        name?: string,
        description?: string,
        args?: ArgumentEntry[],
        level?: L,
        body: T,
        status?: S,
        metadata?: MetadataEntry
    }): Promise<Message<L, S, T>> {
        const managerSaveProperty = this.properties.getValue("keepHistory");
        const messageSaveProperty = args?.find((arg) => arg.name === "save")?.value;
        
        const message = MessageFactory.createMessage<L,S,T>({ id, name, description, level, body, status, args, metadata });

        if (
            (managerSaveProperty === true || messageSaveProperty === true)
            && this.messages.length < this.properties.getValue("historySize")
        ) {
            this.addMessage(message);

        }
        else if (
            (managerSaveProperty === true || messageSaveProperty === true)
            && this.messages.length >= this.properties.getValue("historySize")
        ) {
            const storeLength = this.messages.length;
            this.messages = this.messages.slice(storeLength - this.properties.getValue("historySize"));

            this.addMessage(message);
        }

        if (managerSaveProperty === true && messageSaveProperty === true) {
            await this.writeMessageToFile(message);
        }

        return message;
    }

    private async readFileAsync(filePath: string): Promise<string> {
        try {
            const data = await fs.readFile(filePath, 'utf-8');
            return data;
        }
        catch (error: any) {
            await fs.writeFile(filePath, "[]");
            return "[]";
        }
    }

    private async writeFileAsync(filePath: string, data: string): Promise<void> {
        try {
            await fs.writeFile(filePath, data, 'utf-8');
        }
        catch (error: any) {
            throw new Error(`MessageManager:writeFileAsync: ${error.message}`);
        }
    }

    private async writeMessageToFile(message: Partial<Message<any, any, any>>): Promise<void> {
        const filePath: string | undefined = this.properties.getValue<string>("historyFilePath");

        if (filePath === undefined) {
            throw new Error(`MessageManager:writeMessageToFile: The file path is undefined`);
        }

        const data: string = await this.readFileAsync(filePath);

        const messages: Partial<Message<any, any, any>>[] = JSON.parse(data);

        messages.push({
            level: message.level,
            status: message.status,
            
            timestamp: message.timestamp !== undefined ? message.timestamp : new Date().toISOString()
        });

        await this.writeFileAsync(filePath, JSON.stringify(messages, null, 2));
    }

    public async readMessagesFromFile(filePath?: string): Promise<void> {
        filePath = filePath !== undefined ? filePath : this.properties.getValue<string>("historyFilePath");

        if (filePath === undefined) {
            throw new Error(`MessageManager:readMessagesFromFile: The file path is undefined`);
        }

        const data: string = await this.readFileAsync(filePath);

        const messages: Partial<Message<any, any, any>>[] = JSON.parse(data);

        messages.forEach((message) => {
            this.addMessage(new Message({
                level: message.level,
                status: message.status,
                body: message.data,
                metadata: message.metadata,
                args: [
                    { name: "save", value: true }
                ]
            }));
        });
    }


    public async clearHistoryFile(filePath?: string): Promise<void> {
        filePath = filePath !== undefined ? filePath : this.properties.getValue<string>("historyFilePath");

        if (filePath === undefined) {
            throw new Error(`MessageManager:clearHistoryFile: The file path is undefined`);
        }

        await this.writeFileAsync(filePath, "[]");
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