import { PropertiesSpec } from "../src/template/spec/v0/properties";
import { ArgumentSpec } from "../src/template/spec/v0/arg";
import { ParameterSpec } from "../src/template/spec/v0/param";

describe('PropertiesSpec', () => {
    it('should initialize with empty args and params', () => {
        const property = new PropertiesSpec();
        expect(property.args).toEqual([]);
        expect(property.params).toEqual([]);
    });

    it('should initialize with provided args and params', () => {
        const args = [new ArgumentSpec({name: 'arg1', value: 'value1'})];
        const params = [new ParameterSpec({ name: 'param1', defaultValue: 'value1'})];
        const property = new PropertiesSpec({ args, params });
        expect(property.args).toEqual(args);
        expect(property.params).toEqual(params);
    });

});