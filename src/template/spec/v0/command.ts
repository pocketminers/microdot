import { ArgumentSpec } from './arg';
import { ParameterSpec } from './param';
import { PropertiesSpec } from './properties';


type TaskRunner<R = any, T = any>  = (instance: T | undefined, args?: Record<string, any>) => Promise<R>;

const defaultTaskRunner: TaskRunner<any, any> = async (instance, args) => {
    return await instance(args);
}

class CommandSpec<R = any, T = any>
    extends PropertiesSpec
{
    public name: string;
    public description: string;
    public declare args: ArgumentSpec<any>[];
    public declare params: ParameterSpec<any>[];
    public taskRunner: TaskRunner<R, T>;

    constructor({
        name,
        description,
        args,
        params,
        taskRunner = defaultTaskRunner
    }: {
        name: string;
        description: string;
        args: ArgumentSpec<any>[],
        params: ParameterSpec<any>[],
        taskRunner: TaskRunner;
    }) {
        super({args, params});

        this.name = name;
        this.description = description;
        this.taskRunner = taskRunner;
    }
}


interface CommandRunSpec<T = any> {
    name: string;
    jobId: string;
    args: Record<string, any>;
    instance: T;
}

interface CommandResultSpec<R>
    extends
        Record<'run', CommandRunSpec>,
        Record<'output', R>,
        Record<'metrics', CommandResultMetricsSpec> {}

interface CommandResultMetricsSpec
    extends
        Record<'start', number>,
        Record<'end', number>,
        Record<'duration', number>,
        Record<'bytesIn', number>,
        Record<'bytesOut', number> {}


export {
    CommandSpec,
    type CommandRunSpec,
    CommandResultSpec,
    type CommandResultMetricsSpec,
    type TaskRunner,
    defaultTaskRunner
};