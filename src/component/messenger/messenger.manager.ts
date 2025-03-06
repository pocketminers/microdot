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
    MessageManager
};