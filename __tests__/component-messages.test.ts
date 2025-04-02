import {
    MessageManager,
    Message,
    MessageFactory,
    MessageStorage,
} from '../src/component/messenger';
import {
    MessageLevels,
    MessageStatuses
} from '../src/template/spec/v0/comms';


describe('MessageFactory', () => {
    it('should create a new instance', () => {
        const messageFactory = new MessageFactory();

        expect(messageFactory).toBeInstanceOf(MessageFactory);
    });

    it('should create a new message', () => {
        const messageFactory = new MessageFactory();

        const message = MessageFactory.createMessage({
            level: MessageLevels.Info,
            body: 'This is a test message'
        });

        expect(message).toBeInstanceOf(Message);
        expect(message.data.level).toBe('Info');
        expect(message.data.body).toBe('This is a test message');
    });

    it('should create a new message with status', () => {
        const messageFactory = new MessageFactory();

        const message = MessageFactory.createMessage({
            level: MessageLevels.Info,
            status: MessageStatuses.Success,
            body: 'This is a test message'
        });

        expect(message).toBeInstanceOf(Message);
        expect(message.data.level).toBe('Info');
        expect(message.data.status).toBe('Success');
        expect(message.data.body).toBe('This is a test message');
    });

    it('should create a new message with metadata', () => {
        const messageFactory = new MessageFactory();

        const message = MessageFactory.createMessage({
            level: MessageLevels.Info,
            body: 'This is a test message',
            metadata: {
                labels: {
                    name: 'test'
                },
                annotations: {
                    description: 'This is a test message'
                }
            }
        });

        expect(message).toBeInstanceOf(Message);
        expect(message.meta.labels.get('name')).toBe('test');
        expect(message.meta.annotations.get('description')).toBe('This is a test message');
    });
});


describe('Message', () => {
    it('should create a new instance', () => {
        const message = new Message({
            level: MessageLevels.Info,
            body: 'This is a test message'
        });

        expect(message).toBeInstanceOf(Message);
        expect(message.data.level).toBe('Info');
        expect(message.data.body).toBe('This is a test message');
    });

    it('should create a new instance with status', () => {
        const message = new Message({
            level: MessageLevels.Info,
            status: MessageStatuses.Success,
            body: 'This is a test message'
        });

        expect(message).toBeInstanceOf(Message);
        expect(message.data.level).toBe('Info');
        expect(message.data.status).toBe('Success');
        expect(message.data.body).toBe('This is a test message');
    });

    it('should create a new instance with metadata', () => {
        const message = new Message({
            level: MessageLevels.Info,
            body: 'This is a test message',
            metadata: {
                labels: {
                    name: 'test'
                },
                annotations: {
                    description: 'This is a test message'
                }
            }
        });

        expect(message).toBeInstanceOf(Message);
        expect(message.meta.labels.get('name')).toBe('test');
        expect(message.meta.annotations.get('description')).toBe('This is a test message');
    });

    it('should create a new instance with metadata and status', () => {
        const message = new Message({
            level: MessageLevels.Info,
            status: MessageStatuses.Success,
            body: 'This is a test message',
            metadata: {
                labels: {
                    name: 'test'
                },
                annotations: {
                    description: 'This is a test message'
                }
            }
        });

        expect(message).toBeInstanceOf(Message);
        expect(message.data.level).toBe('Info');
        expect(message.data.status).toBe('Success');
        expect(message.data.body).toBe('This is a test message');
        expect(message.meta.labels.get('name')).toBe('test');
        expect(message.meta.annotations.get('description')).toBe('This is a test message');
    });

    it('should create a new instance with metadata and status', () => {
        const message = new Message({
            level: MessageLevels.Info,
            status: MessageStatuses.Success,
            body: 'This is a test message',
            metadata: {
                labels: {
                    name: 'test'
                },
                annotations: {
                    description: 'This is a test message'
                }
            }
        }); 

        expect(message).toBeInstanceOf(Message);
        expect(message.data.level).toBe('Info');
        expect(message.data.status).toBe('Success');
        expect(message.data.body).toBe('This is a test message');
        expect(message.meta.labels.get('name')).toBe('test');
        expect(message.meta.annotations.get('description')).toBe('This is a test message');
    });
});


describe('MessageStorage', () => {
    it('should create a new instance', () => {
        const storage = new MessageStorage();

        expect(storage).toBeInstanceOf(MessageStorage);
    });

    it('should add a message to the storage', () => {
        const storage = new MessageStorage();
        const message = new Message({
            level: MessageLevels.Info,
            body: 'This is a test message'
        });

        storage.addMessage(message);

        expect(storage.size).toBe(1);
    });

    it('should remove a message from the storage', () => {
        const storage = new MessageStorage();
        const message = new Message({
            level: MessageLevels.Info,
            body: 'This is a test message'
        });

        storage.addMessage(message);
        storage.removeItem({item: message});

        expect(storage.size).toBe(0);
    });

    it('should get all messages from the storage', () => {
        const storage = new MessageStorage();
        const message1 = new Message({
            level: MessageLevels.Info,
            body: 'This is a test message'
        });
        const message2 = new Message({
            level: MessageLevels.Info,
            body: 'This is a test message'
        });

        storage.addMessage(message1);
        storage.addMessage(message2);

        expect(storage.size).toBe(2);
    });

    it('should get messages by level', () => {
        const storage = new MessageStorage();
        const message1 = new Message({
            level: MessageLevels.Info,
            body: 'This is a test message'
        });
        const message2 = new Message({
            level: MessageLevels.Error,
            body: 'This is a test message'
        });

        storage.addMessage(message1);
        storage.addMessage(message2);

        expect(storage.getMessages({ level: MessageLevels.Info }).length).toBe(1);
        expect(storage.getMessages({ level: MessageLevels.Error }).length).toBe(1);
    });

    it('should get messages by status', () => {
        const storage = new MessageStorage();
        const message1 = new Message({
            level: MessageLevels.Info,
            status: MessageStatuses.Success,
            body: 'This is a test message'
        });
        const message2 = new Message({
            level: MessageLevels.Error,
            status: MessageStatuses.InternalServerError,
            body: 'This is a test message'
        });

        storage.addMessage(message1);
        storage.addMessage(message2);

        expect(storage.getMessages({ status: MessageStatuses.Success }).length).toBe(1);
        expect(storage.getMessages({ status: MessageStatuses.InternalServerError }).length).toBe(1);
    });

});



describe('MessageManager', () => {

    it('should create a MessageManager object properly with default values', () => {
        const manager: MessageManager = new MessageManager();

        expect(manager).toBeDefined();
        expect(manager.storage).toBeDefined();
        expect(manager.storage.size).toBe(0);
    });

    it('should add a message to the manager', async () => {
        const manager: MessageManager = new MessageManager({
            args: [
                { name: 'keepHistory', value: true },
                { name: 'historyFilePath', value: `./history-test.json` }
            ]
        });
        await manager.createMessage<
            MessageLevels.Info,
            MessageStatuses.Success,
            string
        >({
            level: MessageLevels.Info,
            status: MessageStatuses.Success,
            body: 'This is a test message'
        });

        // manager.createMessage(message);

        expect(manager.storage.size).toBe(1);
        expect(manager.storage.getMessages().length).toBe(1);
        expect(manager.dependencies[0].storage.size).toBe(1);
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

        // manager.createMessage(message);

        expect(manager.storage.size).toBe(1);
        manager.storage.clear();

        expect(manager.storage.size).toBe(0);
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

        manager.createMessage({
            level: MessageLevels.Info,
            body: 'This is a test message'
        });
        manager.createMessage({
            level: MessageLevels.Info,
            body: 'This is a test message'
        });
        manager.storage.clear();

        expect(manager.storage.size).toBe(0);
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

        manager.createMessage({
            level: MessageLevels.Info,
            body: 'This is a test message'
        });
        manager.createMessage({
            level: MessageLevels.Info,
            body: 'This is a test message'
        });

        expect(manager.storage.size).toBe(2);
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

        manager.createMessage(message);

        expect(manager.storage.size).toBe(1);
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

        manager.createMessage(message);

        expect(manager.storage.size).toBe(1);
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

        manager.createMessage(message);

        expect(manager.storage.size).toBe(1);
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

        // manager.createMessage(message1);
        // manager.createMessage(message2);

        // console.log(`manager.messages`, manager.messages);

        const infoMessages = manager.storage.getMessages({ level: MessageLevels.Info });
        // console.log(`infoMessages`, infoMessages);

        const errorMessages = manager.storage.getMessages({ level: MessageLevels.Error });
        // console.log(`errorMessages`, errorMessages);

        expect(infoMessages.length).toBe(1);
        expect(manager.storage.getMessages({ level: MessageLevels.Error }).length).toBe(1);
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

        manager.createMessage(message1);
        manager.createMessage(message2);

        const isSuccess = manager.storage.getMessages({ status: MessageStatuses.Success });

        const isInternalServerError = manager.storage.getMessages({ status: MessageStatuses.InternalServerError });

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

        expect(manager.storage.size).toBe(1);
    });

    it('should readMessagesFromFile', async () => {
        const manager: MessageManager = new MessageManager({args: [{ name: 'keepHistory', value: true }, { name: 'historyFilePath', value: `./history-test.json` }]});

        manager.createMessage({
            level: MessageLevels.Info,
            body: 'This is a test message - it should nsave to file',
            args: [
                { name: 'print', value: false },
                { name: 'throw', value: false },
                { name: 'save', value: true }
            ]
        });

        await manager.readMessagesFromFile("./history-test.json");

        expect(manager.storage.size).toBeGreaterThanOrEqual(1);
    })

    it('should clear history file', async () => {
        const manager: MessageManager = new MessageManager({ args: [{ name: 'keepHistory', value: true }, { name: 'historyFilePath', value: `./history-test.json` }]});

        await manager.clearHistoryFile("./history-test.json");

        expect(manager.storage.size).toBe(0);
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

        manager.createMessage(message);

        expect(manager.storage.size).toBe(1);
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

        manager.createMessage(message);

        expect(manager.storage.size).toBe(1);
        // expect(manager.messages[0].metadata.labels.get('id')).toBe('test');
        // expect(manager.messages[0].meta.labels.get('name')).toBe('test');
        // expect(manager.messages[0].meta.labels.get('description')).toBe('This is a test message');
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

        expect(manager.storage.size).toBe(1);
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

        expect(manager.storage.size).toBe(1);
        // expect(manager.messages[0].data.status).toBe('NotFound');
    });

});

