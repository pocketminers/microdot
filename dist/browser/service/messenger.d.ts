import { Configurable, Configuration } from '../artifacts';
import { Message, ErrorMessage, MessageLevel, ErrorMessageEntry } from '../artifacts/message';
import { Historian } from './historian';
type Messages = Message | ErrorMessage;
interface MessengerEntry<L, T> extends Partial<Record<'id', string>>, ErrorMessageEntry<L, T> {
}
declare const MessengerConfig: Configuration;
declare class Messenger extends Configurable {
    readonly history: Historian<Messages>;
    private readonly identifierStore;
    constructor(config?: Configuration);
    writeMessage: <L extends MessageLevel = MessageLevel, T = undefined>({ id, body, level, action, status, data, print, stack, throwError }: MessengerEntry<L, T>) => Messages;
}
export { type Messages, type MessengerEntry, MessengerConfig, Messenger };
//# sourceMappingURL=messenger.d.ts.map