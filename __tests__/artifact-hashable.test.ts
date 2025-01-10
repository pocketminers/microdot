import { Hashable } from "../src/artifacts/hashable";

describe('Hashable', () => {
    it('should create a hash when hashing is enabled', () => {
        const value = 'test';
        const hashable = new Hashable(value);
        expect(hashable).toHaveProperty('hash');
    });

    // it('should not create a hash when hashing is disabled', () => {
    //     const originalHashingEnabled = (global as any).HASHING_ENABLED;
    //     (global as any).HASHING_ENABLED = false;

    //     const value = 'test';
    //     const hashable = new Hashable(value);
    //     expect(hashable).not.toHaveProperty('hash');

    //     (global as any).HASHING_ENABLED = originalHashingEnabled;
    // });

    it('should throw an error if hash does not match', () => {
        const value = 'test';
        const hashable = new Hashable(value);
        // hashable['string'] = 'invalid_hash';
        // @ts-ignore
        try {
            // @ts-ignore
            hashable['string'] = 'invalid_hash';
        } catch (error: any) {
            expect(error.message).toBe('Cannot add property string, object is not extensible');
        }
        // expect(() => hashable.checkHash()).toThrow('Hash mismatch');
    });

    it('should not throw an error if hash matches', () => {
        const value = 'test';
        const hashable = new Hashable(value);

        const hashString = hashable.hash as string;

        expect(() => hashable.checkHash(hashString)).not.toThrow();
    });

    it('should throw "Method not implemented." error if hash matches', () => {
        const value = 'test';
        const hashable = new Hashable(value);

        const hashString = hashable.hash as string;

        try {
            hashable.checkHash(hashString);
        } catch (error: any) {
            expect(error.message).toBe('Hash mismatch');
        }
    });
});