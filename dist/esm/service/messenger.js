import { Configurable, Configuration, Parameter } from '../artifacts';
import { Message, ErrorMessage } from '../artifacts/message';
import { IdentifierStore } from '../utils';
import { Historian } from './historian';
import { Codes } from './status';
;
// Pick<MessageEntry<L,T>, 'id' | 'body' | 'level' | 'action' | 'status' | 'data' | 'print'>,
// Pick<ErrorMessageEntry<L,T>, 'stack' | 'throwError'> {}
const MessengerConfig = new Configuration({
    name: 'MessangerConfiguration',
    description: 'Messanger configuration',
    parameters: [
        new Parameter({
            name: "id",
            description: "Messanger Identifier",
            required: true,
        }),
        new Parameter({
            name: "IdentifierStore",
            description: "Identifier Factory",
            required: true,
            defaultValue: new IdentifierStore()
        }),
        new Parameter({
            name: "keepHistory",
            description: "Keep History of Messages",
            required: true,
            defaultValue: true
        }),
        new Parameter({
            name: "historyLimit",
            description: "History Limit",
            required: false,
            defaultValue: 100
        }),
        new Parameter({
            name: "defaultLevel",
            description: "Default Message Level",
            defaultValue: 'Info'
        }),
    ]
});
class Messenger extends Configurable {
    history;
    identifierStore;
    constructor(config = MessengerConfig) {
        super({
            id: config.getValue('id'),
            name: 'Messanger',
            description: 'A message service',
            configuration: config
        });
        this.identifierStore = this.config.getValue('IdentifierStore');
        this.history = new Historian(config);
    }
    writeMessage = ({ id = this.identifierStore.create('UUID', { prefix: "message" }), body, level = this.config.getValue('defaultLevel'), action, status = Codes.OK, data = undefined, print = true, stack = undefined, throwError = false }) => {
        let message;
        if (level === 'Error'
            || level === 'Warn'
            || throwError === true) {
            message = new ErrorMessage({
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
            message = new Message({
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
    };
}
export { MessengerConfig, Messenger };
//# sourceMappingURL=messenger.js.map