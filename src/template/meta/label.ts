
interface LabelEntry
    extends
        Partial<Record<"id", string>>,
        Partial<Record<'name', string>>,
        Partial<Record<"description", string>>,
        Partial<Record<"tags", string[]>>
{
    [key: string]: string | number | boolean | undefined | string[];
}


/**
 * Labels are used to store metadata entries that are meant for selection or filtering.  Selecction or filtering can be done by the id  or a tag.
 */
class Labels
    extends Map<string, string | number | boolean | undefined | string[]>
{

    constructor(entries: LabelEntry = {}) {
        super(Object.entries(entries));
    }

    public toJSON(): LabelEntry {
        return Object.fromEntries(this);
    }
}


export {
    type LabelEntry,
    Labels,
}