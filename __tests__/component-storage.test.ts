import { BaseTypes } from "../src/component";
import { Storage } from "../src/component/storage";

describe('Storage', () => {
    class TestStorage<D = any> extends Storage<BaseTypes.Custom, D> {
        constructor() {
            super({type: BaseTypes.Custom});
        }
    }

    it('should create a new instance', () => {
        const storage = new TestStorage();
        expect(storage).toBeInstanceOf(TestStorage);
    });

    it('should create a new instance with data', () => {
        const storage = new TestStorage<{id: string, name: string}>();
        storage.addItem({id: 'test', item: {id: 'test', name: 'Test'}});
        expect(storage.size).toBe(1);
    });

    it('should get an item', () => {
        const storage = new TestStorage<{id: string, name: string}>();
        storage.addItem({id: 'test', item: {id: 'test', name: 'Test'}});
        expect(storage.getItem('test')).toEqual({id: 'test', name: 'Test'});
    });

    it('should remove an item', () => {
        const storage = new TestStorage<{id: string, name: string}>();
        storage.addItem({id: 'test', item: {id: 'test', name: 'Test'}});
        storage.removeItem({id: 'test'});
        expect(storage.size).toBe(0);
    });

    it('should list items', () => {
        const storage = new TestStorage<{id: string, name: string}>();
        storage.addItem({id: 'test', item: {id: 'test', name: 'Test'}});
        expect(storage.listItems()).toEqual([{id: 'test', name: 'Test'}]);
    });

    it('should list item keys', () => {
        const storage = new TestStorage<{id: string, name: string}>();
        storage.addItem({id: 'test', item: {id: 'test', name: 'Test'}});
        expect(storage.listItemKeys()).toEqual(['test']);
    });

    it('should clear items', () => {
        const storage = new TestStorage<{id: string, name: string}>();
        storage.addItem({id: 'test', item: {id: 'test', name: 'Test'}});
        storage.clear();
        expect(storage.size).toBe(0);
    });

    it('should throw an error if item not found', () => {
        const storage = new TestStorage<{id: string, name: string}>();
        expect(() => storage.getItem('test')).toThrow('Component test not found');
    });
});