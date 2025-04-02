import { 
    StorageItem,
    StorageItems
 } from "../src/component/base/storage";


describe('StorageItem', () => {
    it('should create a new instance', () => {
        const storageItem = new StorageItem({index: 'a', data: {id: 'test', name: 'Test'}});
        expect(storageItem).toBeInstanceOf(StorageItem);
    });

    it('should get the index', () => {
        const storageItem = new StorageItem({index: 'a', data: {id: 'test', name: 'Test'}});
        expect(storageItem.index).toBe('a');
    });

    it('should get the value', () => {
        const storageItem = new StorageItem({index: 'a', data: {id: 'test', name: 'Test'}});
        expect(storageItem.data).toEqual({id: 'test', name: 'Test'});
    });

    it('should catch an error when trying to set the index', () => {
        const storageItem = new StorageItem({index: 'a', data: {id: 'test', name: 'Test'}});
        expect(() => {
            storageItem.index = 'b';
        }).toThrowError('Index cannot be changed');
    });
});

describe('StorageItems', () => {
    it('should create a new instance', () => {
        const storageItems = new StorageItems<undefined>();
        expect(storageItems).toBeInstanceOf(StorageItems);
    });

    it('should create a new instance with data', () => {
        const storageItems = new StorageItems<{id: string, name: string}>({
            items: [['test', {id: 'test', name: 'Test'}]]
        });
        expect(storageItems.size).toBe(1);
    });

    it('should list items', () => {
        const storageItems = new StorageItems<{id: string, name: string}>({
            items: [['test', {id: 'test', name: 'Test'}]]
        });
        expect(storageItems.listItems()).toEqual([{id: 'test', name: 'Test'}]);
    });

    it('should list item keys', () => {
        const storageItems = new StorageItems<{id: string, name: string}>({
            items: [['test', {id: 'test', name: 'Test'}]]
        });
        expect(storageItems.listItemKeys()).toEqual(['test']);
    });

    it('should clear items', () => {
        const storageItems = new StorageItems<{id: string, name: string}>({
            items: [['test', {id: 'test', name: 'Test'}]]
        });
        storageItems.clear();
        expect(storageItems.size).toBe(0);
    });
});

// describe('Storage', () => {
//     class TestStorage<D>
//         extends 
//             Storage<BaseTypes.Custom, D>
//     {
//         constructor() {
//             super(BaseTypes.Custom);
//         }
//     }

//     it('should create a new instance', () => {
//         const storage = new TestStorage();
//         expect(storage).toBeInstanceOf(TestStorage<any>);
//     });

//     it('should create a new instance with data', () => {
//         const storage = new TestStorage<{id: string, name: string}>();
//         storage.addItem({index: 'test', item: {id: 'test', name: 'Test'}});
//         expect(storage.size).toBe(1);
//     });

//     it('should get an item', () => {
//         const storage = new TestStorage<{id: string, name: string}>();
//         const item = storage.addItem({index: 'test', item: {id: 'test', name: 'Test'}});
//         console.log(storage.listItems());
//         console.log(storage.getItem({index: item.index}));
//         // console.log(storage.getItem({value: item.item}));
//         // expect(storage.getItem({value: item.item})).toEqual({index: 'test', value: {id: 'test', name: 'Test'}});
//     }); 

//     it('should remove an item', () => {
//         const storage = new TestStorage<{id: string, name: string}>();
//         storage.addItem({index: 'test', item: {id: 'test', name: 'Test'}});
//         storage.removeItem({index: 'test'});
//         expect(storage.size).toBe(0);
//     });

//     it('should list items', () => {
//         const storage = new TestStorage<{id: string, name: string}>();
//         storage.addItem({index: 'test', item: {id: 'test', name: 'Test'}});
//         expect(storage.listItems()).toEqual([{id: 'test', name: 'Test'}]);
//     });

//     it('should list item keys', () => {
//         const storage = new TestStorage<{id: string, name: string}>();
//         storage.addItem({index: 'test', item: {id: 'test', name: 'Test'}});
//         expect(storage.listItemKeys()).toEqual(['test']);
//     });

//     it('should clear items', () => {
//         const storage = new TestStorage<{id: string, name: string}>();
//         storage.addItem({index: 'test', item: {id: 'test', name: 'Test'}});
//         storage.clear();
//         expect(storage.size).toBe(0);
//     });

 
// });