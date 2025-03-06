import { ParameterSpec } from "@/template";
import { ParameterEntry } from "@component/base";


const ProcessParameters: ParameterEntry[] = [
    {
        name: 'initialize',
        description: 'Initialize the process',
        type: 'boolean',
        defaultValue: false,
        required: false
    } as ParameterSpec<boolean>,
    {
        name: 'initializeFunction',
        defaultValue: null,
        required: false
    } as ParameterSpec<Function | null>,
    {
        name: 'initializeProperties',
        type: 'object',
        defaultValue: {},
        required: false
    } as ParameterSpec<Record<string, any>>,
    {
        name: 'retry',
        type: 'boolean',
        defaultValue: false,
        required: false
    } as ParameterSpec<boolean>,
    {
        name: 'retryCount',
        type: 'number',
        defaultValue: 0,
        required: false
    } as ParameterSpec<number>,
    {
        name: 'retryDelay',
        type: 'number',
        defaultValue: 0,
        required: false
    } as ParameterSpec<number>,
    {
        name: 'timeout',
        type: 'number',
        defaultValue: 0,
        required: false
    } as ParameterSpec<number>,
    {
        name: 'timeoutAction',
        type: 'string',
        defaultValue: 'fail',
        required: false,
        optionalValues: ['fail', 'retry']
    } as ParameterSpec<string>,
]


export {
    ProcessParameters
}