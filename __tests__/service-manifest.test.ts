import { ArgumentSpec } from '../src/service/templates/manifest';

describe('ArgumentSpec', () => {
    it('should create an argument spec instance with the given data', () => {
        const name = 'test';
        const value = 'test';
        const argumentSpec = new ArgumentSpec({name, value});

        expect(argumentSpec.name).toEqual(name);
        expect(argumentSpec.value).toEqual(value);
        expect(argumentSpec.type).toEqual('string');
    });

    it('should return the type of the value', () => {
        const name = 'test';
        const value = 'test';
        const argumentSpec = new ArgumentSpec({name, value});

        expect(argumentSpec.type).toEqual('string');
    });

    it('should return the object as a JSON object w/ the type key defined', () => {
        const name = 'test';
        const value = 'test';
        const argumentSpec = new ArgumentSpec({name, value});

        expect(argumentSpec.toJSON()).toEqual({
            type: 'string',
            name,
            value
        });
    });

    it('should create an argument spec from a JSON object', () => {
        const name = 'test';
        const value = 'test';
        const argumentSpec = ArgumentSpec.fromJSON({name, value});

        expect(argumentSpec.name).toEqual(name);
        expect(argumentSpec.value).toEqual(value);
        expect(argumentSpec.type).toEqual('string');
    });

    it('should create an argument spec from a JSON object w/ the type key defined', () => {
        const name = 'test';
        const value = 'test';
        const argumentSpec = ArgumentSpec.fromJSON({type: 'string', name, value});

        expect(argumentSpec.name).toEqual(name);
        expect(argumentSpec.value).toEqual(value);
        expect(argumentSpec.type).toEqual('string');
    });

    it('should throw an error if the value type does not match the expected type', () => {
        const name = 'test';
        const value = 'test';
        try {
            ArgumentSpec.fromJSON({type: 'number', name, value});
        } catch (error: any) {
            expect(error.message).toBe('ArgumentSpec:fromJSON: The value type does not match the expected type: number');
        }
    });
});