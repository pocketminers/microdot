import { ConfigSpec } from './config';


/**
 * TaksRunner runs a command
 * @param instance - The instance of the command
 * @param args - The arguments to the command
 * @returns The result of the command
 * @version v0
 */
type TaskRunner<R = any, T = any>  = ({instance, args}: {instance?: T | undefined, args?: Record<string, any>}) => Promise<R>;


/**
 * Command Specification Template
 * @version v0
 */
interface CommandSpec<R = any, T = any>
    extends
        ConfigSpec, // id, name, description, properties
        Record<'run', TaskRunner<R, T>> {}


/**
 * Command Run Specification Template
 * @version v0
 */
interface CommandRunSpec
    extends
        Record<'name', string>,
        Record<"processId", string>,
        Record<'args', Record<string, any>> {}



/**
 * Command Result Specification Template
 * @version v0
 */
interface CommandResultSpec<R>
    extends
        Record<'run', CommandRunSpec>,
        Record<'output', R>,
        Record<'metrics', CommandResultMetricsSpec> {}


/**
 * Command Result Metrics Specification Template
 * @version v0
 */
interface CommandResultMetricsSpec
    extends
        Record<'start', number>,
        Record<'end', number>,
        Record<'duration', number>,
        Record<'bytesIn', number>,
        Record<'bytesOut', number> {}


export {
    type CommandSpec,
    type CommandRunSpec,
    type CommandResultSpec,
    type CommandResultMetricsSpec,
    type TaskRunner
};