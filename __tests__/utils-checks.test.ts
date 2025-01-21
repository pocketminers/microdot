import { checkForCircularReference, checkIsEmpty, checkIsString, checkIsArray, checkHasEmpties, checkIsObject, checkIsBoolean } from '../src/utils/checks';

describe('checkIsArray', () => {
    it('should return false for empty arrays', () => {
        expect(checkIsArray([])).toBe(false);
    });

    it('should return false for non-arrays', () => {
        expect(checkIsArray(42)).toBe(false);
        expect(checkIsArray('string')).toBe(false);
        expect(checkIsArray(true)).toBe(false);
        expect(checkIsArray({})).toBe(false);
        expect(checkIsArray(null)).toBe(false);
        expect(checkIsArray(undefined)).toBe(false);
    });

    it('should return true for non-empty arrays', () => {
        expect(checkIsArray([1, 2, 3])).toBe(true);
    });
});

describe('checkIsBoolean', () => {
    it('should return true for booleans', () => {
        expect(checkIsBoolean(true)).toBe(true);
        expect(checkIsBoolean(false)).toBe(true);
    });

    it('should return false for non-booleans', () => {
        expect(checkIsBoolean(42)).toBe(false);
        expect(checkIsBoolean('string')).toBe(false);
        expect(checkIsBoolean({})).toBe(false);
        expect(checkIsBoolean([])).toBe(false);
        expect(checkIsBoolean(null)).toBe(false);
        expect(checkIsBoolean(undefined)).toBe(false);

    });
});

describe('checkIsObject', () => {
    it('should return false for empty objects', () => {
        expect(checkIsObject({})).toBe(false);
    });

    it('should return false for non-objects', () => {
        expect(checkIsObject(42)).toBe(false);
        expect(checkIsObject('string')).toBe(false);
        expect(checkIsObject(true)).toBe(false);
        expect(checkIsObject([])).toBe(false);
        expect(checkIsObject(null)).toBe(false);
        expect(checkIsObject(undefined)).toBe(false);
    });
});

describe('checkIsString', () => {
    it('should return true for strings', () => {
        expect(checkIsString('string')).toBe(true);
    });

    it('should return false for non-strings', () => {
        expect(checkIsString(42)).toBe(false);
        expect(checkIsString(true)).toBe(false);
        expect(checkIsString({})).toBe(false);
        expect(checkIsString([])).toBe(false);
        expect(checkIsString(null)).toBe(false);
        expect(checkIsString(undefined)).toBe(false);
    });

    it('should return false for empty strings', () => {
        expect(checkIsString('')).toBe(false);
    });

    it('should return false for whitespace strings', () => {
        expect(checkIsString(' ')).toBe(false);
    });

    it('should return false for null', () => {
        expect(checkIsString(null)).toBe(false);
    });
});

describe('checkForCircularReference', () => {
    it('should return false for non-circular objects', () => {
        const obj = { a: 1, b: { c: 2 } };
        expect(checkForCircularReference(obj)).toBe(false);
    });

    it('should return true for circular objects', () => {
        const obj: any = { a: 1 };
        obj.b = obj;
        expect(checkForCircularReference(obj)).toBe(true);
    });

    it('should return false for null', () => {
        expect(checkForCircularReference(null)).toBe(false);
    });

    it('should return false for primitive values', () => {
        expect(checkForCircularReference(42)).toBe(false);
        expect(checkForCircularReference('string')).toBe(false);
        expect(checkForCircularReference(true)).toBe(false);
    });
});

describe('checkIsEmpty', () => {
    // it('should return true for arrays with empty values', () => {
    //     expect(checkIsEmpty([undefined, null, ''])).toBe(true);
    // });

    it('should return false for arrays with non-empty values', () => {
        expect(checkIsEmpty([1, 'string', true])).toBe(false);
    });

    it('should return true for undefined or null', () => {
        expect(checkIsEmpty(undefined)).toBe(true);
        expect(checkIsEmpty(null)).toBe(true);
    });

    it('should return true for empty array', () => {
        expect(checkIsEmpty([])).toBe(true);
    });

    it('should return false for non-empty array', () => {
        expect(checkIsEmpty([1, 'string', true])).toBe(false);
    });

    it('should return true for empty string', () => {
        expect(checkIsEmpty('')).toBe(true);
    });

    it('should return false for non-empty string', () => {
        expect(checkIsEmpty('string')).toBe(false);
    });

    it('return true for an empty object', () => {
        expect(checkIsEmpty({})).toBe(true);
    });

    it('return false for a non-empty object', () => {
        expect(checkIsEmpty({ key: 'value' })).toBe(false);
    });
});

describe('checkHasEmpties', () => {
    it('should return true for arrays with empty values', () => {
        expect(checkHasEmpties(undefined, null, '')).toBe(true);
    });

    it('should return false for arrays with non-empty values', () => {
        expect(checkHasEmpties(1, 'string', true)).toBe(false);
    });

    it('should return true for undefined or null', () => {
        expect(checkHasEmpties(undefined)).toBe(true);
        expect(checkHasEmpties(null)).toBe(true);
    });

    it('should return true for empty array', () => {
        expect(checkHasEmpties([])).toBe(true);
    });

    it('should return false for non-empty array', () => {
        expect(checkHasEmpties([1, 'string', true])).toBe(false);
    });

    it('should return true for empty string', () => {
        expect(checkHasEmpties('')).toBe(true);
    });

    it('should return false for non-empty string', () => {
        expect(checkHasEmpties('string')).toBe(false);
    });

    it('return true for an empty object', () => {
        expect(checkHasEmpties({})).toBe(true);
    });

    it('return false for a non-empty object', () => {
        expect(checkHasEmpties({ key: 'value' })).toBe(false);
    });

    it('should return true for nested empty values', () => {
        expect(checkHasEmpties([undefined, null, ''])).toBe(true);
    });
});