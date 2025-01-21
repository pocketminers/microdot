"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Messenger = exports.MessengerConfig = void 0;
const artifacts_1 = require("../artifacts");
const message_1 = require("../artifacts/message");
const utils_1 = require("../utils");
const historian_1 = require("./historian");
const status_1 = require("./status");
;
// Pick<MessageEntry<L,T>, 'id' | 'body' | 'level' | 'action' | 'status' | 'metadata' | 'print'>,
// Pick<ErrorMessageEntry<L,T>, 'stack' | 'throwError'> {}
const MessengerConfig = new artifacts_1.Configuration({
    name: 'MessangerConfiguration',
    description: 'Messanger configuration',
    parameters: [
        new artifacts_1.Parameter({
            name: "id",
            description: "Messanger Identifier",
            required: true,
        }),
        new artifacts_1.Parameter({
            name: "IdentifierStore",
            description: "Identifier Factory",
            required: true,
            defaultValue: new utils_1.IdentifierStore()
        }),
        new artifacts_1.Parameter({
            name: "keepHistory",
            description: "Keep History of Messages",
            required: true,
            defaultValue: true
        }),
        new artifacts_1.Parameter({
            name: "historyLimit",
            description: "History Limit",
            required: false,
            defaultValue: 100
        }),
        new artifacts_1.Parameter({
            name: "defaultLevel",
            description: "Default Message Level",
            defaultValue: 'Info'
        }),
    ]
});
exports.MessengerConfig = MessengerConfig;
class Messenger extends artifacts_1.Configurable {
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
        this.history = new historian_1.Historian(config);
    }
    writeMessage = ({ id = this.identifierStore.create('UUID', { prefix: "message" }), body, level = this.config.getValue('defaultLevel'), action, status = status_1.Codes.OK, metadata = undefined, print = true, stack = undefined, throwError = false }) => {
        let message;
        if (level === 'Error'
            || level === 'Warn'
            || throwError === true) {
            message = new message_1.ErrorMessage({
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
            message = new message_1.Message({
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
    };
}
exports.Messenger = Messenger;
//# sourceMappingURL=messenger.js.map