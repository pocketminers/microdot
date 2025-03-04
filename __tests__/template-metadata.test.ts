import { AnnotationEntry, Annotations, MetadataEntry, Metadata } from "../src/template/meta";

describe('Metadata', () => {
    it('should create a Metadata instance', () => {
        const entry: MetadataEntry = {
            id: '1',
            name: 'metadata',
            description: 'metadata description',
            createdBy: 'test',
            annotations: {
                'test': 'test'
            },
            labels: {
                'test': 'test'
            }
        };
        const metadata = new Metadata(entry);
        expect(metadata).toBeDefined();
        expect(metadata.name).toBe('metadata');
        expect(metadata.description).toBe('metadata description');
        expect(metadata.annotations.toJSON()).toEqual({
            'createdAt': expect.any(String),
            'test': 'test'
        });
        expect(metadata.labels.toJSON()).toEqual({
            'id': '1',
            'hash': 'not-set',
            'createdBy': 'test',
            'tags': undefined,
            'type': undefined,
            'test': 'test'
        });
    });

    it('should create a Metadata instance with default values', () => {
        const metadata = new Metadata();
        expect(metadata).toBeDefined();
        expect(metadata.name).toBeUndefined();
        expect(metadata.description).toBeUndefined();
        expect(metadata.annotations.toJSON()).toEqual({
            'createdAt': expect.any(String),
        });
        expect(metadata.labels.toJSON()).toEqual({
            'id': 'not-tracked',
            'hash': 'not-set',
            'createdBy': 'unknown'
        });
    });

    it('should create a Metadata instance with default annotations', () => {
        const entry: MetadataEntry = {
            id: '1',
            name: 'metadata',
            description: 'metadata description',
            createdBy: 'test',
            labels: {
                'test': 'test'
            }
        };
        const metadata = new Metadata(entry);
        expect(metadata).toBeDefined();
        expect(metadata.name).toBe('metadata');
        expect(metadata.description).toBe('metadata description');
        expect(metadata.annotations.toJSON()).toEqual({
            'createdAt': expect.any(String),
        });
        expect(metadata.labels.toJSON()).toEqual({
            'id': '1',
            'hash': 'not-set',
            'createdBy': 'test',
            'tags': undefined,
            'type': undefined,
            'test': 'test'
        });
    });

    it('should create a Metadata instance with default labels', () => {
        const entry: MetadataEntry = {
            id: '1',
            name: 'metadata',
            description: 'metadata description',
            createdBy: 'test',
            annotations: {
                'test': 'test'
            }
        };
        const metadata = new Metadata(entry);
        expect(metadata).toBeDefined();
        expect(metadata.name).toBe('metadata');
        expect(metadata.description).toBe('metadata description');
        expect(metadata.annotations.toJSON()).toEqual({
            'createdAt': expect.any(String),
            'test': 'test'
        });
        expect(metadata.labels.toJSON()).toEqual({
            'id': '1',
            'hash': 'not-set',
            'createdBy': 'test'

        });
    });
});

describe('Annotations', () => {
    it('should create an Annotations instance', () => {
        const entry: AnnotationEntry = {
            'test': 'test'
        };
        const annotations = new Annotations(entry);
        expect(annotations).toBeDefined();
        expect(annotations.toJSON()).toEqual({
            'createdAt': expect.any(String),
            'test': 'test'
        });
    });

    it('should create an Annotations instance with default values', () => {
        const annotations = new Annotations();
        expect(annotations).toBeDefined();
        expect(annotations.toJSON()).toEqual({
            'createdAt': expect.any(String),
        });
    });

    it('should create an Annotations instance with default values and custom createdBy', () => {
        const annotations = new Annotations();
        expect(annotations).toBeDefined();
        expect(annotations.toJSON()).toEqual({
            'createdAt': expect.any(String)
        });
    });
});