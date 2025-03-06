import { BaseTypes, Properties } from "@/component/base";

enum MessageLevels {
    Debug = "Debug",
    Info = "Info",
    Warn = "Warn",
    Error = "Error"
}

type MessageLevel = keyof typeof MessageLevels;


interface MessageSpec<
    L extends MessageLevel = MessageLevels.Info,
    S extends MessageStatus = MessageStatuses.Success,
    T = any | undefined
>
    extends
        Record<'body', T>,
        Record<'level', L>,
        Record<"status", S>,
        Record<"properties", Properties<BaseTypes.Message>>,
        Record<"timestamp", Date> {}


const MessageStatusCodes = {
    Success: ['Success', 200],
    Created: ['Created', 201],
    Accepted: ['Accepted', 202],
    NoContent: ['No Content', 204],
    BadRequest: ['Bad Request', 400],
    Unauthorized: ['Unauthorized', 401],
    Forbidden: ['Forbidden', 403],
    NotFound: ['Not Found', 404],
    MethodNotAllowed: ['Method Not Allowed', 405],
    NotAcceptable: ['Not Acceptable', 406],
    RequestTimeout: ['Request Timeout', 408],
    Conflict: ['Conflict', 409],
    Gone: ['Gone', 410],
    LengthRequired: ['Length Required', 411],
    PreconditionFailed: ['Precondition Failed', 412],
    PayloadTooLarge: ['Payload Too Large', 413],
    UnsupportedMediaType: ['Unsupported Media Type', 415],
    UnprocessableEntity: ['Unprocessable Entity', 422],
    TooManyRequests: ['Too Many Requests', 429],
    InternalServerError: ['Internal Server Error', 500],
    NotImplemented: ['Not Implemented', 501],
    BadGateway: ['Bad Gateway', 502],
    ServiceUnavailable: ['Service Unavailable', 503],
    GatewayTimeout: ['Gateway Timeout', 504],
}

enum MessageStatuses {
    Success = "Success",
    Created = "Created",
    Accepted = "Accepted",
    NoContent = "NoContent",
    BadRequest = "BadRequest",
    Unauthorized = "Unauthorized",
    Forbidden = "Forbidden",
    NotFound = "NotFound",
    MethodNotAllowed = "MethodNotAllowed",
    NotAcceptable = "NotAcceptable",
    RequestTimeout = "RequestTimeout",
    Conflict = "Conflict",
    Gone = "Gone",
    LengthRequired = "LengthRequired",
    PreconditionFailed = "PreconditionFailed",
    PayloadTooLarge = "PayloadTooLarge",
    UnsupportedMediaType = "UnsupportedMediaType",
    UnprocessableEntity = "UnprocessableEntity",
    TooManyRequests = "TooManyRequests",
    InternalServerError = "InternalServerError",
    NotImplemented = "NotImplemented",
    BadGateway = "BadGateway",
    ServiceUnavailable = "ServiceUnavailable",
    GatewayTimeout = "GatewayTimeout"
}

type MessageStatus = keyof typeof MessageStatusCodes;


export {
    MessageLevels,
    type MessageLevel,
    MessageStatuses,
    MessageStatusCodes,
    type MessageStatus,
    type MessageSpec
}
