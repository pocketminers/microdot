import { checkForCircularReference, checkIsEmpty } from '../src/utils/checks';

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
});