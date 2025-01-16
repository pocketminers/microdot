import { Hashable } from "../src/artifacts/hashable";

describe('Hashable', () => {
    it('should create a hash when hashing is enabled', () => {
        const value = 'test';
        const hashable = new Hashable(value);
        expect(hashable).toHaveProperty('hash');
    });

    it('should throw an error if hash does not match', () => {
        const value = 'test';
        const hashable = new Hashable(value);
        try {
            // @ts-ignore
            hashable['string'] = 'invalid_hash';
        } catch (error: any) {
            expect(error.message).toBe('Cannot add property string, object is not extensible');
        }
    });

    it('should not throw an error if hash matches', () => {
        const value = 'test';
        const hashable = new Hashable(value);

        const hashString = hashable.hash as string;

        expect(() => hashable.checkHash(hashString)).not.toThrow('Hash mismatch');
    });

    it('should throw an error if hash does not match', () => {
        const value = 'test';
        const hashable = new Hashable(value);

        expect(() => hashable.checkHash('invalid_hash')).toThrow('Hash mismatch');
    });

    it('should throw an error if hash does not match', () => {
        const value = 'test';
        const hashable = new Hashable("test", value);

        expect(() => hashable.checkHash('invalid_hash')).toThrow('Hash mismatch');
    });


});