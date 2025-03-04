
/**
 * Argument Specification Template
 * @summary An argument is a key-value pair that is passed to a command, process, or job.
 */
interface ArgumentSpec<T = any>
    extends
        Partial<Record<'type', string>>,
        Record<'name', string>,
        Record<'value', T> {}


/**
 * Parameter Specification Template V0
 * @summary A parameter outlines the expected arguments for a command, process, or job.
 */
interface ParameterSpec<T = any>
    extends
        Record<'type', string>,
        Record<'name', ArgumentSpec<T>['name']>,
        Record<'required', boolean>,
        Record<'description', string>,
        Record<'defaultValue', T | undefined>,
        Record<'optionalValues', T[] | undefined> {}


/**
 * Properties Specification Template
 * @summary Properties are the arguments and parameters that are held by the `ConfigSpec` interface.
 */
interface PropertiesSpec 
    extends
        Record<'args', ArgumentSpec[]>,
        Record<'params', ParameterSpec[]> {}


/**
 * Config Specification Template
 * @summary A config is an identifiable, named, and described collection of properties that are passed to a component that requires configuration.
 */
interface ConfigSpec
    extends
        Partial<Record<'id', string>>,
        Record<'name', string>,
        Record<'description', string>,
        Record<'properties', PropertiesSpec> {}


export {
    type ConfigSpec,
    type PropertiesSpec,
    type ArgumentSpec,
    type ParameterSpec
};