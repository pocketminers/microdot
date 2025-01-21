import { IsNotEmpty } from "../src/utils/decorators";
import { checkHasEmpties } from "../src/utils/checks";

class TestClass {
    @IsNotEmpty
    testMethod(input: any) {
        return `Input is: ${input}`;
    }
}

describe('IsNotEmpty Decorator - no mocks', () => {
    let instance: TestClass;

    beforeEach(() => {
        instance = new TestClass();
    });

    it('should throw an error if input is empty', () => {
        const hasEmpties = checkHasEmpties(' ', ' ', ' ');
        console.log('hasEmpties: ', hasEmpties);

        expect(() => instance.testMethod(undefined)).toThrow('undefined:testMethod:input cannot be empty.');
    });

    it('should not throw an error if input is not empty', () => {
        expect(instance.testMethod('valid input')).toBe('Input is: valid input');
    });

    it('should return the correct value', () => {
        const input = 'test input';

        expect(instance.testMethod(input)).toBe(`Input is: ${input}`);
    });
})