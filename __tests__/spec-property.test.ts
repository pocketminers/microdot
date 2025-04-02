import { PropertiesSpec } from "../src/template/spec/v0/config";

describe('PropertiesSpec', () => {
    it('should initialize with empty args and params', () => {
        const property: PropertiesSpec = {
            args: [],
            params: []
        };
        expect(property.args).toEqual([]);
        expect(property.params).toEqual([]);
    });

    it('should initialize with provided args and params', () => {
        const args = [{name: 'arg1', value: 'value1'}];
        const params = [{ name: 'param1', defaultValue: 'value1'}];
        const property = { args, params };
        expect(property.args).toEqual(args);
        expect(property.params).toEqual(params);
    });

});