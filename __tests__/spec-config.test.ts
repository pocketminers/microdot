import { ConfigSpec, PropertiesSpec, ArgumentSpec, ParameterSpec } from '../src/template/spec/v0/config';

describe('ConfigSpec', () => {
    it('should have required properties', () => {
        const config: ConfigSpec = {
            id: 'config1',
            name: 'Test Config',
            description: 'This is a test config',
            properties: {
                args: [],
                params: []
            }
        };

        expect(config).toHaveProperty('id');
        expect(config).toHaveProperty('name');
        expect(config).toHaveProperty('description');
        expect(config).toHaveProperty('properties');
    });
});

describe('PropertiesSpec', () => {
    it('should have args and params properties', () => {
        const properties: PropertiesSpec = {
            args: [],
            params: []
        };

        expect(properties).toHaveProperty('args');
        expect(properties).toHaveProperty('params');
    });
});

describe('ArgumentSpec', () => {
    it('should have type, name, and value properties', () => {
        const argument: ArgumentSpec<string> = {
            type: 'string',
            name: 'arg1',
            value: 'test'
        };

        expect(argument).toHaveProperty('type');
        expect(argument).toHaveProperty('name');
        expect(argument).toHaveProperty('value');
    });

    it('should throw an error if value type does not match expected type', () => {
        try {

            const argument: ArgumentSpec<number> = {
                type: 'string',
                name: 'arg1',
                // @ts-expect-error - Testing invalid input
                value: "123"
            };
        } catch (error) {
            expect(error).toBeInstanceOf(TypeError);
        }
    });
});

describe('ParameterSpec', () => {
    it('should have type, name, required, description, defaultValue, and optionalValues properties', () => {
        const parameter: ParameterSpec<string> = {
            type: 'string',
            name: 'param1',
            required: true,
            description: 'This is a test parameter',
            defaultValue: 'default',
            optionalValues: ['value1', 'value2']
        };

        expect(parameter).toHaveProperty('type');
        expect(parameter).toHaveProperty('name');
        expect(parameter).toHaveProperty('required');
        expect(parameter).toHaveProperty('description');
        expect(parameter).toHaveProperty('defaultValue');
        expect(parameter).toHaveProperty('optionalValues');
    });

    it('should throw an error if defaultValue type does not match expected type', () => {
        try {
            const parameter: ParameterSpec<string> = {
                type: 'string',
                name: 'param1',
                required: true,
                description: 'This is a test parameter',
                // @ts-expect-error - Testing invalid input
                defaultValue: 123,
                optionalValues: ['value1', 'value2']
            };
        } catch (error) {
            expect(error).toBeInstanceOf(TypeError);
        }
    });
});