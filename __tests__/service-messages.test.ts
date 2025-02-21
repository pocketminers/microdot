import {
    MessageManager,
    Message,
} from '../src/service/message';
import { MessageLevel, MessageLevels, MessageStatus, MessageStatuses } from '../src/template/spec/v0/comms';


describe('MessageManager', () => {

    it('should create a MessageManager object properly with default values', () => {
        const manager: MessageManager = new MessageManager();

        expect(manager).toBeDefined();
        expect(manager.messages).toBeDefined();
        expect(manager.messages.length).toBe(0);
    });

    it('should add a message to the manager', () => {
        const manager: MessageManager = new MessageManager();
        const message: Message<
            MessageLevels.Info,
            MessageStatuses.Success,
            string
        > = new Message({
            level: MessageLevels.Info,
            body: 'This is a test message'
        });

        manager.addMessage(message);

        expect(manager.messages.length).toBe(1);
        expect(manager.messages[0].level).toBe('Info');
        expect(manager.messages[0].body).toBe('This is a test message');
    });

    it('should remove a message from the manager', () => {
        const manager: MessageManager = new MessageManager();
        const message: Message<
            MessageLevels.Info,
            MessageStatuses.Success,
            string
        > = new Message({
            level: MessageLevels.Info,
            body: 'This is a test message'
        });

        manager.addMessage(message);
        manager.clear();

        expect(manager.messages.length).toBe(0);
    });

    it('should remove all messages from the manager', () => {
        const manager: MessageManager = new MessageManager();
        const message1: Message<
            MessageLevels.Info,
            MessageStatuses.Success,
            string
        > = new Message({
            level: MessageLevels.Info,
            body: 'This is a test message'
        });
        const message2: Message<
            MessageLevels.Info,
            MessageStatuses.BadRequest,
            string
        > = new Message({
            level: MessageLevels.Info,
            body: 'This is a test message'
        });

        manager.addMessage(message1);
        manager.addMessage(message2);
        manager.clear();

        expect(manager.messages.length).toBe(0);
    });

    it('should get all messages from the manager', () => {
        const manager: MessageManager = new MessageManager();
        const message1: Message<MessageLevels.Info, MessageStatuses.Success, string> = new Message({
            level: MessageLevels.Info,
            body: 'This is a test message'
        });
        const message2: Message<MessageLevels.Info, MessageStatuses.BadRequest, string> = new Message({
            level: MessageLevels.Info,
            body: 'This is a test message'
        });

        manager.addMessage(message1);
        manager.addMessage(message2);

        expect(manager.messages.length).toBe(2);
    });

    it("should configure the messag entry to not print to console", () => {
        const manager: MessageManager = new MessageManager();
        const message: Message<MessageLevels.Error, MessageStatuses.Success> = new Message<MessageLevels.Error, MessageStatuses.Success>({
            level: MessageLevels.Error,
            body: 'This is a test message - it should not print to console',
            args: [
                { name: 'print', value: false }
            ],

        });

        manager.addMessage(message);

        expect(manager.messages.length).toBe(1);
    });

    it('should configure the message entry to throw an error', () => {
        const manager: MessageManager = new MessageManager();
        try {
            const message: Message<MessageLevels.Error, MessageStatuses.InternalServerError> = new Message<MessageLevels.Error, MessageStatuses.InternalServerError, string>({
                level: MessageLevels.Error,
                body: 'This is a test message - it should throw an error',
                status: MessageStatuses.InternalServerError,
                args: [
                    { name: 'throw', value: true }
                ]
            });
        }
        catch (error: any) {
            expect(error.message).toBe('This is a test message - it should throw an error');
        }
    });

    it('should configure the message entry to not throw an error', () => {
        const manager: MessageManager = new MessageManager();
        const message: Message<
            MessageLevels.Error,
            MessageStatuses.InternalServerError,
            string
        > = new Message<MessageLevels.Error, MessageStatuses.InternalServerError, string>({
            level: MessageLevels.Error,
            body: 'This is a test message - it should not throw an error',
            status: MessageStatuses.InternalServerError,
            args: [
                { name: 'throw', value: false }
            ]
        });

        manager.addMessage(message);

        expect(manager.messages.length).toBe(1);
    });

    it('should not print a message to console', () => {
        const manager: MessageManager = new MessageManager();
        const message: Message<
            MessageLevels.Info,
            MessageStatuses.Success,
            string
        > = new Message<MessageLevels.Info, MessageStatuses.Success, string>({
            level: MessageLevels.Info,
            body: 'This is a test message - it should not print to console',
            args: [
                { name: 'print', value: false }
            ]
        });

        manager.addMessage(message);

        expect(manager.messages.length).toBe(1);
    });

    it('should get messages by level', () => {
        const manager: MessageManager = new MessageManager();
        const message1: Message<
            MessageLevels.Info,
            MessageStatuses.Success,
            string
        > = new Message<MessageLevels.Info, MessageStatuses.Success, string>({
            level: MessageLevels.Info,
            status: MessageStatuses.Success,
            body: 'This is a test message - it should not print to console',
            args: [
                { name: 'print', value: false }
            ]
        });
        const message2: Message<
            MessageLevels.Error,
            MessageStatuses.InternalServerError,
            string
        > = new Message<MessageLevels.Error, MessageStatuses.InternalServerError, string>({
            level: MessageLevels.Error,
            status: MessageStatuses.InternalServerError,
            body: 'This is a test message - it should not print to console',
            args: [
                { name: 'print', value: false }
            ]
        });

        manager.addMessage(message1);
        manager.addMessage(message2);

        console.log(`manager.messages`, manager.messages);

        const infoMessages = manager.getMessages({ level: MessageLevels.Info });   
        console.log(`infoMessages`, infoMessages);

        const errorMessages = manager.getMessages({ level: MessageLevels.Error });
        console.log(`errorMessages`, errorMessages);

        expect(infoMessages.length).toBe(1);
        expect(manager.getMessages({ level: MessageLevels.Error }).length).toBe(1);
    });

    it('should get messages by status', () => {
        const manager: MessageManager = new MessageManager();
        const message1: Message<
            MessageLevels.Info,
            MessageStatuses.Success,
            string
        > = new Message<MessageLevels.Info, MessageStatuses.Success, string>({
            level: MessageLevels.Info,
            status: MessageStatuses.Success,
            body: 'This is a test message - it should not print to console',
            args: [
                { name: 'print', value: false }
            ]
        });
        const message2: Message<
            MessageLevels.Error,
            MessageStatuses.InternalServerError,
            string
        > = new Message<MessageLevels.Error, MessageStatuses.InternalServerError, string>({
            level: MessageLevels.Error,
            status: MessageStatuses.InternalServerError,
            body: 'This is a test message - it should not print to console',
            args: [
                { name: 'print', value: false }
            ]
        });

        manager.addMessage(message1);
        manager.addMessage(message2);

        console.log(manager.messages);

        const isSuccess = manager.getMessages({ status: MessageStatuses.Success });
        console.log(isSuccess);

        const isInternalServerError = manager.getMessages({ status: MessageStatuses.InternalServerError });

        expect(isSuccess.length).toBe(1);
        expect(isInternalServerError.length).toBe(1);
    });

});

