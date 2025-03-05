import { promises as fs } from "fs";

import { MessageLevel, MessageLevels, MessageStatus, MessageStatuses } from "@/template/spec/v0/comms";
import { Metadata, MetadataEntry } from "@/template";
import { IdentityManager } from "@/service/identity";
import { ArgumentEntry, ParameterEntry, Properties } from "@component/properties";
import { BaseTypes, Factory, HashedStorage, HashedStorageItem, Manager, Storage } from "@/component";
// import { Configurable } from "@component/configurable";


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
        HashedStorageItem<BaseTypes.Message, MessageEntry<L, S, B>>
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
    } ={}) {
        super({
            type: BaseTypes.Message,
            data: {
                level,
                body,
                status
            },
            meta: metadata
        });

        this.meta.annotations.set('properties', new Properties<BaseTypes.Message>({ type: BaseTypes.Message, params: MessageConfigParameters, args }));

        this.meta.labels.set('id', id);
        this.meta.labels.set('name', name);
        this.meta.annotations.set('description', description);
    
        // this.checkStatus();
        // super({
        //     id,
        //     name,
        //     description,
        //     properties: new Properties({ params: MessageConfigParameters, args }),
        //     data: {
        //         level: level !== undefined ? level : MessageLevels.Info as L,
        //         body,
        //         status: status !== undefined ? status : MessageStatuses.Success as S
        //     } as MessageEntry<L,S,B>,
        //     metadata: metadata instanceof Metadata ? metadata : new Metadata(metadata)
        // });
    }

    public get id(): string {
        return this.meta.labels.get('id') || "";
    }

    public get name(): string {
        return this.meta.labels.get('name') || "";
    }

    public get description(): string {
        return this.meta.annotations.get('description') || "";
    }

    public get properties(): Properties<BaseTypes.Message> {
        return this.meta.annotations.get('properties') as Properties<BaseTypes.Message>;
    }

    public get level(): L {
        return this.data.level as L;
    }

    public get status(): S {
        return this.data.status as S;
    }

    public get body(): B {
        return this.data.body as B
    }

    public get timestamp(): string{
        const timestamp =  this.meta.annotations.timestamp;

        if (timestamp === undefined) {
            throw new Error(`Message:timestamp: The timestamp is undefined`);
        }

        return timestamp;
    }

    public get metadata(): Metadata {
        return this.meta;
    }

    private checkStatus(): void {
        if (
            this.status !== 'Success'
            && (
                this.data.level !== MessageLevels.Error
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


class MessageFactory
    extends Factory<BaseTypes.Message>
{

    constructor() {
        super(BaseTypes.Message);
    }

    public static createMessage<
        L extends MessageLevel = MessageLevels.Info,
        S extends MessageStatus = 'Success',
        B = any | undefined
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
        body: B,
        status?: S,
        args?: ArgumentEntry[],
        metadata?: MetadataEntry
    }): Message<L, S, B> {
        return new Message<L, S, B>({
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


class MessageStorage
    extends HashedStorage<BaseTypes.Message, MessageEntry, Message<any, any, any>>
{

    constructor() {
        super({
            type: BaseTypes.Message,
            items: []
        });
    }


    public addMessage<
        L extends MessageLevel,
        S extends MessageStatus,
        B = any
    >(
        message: Message<L, S, B>
    ) {
        this.addItem({item: message});
    }

    public get messages(): Message<any, any, any>[] {
        return this.listItems();
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
    extends Manager
    <
        BaseTypes.Message,
        MessageFactory,
        MessageStorage,
        [IdentityManager]
    >
{
    constructor({
        args = [],
        identifier = new IdentityManager()
    }: {
        args?: ArgumentEntry[],
        identifier?: IdentityManager
    } = {}) {
        super({
            type: BaseTypes.Message,
            factory: new MessageFactory(),
            storage: new MessageStorage(),
            parameters: MessageManagerConfigParameters,
            args,
            dependencies: [identifier]
        });
    }

    public async createMessage<
        L extends MessageLevel = MessageLevels.Info,
        S extends MessageStatus = MessageStatuses.Success,
        B = any | undefined
    >({
        id = this.dependencies[0].createId().item.id,
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
        body: B,
        status?: S,
        metadata?: MetadataEntry
    }): Promise<Message<L, S, B>> {
        const properties = new Properties<BaseTypes.Message>({
            type: BaseTypes.Message,
            params: [ ...this.properties.params, ...MessageManagerConfigParameters],
            args
        });
        const messageProperties = new Properties({type: BaseTypes.Message, params: MessageConfigParameters, args });

        const managerSaveProperty: boolean = this.properties.getValue<boolean>("keepHistory");
        const messageSaveProperty: boolean = messageProperties.getValue<boolean>("save");
        
        const message = MessageFactory.createMessage<L,S,B>({ id, name, description, level, body, status, args, metadata });

        if (
            (managerSaveProperty === true || messageSaveProperty === true)
            && this.storage.size< this.properties.getValue("historySize")
        ) {
            this.storage.addItem({item: message});

        }
        else if (
            (managerSaveProperty === true || messageSaveProperty === true)
            && this.storage.size >= this.properties.getValue("historySize")
        ) {
            const storeLength = this.storage.size;
            this.storage.listItems().slice(storeLength - this.properties.getValue("historySize"));

            this.storage.addItem({item: message});
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
            body: message.body,
            metadata: message.metadata,
            properties: message.properties,
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
            this.storage.addMessage(new Message({
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
    type MessageLevel,
    MessageLevels,
    type MessageStatus,
    MessageStatuses,
    Message,
    type MessageEntry,
    MessageFactory,
    MessageManager,
    MessageStorage
}