import { AnnotationEntry, Annotations, LabelEntry, Labels, MetadataEntry, Metadata } from "../src/artifacts/metadata";

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
            'createdBy': 'test',
            'hash': 'not-set',
            'test': 'test'
        });
        expect(metadata.labels.toJSON()).toEqual({
            'id': '1',
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
            'createdBy': 'unknown',
            'hash': 'not-set'
        });
        expect(metadata.labels.toJSON()).toEqual({
            'id': 'not-tracked'
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
            'createdBy': 'test',
            'hash': 'not-set'
        });
        expect(metadata.labels.toJSON()).toEqual({
            'id': '1',
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
            'createdBy': 'test',
            'hash': 'not-set',
            'test': 'test'
        });
        expect(metadata.labels.toJSON()).toEqual({
            'id': '1'
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
            'createdBy': 'unknown',
            'hash': 'not-set',
            'test': 'test'
        });
    });

    it('should create an Annotations instance with default values', () => {
        const annotations = new Annotations();
        expect(annotations).toBeDefined();
        expect(annotations.toJSON()).toEqual({
            'createdAt': expect.any(String),
            'createdBy': 'unknown',
            'hash': 'not-set'
        });
    });

    it('should create an Annotations instance with default values and custom createdBy', () => {
        const annotations = new Annotations({ createdBy: 'test' });
        expect(annotations).toBeDefined();
        expect(annotations.toJSON()).toEqual({
            'createdAt': expect.any(String),
            'createdBy': 'test',
            'hash': 'not-set'
        });
    });
});