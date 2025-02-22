import { Component } from "../src/component";


describe('Component', () => {
    it('should create a new instance', async () => {
        const component = new Component<{id: string, name: string}> ({
            data: {
                id: 'test-component',
                name: 'Test Component'
            },
            meta: {
                name: 'Test Component 1',
                description: 'Test Component 1 Description'
            }
        });

        console.log(component);

        await component.hashData();

        console.log(component);

        expect(component).toBeInstanceOf(Component<{id: string, name: string}>);

    });

    it('should create a new instance with metadata', () => {
        const component = new Component({
            data: {
                id: 'test-component',
                name: 'Test Component'
            },
            meta: {
                annotations: {
                    hash: 'not-set'
                }
            }
        });

        expect(component).toBeInstanceOf(Component);
        expect(component.metadata).toBeDefined();
        expect(component.metadata.annotations).toBeDefined();
        expect(component.metadata.annotations.hash).toBe('not-set');
    });

    it('should create a new instance with metadata', () => {
        const component = new Component({
            data: {
                id: 'test-component',
                name: 'Test Component'
            },
            meta: {
                annotations: {
                    hash: 'not-set'
                }
            }
        });

        expect(component).toBeInstanceOf(Component);
        expect(component.metadata).toBeDefined();
        expect(component.metadata.annotations).toBeDefined();
        expect(component.metadata.annotations.hash).toBe('not-set');
    });

    it('should hash data', async () => {
        const component = new Component({
            data: {
                id: 'test-component',
                name: 'Test Component'
            },
            meta: {
                annotations: {
                    hash: 'not-set'
                }
            }
        });

        const hashedData = await component.hashData();
        expect(hashedData).toBeDefined();
        expect(component.metadata.annotations.hash).toBe(hashedData);
    });

    it('should throw error on hash mismatch', async () => {
        const component = new Component({
            data: {
                id: 'test-component',
                name: 'Test Component'
            },
            meta: {
                annotations: {
                    hash: 'not-set'
                }
            }
        });

        await component.hashData();
        component.metadata.annotations.set('hash', 'mismatch');

        await expect(component.hashData()).rejects.toThrowError();
    });
});