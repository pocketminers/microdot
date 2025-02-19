import {
    MessageManager,
    Message,
} from '../src/service/message';


describe('MessageManager', () => {

    it('should create a MessageManager object properly with default values', () => {
        const manager: MessageManager = new MessageManager();

        expect(manager).toBeDefined();
        expect(manager.messages).toBeDefined();
        expect(manager.messages.length).toBe(0);
    });

    it('should add a message to the manager', () => {
        const manager: MessageManager = new MessageManager();
        const message: Message = new Message({
            level: 'info',
            body: 'This is a test message'
        });

        manager.addMessage(message);

        expect(manager.messages.length).toBe(1);
        expect(manager.messages[0].level).toBe('info');
        expect(manager.messages[0].body).toBe('This is a test message');
    });

    it('should remove a message from the manager', () => {
        const manager: MessageManager = new MessageManager();
        const message: Message = new Message({
            level: 'info',
            body: 'This is a test message'
        });

        manager.addMessage(message);
        manager.remove(message);

        expect(manager.messages.length).toBe(0);
    });

    it('should remove all messages from the manager', () => {
        const manager: MessageManager = new MessageManager();
        const message1: Message = new Message({
            level: 'info',
            body: 'This is a test message'
        });
        const message2: Message = new Message({
            level: 'info',
            body: 'This is a test message'
        });

        manager.add(message1);
        manager.add(message2);
        manager.removeAll();

        expect(manager.messages.length).toBe(0);
    });

    it('should get all messages from the manager', () => {
        const manager: MessageManager = new MessageManager();
        const message1: Message = new Message({
            level: 'info',
            body: 'This is a test message'
        });
        const message2: Message = new Message({
            level: 'info',
            body: 'This is a test message'
        });

        manager.add(message1);
        manager.add(message2);

        expect(manager.getAll().length).toBe(2);
    });

    it('should get all messages from the manager by level', () => {
        const manager: MessageManager = new MessageManager();
        const message1: Message = new Message({
            level: 'info',
            body: 'This is a