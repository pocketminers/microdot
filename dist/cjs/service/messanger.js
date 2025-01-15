"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Messanger = exports.MessangerConfig = void 0;
const artifacts_1 = require("../artifacts");
const message_1 = require("./message");
const utils_1 = require("../utils");
const historian_1 = require("./historian");
const status_1 = require("./status");
const MessangerConfig = new artifacts_1.Configuration({
    name: 'MessangerConfiguration',
    description: 'Messanger configuration',
    parameters: [
        new artifacts_1.Parameter({
            name: "identifierFactory",
            description: "Identifier Factory",
            defaultValue: new utils_1.IdentifierFactory()
        }),
        new artifacts_1.Parameter({
            name: "keepHistory",
            description: "Keep History of Messages",
            defaultValue: true
        }),
        new artifacts_1.Parameter({
            name: "historyLimit",
            description: "History Limit",
            defaultValue: 100
        }),
        new artifacts_1.Parameter({
            name: "defaultLevel",
            description: "Default Message Level",
            defaultValue: 'Info'
        }),
    ]
});
exports.MessangerConfig = MessangerConfig;
class Messanger extends artifacts_1.Configurable {
    history;
    identifierFactory;
    constructor(config = MessangerConfig) {
        super({
            name: 'Messanger',
            description: 'A message service',
            configuration: config
        });
        this.identifierFactory = this.config.getValue('identifierFactory');
        this.history = new historian_1.Historian(config);
    }
    writeMessage = ({ id = this.identifierFactory.create('UUID', { prefix: "message" }), body, level = this.config.getValue('defaultLevel'), action, status = status_1.Codes.OK, data = undefined, print = true, stack = undefined, throwError = false }) => {
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
                data,
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
                data,
                print
            });
        }
        this.history.add(message);
        return message;
    };
}
exports.Messanger = Messanger;
//# sourceMappingURL=messanger.js.map