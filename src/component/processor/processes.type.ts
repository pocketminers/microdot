enum ProcessTypes {
    DB_PSQL = 'DB_PSQL',
    USER = 'USER',
    AUTH = 'AUTH'
}


type ProcessType = keyof typeof ProcessTypes;


export {
    type ProcessTypes,
    type ProcessType
};