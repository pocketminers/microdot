/**
 * Annotation Metadata Template
 */
interface AnnotationEntry
    extends
        Partial<Record<"hash", string>>,
        Partial<Record<"createdBy", string>>,
        Partial<Record<"createdAt", string>>
{
    [key: string]: string | number | boolean | undefined | string[];
}

/**
 * Annotations are used to store metadata entries not meant for selection or filtering.  Generally, these are used for internal purposes.
 */
class Annotations
    extends Map<string, string | number | boolean | undefined | string[]>
    // extends PropertyMap
{
    constructor(entries: AnnotationEntry = {}) {
        super();

        // Set default values - createdAt, createdBy, hash
        if (
            entries.createdAt === null
            || entries.createdAt === undefined
        ) {
            entries.createdAt = new Date().toISOString();
        }

        if (
            entries.createdBy === null
            || entries.createdBy === undefined
        ) {
            entries.createdBy = 'unknown';
        }

        if (
            entries.hash === null
            || entries.hash === undefined
        ) {
            entries.hash = 'not-set';
        }

        for (const [key, value] of Object.entries(entries)) {
            this.set(key, value);
        }
    }

    public get hash(): string | undefined {
        return this.get('hash') as string;
    }

    public get createdAt(): string | undefined {
        return this.get('createdAt') as string;
    }

    public set hash(value: string) {
        const hash = this.get('hash');
        if (
            hash !== 'not-set'
        ) {
            throw new Error("Annotations:hash:hash is already set.");
        }

        this.set('hash', value);
    }

    public toJSON(): AnnotationEntry {
        return Object.fromEntries(this);
    }
}

export {
    type AnnotationEntry,
    Annotations
}