import { promises as fs } from "fs";

import { MetadataEntry } from "@/template";
import { ArgumentEntry, BaseTypes, Manager, Properties } from "../base";
import { IdentityManager } from "../identifier";
import { MessageFactory } from "./messenger.factory";
import { MessageManagerConfigParameters } from "./messenger.params";
import { MessageStorage } from "./messenger.storage";
import { Message } from "./message";
import { MessageConfigParameters } from "./message.params";
import { MessageLevel, MessageLevels, MessageStatus, MessageStatuses } from "@/template/spec/v0/comms";
import { Filing } from "@/utils/filing";
import { MessageStorageItem } from "./message.types";

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
        
        const message = MessageFactory.createMessage<L,S,B>({
            id,
            // name,
            // description,
            level, body, status, args, metadata
        });

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

    public async prepareLogFiles(): Promise<void> {
        let filePath: string | undefined = this.properties.getValue<string>("historyFilePath");

        if (filePath === undefined) {
            filePath = "./history.json";
        }

        const fileExists: boolean = await Filing.exists(filePath);

        if (fileExists === false) {
            await Filing.createFile(filePath);
        }
    }

    private async writeMessageToFile(message: Message<any, any, any>): Promise<void> {
        await this.prepareLogFiles();


        const filePath: string | undefined = this.properties.getValue<string>("historyFilePath");
        const data: string = await Filing.readFile(filePath);

        // const messages: Partial<Message<any, any, any>>[] = JSON.parse(data);

        // const data: string = await Filing.readFile();

        // console.log(`data: ${data}`);

        let messages: MessageStorageItem<any, any, any>[];
        try {
            messages = JSON.parse(data);
        } catch (error: any) {
            // throw new Error(`MessageManager:writeMessageToFile: Failed to parse JSON data: ${error.message}`);
            messages = [];
        }

        messages.push({
            id: message.id,
            level: message.level,
            body: message.body,
            status: message.status,
            timestamp: message.timestamp,
            properties: message.properties
        });

        await Filing.writeFile(filePath, JSON.stringify(messages, null, 2));
    }

    public async readMessagesFromFile(filePath?: string): Promise<Partial<Message<any, any, any>>[]> {
        filePath = filePath !== undefined ? filePath : this.properties.getValue<string>("historyFilePath");

        if (filePath === undefined) {
            throw new Error(`MessageManager:readMessagesFromFile: The file path is undefined`);
        }

        const data: string = await Filing.readFile(filePath);

        // const messages: Partial<Message<any, any, any>>[] = JSON.parse(data);

        let messages: Partial<Message<any, any, any>>[];
        try {
            messages = JSON.parse(data);
        } catch (error: any) {
            throw new Error(`MessageManager:readMessagesFromFile: Failed to parse JSON data: ${error.message}`);
        }

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

        return messages;
    }


    public async clearHistoryFile(filePath?: string): Promise<void> {
        filePath = filePath !== undefined ? filePath : this.properties.getValue<string>("historyFilePath");

        if (filePath === undefined) {
            throw new Error(`MessageManager:clearHistoryFile: The file path is undefined`);
        }

        await Filing.writeFile(filePath, "[]");
    }
}

export {
    MessageManager
};