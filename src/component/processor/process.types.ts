import { CommandSpec, Metadata, MetadataEntry } from "@/template";
import { ArgumentEntry, BaseTypes, HashedStorageItem, Properties } from "../base";

interface ProcessEntry<T extends ProcessType, D = any> {
    id: string;
    name: string;
    description: string;
    instance?: Function | undefined;
    args?: ArgumentEntry[];
    dependencies?: D[];
    type: T;
    commands?: CommandSpec[];
    metadata?: MetadataEntry | Metadata;
}


interface ProcessStorageItem<T extends ProcessType, D = any>
    extends
        Pick<HashedStorageItem<BaseTypes.Process, ProcessEntry<T>>, 'id' | 'name' | 'description'>,
        Partial<Record<'properties', Properties<BaseTypes.Process>>>,
        Partial<Record<'dependencies', D[]>>,
        Record<'type', T>,
        Record<'instance', Function | undefined>
        {}


enum ProcessTypes {
    DB_PSQL = 'DB_PSQL',
    USER = 'USER',
    AUTH = 'AUTH'
}


type ProcessType = keyof typeof ProcessTypes;





export {
    type ProcessEntry,
    type ProcessStorageItem,
    type ProcessTypes,
    type ProcessType
};