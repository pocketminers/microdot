import { MessageLevel, MessageStatus } from "@/template/spec/v0/comms";
import { BaseTypes, HashedStorage } from "../base";
import { Message } from "./message";
import { MessageEntry } from "./message.types";


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

export {
    MessageStorage
}