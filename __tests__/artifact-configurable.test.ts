import { Configurable, ConfigurableEntry } from "../src/artifacts/configurable";
import { Argument } from "../src/artifacts/argument";
import { Parameter } from "../src/artifacts/parameter";

describe('Configurable', () => {
    let configurable: Configurable;

    beforeEach(() => {
        const entry: ConfigurableEntry = {
            id: '1',
            name: 'TestConfigurable',
            description: 'A test configurable object',
            args: [],
            parameters: [
                new Parameter({ name: 'param1', optionalValues: ['value1', 'value2'] }),
                new Parameter({ name: 'param2', optionalValues: ['value3', 'value4'] })
            ]
        };
        configurable = new Configurable(entry);
    });

    it('should initialize with given parameters and arguments', () => {
        console.log(`Configurable:constructor:args:`, configurable.getArguments());
        expect(configurable.getParameters().getEntries().length).toBe(2);
        expect(configurable.getArguments().getEntries().length).toBe(0);
    });

    it('should set and get arguments correctly', () => {
        const arg = new Argument({ name: 'param1', value: 'value1' });
        configurable.setArgument<string>(arg);
        expect(configurable.getArguments().getEntry('param1')?.getValue()).toBe('value1');
    });

    it('should throw error for invalid argument name', () => {
        const arg = new Argument({ name: 'invalidParam', value: 'value1' });
        expect(() => configurable.setArgument(arg)).toThrow('Invalid argument name: invalidParam');
    });

    it('should throw error for invalid argument value', () => {
        const arg = new Argument({ name: 'param1', value: 'invalidValue' });
        expect(() => configurable.setArgument(arg)).toThrow('Value is not in optional values: param1');
    });

    it('should update existing argument', () => {
        const arg1 = new Argument({ name: 'param1', value: 'value1' });
        configurable.setArgument(arg1);
        const arg2 = new Argument({ name: 'param1', value: 'value2' });
        configurable.setArgument(arg2);
        expect(configurable.getArguments().getEntry('param1')?.getValue()).toBe('value2');
    });

    it('should get parameter value correctly', () => {
        const arg = new Argument({ name: 'param1', value: 'value1' });
        configurable.setArgument(arg);
        expect(configurable.getValue('param1')).toBe('value1');
    });

    it('should throw error if parameter not found', () => {
        expect(() => configurable.getValue('invalidParam')).toThrow('Parameter invalidParam not found in TestConfigurable(1)');
    });
});