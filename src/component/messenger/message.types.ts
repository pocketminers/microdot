import { MessageLevel, MessageLevels, MessageStatus, MessageStatuses } from "@/template/spec/v0/comms";


interface MessageEntry<
    L extends MessageLevel = MessageLevels.Info,
    S extends MessageStatus = MessageStatuses.Success,
    B = any | undefined
>
    extends
        Record<'level', L>,
        Record<'body', B> ,
        Record<'status', S> {}


export {
    type MessageEntry
};