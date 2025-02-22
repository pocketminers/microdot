import { hash } from 'crypto';
import {
    MessageManager,
    Message,
    MessageFactory,
} from '../src/service/message';
import { MessageLevel, MessageLevels, MessageStatus, MessageStatuses } from '../src/template/spec/v0/comms';
import { Configurable } from '../src/component/configurable';


describe('MessageManager', () => {

    it('should create a MessageManager object properly with default values', () => {
        const manager: MessageManager = new MessageManager();

        expect(manager).toBeDefined();
        expect(manager.messages).toBeDefined();
        expect(manager.messages.length).toBe(0);
    });

    it('should add a message to the manager', async () => {
        const manager: MessageManager = new MessageManager({
            args: [
                { name: 'keepHistory', value: true },
                { name: 'historyFilePath', value: `./history-test.json` }
            ]
        });
        const message: Message<
            MessageLevels.Info,
            MessageStatuses.Success,
            string
        > = await manager.createMessage({
            level: MessageLevels.Info,
            body: 'This is a test message'
        });

        // manager.addMessage(message);

        expect(manager.messages.length).toBe(1);
        // expect(manager.messages[0].getDataValue.level).toBe('Info');
        // expect(manager.messages[0].data.body).toBe('This is a test message');
    });

    it('should remove a message from the manager', async () => {
        const manager: MessageManager = new MessageManager({
            args: [
                { name: 'keepHistory', value: true },
                { name: 'historyFilePath', value: `./history-test.json` }
            ]
        });
        const message: Message<
            MessageLevels.Info,
            MessageStatuses.Success,
            string
        > = await manager.createMessage({
            level: MessageLevels.Info,
            body: 'This is a test message'
        });

        // manager.addMessage(message);

        expect(manager.messages.length).toBe(1);
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

    it('should get messages by level', async () => {
        const manager: MessageManager = new MessageManager({args: [
            { name: 'keepHistory', value: true },
            { name: 'historyFilePath', value: `./history-test.json` }
        ]});
        const message1: Message<
            MessageLevels.Info,
            MessageStatuses.Success,
            string
        > = await manager.createMessage<MessageLevels.Info, MessageStatuses.Success, string>({
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
        > = await manager.createMessage<MessageLevels.Error, MessageStatuses.InternalServerError, string>({
            level: MessageLevels.Error,
            status: MessageStatuses.InternalServerError,
            body: 'This is a test message - it should not print to console',
            args: [
                { name: 'print', value: false }
            ]
        });

        // manager.addMessage(message1);
        // manager.addMessage(message2);

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

    it('should save messages to an external json file', async () => {

        const manager: MessageManager = new MessageManager({args: [{ name: 'keepHistory', value: true }, { name: 'historyFilePath', value: `./history-test.json` }]});

        await manager.clearHistoryFile("./history-test.json");

        const message: Message<
            MessageLevels.Info,
            MessageStatuses.Success,
            string
        > = await manager.createMessage<MessageLevels.Info, MessageStatuses.Success, string>({
            level: MessageLevels.Info,
            body: 'This is a test message - it should not save to file',
            args: [
                { name: 'save', value: true }
            ]
        });

        // await manager.createMessage(message);

        expect(manager.messages.length).toBe(1);
    });

    it('should readMessagesFromFile', async () => {
        const manager: MessageManager = new MessageManager({args: [{ name: 'keepHistory', value: true }, { name: 'historyFilePath', value: `./history-test.json` }]});

        await manager.readMessagesFromFile("./history-test.json");

        expect(manager.messages.length).toBeGreaterThanOrEqual(1);
    })

    it('should clear history file', async () => {
        const manager: MessageManager = new MessageManager({ args: [{ name: 'keepHistory', value: true }, { name: 'historyFilePath', value: `./history-test.json` }]});

        await manager.clearHistoryFile("./history-test.json");

        expect(manager.messages.length).toBe(0);
    });

    it('should add megta data to the message', () => {
        const manager: MessageManager = new MessageManager();
        const message: Message<
            MessageLevels.Info,
            MessageStatuses.Success,
            string
        > = MessageFactory.createMessage<MessageLevels.Info, MessageStatuses.Success, string>({
            metadata: {
                name: 'test',
                description: 'This is a test message'
            },
            level: MessageLevels.Info,
            body: 'This is a test message - it should not print to console'
        });

        manager.addMessage(message);

        expect(manager.messages.length).toBe(1);
        // expect(manager.messages[0].metadata.name).toBe('test');
        // expect(manager.messages[0].meta.description).toBe('This is a test message');
    });

    it('should add labels to the message', () => {
        const manager: MessageManager = new MessageManager();
        const message: Message<
            MessageLevels.Info,
            MessageStatuses.Success,
            string
        > = new Message<MessageLevels.Info, MessageStatuses.Success, string>({
            metadata: {
                name: 'test',
                description: 'This is a test message',
                labels: {
                    id: 'test',
                    name: 'test',
                    description: 'This is a test message'
                }
            },
            level: MessageLevels.Info,
            body: 'This is a test message - it should not print to console',
            status: MessageStatuses.Success,
        })

        manager.addMessage(message);

        expect(manager.messages.length).toBe(1);
        // expect(manager.messages[0].metadata.labels.get('id')).toBe('test');
        // expect(manager.messages[0].meta.labels.get('name')).toBe('test');
        // expect(manager.messages[0].meta.labels.get('description')).toBe('This is a test message');
    });

    it('should add annotations to the message', async () => {
        const manager: MessageManager = new MessageManager();
        const message: Message<
            MessageLevels.Info,
            MessageStatuses.Success,
            string
        > = MessageFactory.createMessage<MessageLevels.Info, MessageStatuses.Success, string>({
            metadata: {
                name: 'test',
                description: 'This is a test message',
                annotations: {
                    createdBy: 'test',
                }
            },
            level: MessageLevels.Info,
            body: 'This is a test message - it should not print to console',
            status: MessageStatuses.Success,
        })

        const configurable = new Configurable({
            id: 'test',
            name: 'test',
            description: 'This is a test message',
            properties: {},
            data: {},
            metadata: {}
        });

        await configurable.hashData();

        manager.addMessage(message);

        expect(manager.messages.length).toBe(1);
        // expect(manager.messages[0].meta.annotations.get('createdBy')).toBe('test');
        // expect(manager.messages[0].meta.annotations.get('hash')).toBe('not-set');

        expect(configurable.metadata.annotations.get('hash')).toBe("94b0331c0130d31e9d2fd98ae6518b7d7d4858db004c370dd62ba3a8c0927a70");
    });

    it('should add a message to the manager with a status of BadRequest', async () => {
        const manager: MessageManager = new MessageManager();
        const message: Message<
            MessageLevels.Info,
            MessageStatuses.BadRequest,
            string
        > = await manager.createMessage<MessageLevels.Info, MessageStatuses.BadRequest, string>({
            level: MessageLevels.Info,
            status: MessageStatuses.BadRequest,
            body: 'This is a test message',
            args: [
                { name: 'print', value: false },
                { name: 'throw', value: false },
                { name: 'save', value: true }
            ]
        });

        expect(manager.messages.length).toBe(1);
        // expect(manager.messages[0].data.status).toBe('BadRequest');
    });

    it('should add a message to the manager with a status of NotFound', async () => {
        const manager: MessageManager = new MessageManager();
        await manager.createMessage<MessageLevels.Info, MessageStatuses.NotFound, string>({
            level: MessageLevels.Info,
            status: MessageStatuses.NotFound,
            body: 'This is a test message',
            args: [
                { name: 'print', value: false },
                { name: 'throw', value: false },
                { name: 'save', value: true }
            ]
        });

        expect(manager.messages.length).toBe(1);
        // expect(manager.messages[0].data.status).toBe('NotFound');
    });

});

