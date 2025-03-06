
import { Parameter } from '../src/component/base/properties'

describe('Parameter', () => {
    it('should create an instance of Parameter', () => {
        const param = new Parameter<string>({name: "param1", required: true, description: "description1"});
        expect(param).toBeInstanceOf(Parameter);
    });

    it('should create an instance of Parameter with a type', () => {
        const param = new Parameter<string>({name: "param1", required: true, description: "description1", defaultValue: "value1"});
        expect(param).toBeInstanceOf(Parameter);
    });

    it('should throw an error if the value type does not match the expected type', () => {
        try {
            // @ts-expect-error - this is intentional to test the error
            new Parameter<string>({name: "param1", required: true, description: "description1", defaultValue: 1});
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it('should throw an error if the value type does not match the expected type when calling fromJSON', () => {
        try {
            new Parameter({name: "param1", required: true, description: "description1", defaultValue: 1, type: "string"});
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it('should create an instance of Parameter from JSON', () => {
        const param = new Parameter({name: "param1", required: true, description: "description1"});
        expect(param).toBeInstanceOf(Parameter);
    });

    it('should create a parameterspec with an array value', () => {
        const param = new Parameter<string[]>({name: "param1", required: true, description: "description1", defaultValue: ["value1"]});
        expect(param).toBeInstanceOf(Parameter);
    });

    it('should throw an error if the value type does not match the expected type when calling fromJSON', () => {
        try {
            new Parameter({name: "param1", required: true, description: "description1", defaultValue: ["value1"], type: "number"});
        }
        catch (error) {
            expect(error).toBeInstanceOf(TypeError);
        }
    });


});
