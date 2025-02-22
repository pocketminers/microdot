import { ConfigSpec, ParameterSpec } from "@template/spec/v0/config";
import { CommandRunSpec, CommandSpec } from "./command";

const ProcessConfigParameters: ParameterSpec[] = [
    {
        name: "initialize",
        required: false,
        description: "Initialize the process",
        defaultValue: false
    } as ParameterSpec<boolean>,
    {
        name: "initializer",
        required: false,
        description: "Initialization function",
        defaultValue: undefined
    } as ParameterSpec<Function>,
    {
        name: "initializeCommand",
        required: false,
        description: "Initialize command"
    } as ParameterSpec<CommandRunSpec>,
]


enum ProcessStatuses {
    New = 'New',
    Ready = 'Ready',
    Initializing = 'Initializing',
    InitializationError = 'InitializationError',
    Initialized = 'Initialized',
    Idle = 'Idle',
    Running = 'Running',
    Stopped = 'Stopped',
    Paused = 'Paused',
    Error = 'Error',
    Completed = 'Completed',
    CommandNotFound = 'CommandNotFound',
    Unknown = 'Unknown'
}


type ProcessStatus = keyof typeof ProcessStatuses;


interface ProcessSpec
    extends
        ConfigSpec,  // id, name, description, properties
        Record<"commands", CommandSpec[]>,
        Record<"status", ProcessStatus> {}



export {
    ProcessConfigParameters,
    ProcessStatuses,
    type ProcessStatus,
    type ProcessSpec
};