enum MessageLevels {
    Debug = "Debug",
    Info = "Info",
    Warn = "Warn",
    Error = "Error"
}

type MessageLevel = keyof typeof MessageLevels;


interface MessageSpec<L = MessageLevel, T = any | undefined, S = number>
    extends
        Record<'body', T>,
        Record<'level', L>,
        Record<"status", S>,
        Record<"properties", Record<"print" | "save" | "throw", boolean>>,
        Record<"timestamp", Date> {}


enum MessageStatuses {
    Success = 200,
    Created = 201,
    Accepted = 202,
    NoContent = 204,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    Conflict = 409,
    InternalServerError = 500,
    NotImplemented = 501,
    ServiceUnavailable = 503
}

type MessageStatus = keyof typeof MessageStatuses;


export {
    MessageLevels,
    type MessageLevel,
    MessageStatuses,
    type MessageStatus,
    type MessageSpec
}
