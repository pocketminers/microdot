import {
    Property
} from "../src/artifacts/property";

import {
    CryptoUtils
} from "../src/utils/crypto";

describe('Property', () => {
    it('should create a Property instance with valid data', () => {
        const data = { key: 'value' };
        const property = new Property({ data });

        expect(property).toBeInstanceOf(Property);
        expect(property.data).toEqual(data);
    });

    it('should create a Property instance with valid data and meta', () => {
        const data = { key: 'value' };
        const meta = {
            id: '1',
            name: 'property',
            description: 'property description',
            createdBy: 'test',
            annotations: {
                'test': 'test'
            },
            labels: {
                'test': 'test'
            }
        };
        const property = new Property({ data, meta });

        expect(property).toBeInstanceOf(Property);
        expect(property.data).toEqual(data);
        expect(property.meta.toJSON()).toEqual({
            'name': 'property',
            'description': 'property description',
            'annotations': {
                'test': 'test',
                'createdAt': expect.any(String),
                'createdBy': 'test',
                'hash': 'not-set'
            },
            'labels': {
                'id': '1',
                'test': 'test'
            }
        });
    });

    it('should create a Property instance with default meta', () => {
        const data = { key: 'value' };
        const property = new Property({ data });

        expect(property).toBeInstanceOf(Property);
        expect(property.data).toEqual(data);
        expect(property.meta.toJSON()).toEqual({
            'annotations': {
                'createdAt': expect.any(String),
                'createdBy': 'unknown',
                'hash': 'not-set'
            },
            'labels': {
                'id': 'not-tracked'
            }
        });
    });

    it('should create a Property instance with default annotations', () => {
        const data = { key: 'value' };
        const property = new Property({ data });
        expect(property.meta.annotations.toJSON()).toEqual({
            'createdAt': expect.any(String),
            'createdBy': 'unknown',
            'hash': 'not-set'
        });
    });

    it('should create a Property instance with default labels', () => {
        const data = { key: 'value' };
        const property = new Property({ data });
        expect(property.meta.labels.toJSON()).toEqual({
            'id': 'not-tracked'
        });
    });

    it('should create a Property instance with default createdAt', () => {
        const data = { key: 'value' };
        const property = new Property({ data });
        expect(property.meta.annotations.createdAt).toEqual(expect.any(String));
    });

    it('should create a hashed Property instance', async () => {
        const data = { key: 'value' };
        const property = new Property({ data });
        const hash = await property.hashData();

        expect(property.meta.annotations.hash).toEqual(hash);
    })

    it('should create a hashed Property instance with a stored hash', async () => {
        const data = { key: 'value' };
        const hashCheck = await CryptoUtils.hashData(data);
        console.log(`Property:hashData:hashCheck: ${hashCheck}`);
        const property = new Property({ data, meta: { hash: hashCheck } });

        await property.hashData();

        expect(property.meta.annotations.hash).toEqual(hashCheck);
    });

});