import { MetadataEntryIndexType, MetadataEntryValueType } from ".";

interface LabelEntry
    extends
        Partial<Record<"id", string>>,
        Partial<Record<'name', string>>,
        Partial<Record<'type', string>>,
        Partial<Record<"hash", string>>,
        Partial<Record<"createdBy", string>>,
        Partial<Record<"tags", string[]>>
{
    [key: MetadataEntryIndexType]: MetadataEntryValueType;
}


/**
 * Labels are used to store metadata entries that are meant for selection or filtering.  Selection or filtering can be done by the id  or a tag.
 */
class Labels
    extends Map<MetadataEntryIndexType, MetadataEntryValueType>
{

    constructor(entries: LabelEntry = {}) {
        super();

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
    }

    public toJSON(): LabelEntry {
        return Object.fromEntries(this);
    }
}


export {
    type LabelEntry,
    Labels,
}