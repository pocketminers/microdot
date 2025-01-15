import { Message, MessageLevels, ErrorMessage, ErrorMessageLevels } from "../src/service/message";
import { Codes } from "../src/service/status";

describe('Message', () => {
    it('should create a Message with default values', () => {
        const message = new Message({ body: 'Test message' });

        expect(message.body).toBe('Test message');
        expect(message.level).toBe(MessageLevels.Info);
        expect(message.status).toBe(Codes.OK);
        expect(message.print).toBe(true);
        expect(message.data).toBeUndefined();
    });

    it('should create a Message with custom values', () => {
        const message = new Message({
            body: 'Custom message',
            level: MessageLevels.Debug,
            status: 404,
            print: false,
            data: { key: 'value' }
        });

        expect(message.body).toBe('Custom message');
        expect(message.level).toBe(MessageLevels.Debug);
        expect(message.status).toBe(404);
        expect(message.print).toBe(false);
        expect(message.data).toEqual({ key: 'value' });
    });

    it('should print message to console', () => {
        console.info = jest.fn();
        new Message({ body: 'Info message', print: true });

        expect(console.info).toHaveBeenCalled();
    });

    it('should not print message to console when print is false', () => {
        console.info = jest.fn();
        new Message({ body: 'Info message', print: false });

        expect(console.info).not.toHaveBeenCalled();
    });
});

describe('ErrorMessage', () => {
    it('should create an ErrorMessage with default values', () => {
        const errorMessage = new ErrorMessage({ body: 'Error message' });

        expect(errorMessage.body).toBe('Error message');
        expect(errorMessage.level).toBe(ErrorMessageLevels.Error);
        expect(errorMessage.status).toBe(500);
        expect(errorMessage.print).toBe(true);
        expect(errorMessage.throwError).toBe(false);
        expect(errorMessage.stack).toBe('');
    });

    it('should create an ErrorMessage with custom values', () => {
        const errorMessage = new ErrorMessage({
            body: 'Custom error message',
            level: ErrorMessageLevels.Warn,
            status: 400,
            print: false,
            throwError: false,
            stack: 'Error stack trace',
            data: { error: 'details' }
        });

        expect(errorMessage.body).toBe('Custom error message');
        expect(errorMessage.level).toBe(ErrorMessageLevels.Warn);
        expect(errorMessage.status).toBe(400);
        expect(errorMessage.print).toBe(false);
        expect(errorMessage.throwError).toBe(false);
        expect(errorMessage.stack).toBe('Error stack trace');
        expect(errorMessage.data).toEqual({ error: 'details' });
    });

    it('should throw an error when throwError is true', () => {
        expect(() => {
            new ErrorMessage({ body: 'Error message', throwError: true });
        }).toThrow(ErrorMessage);
    });

    it('should print error message to console', () => {
        console.error = jest.fn();
        new ErrorMessage({ body: 'Error message', print: true });

        expect(console.error).toHaveBeenCalled();
    });

    it('should not print error message to console when print is false', () => {
        console.error = jest.fn();
        new ErrorMessage({ body: 'Error message', print: false });

        expect(console.error).not.toHaveBeenCalled();
    });
});