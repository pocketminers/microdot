
import {
    IdentityManager
} from '../src/component/identifier/identifier.manager';
import {
    IdentityStorage
} from '../src/component/identifier/identifier.storage';
import {
    IdentityFactory
} from '../src/component/identifier/identifier.factory';
import {
    IdentifierFormats
} from '../src/component/identifier/identifier.types';
import { BaseTypes } from '../src/component/base/base.types';



describe('IdentityManager', () => {
    it('should create a new instance', () => {
        const identityManager = new IdentityManager();

        expect(identityManager).toBeInstanceOf(IdentityManager);
        expect(identityManager.storage.size).toBe(0);
    });

    it('should add an identifier', () => {
        const identityManager = new IdentityManager();

        const identifier: any = identityManager.createId({format: IdentifierFormats.Random});

        expect(identityManager.storage.size).toBe(1);
        console.log(identityManager.storage.listItems());
        console.log(identifier);
        expect(identityManager.storage.hasId(identifier.item)).toBe(true);
    });

    it('should remove an identifier', () => {
        const identityManager = new IdentityManager();

        const identifier = identityManager.storage.addId({identifier: 'test-1', type: BaseTypes.Custom});
        identityManager.storage.removeId(identifier.item);

        expect(identityManager.storage.size).toBe(0);
        console.log(identityManager.storage.listItems());
        expect(identityManager.storage.hasId({id: 'test-1', type: BaseTypes.Custom})).toEqual(false);
    });

    it('should list identifiers', () => {
        const identityManager = new IdentityManager();

        identityManager.storage.addId({identifier: 'test-1', type: BaseTypes.Custom});
        identityManager.storage.addId({identifier: 'test-2', type: BaseTypes.Custom});
        identityManager.storage.addId({identifier: 'test-3', type: BaseTypes.Custom});

        expect(identityManager.storage.size).toBe(3);
        expect(identityManager.storage.listIds()).toEqual([{id: 'test-1', type: BaseTypes.Custom}, {id: 'test-2', type: BaseTypes.Custom}, {id: 'test-3', type: BaseTypes.Custom}]);
    });
});

describe('IdentityStore', () => {
    it('should create a new instance', () => {
        const identityStore = new IdentityStorage();

        expect(identityStore).toBeInstanceOf(IdentityStorage);
        expect(identityStore.size).toBe(0);
    });

    it('should add an identifier', () => {
        const identityStore = new IdentityStorage();

        identityStore.addId({identifier: 'test-1', type: BaseTypes.Custom});

        expect(identityStore.size).toBe(1);
        expect(identityStore.getStoredItem({index: 0})).toEqual({index: -1, value: {id: 'test-1', type: BaseTypes.Custom}});
    });

    it('should remove an identifier', () => {
        const identityStore = new IdentityStorage();

        const identifier = identityStore.addId({identifier: 'test-1', type: BaseTypes.Custom});
        identityStore.removeId(identifier.item);

        expect(identityStore.size).toBe(0);
        console.log(identityStore.listItems());
        expect(identityStore.hasId(identifier.item)).toEqual(false);
    });

    it('should list identifiers', () => {
        const identityStore = new IdentityStorage();

        const one = identityStore.addId({identifier: 'test-1', type: BaseTypes.Custom});
        const two = identityStore.addId({identifier: 'test-2', type: BaseTypes.Custom});
        const three = identityStore.addId({identifier: 'test-3', type: BaseTypes.Custom});

        expect(identityStore.size).toBe(3);
        expect(identityStore.listIds()).toEqual([{id: 'test-1', type: BaseTypes.Custom}, {id: 'test-2', type: BaseTypes.Custom}, {id: 'test-3', type: BaseTypes.Custom}]);
    });

    it('should clear identifiers', () => {
        const identityStore = new IdentityStorage();

        identityStore.addId({identifier: 'test-1', type: BaseTypes.Custom});
        identityStore.addId({identifier: 'test-2', type: BaseTypes.Custom});
        identityStore.addId({identifier: 'test-3', type: BaseTypes.Custom});

        identityStore.clear();

        expect(identityStore.size).toBe(0);
        expect(identityStore.listIds()).toEqual([]);
    });
});


describe('IdentityFactory', () => {
    it('should create a random identifier', () => {
        const factory = new IdentityFactory();
        const random = IdentityFactory.create({format: IdentifierFormats.Random});

        expect(random.id).toMatch(/[a-z0-9]{10}/);
        expect(random.type).toEqual(BaseTypes.Custom);
    });

    it('should create a timestamp identifier', () => {
        const factory = new IdentityFactory();
        const timestamp = IdentityFactory.create({format: IdentifierFormats.Timestamp});

        expect(timestamp.id).toMatch(/[0-9]{13}/);
    });

    it('should create a name identifier', () => {
        const factory = new IdentityFactory();
        const name = IdentityFactory.create({format: IdentifierFormats.Name});

        expect(name.id).toMatch(/[a-z]{5}/);
    });
});