import { Identifier } from "../utils/identifier";
import { Hashable } from "../artifacts";
/**
 * MessageLevels is an enum of message levels.
 * The message levels are 'Info' and 'Debug'.
 */
declare enum MessageLevels {
    Info = "Info",
    Debug = "Debug"
}
/**
 * MessageLevel is a type that represents the message levels.
 * The message levels are 'Info' and 'Debug' and 'Error' and 'Warn'.
 */
type MessageLevel = keyof typeof MessageLevels | keyof typeof ErrorMessageLevels;
/**
 * MessageEntry is an interface that represents the message entry.
 * The message entry contains the message properties.
 */
interface MessageEntry<L = MessageLevel, T = any> extends Partial<Record<'id', Identifier>>, Record<'body', string>, Partial<Record<'level', L>>, Partial<Record<'action', string>>, Partial<Record<'status', number>>, Partial<Record<'metadata', T>>, Partial<Record<'print', boolean>> {
}
declare class Message<L = MessageLevel, T = any> extends Hashable<MessageEntry<L, T>> {
    readonly body: string;
    readonly level: L;
    readonly action?: string;
    readonly status: number;
    readonly metadata?: T;
    readonly print: boolean;
    readonly createdAt: Date;
    constructor({ id, body, level, action, status, print, metadata }: MessageEntry<L, T>);
    static createMsg<L, T = undefined>(entry: MessageEntry<L, T>): Message<L, T>;
    printAction(): string;
    printData(): string;
    toString(): string;
    printToConsole(): void;
}
declare enum ErrorMessageLevels {
    Error = "Error",
    Warn = "Warn"
}
type ErrorMessageLevel = keyof typeof ErrorMessageLevels;
interface ErrorMessageEntry<L = ErrorMessageLevel, T = any> extends MessageEntry<L, T>, Partial<Record<'stack', string>>, Partial<Record<'throwError', boolean>> {
}
declare class ErrorMessage<L = ErrorMessageLevel, T = any> extends Message<L, T> {
    readonly stack: string;
    readonly throwError: boolean;
    constructor({ id, body, level, action, status, print, throwError, stack, metadata }: ErrorMessageEntry<L, T>);
    static createMsg<L = ErrorMessageLevels.Error, T = undefined>(entry: ErrorMessageEntry<L, T>): ErrorMessage<L, T>;
    private throw_;
    printStack(): string;
    printThrowError(): string;
    toString(): string;
    printToConsole(): void;
}
export { type MessageLevel, MessageLevels, type MessageEntry, Message, type ErrorMessageLevel, ErrorMessageLevels, type ErrorMessageEntry, ErrorMessage };
//# sourceMappingURL=message.d.ts.map