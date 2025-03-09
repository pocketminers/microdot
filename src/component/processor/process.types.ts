import { CommandSpec, Metadata, MetadataEntry } from "@/template";
import { ArgumentEntry, BaseTypes, HashedStorageItem, Properties } from "../base";
import { IdentityManager } from "../identifier";
import { CommandEntry, CommandManager } from "../commands";

interface ProcessEntry<T extends ProcessType, D = any> {
    id?: string;
    name: string;
    description?: string;
    instance?: Function | undefined;
    args?: ArgumentEntry[];
    dependencies?: D[];
    type: T;
    commands?: CommandEntry[] | CommandManager;
    identifier?: IdentityManager;
    metadata?: MetadataEntry;
    properties?: Properties<BaseTypes.Process>;
}


interface ProcessStorageItem<T extends ProcessType, D = any>
    extends
        Record<'id', string>,
        Record<'name', string>,
        Record<'description', string>,
        Partial<Record<'properties', Properties<BaseTypes.Process>>>,
        Partial<Record<'dependencies', D[]>>,
        Record<'type', T>,
        Record<'instance', Function | undefined>
        {}


enum ProcessTypes {
    DB_PSQL = 'DB_PSQL',
    USER = 'USER',
    AUTH = 'AUTH',
    Custom = 'Custom'
}


type ProcessType = keyof typeof ProcessTypes;


export {
    type ProcessEntry,
    type ProcessStorageItem,
    ProcessTypes,
    type ProcessType
};