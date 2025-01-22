import { Argument } from '../src/artifacts/argument';
import { ArtifactStore } from '../src/artifacts/store';


describe('ArtifactStore<Argument<any>>', () => {
    let store: ArtifactStore<Argument<any>>;

    beforeEach(() => {
        store = new ArtifactStore();
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