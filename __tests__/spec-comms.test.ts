import { MessageLevels, MessageLevel, MessageSpec } from '../src/template/spec/v0/comms';


describe('MessageSpec', () => {

    it('should create a MessageSpec object properly with default values', () => {
        const message: MessageSpec = {
            level: MessageLevels.Info,
            status: 200,
            properties: {
                print: true,
                save: true,
                throw: false
            },
            body: 'This is a test message',
            timestamp: new Date()
        };

        expect(message.level).toBe(MessageLevels.Info);
        expect(message.properties.print).toBe(true);
        expect(message.properties.save).toBe(true);
        expect(message.properties.throw).toBe(false);
        expect(message.body).toBe('This is a test message');
    });
});

