"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessage = exports.ErrorMessageLevels = exports.Message = exports.MessageLevels = void 0;
const status_1 = require("@service/status");
const identifier_1 = require("@utils/identifier");
const checks_1 = require("@utils/checks");
const artifacts_1 = require("@/artifacts");
/**
 * MessageLevels is an enum of message levels.
 * The message levels are 'Info' and 'Debug'.
 */
var MessageLevels;
(function (MessageLevels) {
    MessageLevels["Info"] = "Info";
    MessageLevels["Debug"] = "Debug";
})(MessageLevels || (exports.MessageLevels = MessageLevels = {}));
;
class Message extends artifacts_1.Hashable {
    id;
    body;
    level;
    action;
    status;
    data;
    print;
    createdAt = new Date();
    constructor({ id = (0, identifier_1.createIdentifier)(), body, level = MessageLevels.Info, action = undefined, status = status_1.Codes.OK, print = true, data }) {
        super({ id, body, level, action, status, print, data });
        this.id = id;
        this.body = body;
        this.level = level;
        this.action = action;
        this.status = status;
        this.print = print;
        this.data = (0, checks_1.checkIsEmpty)([data]) ? undefined : data;
        if (this.print) {
            this.printToConsole();
        }
    }
    static create(entry) {
        const message = new Message(entry);
        return message;
    }
    printAction() {
        const isEmpty = (0, checks_1.checkIsEmpty)([this.action]);
        if (isEmpty) {
            return '';
        }
        else {
            return `\nAction: ${this.action}`;
        }
    }
    printData() {
        const isEmpty = (0, checks_1.checkIsEmpty)([this.data]);
        if (isEmpty) {
            return '';
        }
        else {
            const data = (0, checks_1.checkForCircularReference)(this.data) ? 'Circular Reference' : JSON.stringify(this.data, null, 2);
            // const data = JSON.stringify(this.data, null, 2);
            return `\nData: ${data}`;
        }
    }
    toString() {
        return (`[${this.status}] [${this.createdAt}] ${this.body}` +
            this.printAction() +
            this.printData());
    }
    printToConsole() {
        switch (this.level) {
            case MessageLevels.Info:
                console.info(this.toString());
                break;
            case MessageLevels.Debug:
                console.debug(this.toString());
                break;
        }
    }
}
exports.Message = Message;
var ErrorMessageLevels;
(function (ErrorMessageLevels) {
    ErrorMessageLevels["Error"] = "Error";
    ErrorMessageLevels["Warn"] = "Warn";
})(ErrorMessageLevels || (exports.ErrorMessageLevels = ErrorMessageLevels = {}));
;
class ErrorMessage extends Message {
    stack;
    throwError;
    constructor({ id = (0, identifier_1.createIdentifier)(), body, level = ErrorMessageLevels.Error, action = 'Error Message Creation', status = 500, print = true, throwError = false, stack = undefined, data = {} }) {
        super({ id, body, level, action, status, print, data });
        this.throwError = throwError !== undefined ? throwError : false;
        this.stack = stack !== undefined ? stack : '';
        this.throw_();
    }
    static create(entry) {
        const message = new ErrorMessage(entry);
        return message;
    }
    throw_() {
        if (this.throwError) {
            throw this;
        }
    }
    printStack() {
        const isEmpty = (0, checks_1.checkIsEmpty)([this.stack]);
        if (isEmpty) {
            return '';
        }
        else {
            return `\nStack: ${this.stack}`;
        }
    }
    printThrowError() {
        const isEmpty = (0, checks_1.checkIsEmpty)([this.throwError]);
        let errorThrown = true;
        if (!isEmpty) {
            errorThrown = this.throwError;
        }
        else {
            errorThrown = false;
        }
        return `\nError Thrown: ${errorThrown}`;
    }
    toString() {
        return (`[${this.status}] [${this.createdAt}] ${this.body}` +
            this.printData() +
            this.printStack() +
            this.printThrowError());
    }
    printToConsole() {
        switch (this.level) {
            case ErrorMessageLevels.Error:
                console.error(this.toString());
                break;
            case ErrorMessageLevels.Warn:
                console.warn(this.toString());
                break;
        }
    }
}
exports.ErrorMessage = ErrorMessage;
//# sourceMappingURL=message.js.map