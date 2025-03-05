import { MetadataEntryIndexType, MetadataEntryValueType } from "@template/meta/index";

/**
 * Annotation Metadata Template
 */
interface AnnotationEntry
    extends
        Partial<Record<'description', string>>,
        Partial<Record<"timestamp", string>>
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
            entries.timestamp === null
            || entries.timestamp === undefined
            || entries.timestamp === ""
        ) {
            entries.timestamp = new Date().toISOString();
        }

        for (const [key, value] of Object.entries(entries)) {
            this.set(key, value);
        }
    }

    public get timestamp(): string {
        return this.get('timestamp') || "";
    }

    public toJSON(): AnnotationEntry {
        return Object.fromEntries(this);
    }
}

export {
    type AnnotationEntry,
    Annotations
}