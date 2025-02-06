import { PropertiesSpec } from '../src/template/spec/v0/properties';
import { ArgumentSpec } from '../src/template/spec/v0/arg';
import { ParameterSpec } from '../src/template/spec/v0/param';

describe('PropertiesSpec', () => {
    it('should initialize with empty args and params', () => {
        const config = new PropertiesSpec();
        expect(config.args).toEqual([]);
        expect(config.params).toEqual([]);
    });

    it('should initialize with provided args and params', () => {
        const args = [new ArgumentSpec({name: 'arg1', value: 'value1'})];
        const params = [new ParameterSpec({ name: 'param1', defaultValue: 'value1'})];
        const config = new PropertiesSpec({ args, params });
        expect(config.args).toEqual(args);
        expect(config.params).toEqual(params);
    });

    it('should find an argument by name', () => {
        const args = [new ArgumentSpec({ name: 'arg1', value: 'value1'})];
        const config = new PropertiesSpec({ args });
        expect(config['findArg']('arg1')).toEqual(args[0]);
    });

    it('should find a parameter by name', () => {
        const params = [new ParameterSpec({name: 'param1', defaultValue: 'value1'})];
        const config = new PropertiesSpec({ params });
        expect(config['findParam']('param1')).toEqual(params[0]);
    });

    it('should get argument value by name', () => {
        const args = [new ArgumentSpec({ name: 'arg1', value: 'value1'})];
        const config = new PropertiesSpec({ args });
        expect(config.getValue('arg1')).toEqual('value1');
    });

    it('should get parameter value by name', () => {
        const params = [new ParameterSpec({name: 'param1', defaultValue: 'value1'})];
        const config = new PropertiesSpec({ params });
        expect(config.getValue('param1')).toEqual('value1');
    });

    it('should throw error if argument or parameter not found', () => {
        const config = new PropertiesSpec();
        expect(() => config.getValue('nonexistent')).toThrow('Argument not found: nonexistent');
    });

    it('should prioritize Arg Value over parameter defaultValue if both exist', () => {
        const args = [new ArgumentSpec({ name: 'name', value:  'argValue'})];
        const params = [new ParameterSpec({name: 'name', defaultValue: 'paramValue'})];
        const config = new PropertiesSpec({ args, params });
        expect(config.getValue('name')).toEqual('argValue');
    });
});