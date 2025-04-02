import { ParameterSpec } from "@/template/spec";


const ServiceConfigParameters = [
    {
        name: "autoStart",
        required: false,
        description: "Auto start the service",
        defaultValue: true
    } as ParameterSpec<boolean>,
    {
        name: "autoStartDelay",
        required: false,
        description: "Auto start delay in seconds",
        defaultValue: 0
    } as ParameterSpec<number>,
    {
        name: "autoStartTimeout",
        required: false,
        description: "Auto start timeout in seconds",
        defaultValue: 60
    } as ParameterSpec<number>,
    {
        name: "autoStartRetry",
        required: false,
        description: "Auto start retry count",
        defaultValue: 0
    } as ParameterSpec<number>,
    {
        name: "autoStartRetryDelay",
        required: false,
        description: "Auto start retry delay in seconds",
        defaultValue: 5
    } as ParameterSpec<number>,
    {
        name: "autoStartRetryTimeout",
        required: false,
        description: "Auto start retry timeout in seconds",
        defaultValue: 60
    } as ParameterSpec<number>,
    {
        name: "autoStopDelay",
        required: false,
        description: "Auto stop delay in seconds",
        defaultValue: 0
    } as ParameterSpec<number>,
    {
        name: "autoStopTimeout",
        required: false,
        description: "Auto stop timeout in seconds",
        defaultValue: 60
    } as ParameterSpec<number>,
    {
        name: "autoStopRetry",
        required: false,
        description: "Auto stop retry count",
        defaultValue: 0
    } as ParameterSpec<number>,
    {
        name: "autoStopRetryDelay",
        required: false,
        description: "Auto stop retry delay in seconds",
        defaultValue: 5
    } as ParameterSpec<number>,
    {
        name: "autoStopRetryTimeout",
        required: false,
        description: "Auto stop retry timeout in seconds",
        defaultValue: 60
    } as ParameterSpec<number>,
    {
        name: "autoStop",
        required: false,
        description: "Auto stop the service",
        defaultValue: true
    } as ParameterSpec<boolean>
];

export {
    ServiceConfigParameters
};