var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Configurable, Configuration, Parameter } from '../artifacts';
import { Message, ErrorMessage } from '../artifacts/message';
import { IdentifierStore } from '../utils';
import { Historian } from './historian';
import { Codes } from './status';
;
// Pick<MessageEntry<L,T>, 'id' | 'body' | 'level' | 'action' | 'status' | 'data' | 'print'>,
// Pick<ErrorMessageEntry<L,T>, 'stack' | 'throwError'> {}
var MessengerConfig = new Configuration({
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
var Messenger = /** @class */ (function (_super) {
    __extends(Messenger, _super);
    function Messenger(config) {
        if (config === void 0) { config = MessengerConfig; }
        var _this = _super.call(this, {
            id: config.getValue('id'),
            name: 'Messanger',
            description: 'A message service',
            configuration: config
        }) || this;
        _this.writeMessage = function (_a) {
            var _b = _a.id, id = _b === void 0 ? _this.identifierStore.create('UUID', { prefix: "message" }) : _b, body = _a.body, _c = _a.level, level = _c === void 0 ? _this.config.getValue('defaultLevel') : _c, action = _a.action, _d = _a.status, status = _d === void 0 ? Codes.OK : _d, _e = _a.data, data = _e === void 0 ? undefined : _e, _f = _a.print, print = _f === void 0 ? true : _f, _g = _a.stack, stack = _g === void 0 ? undefined : _g, _h = _a.throwError, throwError = _h === void 0 ? false : _h;
            var message;
            if (level === 'Error'
                || level === 'Warn'
                || throwError === true) {
                message = new ErrorMessage({
                    id: id,
                    body: body,
                    level: level,
                    action: action,
                    status: status,
                    data: data,
                    print: print,
                    stack: stack,
                    throwError: throwError
                });
            }
            else {
                message = new Message({
                    id: id,
                    body: body,
                    level: level,
                    action: action,
                    status: status,
                    data: data,
                    print: print
                });
            }
            _this.history.add(message);
            return message;
        };
        _this.identifierStore = _this.config.getValue('IdentifierStore');
        _this.history = new Historian(config);
        return _this;
    }
    return Messenger;
}(Configurable));
export { MessengerConfig, Messenger };
//# sourceMappingURL=messenger.js.map