import { checkForCircularReference, checkIsEmpty, checkIsString } from '../src/utils/checks';

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
    it('should return true for arrays with empty values', () => {
        expect(checkIsEmpty([undefined, null, ''])).toBe(true);
    });

    it('should return false for arrays with non-empty values', () => {
        expect(checkIsEmpty([1, 'string', true])).toBe(false);
    });

    it('should return true for undefined or null', () => {
        expect(checkIsEmpty([undefined])).toBe(true);
        expect(checkIsEmpty([null])).toBe(true);
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

    it('should return true for an object with empty values', () => {
        expect(checkIsEmpty({ key: '' })).toBe(true);
    });

    it('should return true for an object with empty values', () => {
        expect(checkIsEmpty({ key: null })).toBe(true);
    });

    it('should return true for an object with empty values', () => {
        expect(checkIsEmpty({ key: undefined })).toBe(true);
    });

    it('should return true for an object with empty values', () => {
        expect(checkIsEmpty({ key: [] })).toBe(true);
    });
});