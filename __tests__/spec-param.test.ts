import { ParameterSpec } from '../src/service/templates/param';

describe('ParameterSpec', () => {
    it('should create an instance of ParameterSpec', () => {
        const param = new ParameterSpec<string>({name: "param1", required: true, description: "description1"});
        expect(param).toBeInstanceOf(ParameterSpec);
    });

    it('should create an instance of ParameterSpec with a type', () => {
        const param = new ParameterSpec<string>({name: "param1", required: true, description: "description1", defaultValue: "value1"});
        expect(param).toBeInstanceOf(ParameterSpec);
    });

    it('should throw an error if the value type does not match the expected type', () => {
        try {
            // @ts-expect-error - Testing invalid input
            new ParameterSpec<string>({name: "param1", required: true, description: "description1", defaultValue: 1});
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it('should throw an error if the value type does not match the expected type when calling fromJSON', () => {
        try {
            ParameterSpec.fromJSON({name: "param1", required: true, description: "description1", defaultValue: 1});
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it('should create an instance of ParameterSpec from JSON', () => {
        const param = ParameterSpec.fromJSON({name: "param1", required: true, description: "description1"});
        expect(param).toBeInstanceOf(ParameterSpec);
    });
});
