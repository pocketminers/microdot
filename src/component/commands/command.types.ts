import { ParameterEntry, Properties } from "@/component/base/properties";
import { CommandSpec, MetadataEntry, TaskRunner } from "@/template";
import { BaseTypes } from "../base";


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
        Pick<CommandSpec, "id" | "name" | "description">,
        Partial<Record<'parameters', ParameterEntry[]>>,
        Partial<Record<'run', TaskRunner<R, T>>>,
        Partial<Record<'metadata', MetadataEntry>> {}


interface CommandStorageEntryItem<R = any, T = any, D = any>
    extends
        CommandSpec<R,T>,
        Partial<Record<'metadata', MetadataEntry>> {}


interface CommandOutputFormat
    extends
        Record<'id', string>,
        Record<'name', string>,
        Record<'description', string>,
        Record<'args', string>,
        Record<'run', string> {}

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
    type CommandStorageEntryItem,
    type RunCommandEntry,
    type CommandOutputFormat,
    defaultTaskRunner
}