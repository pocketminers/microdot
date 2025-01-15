import { Configurable, Configuration } from '../artifacts';
import { Message, ErrorMessage, MessageEntry, MessageLevel, ErrorMessageEntry } from './message';
import { Historian } from './historian';
type Messages = Message | ErrorMessage;
interface MessangerEntry<L, T> extends Pick<MessageEntry<L, T>, 'id' | 'body' | 'level' | 'action' | 'status' | 'data' | 'print'>, Pick<ErrorMessageEntry<L, T>, 'stack' | 'throwError'> {
}
declare const MessangerConfig: Configuration;
declare class Messanger extends Configurable {
    readonly history: Historian<Messages>;
    private readonly identifierFactory;
    constructor(config?: Configuration);
    writeMessage: <L extends MessageLevel = MessageLevel, T = undefined>({ id, body, level, action, status, data, print, stack, throwError }: MessangerEntry<L, T>) => Messages;
}
export { MessangerConfig, Messanger };
//# sourceMappingURL=messanger.d.ts.map