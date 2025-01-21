
import { Codes } from "@service/status";
import { createIdentifier, Identifier } from "@utils/identifier";
import { checkForCircularReference, checkIsEmpty } from "@utils/checks";
import { Hashable } from "@/artifacts";


/**
 * MessageLevels is an enum of message levels.
 * The message levels are 'Info' and 'Debug'.
 */
enum MessageLevels {
    Info = 'Info',
    Debug = 'Debug'
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
interface MessageEntry<L = MessageLevel, T = any>
    extends
        Partial<Record<'id', Identifier>>,
        Record<'body', string>,
        Partial<Record<'level', L>>,
        Partial<Record<'action', string>>,
        Partial<Record<'status', number>>,
        Partial<Record<'metadata', T>>,
        Partial<Record<'print', boolean>> {};


class Message<L = MessageLevel, T = any>
    extends
        Hashable<MessageEntry<L, T>>
{
    public readonly body: string;
    public readonly level: L;
    public readonly action?: string;
    public readonly status: number;
    public readonly metadata?: T;
    public readonly print: boolean;
    public readonly createdAt: Date = new Date();


    constructor({
        id,
        body,
        level = MessageLevels.Info as L,
        action = undefined,
        status = Codes.OK,
        print = true,
        metadata = {} as T
    }: MessageEntry<L, T>) {
        super({id, data: {body, level, action, status, print, metadata}});

        this.body = body;
        this.level = level;
        this.action = action;
        this.status = status;
        this.print = print;
        this.metadata = checkIsEmpty([metadata]) ? undefined : metadata as T;

        if (this.print) {
            this.printToConsole();
        }
    }

    public static createMsg<L, T = undefined>(entry: MessageEntry<L,T>): Message<L,T> {
        const message = new Message<L,T>(entry);
        return message;
    }

    public printAction(): string {
        const isEmpty = checkIsEmpty([this.action]);

        if (isEmpty) {
            return '';
        }
        else {
            return `\nAction: ${this.action}`;
        }
    }

    public printData(): string {
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

    public toString(): string {
        return (
            `[${this.status}] [${this.createdAt}] ${this.body}` +
            this.printAction() +
            this.printData()
        );
    }

    public printToConsole(): void {
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

enum ErrorMessageLevels {
    Error = 'Error',
    Warn = 'Warn'
}

type ErrorMessageLevel = keyof typeof ErrorMessageLevels;

interface ErrorMessageEntry<L = ErrorMessageLevel, T = any>
    extends
        MessageEntry<L, T>,
        Partial<Record<'stack', string>>,
        Partial<Record<'throwError', boolean>> {};


class ErrorMessage<L = ErrorMessageLevel, T = any>
    extends Message<L, T>
{
    public readonly stack: string;
    public readonly throwError: boolean;

    constructor(
        {
            id = createIdentifier(),
            body,
            level = ErrorMessageLevels.Error as L,
            action = 'Error Message Creation',
            status = 500,
            print = true,
            throwError = false,
            stack = undefined,
            metadata = {} as T
        }: ErrorMessageEntry<L, T>
    ) {
        super({ id, body, level, action, status, print, metadata});
        this.throwError = throwError !== undefined ? throwError : false;
        this.stack = stack !== undefined ? stack : '';

        this.throw_();
    }

    public static createMsg<L = ErrorMessageLevels.Error, T = undefined>(entry: ErrorMessageEntry<L, T>): ErrorMessage<L,T> {
        const message = new ErrorMessage<L, T>(entry);
        return message;
    }

    private throw_() {
        if (this.throwError) {
            throw this;
        }
    }

    public printStack(): string {
        const isEmpty = checkIsEmpty([this.stack]);

        if (isEmpty) {
            return '';
        }
        else {
            return `\nStack: ${this.stack}`;
        }
    }

    public printThrowError(): string {
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

    public override toString(): string {
        return (
            `[${this.status}] [${this.createdAt}] ${this.body}` +
            this.printData() +
            this.printStack() + 
            this.printThrowError()
        );
    }

    public override printToConsole(): void {
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



export {
    type MessageLevel,
    MessageLevels,
    type MessageEntry,
    Message,
    type ErrorMessageLevel,
    ErrorMessageLevels,
    type ErrorMessageEntry,
    ErrorMessage
}