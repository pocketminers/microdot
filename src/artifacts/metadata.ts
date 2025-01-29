interface MetadataEntry {
    id?: string;
    name?: string;
    description?: string;
    tags?: string[];
    hash?: string;
    createdBy?: string;
    annotations?: Record<string, string | number | boolean>;
    labels?: Record<string, string | number | boolean>;
}

interface AnnotationEntry
    extends
        Partial<Record<"hash", string>>,
        Partial<Record<"createdBy", string>>,
        Partial<Record<"createdAt", string>>
{
    [key: string]: string | number | boolean | undefined;
}

class PropertyMap extends Map<string, string | number | boolean | undefined | string[]> {}
type PropertyMapJSON = {[key: string]: string | number | boolean | string[] | undefined}

/**
 * Annotations are used to store metadata entries not meant for selection or filtering
 */
class Annotations
    extends PropertyMap

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
        console.log(`Annotations:hash:hash: ${hash}`);
        if (
            hash !== 'not-set'
        ) {
            throw new Error("Annotations:hash:hash is already set.");
        }

        this.set('hash', value);
    }

    public toJSON(): PropertyMapJSON {
        return Object.fromEntries(this);
    }
}

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

    public toJSON(): PropertyMapJSON {
        return Object.fromEntries(this);
    }
}


class Metadata {

    public name: string | undefined = undefined;
    public description: string | undefined = undefined;
    public annotations: Annotations = new Annotations();
    public labels: Labels = new Labels();

    constructor({
        id = undefined,
        name = undefined,
        description = undefined,
        hash = undefined,
        createdBy = "unknown",
        annotations = {},
        labels = {}
    }: MetadataEntry = {}) {
        this.name = name;
        this.description = description;
        this.annotations = new Annotations({
            createdBy: createdBy,
            hash: hash !== undefined ? hash : "not-set",
            ...annotations
        })
        this.labels = new Labels({
            id: id !== undefined ? id : "not-tracked",
            ...labels
        })
    }

    public toJSON(): {
        name: string | undefined,
        description: string | undefined,
        annotations: PropertyMapJSON,
        labels: LabelEntry
    } {
        return {
            name: this.name,
            description: this.description,
            annotations: this.annotations.toJSON(),
            labels: this.labels.toJSON()
        }
    }

    public static fromJSON(entry: MetadataEntry): Metadata {
        return new Metadata(entry);
    }
}

export { 
    type AnnotationEntry,
    Annotations,
    type LabelEntry,
    Labels,
    type MetadataEntry,
    Metadata
};