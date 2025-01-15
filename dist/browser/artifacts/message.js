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
var Message = /** @class */ (function (_super) {
    __extends(Message, _super);
    function Message(_a) {
        var id = _a.id, body = _a.body, _b = _a.level, level = _b === void 0 ? MessageLevels.Info : _b, _c = _a.action, action = _c === void 0 ? undefined : _c, _d = _a.status, status = _d === void 0 ? Codes.OK : _d, _e = _a.print, print = _e === void 0 ? true : _e, data = _a.data;
        var _this = _super.call(this, id, body, level, action, status, print, data) || this;
        _this.createdAt = new Date();
        _this.body = body;
        _this.level = level;
        _this.action = action;
        _this.status = status;
        _this.print = print;
        _this.data = checkIsEmpty([data]) ? undefined : data;
        if (_this.print) {
            _this.printToConsole();
        }
        return _this;
    }
    Message.create = function (entry) {
        var message = new Message(entry);
        return message;
    };
    Message.prototype.printAction = function () {
        var isEmpty = checkIsEmpty([this.action]);
        if (isEmpty) {
            return '';
        }
        else {
            return "\nAction: ".concat(this.action);
        }
    };
    Message.prototype.printData = function () {
        var isEmpty = checkIsEmpty([this.data]);
        if (isEmpty) {
            return '';
        }
        else {
            var data = checkForCircularReference(this.data) ? 'Circular Reference' : JSON.stringify(this.data, null, 2);
            // const data = JSON.stringify(this.data, null, 2);
            return "\nData: ".concat(data);
        }
    };
    Message.prototype.toString = function () {
        return ("[".concat(this.status, "] [").concat(this.createdAt, "] ").concat(this.body) +
            this.printAction() +
            this.printData());
    };
    Message.prototype.printToConsole = function () {
        switch (this.level) {
            case MessageLevels.Info:
                console.info(this.toString());
                break;
            case MessageLevels.Debug:
                console.debug(this.toString());
                break;
        }
    };
    return Message;
}(Hashable));
var ErrorMessageLevels;
(function (ErrorMessageLevels) {
    ErrorMessageLevels["Error"] = "Error";
    ErrorMessageLevels["Warn"] = "Warn";
})(ErrorMessageLevels || (ErrorMessageLevels = {}));
;
var ErrorMessage = /** @class */ (function (_super) {
    __extends(ErrorMessage, _super);
    function ErrorMessage(_a) {
        var _b = _a.id, id = _b === void 0 ? createIdentifier() : _b, body = _a.body, _c = _a.level, level = _c === void 0 ? ErrorMessageLevels.Error : _c, _d = _a.action, action = _d === void 0 ? 'Error Message Creation' : _d, _e = _a.status, status = _e === void 0 ? 500 : _e, _f = _a.print, print = _f === void 0 ? true : _f, _g = _a.throwError, throwError = _g === void 0 ? false : _g, _h = _a.stack, stack = _h === void 0 ? undefined : _h, _j = _a.data, data = _j === void 0 ? {} : _j;
        var _this = _super.call(this, { id: id, body: body, level: level, action: action, status: status, print: print, data: data }) || this;
        _this.throwError = throwError !== undefined ? throwError : false;
        _this.stack = stack !== undefined ? stack : '';
        _this.throw_();
        return _this;
    }
    ErrorMessage.create = function (entry) {
        var message = new ErrorMessage(entry);
        return message;
    };
    ErrorMessage.prototype.throw_ = function () {
        if (this.throwError) {
            throw this;
        }
    };
    ErrorMessage.prototype.printStack = function () {
        var isEmpty = checkIsEmpty([this.stack]);
        if (isEmpty) {
            return '';
        }
        else {
            return "\nStack: ".concat(this.stack);
        }
    };
    ErrorMessage.prototype.printThrowError = function () {
        var isEmpty = checkIsEmpty([this.throwError]);
        var errorThrown = true;
        if (!isEmpty) {
            errorThrown = this.throwError;
        }
        else {
            errorThrown = false;
        }
        return "\nError Thrown: ".concat(errorThrown);
    };
    ErrorMessage.prototype.toString = function () {
        return ("[".concat(this.status, "] [").concat(this.createdAt, "] ").concat(this.body) +
            this.printData() +
            this.printStack() +
            this.printThrowError());
    };
    ErrorMessage.prototype.printToConsole = function () {
        switch (this.level) {
            case ErrorMessageLevels.Error:
                console.error(this.toString());
                break;
            case ErrorMessageLevels.Warn:
                console.warn(this.toString());
                break;
        }
    };
    return ErrorMessage;
}(Message));
export { MessageLevels, Message, ErrorMessageLevels, ErrorMessage };
//# sourceMappingURL=message.js.map