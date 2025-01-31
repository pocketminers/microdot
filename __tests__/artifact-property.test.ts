import { Property } from "../src/artifacts/property";
import { Argument } from "../src/artifacts/argument";
import { Parameter } from "../src/artifacts/parameter";

describe('Property', () => {
    let property: Property<string>;

    beforeEach(() => {
        property = new Property<string>({
            name: 'testProperty',
            value: 'initialValue',
            description: 'A test property',
            required: true,
            defaultValue: 'defaultValue',
            optionalValues: ['initialValue', 'defaultValue', 'newValue']
        });
    });

    test('should create a Property instance', () => {
        expect(property).toBeInstanceOf(Property);
        expect(property.name).toBe('testProperty');
        expect(property.argument).toBeInstanceOf(Argument);
        expect(property.argument?.value).toBe('initialValue');
    });

    test('should get the value of the property', () => {
        expect(property.getValue()).toBe('initialValue');
    });

    test('should set a new value for the property', () => {
        property.setValue('newValue');
        expect(property.getValue()).toBe('newValue');
    });

    test('should throw an error if the value is not in optional values', () => {
        expect(() => property.setValue('invalidValue')).toThrow('Value is not in optional values: testProperty');
    });

    test('should throw an error if the value is required but undefined', () => {
        expect(() => property.setValue(undefined as any)).toThrow('Value is required: testProperty');
    });

    test('should not set the same value again', () => {
        property.setValue('initialValue');
        expect(property.getValue()).toBe('initialValue');
    });

    test('should convert property to JSON', () => {
        const json = property.toJSON();
        expect(json).toEqual({
            name: 'testProperty',
            required: true,
            description: 'A test property',
            defaultValue: 'defaultValue',
            optionalValues: ['initialValue', 'defaultValue', 'newValue'],
            value: 'initialValue'
        });
    });

    test('should convert property to string', () => {
        expect(property.toString()).toBe('testProperty: initialValue');
    });

    test('should convert property to record', () => {
        const record = property.toRecord();
        expect(record).toEqual({
            name: 'testProperty',
            required: true,
            description: 'A test property',
            defaultValue: 'defaultValue',
            optionalValues: ['initialValue', 'defaultValue', 'newValue'],
            value: 'initialValue'
        });
    });

    test('should throw an error if set method is called', () => {
        expect(() => property.set('newValue')).toThrow('Method not implemented.');
    });

    test('should return a key-value pair for the property', () => {
        expect(property.toKeyValuePair()).toEqual({ testProperty: 'initialValue' });
    });
});