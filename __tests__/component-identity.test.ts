import {
    IdentityManager,
    IdentityStore,
    IdentityFactory,
    IdentifierFormats
} from '../src/component/identity';



describe('IdentityManager', () => {
    it('should create a new instance', () => {
        const identityManager = new IdentityManager();

        expect(identityManager).toBeInstanceOf(IdentityManager);
        expect(identityManager.size).toBe(0);
    });

    it('should add an identifier', () => {
        const identityManager = new IdentityManager();

        identityManager.addId('test-1');

        expect(identityManager.size).toBe(1);
        expect(identityManager.hasId('test-1')).toBe(true);
    });

    it('should remove an identifier', () => {
        const identityManager = new IdentityManager();

        identityManager.addId('test-1');
        identityManager.removeId('test-1');

        expect(identityManager.size).toBe(0);
        expect(identityManager.hasId('test-1')).toBe(false);
    });

    it('should list identifiers', () => {
        const identityManager = new IdentityManager();

        identityManager.addId('test-1');
        identityManager.addId('test-2');
        identityManager.addId('test-3');

        expect(identityManager.size).toBe(3);
        expect(identityManager.listIds()).toEqual(['test-1', 'test-2', 'test-3']);
    });
});

describe('IdentityStore', () => {
    it('should create a new instance', () => {
        const identityStore = new IdentityStore();

        expect(identityStore).toBeInstanceOf(IdentityStore);
        expect(identityStore.size).toBe(0);
    });

    it('should add an identifier', () => {
        const identityStore = new IdentityStore();

        identityStore.addId('test-1');

        expect(identityStore.size).toBe(1);
        expect(identityStore.hasId('test-1')).toBe(true);
    });

    it('should remove an identifier', () => {
        const identityStore = new IdentityStore();

        identityStore.addId('test-1');
        identityStore.removeId('test-1');

        expect(identityStore.size).toBe(0);
        expect(identityStore.hasId('test-1')).toBe(false);
    });

    it('should list identifiers', () => {
        const identityStore = new IdentityStore();

        identityStore.addId('test-1');
        identityStore.addId('test-2');
        identityStore.addId('test-3');

        expect(identityStore.size).toBe(3);
        expect(identityStore.listIds()).toEqual(['test-1', 'test-2', 'test-3']);
    });

    it('should clear identifiers', () => {
        const identityStore = new IdentityStore();

        identityStore.addId('test-1');
        identityStore.addId('test-2');
        identityStore.addId('test-3');

        identityStore.clear();

        expect(identityStore.size).toBe(0);
        expect(identityStore.listIds()).toEqual([]);
    });
});


describe('IdentityFactory', () => {
    it('should create a random identifier', () => {
        const random = IdentityFactory.createIdentifier({format: IdentifierFormats.Random});

        expect(random).toMatch(/[a-z0-9]{10}/);
    });

    it('should create a timestamp identifier', () => {
        const timestamp = IdentityFactory.createIdentifier({format: IdentifierFormats.Timestamp});

        expect(timestamp).toMatch(/[0-9]{13}/);
    });
});