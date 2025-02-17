import { ParameterSpec } from "@/template/spec";

const JobConfigParameters: ParameterSpec[] = [
    {
        name: "runSequential",
        description: "Run commands sequentially",
        defaultValue: true
    } as ParameterSpec<boolean>,
    {
        name: "runDelay",
        description: "Run delay in seconds",
        defaultValue: 0
    } as ParameterSpec<number>,
    {
        name: "runTimeout",
        description: "Run timeout in seconds",
        defaultValue: 60
    } as ParameterSpec<number>,
    {
        name: "retryFailed",
        description: "Retry failed commands",
        defaultValue: false
    } as ParameterSpec<boolean>,
    {
        name: "retryCount",
        description: "Number of retries",
        defaultValue: 0
    } as ParameterSpec<number>,
    {
        name: "retryDelay",
        description: "Run retry delay in seconds",
        defaultValue: 5
    } as ParameterSpec<number>,
    {
        name: "retryTimeout",
        description: "Run retry timeout in seconds",
        defaultValue: 60
    } as ParameterSpec<number>
];

const JobQueueConfigParameters: ParameterSpec[] = [
    {
        name: "maxConcurrency",
        description: "Maximum number of concurrent jobs",
        defaultValue: 1
    } as ParameterSpec<number>,
    {
        name: "maxRetries",
        description: "Maximum number of retries for failed jobs",
        defaultValue: 0
    } as ParameterSpec<number>,
    {
        name: "retryDelay",
        description: "Retry delay in seconds for failed jobs",
        defaultValue: 5
    } as ParameterSpec<number>,
    {
        name: "retryTimeout",
        description: "Retry timeout in seconds for failed jobs",
        defaultValue: 60
    } as ParameterSpec<number>    

];