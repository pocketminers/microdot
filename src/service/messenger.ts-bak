import { Configurable, Configuration, Parameter } from '@/artifacts';
import { Message, ErrorMessage, MessageEntry, MessageLevel, MessageLevels, ErrorMessageEntry } from '@artifacts/message';
import { IdentifierStore } from '@/utils';
import { Historian } from './historian';
import { Codes } from './status';

type Messages = Message | ErrorMessage;

interface MessengerEntry<L,T> 
    extends
        Partial<Record<'id', string>>,
        ErrorMessageEntry<L,T> {};
        // Pick<MessageEntry<L,T>, 'id' | 'body' | 'level' | 'action' | 'status' | 'metadata' | 'print'>,
        // Pick<ErrorMessageEntry<L,T>, 'stack' | 'throwError'> {}

const MessengerConfig: Configuration = new Configuration({
    name: 'MessangerConfiguration',
    description: 'Messanger configuration',
    parameters: [
        new Parameter<string>({
            name: "id",
            description: "Messanger Identifier",
            required: true,
        }),
        new Parameter<IdentifierStore>({
            name: "IdentifierStore",
            description: "Identifier Factory",
            required: true,
            defaultValue: new IdentifierStore()
        }),
        new Parameter<boolean>({
            name: "keepHistory",
            description: "Keep History of Messages",
            required: true,
            defaultValue: true
        }),
        new Parameter<number>({
            name: "historyLimit",
            description: "History Limit",
            required: false,
            defaultValue: 100
        }),
        new Parameter<MessageLevel>({
            name: "defaultLevel",
            description: "Default Message Level",
            defaultValue: 'Info'
        }),
    ]
});


class Messenger
    extends
        Configurable
{

    public readonly history: Historian<Messages>;
    private readonly identifierStore: IdentifierStore;

    constructor(config: Configuration = MessengerConfig) {
        super({
            id: config.getValue('id'),
            name: 'Messanger',
            description: 'A message service',
            configuration: config
        });
        
        this.identifierStore = this.config.getValue('IdentifierStore');
        this.history = new Historian<Messages>(config);
    }

    public writeMessage = <L extends MessageLevel = MessageLevel, T = undefined>({
        id = this.identifierStore.create('UUID', {prefix: "message"}),
        body,
        level = this.config.getValue<MessageLevel>('defaultLevel') as L,
        action,
        status = Codes.OK,
        metadata = undefined,
        print = true,
        stack = undefined,
        throwError = false
    } : MessengerEntry<L, T >): Messages => {
        let message: Messages;
        if (
            level === 'Error'
            || level === 'Warn'
            || throwError === true
        ) {
            message = new ErrorMessage<L,T>({
                id,
                body,
                level,
                action,
                status,
                metadata,
                print,
                stack,
                throwError
            });
        }
        else {
            message = new Message<L,T>({
                id,
                body,
                level,
                action,
                status,
                metadata,
                print
            });
        }

        this.history.add(message);
        return message;
    }
}


export {
    type Messages,
    type MessengerEntry,
    MessengerConfig,
    Messenger
};