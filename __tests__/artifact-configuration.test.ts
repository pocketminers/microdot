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
        config = new Configuration({properties});
        // console.log(`config: ${ JSON.stringify(config) }`);
    });

    afterEach(() => {
        properties = [];
        config.clear();
    })

    it('should initialize with properties', () => {
        // console.log(`config: ${JSON.stringify(config)}`);
        expect(config.get('prop1')?.getValue()).toBe('value1');
        expect(config.get('prop2')?.getValue()).toBe(42);
        expect(config.get('prop3')?.getValue()).toBe(true);
    });

    it('should set property value', () => {
        const newProp = new Property({name: 'prop1', value: 'newValue', required: true, description: 'Property 1', defaultValue: 'value1'});
        config.set('prop1', newProp);
        expect(config.get('prop1')?.getValue()).toBe('newValue');
    });

    it('should get property value', () => {
        expect(config.getValue('prop1')).toBe('value1');
        expect(config.getValue('prop2')).toBe(42);
        expect(config.getValue('prop3')).toBe(true);
    });

    it('should convert to JSON', () => {
        const json = config.toJSON();
        expect(json).toEqual({
            prop1: { name: 'prop1', value: 'value1', required: true, description: 'Property 1', defaultValue: 'value1', optionalValues: [] },
            prop2: { name: 'prop2', value: 42, required: true, description: 'Property 2', defaultValue: 42, optionalValues: [] },
            prop3: { name: 'prop3', value: true, required: true, description: 'Property 3', defaultValue: true, optionalValues: [] }
        });
    });

    it('should convert to string', () => {
        const str = config.toString();
        expect(str).toContain('prop1: value1');
        expect(str).toContain('prop2: 42');
        expect(str).toContain('prop3: true');
    });

    it('should convert to record', () => {
        const record = config.toRecord();
        expect(record).toEqual({
            prop1: { name: 'prop1', value: "value1", required: true, description: 'Property 1', defaultValue: 'value1', optionalValues: [] },
            prop2: { name: 'prop2', value: undefined, required: true, description: 'Property 2', defaultValue: 42, optionalValues: [] },
            prop3: { name: 'prop3', value: true, required: true, description: 'Property 3', defaultValue: true, optionalValues: [] }
        });
    });

    it('should get required values', () => {
        const values = config.getRequiredValues();
        expect(values).toEqual({
            prop1: 'value1',
            prop2: 42,
            prop3: true
        });
    });

    it('should clear configuration', () => {
        config.clear();
        expect(config.size).toBe(0);
    });

    it('should not add duplicate property', () => {
        const prop = new Property({name: 'prop1', value: 'newValue', required: true, description: 'Property 1', defaultValue: 'value1'});
        expect(() => config.addEntry(prop, [{name: 'prop1', value: 'newValue'}])).toThrow('Property already exists: prop1');
        expect(config.size).toBe(3);
    });

    it('should overwrite a property', () => {
        const prop = new Property({name: 'prop1', value: 'newValue', required: true, description: 'Property 1', defaultValue: 'value1'});
        config.addEntry(prop, [{name: 'prop1', value: 'newValue'}], true);
        expect(config.get('prop1')?.getValue()).toBe('newValue');
    });

    it('should not set property with invalid name', () => {
        const prop = new Property({name: 'prop4', value: 'newValue', required: true, description: 'Property 4', defaultValue: 'value4'});
        config.addEntry(prop, [{name: 'prop5', value: 'newValue1'}]);
        expect(config.size).toBe(4);
        expect(config.get('prop4')?.argument?.value).toBe('newValue');
    });

    it('should create a new configuration from arguments', () => {
        const args = [
            { name: 'prop1', value: 'newValue' },
            { name: 'prop2', value: 84 },
            { name: 'prop3', value: false }
        ];
        const newConfig = new Configuration({args, useArgs: true});
        expect(newConfig.get('prop1')?.getValue()).toBe('newValue');
        expect(newConfig.get('prop2')?.getValue()).toBe(84);
        expect(newConfig.get('prop3')?.getValue()).toBe(false);
    });
});