import { BaseTypes } from '../src/component';
import { Properties } from '../src/component/properties';
import { PropertiesSpec, ArgumentSpec, ParameterSpec } from '../src/template/spec/v0/config';

describe('PropertiesSpec', () => {
    it('should initialize with empty args and params', () => {
        const config: PropertiesSpec = {
            args: [],
            params: []
        };
        expect(config.args).toEqual([]);
        expect(config.params).toEqual([]);
    });

    it('should initialize with provided args and params', () => {
        const args = [{name: 'arg1', value: 'value1'}];
        const params = [{ name: 'param1', defaultValue: 'value1'}];
        const config = { args, params };
        expect(config.args).toEqual(args);
        expect(config.params).toEqual(params);
    });

    it('should find an argument by name', () => {
        const args = [{ name: 'arg1', value: 'value1'}];
        const config = { args };
        expect(config.args.find(arg => arg.name === 'arg1')).toEqual(args[0]);
    });

    it('should find a parameter by name', () => {
        const params = [{name: 'param1', defaultValue: 'value1'}];
        const config = { params };
        expect(config.params.find(param => param.name === 'param1')).toEqual(params[0]);
    });

    it('should get argument value by name', () => {
        const args = [{ name: 'arg1', value: 'value1'}];
        const config: Properties<BaseTypes.Custom> = new Properties({ type: BaseTypes.Custom, args });
        expect(config.getValue('arg1')).toEqual('value1');
    });

    // it('should get parameter value by name', () => {
    //     const params = [{id: 'what?', name: 'param1', defaultValue: 'value1'}];
    //     const config = new Properties({ params });
    //     expect(config.getValue('param1')).toEqual('value1');
    // });

    // it('should throw error if argument or parameter not found', () => {
    //     const config = new Properties({ args: [], params: [] });
    //     expect(() => config.getValue('nonexistent')).toThrow('Argument not found: nonexistent');
    // });

    // it('should prioritize Arg Value over parameter defaultValue if both exist', () => {
    //     const args = [{ name: 'name', value:  'argValue'}];
    //     const params = [{name: 'name', defaultValue: 'paramValue'}];
    //     const config = new Properties({ args, params });
    //     expect(config.getValue('name')).toEqual('argValue');
    // });
});