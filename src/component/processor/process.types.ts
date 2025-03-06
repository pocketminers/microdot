
interface ProcessEntry<T extends ProcessType>
    extends
        Record<'type', T>,
        Record<'instance', Function | undefined>,
        // Record<'commandRunner', CommandRunner>
        {}


enum ProcessTypes {
    DB_PSQL = 'DB_PSQL',
    USER = 'USER',
    AUTH = 'AUTH'
}


type ProcessType = keyof typeof ProcessTypes;


export {
    type ProcessEntry,
    type ProcessTypes,
    type ProcessType
};