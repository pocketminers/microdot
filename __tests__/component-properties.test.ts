import { BaseTypes } from '../src/component';
import {
    ArgumentEntry,
    Argument,
    ParameterEntry,
    Parameter,
    Properties,
    PropertiesEntry
} from '../src/component/properties';


describe('Argument', () => {
    it('should create a new instance', () => {
        const arg = new Argument({
            name: 'arg1',
            value: 'value1'
        });

        expect(arg).toBeInstanceOf(Argument);
    });

    it('should get the value', () => {
        const arg = new Argument({
            name: 'arg1',
            value: 'value1'
        });

        expect(arg.value).toBe('value1');
    });
});

describe('Parameter', () => {
    it('should create a new instance', () => {
        const param = new Parameter({
            name: 'param1',
            description: 'param1 description'
        });

        expect(param).toBeInstanceOf(Parameter);
    });

    it('should get the value', () => {
        const param = new Parameter({
            name: 'param1',
            description: 'param1 description'
        });

        expect(param.getValue('value1')).toBe('value1');
    });
});


describe('Properties', () => {
    it('should create a new instance', () => {
        const properties = new Properties<BaseTypes.Custom>({type: BaseTypes.Custom});

        expect(properties).toBeInstanceOf(Properties);
    });

    it('should create a new instance with args and params', () => {
        const properties = new Properties({
            type: BaseTypes.Custom,
            args: [
                {
                    name: 'arg1',
                    value: 'value1'
                },
                {
                    name: 'arg2',
                    value: 'value2'
                }
            ],
            params: [
                {
                    name: 'param1',
                    description: 'param1 description',
                },
                {
                    name: 'param2',
                    description: 'param2 description',
                }
            ]
        });

        expect(properties).toBeInstanceOf(Properties);
        expect(properties.args).toHaveLength(2);
        expect(properties.params).toHaveLength(2);
    });

    it('should get arg value', () => {
        const properties = new Properties({
            type : BaseTypes.Custom,
            args: [
                {
                    name: 'arg1',
                    value: 'value1'
                }
            ]
        });

        expect(properties.getValue('arg1')).toBe('value1');
    });

    it('should get param value', () => {
        const properties = new Properties({
            type: BaseTypes.Custom,
            params: [
                {
                    name: 'param1'
                }
            ],
            args: [
                {
                    name: 'param1',
                    value: 'value1'
                }
            ]
        });

        expect(properties.getValue('param1')).toBe('value1');
    });

    it('should get all names', () => {
        const properties = new Properties({
            type: BaseTypes.Custom,
            args: [
                {
                    name: 'arg1',
                    value: 'value1'
                },
                {
                    name: 'arg2',
                    value: 'value2'
                }
            ],
            params: [
                {
                    name: 'param1'
                },
                {
                    name: 'param2'
                }
            ]
        });

        expect(properties.getNames()).toEqual(['arg1', 'arg2', 'param1', 'param2']);
    });

    it('should get all values', () => {
        const properties = new Properties({
            type: BaseTypes.Custom,
            args: [
                {
                    name: 'arg1',
                    value: 'value1'
                },
                {
                    name: 'arg2',
                    value: 'value2'
                }
            ],
            params: [
                {
                    name: 'arg1'
                },
                {
                    name: 'arg2'
                }
            ]
        });

        expect(properties.getAllValues()).toEqual(new Map<string, any>([
            ['arg1', 'value1'],
            ['arg2', 'value2']
        ]));
    });

    it('should get the key-value map', () => {
        const properties = new Properties({
            type: BaseTypes.Custom,
            args: [
                {
                    name: 'arg1',
                    value: 'value1'
                },
                {
                    name: 'arg2',
                    value: 'value2'
                }
            ],
            params: [
                {
                    name: 'arg1',
                    required: true
                },
                {
                    name: 'arg2',
                    required: false
                }
            ]
        });

        expect(properties.toKeyValue()).toEqual({
            arg1: 'value1',
            arg2: 'value2'
        });
    });



});
