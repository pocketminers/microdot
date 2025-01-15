import { Configurable, Configuration, Parameter } from '@/artifacts';
import { Message, ErrorMessage, MessageEntry, MessageLevel, MessageLevels, ErrorMessageEntry } from './message';
import { IdentifierFactory } from '@/utils';
import { Historian } from './historian';
import { Codes } from './status';

type Messages = Message | ErrorMessage;

interface MessangerEntry<L,T> 
    extends
        Pick<MessageEntry<L,T>, 'id' | 'body' | 'level' | 'action' | 'status' | 'data' | 'print'>,
        Pick<ErrorMessageEntry<L,T>, 'stack' | 'throwError'> {}

const MessangerConfig: Configuration = new Configuration({
    name: 'MessangerConfiguration',
    description: 'Messanger configuration',
    parameters: [
        new Parameter<IdentifierFactory>({
            name: "identifierFactory",
            description: "Identifier Factory",
            defaultValue: new IdentifierFactory()
        }),
        new Parameter<boolean>({
            name: "keepHistory",
            description: "Keep History of Messages",
            defaultValue: true
        }),
        new Parameter<number>({
            name: "historyLimit",
            description: "History Limit",
            defaultValue: 100
        }),
        new Parameter<MessageLevel>({
            name: "defaultLevel",
            description: "Default Message Level",
            defaultValue: 'Info'
        }),
    ]
});


class Messanger
    extends
        Configurable
{

    public readonly history: Historian<Messages>;
    private readonly identifierFactory: IdentifierFactory;

    constructor(config: Configuration = MessangerConfig) {
        super({
            name: 'Messanger',
            description: 'A message service',
            configuration: config
        });
        
        this.identifierFactory = this.config.getValue('identifierFactory');
        this.history = new Historian<Messages>(config);
    }

    public writeMessage = <L extends MessageLevel = MessageLevel, T = undefined>({
        id = this.identifierFactory.create('UUID', {prefix: "message"}),
        body,
        level = this.config.getValue<MessageLevel>('defaultLevel') as L,
        action,
        status = Codes.OK,
        data = undefined,
        print = true,
        stack = undefined,
        throwError = false
    } : MessangerEntry<L, T >): Messages => {
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
                data,
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
                data,
                print
            });
        }

        this.history.add(message);
        return message;
    }
}


export {
    MessangerConfig,
    Messanger
};