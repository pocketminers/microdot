import { Configurable, Configuration, Parameter } from '../artifacts';
import { Message, ErrorMessage } from './message';
import { IdentifierFactory } from '../utils';
import { Historian } from './historian';
import { Codes } from './status';
const MessangerConfig = new Configuration({
    name: 'MessangerConfiguration',
    description: 'Messanger configuration',
    parameters: [
        new Parameter({
            name: "identifierFactory",
            description: "Identifier Factory",
            defaultValue: new IdentifierFactory()
        }),
        new Parameter({
            name: "keepHistory",
            description: "Keep History of Messages",
            defaultValue: true
        }),
        new Parameter({
            name: "historyLimit",
            description: "History Limit",
            defaultValue: 100
        }),
        new Parameter({
            name: "defaultLevel",
            description: "Default Message Level",
            defaultValue: 'Info'
        }),
    ]
});
class Messanger extends Configurable {
    history;
    identifierFactory;
    constructor(config = MessangerConfig) {
        super({
            name: 'Messanger',
            description: 'A message service',
            configuration: config
        });
        this.identifierFactory = this.config.getValue('identifierFactory');
        this.history = new Historian(config);
    }
    writeMessage = ({ id = this.identifierFactory.create('UUID', { prefix: "message" }), body, level = this.config.getValue('defaultLevel'), action, status = Codes.OK, data = undefined, print = true, stack = undefined, throwError = false }) => {
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
export { MessangerConfig, Messanger };
//# sourceMappingURL=messanger.js.map