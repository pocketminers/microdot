import { Argument } from '../src/artifacts/argument';
import { Parameter } from '../src/artifacts/parameter';
import { PropertyStore } from '../src/artifacts/store';


describe('PropertyStore<Argument<any>>', () => {
    let store: PropertyStore<Argument<any>>;

    beforeEach(() => {
        store = new PropertyStore();
    });

    it('should add an item', () => {
        store.addEntry({ name: 'test', value: 'test' });

        expect(store.getEntry('test')).toBeDefined();
    });

    it('should add multiple items', () => {
        store.add([
            { name: 'test', value: 'test' },
            { name: 'test2', value: 'test2' }
        ]);

        expect(store.getEntry('test')).toBeDefined();
        expect(store.getEntry('test2')).toBeDefined();
    });

    it('should get an item', () => {
        store.addEntry({ name: 'test', value: 'test' });

        expect(store.getEntry('test')).toBeDefined();
    });

    it('should get all items', () => {
        store.add([
            { name: 'test', value: 'test' },
            { name: 'test2', value: 'test2' }
        ]);

        expect(store.getEntries()).toHaveLength(2);
    });

    it('should throw an error if an item already exists', () => {
        store.addEntry({ name: 'test', value: 'test' });

        expect(() => store.addEntry({ name: 'test', value: 'test' })).toThrow();
    });

});


describe('PropertyStore<Parameter<any>>', () => {
    let store: PropertyStore<Parameter<any>>;

    beforeEach(() => {
        store = new PropertyStore();
    });

    it('should add an item', () => {
        store.addEntry({ name: 'test', defaultValue: 'test' });

        expect(store.getEntry('test')).toBeDefined();
    });

    it('should add multiple items', () => {
        store.add([
            { name: 'test', defaultValue: 'test' },
            { name: 'test2', defaultValue: 'test2' }
        ]);

        expect(store.getEntry('test')).toBeDefined();
        expect(store.getEntry('test2')).toBeDefined();
    });

    it('should get an item', () => {
        store.addEntry({ name: 'test', defaultValue: 'test' });

        expect(store.getEntry('test')).toBeDefined();
    });

    it('should get all items', () => {
        store.add([
            { name: 'test', defaultValue: 'test' },
            { name: 'test2', defaultValue: 'test2' }
        ]);

        expect(store.getEntries()).toHaveLength(2);
    });

    it('should throw an error if an item already exists', () => {
        store.addEntry({ name: 'test', defaultValue: 'test' });

        expect(() => store.addEntry({ name: 'test', defaultValue: 'test' })).toThrow();
    });

});