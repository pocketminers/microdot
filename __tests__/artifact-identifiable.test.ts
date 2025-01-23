import { Identifiable } from "../src/artifacts/identifiable";
import { Hashable } from "../src/artifacts/hashable";

describe('Identifiable', () => {
    it('should create an Identifiable instance with valid id and data', () => {
        const id = '123';
        const name = 'Name';
        const data = { key: 'value' };
        const identifiable = new Identifiable({ id, name, data });

        expect(identifiable).toBeInstanceOf(Identifiable);
        expect(identifiable.id).toBe(id);
        expect(identifiable.data).toEqual(data);
    });

    it('should throw an error if id or data is empty', () => {
        expect(() => new Identifiable({ id: '', name: 'hello', data: { key: 'value' } })).toThrow("Identifiable:constructor:id, name or data cannot be empty.");
    });

    it('should extend Hashable', () => {
        const id = '123';
        const name = 'Name';
        const data = { key: 'value' };
        const identifiable = new Identifiable({ id, name, data });

        expect(identifiable).toBeInstanceOf(Hashable);
    });

    it('should not include id in the hash', async () => {
        const id = '123';
        const data = { key: 'value' };
        const identifiable = new Identifiable({ id, name: 'hello', data });
        await identifiable.initialize();

        const hash = new Hashable({ data })
        const hashValue = await hash.getHash();
        expect(await identifiable.getHash()).toEqual(hashValue);
    });

    it('should not include createdAt in the hash', async () => {
        const id = '123';
        const data = { key: 'value' };
        const identifiable = new Identifiable({ id, name: 'hello', data });
        await identifiable.initialize();

        const hash = new Hashable({ data: { ...data, createdAt: identifiable.createdAt } })
        const hashValue = await hash.getHash();
        expect(await identifiable.getHash()).not.toEqual(hashValue);
    });

    it('should not include name in the hash', async () => {
        const id = '123';
        const data = { key: 'value' };
        const identifiable = new Identifiable({ id, name: 'hello', data });
        await identifiable.initialize();

        const hash = new Hashable({ data: { ...data, name: identifiable.name } })
        const hashValue = await hash.getHash();
        expect(await identifiable.getHash()).not.toEqual(hashValue);
    });
});