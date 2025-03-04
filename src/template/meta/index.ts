
import { AnnotationEntry, Annotations } from "./annotation";
import { Labels, type LabelEntry } from "./label";

type MetadataEntryIndexType = string;
type MetadataEntryValueType = string | number | boolean | undefined | string[] | any;

interface MetadataEntry
    extends
        Partial<Pick<AnnotationEntry, 'createdBy' | 'hash'>>,
        Partial<Pick<LabelEntry, 'id' | 'name' | 'description'>>,
        Partial<Record<'annotations', object>>,
        Partial<Record<'labels', object>>{}


class Metadata {
    public name: string | undefined = undefined;
    public description: string | undefined = undefined;
    public annotations: Annotations = new Annotations();
    public labels: Labels = new Labels();

    constructor({
        id = "not-tracked",
        name = undefined,
        description = undefined,
        hash = "not-set",
        createdBy = "unknown",
        annotations = {},
        labels = {}
    }: MetadataEntry = {}) {
        this.name = name;
        this.description = description;
        this.annotations = new Annotations({
            ...annotations
        })
        this.labels = new Labels({
            id,
            hash,
            createdBy,
            ...labels
        })
    }

    public get id(): string {
        return this.labels.get('id') as string;
    }

    public get createdBy(): string {
        return this.annotations.get('createdBy') as string;
    }

    public get hash(): string {
        return this.annotations.get('hash') as string;
    }

    public toJSON(): {
        name: string | undefined,
        description: string | undefined,
        annotations: AnnotationEntry,
        labels: LabelEntry
    } {
        return {
            name: this.name,
            description: this.description,
            annotations: this.annotations.toJSON(),
            labels: this.labels.toJSON()
        }
    }
}

export {
    type MetadataEntryIndexType,
    type MetadataEntryValueType,
    type MetadataEntry,
    Metadata
};

export * from "./annotation";
export * from "./label";