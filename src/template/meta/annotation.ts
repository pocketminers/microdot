import { MetadataEntryIndexType, MetadataEntryValueType } from "@template/meta/index";

/**
 * Annotation Metadata Template
 */
interface AnnotationEntry
    extends
        Partial<Record<"createdAt", string>>
{
    [key: MetadataEntryIndexType]: MetadataEntryValueType;
}

/**
 * Annotations are used to store metadata entries not meant for selection or filtering.  Generally, these are used for internal purposes.
 */
class Annotations
    extends Map<MetadataEntryIndexType, MetadataEntryValueType>
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

        for (const [key, value] of Object.entries(entries)) {
            this.set(key, value);
        }
    }

    public toJSON(): AnnotationEntry {
        return Object.fromEntries(this);
    }
}

export {
    type AnnotationEntry,
    Annotations
}