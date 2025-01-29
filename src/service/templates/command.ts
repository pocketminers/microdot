import { ArgumentSpec } from "./arg";
import { ParameterSpec } from "./param";

class CommandSpec {
    public readonly name: string;
    public readonly description: string;
    public readonly args: ArgumentSpec<any>[];
    public readonly parameters: ParameterSpec<any>[];
    public readonly jobId: string;

    constructor({
        name,
        description,
        args = [],
        parameters = [],
        jobId
    }: {
        name: string,
        description: string,
        args?: ArgumentSpec<any>[],
        parameters?: ParameterSpec<any>[],
        jobId: string
    }) {
        this.name = name;
        this.description = description;
        this.args = args;
        this.parameters = parameters;
        this.jobId = jobId;
    }

    public toJSON(): {
        name: string,
        description: string,
        args: { type: string, name: string, value: any }[],
        parameters: { name: string, required: boolean, description: string, defaultValue: any, optionalValues: any[] }[],
        jobId: string
    } {
        return {
            name: this.name,
            description: this.description,
            args: this.args.map(arg => arg.toJSON()),
            parameters: this.parameters.map(param => param.toJSON()),
            jobId: this.jobId
        };
    }

}

export {
    CommandSpec
};