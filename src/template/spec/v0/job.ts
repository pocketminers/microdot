import { CommandResultMetricsSpec, CommandResultSpec, CommandRunSpec } from "./command";
import { ConfigSpec, ParameterSpec, PropertiesSpec } from "./config";



/**
 * Job Specification Template
 * @summary A job is a collection of commands that are executed in a specific order.
 * - Jobs can be retried on failure.
 * - Jobs can be delayed.
 * - Jobs can be timed out.
 * - Jobs can span multiple processes.
 */
interface JobRunSpec
    extends
        ConfigSpec, // id, name, description, properties
        Record<"commands", CommandRunSpec[]> {}


/**
 * Job Result Metrics Specification Template
 * @summary A job result metrics is a collection of metrics that are collected during the execution of a job.
 */
interface JobResultMetricsSpec
    extends
        CommandResultMetricsSpec,
        Record<"status", string> {}


/**
 * Job Result Specification Template
 * @summary A job result is a collection of results that are returned from the execution of a job.
 */
interface JobResultSpec
    extends
        Record<"job", JobRunSpec>,
        Record<"output", CommandResultSpec<any>[]>,
        Record<"metrics", JobResultMetricsSpec> {}


export {
    type JobRunSpec,
    type JobResultSpec,
    type JobResultMetricsSpec
};