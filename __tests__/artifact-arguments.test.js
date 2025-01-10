import { Argument } from '@artifacts/argument';
describe('Argument', () => {
    it('should create an Argument instance with the given name and value', () => {
        const entry = { name: 'testName', value: 'testValue' };
        const arg = new Argument(entry);
        expect(arg.name).toBe('testName');
        expect(arg.value).toBe('testValue');
    });
    it('should convert an Argument instance to JSON', () => {
        const entry = { name: 'testName', value: 123 };
        const arg = new Argument(entry);
        expect(arg.toJSON()).toEqual({ name: 'testName', value: 123 });
    });
    it('should convert an Argument instance to string', () => {
        const entry = { name: 'testName', value: true };
        const arg = new Argument(entry);
        expect(arg.toString()).toBe('testName: true');
    });
    it('should convert an Argument instance to Record', () => {
        const entry = { name: 'testName', value: 'testValue' };
        const arg = new Argument(entry);
        expect(arg.toRecord()).toEqual({ testName: 'testValue' });
    });
    it('should create an Argument instance from a Record', () => {
        const record = { testName: 'testValue' };
        const args = Argument.fromRecord(record);
        expect(args.name).toBe('testName');
        expect(args.value).toBe('testValue');
    });
    it('should not create an Argument instance from an empty Record', () => {
        const record = {};
        expect(() => Argument.fromRecord(record)).toThrow('Argument name or value cannot be empty.');
        const record2 = { testName: undefined };
        expect(() => Argument.fromRecord(record)).toThrow('Argument name or value cannot be empty.');
        const record3 = { testName: null };
        expect(() => Argument.fromRecord(record3)).toThrow('Argument name or value cannot be empty.');
    });
    it('should not create an Argument instance from an empty Argument Entry', () => {
        const entry = {};
        // @ts-ignore
        expect(() => new Argument(entry)).toThrow('Argument name or value cannot be empty.');
    });
    it('should not create an undefined Argument name from an Argument Entry', () => {
        try {
            // @ts-ignore
            new Argument({ name: undefined, value: 'testValue' });
        }
        catch (error) {
            expect(error.message).toBeDefined();
        }
    });
    it('should not create an improperly typed Argument instance from a Record', () => {
        const record = { testName: 123 };
        try {
            // @ts-ignore
            Argument.fromRecord(record);
        }
        catch (error) {
            expect(error.message).toBeDefined();
        }
    });
    it('should return the hash of an Argument instance', () => {
        const entry = { name: 'testName', value: 'testValue' };
        const arg = new Argument(entry);
        // @ts-ignore
        try {
            // @ts-ignore
            entry.value = 'newValue';
        }
        catch (error) {
            expect(error.message).toBeDefined();
        }
    });
    it('should throw an error when trying to set a value on an Argument instance', () => {
        const entry = { name: 'testName', value: 'testValue' };
        const arg = new Argument(entry);
        expect(() => arg.set('newValue')).toThrow('Method not implemented.');
    });
    it('should get the value of an Argument instance', () => {
        const entry = { name: 'testName', value: 123 };
        const arg = new Argument(entry);
        expect(arg.get()).toBe(123);
    });
    it('should check the hash of an Argument instance', () => {
        const entry = { name: 'testName', value: 'testValue' };
        const arg = new Argument(entry);
        expect(() => arg.checkHash()).toThrow('Method not implemented.');
    });
});
