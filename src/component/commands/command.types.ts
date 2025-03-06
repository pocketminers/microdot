import { ParameterEntry } from "@/component/base/properties";
import { CommandSpec, TaskRunner } from "@/template";


/**
 * The default task runner
 * @returns The result of the command
 */
const defaultTaskRunner: TaskRunner<any, any> = async ({instance, args}) => {
    return await instance({args});
}

/**
 * The default command entry
 */
interface CommandEntry<R = any, T = any>
    extends
        Pick<CommandSpec, "name" | "description">,
        Partial<Record<'parameters', ParameterEntry[]>>,
        Partial<Record<'run', TaskRunner<R, T>>> {}


/**
 * The run command entry
 */
interface RunCommandEntry
    extends
        Record<'commandName', string>,
        Record<'instance', any>,
        Partial<Record<'args', {[key: string]: any}>> {}


export {
    type CommandEntry,
    type RunCommandEntry,
    defaultTaskRunner
}