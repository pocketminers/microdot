import { Configuration } from "../src/artifacts/configuration";
import { Historian, HistorianConfig } from "../src/service/historian";

describe('Historian', () => {
    let historian: Historian<any>;

    beforeEach(() => {
        historian = new Historian();
    });

    test('should initialize with default configuration', () => {
        expect(historian.config).toEqual(HistorianConfig);
    });

    test('should add object to history if history is enabled', () => {
        const obj = { id: 1 };
        historian.add(obj);
        expect(historian.get()).toContain(obj);
    });

    test('should not add object to history if history is disabled', () => {
        historian = new Historian(new Configuration({name: 'testConfig', args: [{ name: "keepHistory", value: false}], useArgs: true}));
        const obj = { id: 1 };
        historian.add(obj);
        expect(historian.get()).not.toContain(obj);
    });

    test('should not add duplicate objects to history', () => {
        const obj = { id: 1 };
        historian.add(obj);
        historian.add(obj);
        expect(historian.get().length).toBe(1);
    });

    // test('should remove oldest object when history limit is reached', () => {
    //     historian.config.setValue('historyLimit', 2);
    //     const obj1 = { id: 1 };
    //     const obj2 = { id: 2 };
    //     const obj3 = { id: 3 };
    //     historian.add(obj1);
    //     historian.add(obj2);
    //     historian.add(obj3);
    //     expect(historian.get()).toEqual([obj2, obj3]);
    // });

    test('should clear history', () => {
        const obj = { id: 1 };
        historian.add(obj);
        historian.clear();
        expect(historian.get().length).toBe(0);
    });

    test('should get the latest object in history', () => {
        const obj1 = { id: 1 };
        const obj2 = { id: 2 };
        historian.add(obj1);
        historian.add(obj2);
        expect(historian.getLatest()).toBe(obj2);
    });
});