import { MetadataEntry } from "@/template";
import { ArgumentEntry, BaseTypes, Factory } from "../base";
import { MessageLevel, MessageLevels, MessageStatus } from "@template/spec/v0/comms";
import { Message } from "./message";


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
        // name,
        // description,
        level,
        body,
        status,
        args,
        metadata
    }: {
        id?: string,
        // name?: string,
        // description?: string,
        level?: L,
        body: B,
        status?: S,
        args?: ArgumentEntry[],
        metadata?: MetadataEntry
    }): Message<L, S, B> {
        return new Message<L, S, B>({
            id,
            // name,
            // description,
            args,
            level,
            body,
            status,
            metadata
        });
    }
}


export {
    MessageFactory
}
