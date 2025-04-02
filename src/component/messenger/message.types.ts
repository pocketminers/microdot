import { MessageLevel, MessageLevels, MessageStatus, MessageStatuses } from "@/template/spec/v0/comms";
import { Argument, ArgumentEntry, BaseTypes, HashedStorageItem, Properties } from "@component/base";


interface MessageEntry<
    L extends MessageLevel = MessageLevels.Info,
    S extends MessageStatus = MessageStatuses.Success,
    B = any | undefined
>
    extends
        Record<'id', string>,
        Record<'level', L>,
        Record<'body', B> ,
        Record<'status', S>,
        Partial<Record<'args', ArgumentEntry[]>>,
        Partial<Record<'timestamp', string>> {}


interface MessageStorageItem<
    L extends MessageLevel = MessageLevels.Info,
    S extends MessageStatus = MessageStatuses.Success,
    B = any | undefined
>
    extends
        Record<'properties', Properties<BaseTypes.Message>>,
        Pick<MessageEntry<L, S, B>, 'id' | 'level' | 'body' | 'status'  | 'timestamp'>{}


interface MessageOutputFormat
    extends
        Record<'id', string>,
        Record<'level', string>,
        Record<'body', string>,
        Record<'status', string>,
        Record<'timestamp', string> {}

export {
    type MessageEntry,
    type MessageStorageItem,
    type MessageOutputFormat
};