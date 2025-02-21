import { MessageLevels, MessageLevel, MessageSpec } from '../src/template/spec/v0/comms';
import { Argument, Properties } from '../src/component';

describe('MessageSpec', () => {

    it('should create a MessageSpec object properly with default values', () => {
        const message: MessageSpec = {
            level: MessageLevels.Info,
            status: 200,
            properties: new Properties({
                args: [
                    new Argument<boolean>({name: 'print', value: true}),
                    new Argument<boolean>({name: 'save', value: true}),
                    new Argument<boolean>({name: 'throw', value: false})
                ]
            }),
            body: 'This is a test message',
            timestamp: new Date()
        };

        expect(message.level).toBe(MessageLevels.Info);
        expect(message.properties.getValue('print')).toBe(true);
        expect(message.properties.getValue('save')).toBe(true);
        expect(message.properties.getValue('throw')).toBe(false);
        expect(message.body).toBe('This is a test message');
    });

    it('should create a MessageSpec object properly with custom values', () => {
        const message: MessageSpec = {
            level: MessageLevels.Warn,
            status: 404,
            properties: new Properties({
                args: [
                    new Argument<boolean>({name: 'print', value: false}),
                    new Argument<boolean>({name: 'save', value: true}),
                    new Argument<boolean>({name: 'throw', value: true})
                ]
            }),
            body: 'This is a test message',
            timestamp: new Date()
        };

        expect(message.level).toBe(MessageLevels.Warn);
        expect(message.properties.getValue('print')).toBe(false);
        expect(message.properties.getValue('save')).toBe(true);
        expect(message.properties.getValue('throw')).toBe(true);
        expect(message.body).toBe('This is a test message');
    });
});

