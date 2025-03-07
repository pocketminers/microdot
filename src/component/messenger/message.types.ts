import { MessageLevel, MessageLevels, MessageStatus, MessageStatuses } from "@/template/spec/v0/comms";
import { ArgumentEntry, BaseTypes, Properties } from "@component/base";


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
        Partial<Record<'timestamp', number>> {}


interface MessageStorageItem<
    L extends MessageLevel = MessageLevels.Info,
    S extends MessageStatus = MessageStatuses.Success,
    B = any | undefined
>
    extends
        MessageEntry<L, S, B>,
        Record<'name', string>,
        Record<'description', string>,
        Record<'properties', Properties<BaseTypes.Message>> {}

export {
    type MessageEntry,
    type MessageStorageItem
};