import { ArgumentSpec } from '../src/template/spec/v0/arg';

describe('ArgumentSpec', () => {
    it('should create an instance of ArgumentSpec', () => {
        const arg = new ArgumentSpec<string>({name: "arg1", value: "value1"});
        expect(arg).toBeInstanceOf(ArgumentSpec);
    });

    it('should create an instance of ArgumentSpec with a type', () => {
        const arg = new ArgumentSpec<string>({type: "string", name: "arg1", value: "value1"});
        expect(arg).toBeInstanceOf(ArgumentSpec);
    });

    it('should throw an error if the value type does not match the expected type', () => {
        try{
            new ArgumentSpec<string>({type: "number", name: "arg1", value: "value1"});
        }
        catch(e){
            expect(e).toBeInstanceOf(TypeError);
        }
    });

    it('should throw an error if the value type does not match the expected type new when calling', () => {
        expect(() => new ArgumentSpec({type: "number", name: "arg1", value: "value1"})).toThrow();
    });

    it('should create an instance of ArgumentSpec from JSON', () => {
        const arg = new ArgumentSpec({name: "arg1", value: "value1"});
        expect(arg).toBeInstanceOf(ArgumentSpec);
    });

    it('should create an argumentspec with an object value', () => {
        const arg = new ArgumentSpec<{key: string}>({name: "arg1", value: {key: "value1"}});
        expect(arg).toBeInstanceOf(ArgumentSpec);
    });

    it('should create an argumentspec with an object value from JSON', () => {
        const arg = new ArgumentSpec({name: "arg1", value: {key: "value1"}});
        expect(arg).toBeInstanceOf(ArgumentSpec);
    });

    it('should create an argumentspec with an array value', () => {
        const arg = new ArgumentSpec<string[]>({name: "arg1", value: ["value1"]});
        expect(arg).toBeInstanceOf(ArgumentSpec);
    });

    it('should create an argumentspec with an array value from JSON', () => {
        const arg = new ArgumentSpec({name: "arg1", value: ["value1"]});
        expect(arg).toBeInstanceOf(ArgumentSpec);
    });

    it('should create an argumentspec with a number value', () => {
        const arg = new ArgumentSpec<number>({name: "arg1", value: 1});
        expect(arg).toBeInstanceOf(ArgumentSpec);
    });

    it('should create an argumentspec with a number value from JSON', () => {
        const arg = new ArgumentSpec({name: "arg1", value: 1});
        expect(arg).toBeInstanceOf(ArgumentSpec);
    });

    it('should create an argumentspec with a boolean value', () => {
        const arg = new ArgumentSpec<boolean>({name: "arg1", value: true});
        expect(arg).toBeInstanceOf(ArgumentSpec);
    });

    it('should create an argumentspec with a boolean value from JSON', () => {
        const arg = new ArgumentSpec({name: "arg1", value: true});
        expect(arg).toBeInstanceOf(ArgumentSpec);
    });

    it('should create an argumentspec with a null value', () => {
        const arg = new ArgumentSpec<null>({name: "arg1", value: null});
        expect(arg).toBeInstanceOf(ArgumentSpec);
    });

    it('should create an argumentspec with a null value from JSON', () => {
        const arg = new ArgumentSpec({name: "arg1", value: null});
        expect(arg).toBeInstanceOf(ArgumentSpec);
    });

    it('should output the correct JSON', () => {
        const arg = new ArgumentSpec<string>({name: "arg1", value: "value1"});
        expect(arg).toEqual({type: "string", name: "arg1", value: "value1"});
    });

    it('should output the correct JSON with a type', () => {
        const arg = new ArgumentSpec<string>({type: "string", name: "arg1", value: "value1"});
        expect(arg).toEqual({type: "string", name: "arg1", value: "value1"});
    });

    it('should output the correct JSON with an object value', () => {
        const arg = new ArgumentSpec<{key: string}>({name: "arg1", value: {key: "value1"}});
        expect(arg).toEqual({type: "object", name: "arg1", value: {key: "value1"}});
    });

    it('should output key-value pair', () => {
        const arg = new ArgumentSpec<string>({name: "arg1", value: "value1"});
        expect(arg.toKeyValue()).toEqual({arg1: "value1"});
    });
});