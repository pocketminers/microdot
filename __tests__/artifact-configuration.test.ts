import { Configuration } from "../src/artifacts/configuration";
import { Property } from "../src/artifacts/property";

describe('Configuration', () => {
    let properties: Property<any>[];
    let config: Configuration;

    beforeEach(() => {
        properties = [
            new Property<string>({name: 'prop1', defaultValue: 'value1', required: true, description: 'Property 1', value: 'value1'}),
            new Property<number>({name: 'prop2', defaultValue: 42, required: true, description: 'Property 2'}),
            new Property<boolean>({name: 'prop3', defaultValue: true, required: true, description: 'Property 3', value: true})
        ];
        config = new Configuration(properties);
        console.log(`config: ${ JSON.stringify(config) }`);
    });

    afterEach(() => {
        properties = [];
        config.clear();
    })

    test('should initialize with properties', () => {
        console.log(`config: ${JSON.stringify(config)}`);
        expect(config.get('prop1')?.getValue()).toBe('value1');
        expect(config.get('prop2')?.getValue()).toBe(42);
        expect(config.get('prop3')?.getValue()).toBe(true);
    });

    test('should set property value', () => {
        const newProp = new Property({name: 'prop1', value: 'newValue', required: true, description: 'Property 1', defaultValue: 'value1'});
        config.set('prop1', newProp);
        expect(config.get('prop1')?.getValue()).toBe('newValue');
    });

    test('should get property value', () => {
        expect(config.getValue('prop1')).toBe('value1');
        expect(config.getValue('prop2')).toBe(42);
        expect(config.getValue('prop3')).toBe(true);
    });

    test('should convert to JSON', () => {
        const json = config.toJSON();
        expect(json).toEqual({
            prop1: { name: 'prop1', value: 'value1', required: true, description: 'Property 1', defaultValue: 'value1', optionalValues: [] },
            prop2: { name: 'prop2', value: 42, required: true, description: 'Property 2', defaultValue: 42, optionalValues: [] },
            prop3: { name: 'prop3', value: true, required: true, description: 'Property 3', defaultValue: true, optionalValues: [] }
        });
    });

    test('should convert to string', () => {
        const str = config.toString();
        expect(str).toContain('prop1: value1');
        expect(str).toContain('prop2: 42');
        expect(str).toContain('prop3: true');
    });

    test('should convert to record', () => {
        const record = config.toRecord();
        expect(record).toEqual({
            prop1: { name: 'prop1', value: undefined, required: true, description: 'Property 1', defaultValue: 'value1', optionalValues: [] },
            prop2: { name: 'prop2', value: undefined, required: true, description: 'Property 2', defaultValue: 42, optionalValues: [] },
            prop3: { name: 'prop3', value: undefined, required: true, description: 'Property 3', defaultValue: true, optionalValues: [] }
        });
    });
});