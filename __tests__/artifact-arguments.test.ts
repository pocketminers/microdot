import { Argument, ArgumentEntry } from '../src/artifacts/argument';
import { Arguments } from '../src/artifacts/arguments';

describe('Argument', () => {
    it('should create an Argument instance with the given name and value', () => {
        const entry: ArgumentEntry<string> = { name: 'testName', value: 'testValue' };
        const arg = new Argument<string>(entry);

        expect(arg.name).toBe('testName');
        expect(arg.value).toBe('testValue');
    });

    it('should convert an Argument instance to JSON', () => {
        const entry: ArgumentEntry<number> = { name: 'testName', value: 123 };
        const arg = new Argument<number>(entry);
        const id = arg.id;

        expect(arg.toJSON()).toEqual({ id, name: 'testName', value: 123 });
    });

    it('should convert an Argument instance to string', () => {
        const entry: ArgumentEntry<boolean> = { name: 'testName', value: true };
        const arg = new Argument<boolean>(entry);

        expect(arg.toString()).toBe('testName: true');
    });
    

    it('should convert an Argument instance to Record', () => {
        const entry: ArgumentEntry<string> = { name: 'testName', value: 'testValue' };
        const arg = new Argument<string>(entry);

        expect(arg.toRecord()).toEqual({ testName: 'testValue' });
    });

    it('should create an Argument instance from a Record', async () => {
        const record = { testName: 'testValue' };
        const args = await Argument.fromRecord<string>(record);

        console.log(`args: ${args}`);

        expect(args.name).toBe('testName');
        expect(args.value).toBe('testValue');
    });

    it('should not create an Argument instance from an empty Record', () => {
        const record = {} as Record<string, string>;
        expect(() => Argument.fromRecord<typeof record.value>(record)).toThrow('Argument:fromRecord:input cannot be empty.');
        
        const record2 = { testName: undefined };
        expect(() => Argument.fromRecord<any>(record2)).toThrow('Argument:fromRecord:input cannot be empty.');

        const record3 = { testName: null };
        expect(() => Argument.fromRecord<any>(record3)).toThrow('Argument:fromRecord:input cannot be empty.');
    });

    it('should not create an Argument instance from an empty Argument Entry', () => {
        const entry = {};
        // @ts-expect-error - Testing private property
        expect(() => new Argument<any>(entry)).toThrow('Argument:constructor:name or value cannot be empty.');
    });

    it('should not create an undefined Argument name from an Argument Entry', () => {
        try {
            // @ts-expect-error - Testing private property
            new Argument<string>({ name: undefined, value: 'testValue' });
        }
        catch (error: any) {
            expect(error.message).toBeDefined();
        }
    });

    it('should not create an improperly typed Argument instance from a Record', () => {
        const record = { testName: 123 };
        try {
            // @ts-expect-error - Testing private property
            Argument.fromRecord<string>(record);
        } 
        catch (error: any) {
            expect(error.message).toBeDefined();
        }
    });

    it('should return the hash of an Argument instance', () => {
        const entry: ArgumentEntry<string> = { name: 'testName', value: 'testValue' };
        const arg = new Argument<string>(entry);

        try {
            entry.value = 'newValue';
        }
        catch (error: any) {
            expect(error.message).toBeDefined();
        }
    });

    it('should throw an error when trying to set a value on an Argument instance', () => {
        const entry: ArgumentEntry<string> = { name: 'testName', value: 'testValue' };
        const arg = new Argument<string>(entry);

        expect(() => arg.set('newValue')).toThrow('Method not implemented.');
    });

    it('should get the value of an Argument instance', () => {
        const entry: ArgumentEntry<number> = { name: 'testName', value: 123 };
        const arg = new Argument<number>(entry);

        console.log(`arg: ${arg}`);
        expect(arg.get()).toBe(123);
    });

    it('should check the hash of an Argument instance', async () => {
        const entry: ArgumentEntry<string> = { id: 'test', name: 'testName', value: 'testValue' };
        const arg = new Argument<string>(entry);

        console.log(`arg: ${arg}`);

        expect(await arg.checkHash()).toBe(true);
    })

});

describe('Arguments', () => {
    it('should create an Arguments instance with the given entries', () => {
        const entries: ArgumentEntry<string>[] = [
            { name: 'arg1', value: 'value1' },
            { name: 'arg2', value: 'value2' }
        ];
        const args = new Arguments(entries);

        expect(args.length).toBe(2);
        expect(args.get('arg1')).toBe('value1');
        expect(args.get('arg2')).toBe('value2');
    });

    it('should add a new argument to the Arguments instance', () => {
        const args = new Arguments();
        const entry: ArgumentEntry<number> = { name: 'arg1', value: 123 };

        args.add(entry);

        expect(args.length).toBe(1);
        expect(args.get('arg1')).toBe(123);
    });

    it('should remove an argument from the Arguments instance', () => {
        const entries: ArgumentEntry<string>[] = [
            {id: 'hello', name: 'arg1', value: 'value1' },
            {id: "world", name: 'arg2', value: 'value2' }
        ];
        const args = new Arguments(entries);

        args.remove('arg1');

        expect(args.length).toBe(1);
        expect(args.get('arg1')).toBeUndefined();
        expect(args.get('arg2')).toBe('value2');
    });

    it('should convert the Arguments instance to JSON', () => {
        const entries: ArgumentEntry<boolean>[] = [
            { name: 'arg1', value: true },
            { name: 'arg2', value: false }
        ];
        const args = new Arguments(entries);
        const id1 = args.get('arg1', true)?.id;
        const id2 = args.get('arg2', true)?.id;

        expect(args.toJSON()).toEqual([
            { id: id1, name: 'arg1', value: true },
            { id: id2, name: 'arg2', value: false }
        ]);
    });

    it('should convert the Arguments instance to a string', () => {
        const entries: ArgumentEntry<string>[] = [
            { name: 'arg1', value: 'value1' },
            { name: 'arg2', value: 'value2' }
        ];
        const args = new Arguments(entries);

        expect(args.toString()).toBe('arg1: value1\narg2: value2');
    });

    it('should convert the Arguments instance to a Record', () => {
        const entries: ArgumentEntry<number>[] = [
            { name: 'arg1', value: 1 },
            { name: 'arg2', value: 2 }
        ];
        const args = new Arguments(entries);

        expect(args.toRecord()).toEqual({
            arg1: 1,
            arg2: 2
        });
    });

    it('should throw an error when adding a duplicate argument', () => {
        const entries: ArgumentEntry<string>[] = [
            { name: 'arg1', value: 'value1' }
        ];
        const args = new Arguments(entries);

        expect(() => args.add({ name: 'arg1', value: 'value2' })).toThrow('Duplicate argument name: arg1');
    });

    it('should handle adding arguments from an object', () => {
        const args = new Arguments();
        const obj = { arg1: 'value1', arg2: 'value2' };

        args.add(obj);

        expect(args.length).toBe(2);
        expect(args.get('arg1')).toBe('value1');
        expect(args.get('arg2')).toBe('value2');
    });

    // it('should handle adding arguments from an array of objects', () => {
    //     const args = new Arguments();
    //     const objs = [{ arg1: 'value1' }, { arg2: 'value2' }];

    //     args.add(objs);

    //     expect(args.length).toBe(2);
    //     expect(args.get('arg1')).toBe('value1');
    //     expect(args.get('arg2')).toBe('value2');
    // });

    it('should return undefined for non-existent argument', () => {
        const args = new Arguments();

        expect(args.get('nonExistent')).toBeUndefined();
    });
});
