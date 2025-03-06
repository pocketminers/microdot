
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
        expect(identityManager.getStorage().size).toBe(0);
    });

    it('should add an identifier', () => {
        const identityManager = new IdentityManager();

        const identifier: any = identityManager.createId({format: IdentifierFormats.Random});

        expect(identityManager.getStorage().size).toBe(1);
        console.log(identityManager.getStorage().listItems());
        console.log(identifier);
        expect(identityManager.getStorage().hasId(identifier.item)).toBe(true);
    });

    it('should remove an identifier', () => {
        const identityManager = new IdentityManager();

        const identifier = identityManager.getStorage().addId({identifier: 'test-1', type: BaseTypes.Custom});
        identityManager.getStorage().removeId(identifier.item);

        expect(identityManager.getStorage().size).toBe(0);
        console.log(identityManager.getStorage().listItems());
        expect(identityManager.getStorage().hasId({id: 'test-1', type: BaseTypes.Custom})).toEqual(false);
    });

    // it('should list identifiers', () => {
    //     const identityManager = new IdentityManager();

    //     identityManager.getStorage().addId('test-1');
    //     identityManager.getStorage().addId('test-2');
    //     identityManager.getStorage().addId('test-3');

    //     expect(identityManager.getStorage().size).toBe(3);
    //     expect(identityManager.getStorage().listIds()).toEqual(['test-1', 'test-2', 'test-3']);
    // });
});

describe('IdentityStore', () => {
    it('should create a new instance', () => {
        const identityStore = new IdentityStorage();

        expect(identityStore).toBeInstanceOf(IdentityStorage);
        expect(identityStore.size).toBe(0);
    });

    // it('should add an identifier', () => {
    //     const identityStore = new IdentityStorage();

    //     identityStore.addId('test-1');

    //     expect(identityStore.size).toBe(1);
    //     expect(identityStore.hasId('test-1')).toBe(true);
    // });

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
        expect(identityStore.listIds()).toEqual([one.item, two.item, three.item]);
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
        const random = factory.create({format: IdentifierFormats.Random});

        expect(random.id).toMatch(/[a-z0-9]{10}/);
        expect(random.type).toEqual(BaseTypes.Custom);
    });

    // it('should create a timestamp identifier', () => {
    //     const factory = new IdentityFactory();
    //     const timestamp = factory.create({format: IdentifierFormats.Timestamp});

    //     expect(timestamp).toMatch(/[0-9]{13}/);
    // });
});