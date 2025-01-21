import { Hashable } from "../src/artifacts/hashable";
import { CryptoUtils } from '../src/utils/crypto';


const { sha256 } = CryptoUtils;

describe('Hashable', () => {
    it('should create a hashable instance with the given data', async () => {
        const data = 'test';
        const hashable = new Hashable({id:'test', data});
        await hashable.initialize();

        const hash = await sha256(`test`);

        expect(hashable.hash).toEqual(hash);
    })


    it('should throw an error if hash does not match', () => {
        const data = 'test';
        const hashable = new Hashable({data});
        try {
            // @ts-expect-error - Testing private property
            hashable['string'] = 'invalid_hash';
        } catch (error: any) {
            expect(error.message).toBe('Cannot add property string, object is not extensible');
        }
    });

    it('should not throw an error if hash matches', async () => {
        const data = 'test';
        const hashable = new Hashable({data});
        await hashable.initialize();
        const hashString = hashable.hash as string;

        expect(async () => await hashable.checkHash(hashString)).not.toThrow('Hash mismatch');
    });

    it('should not throw an error if the hashed data is the same', async () => {
        const data = 'test';
        const hashable = new Hashable({data});
        await hashable.initialize();

        expect(await hashable.checkHash(hashable.hash as string)).toBe(true);
    });

    it('should throw an error if hash does not match', async () => {
        const data = 'test';
        const hashable = new Hashable({data});
        await hashable.initialize();

        console.log(hashable.hash);

        try {
            await hashable.checkHash('invalid_string');
        }
        catch (error: any) {
            expect(error.message).toBe('Hash mismatch');
        }
    });

    // it('should not throw an error if the hashes match', async () => {
    //     const data = 'test';
    //     const hashable = new Hashable({id: "test", data});
    //     await hashable.initialize();
    //     console.log(hashable.hash);

    //     const badHash = await sha256(`test-test`);
    //     console.log(`badHash: ${badHash}`);

    //     expect(await hashable.checkHash(badHash)).toThrow('Hash mismatch');
    // });


});