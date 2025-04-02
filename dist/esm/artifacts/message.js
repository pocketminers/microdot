import { Codes } from "../service/status";
import { createIdentifier } from "../utils/identifier";
import { checkForCircularReference, checkIsEmpty } from "../utils/checks";
import { Hashable } from "../artifacts";
/**
 * MessageLevels is an enum of message levels.
 * The message levels are 'Info' and 'Debug'.
 */
var MessageLevels;
(function (MessageLevels) {
    MessageLevels["Info"] = "Info";
    MessageLevels["Debug"] = "Debug";
})(MessageLevels || (MessageLevels = {}));
;
class Message extends Hashable {
    body;
    level;
    action;
    status;
    metadata;
    print;
    createdAt = new Date();
    constructor({ id, body, level = MessageLevels.Info, action = undefined, status = Codes.OK, print = true, metadata = {} }) {
        super({ id, data: { body, level, action, status, print, metadata } });
        this.body = body;
        this.level = level;
        this.action = action;
        this.status = status;
        this.print = print;
        this.metadata = checkIsEmpty([metadata]) ? undefined : metadata;
        if (this.print) {
            this.printToConsole();
        }
    }
    static createMsg(entry) {
        const message = new Message(entry);
        return message;
    }
    printAction() {
        const isEmpty = checkIsEmpty([this.action]);
        if (isEmpty) {
            return '';
        }
        else {
            return `\nAction: ${this.action}`;
        }
    }
    printData() {
        const isEmpty = checkIsEmpty([this.metadata]);
        if (isEmpty) {
            return '';
        }
        else {
            const metadata = checkForCircularReference(this.metadata) ? 'Circular Reference' : JSON.stringify(this.metadata, null, 2);
            // const metadata = JSON.stringify(this.metadata, null, 2);
            return `\nData: ${metadata}`;
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
var ErrorMessageLevels;
(function (ErrorMessageLevels) {
    ErrorMessageLevels["Error"] = "Error";
    ErrorMessageLevels["Warn"] = "Warn";
})(ErrorMessageLevels || (ErrorMessageLevels = {}));
;
class ErrorMessage extends Message {
    stack;
    throwError;
    constructor({ id = createIdentifier(), body, level = ErrorMessageLevels.Error, action = 'Error Message Creation', status = 500, print = true, throwError = false, stack = undefined, metadata = {} }) {
        super({ id, body, level, action, status, print, metadata });
        this.throwError = throwError !== undefined ? throwError : false;
        this.stack = stack !== undefined ? stack : '';
        this.throw_();
    }
    static createMsg(entry) {
        const message = new ErrorMessage(entry);
        return message;
    }
    throw_() {
        if (this.throwError) {
            throw this;
        }
    }
    printStack() {
        const isEmpty = checkIsEmpty([this.stack]);
        if (isEmpty) {
            return '';
        }
        else {
            return `\nStack: ${this.stack}`;
        }
    }
    printThrowError() {
        const isEmpty = checkIsEmpty([this.throwError]);
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
export { MessageLevels, Message, ErrorMessageLevels, ErrorMessage };
//# sourceMappingURL=message.js.map