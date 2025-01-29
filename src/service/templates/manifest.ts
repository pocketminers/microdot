import { ParameterEntry } from "@artifacts/parameter";
import { Argument, ArgumentEntry } from "@artifacts/argument";
import { MetadataEntry } from "@artifacts/metadata";


enum ApiVersions {
    v1 = "pocket/v1"
}

type ApiVersion = keyof typeof ApiVersions;

enum TemplateKinds {
    Peer = "Peer",
    Service = "Service",
    Command = "Command",
    Job = "Job",
    Parameter = "Parameter",
    Argument = "Argument",
}

type TemplateKind = keyof typeof TemplateKinds;

type TemplateMetadata = MetadataEntry;

class ArgumentSpec<T> {
    type: string;
    name: string;
    value: T;

    constructor({
        type,
        name,
        value
    }: {
        type?: string,
        name: string,
        value: T
    }) {
        if (
            type !== undefined
            && this.checkType(value, type) === false
        ) {
            throw new Error(`ArgumentSpec:constructor: The value type does not match the expected type: ${type}`);
        }

        this.type = typeof value;
        this.name = name;
        this.value = value;
    }

    private checkType(value: any, type?: string): boolean {
        if (type === undefined) {
            return true;
        }

        return typeof value === type;
    }


    public static fromJSON({
        type = undefined,
        name,
        value
    }: {
        type?: string | undefined,
        name: string,
        value: any
    }): ArgumentSpec<typeof value> {
        if (
            type !== undefined
            && typeof value !== type
        ) {
            throw new Error(`ArgumentSpec:fromJSON: The value type does not match the expected type: ${type}`);
        }

        return new ArgumentSpec<typeof value>({name, value});
    }

    public toJSON(): {
        type: string,
        name: string,
        value: T
    } {
        return {
            type: this.type,
            name: this.name,
            value: this.value
        };
    }

    public toArgument(): Argument<T> {
        return new Argument<T>({name: this.name, value: this.value});
    }
}

class ParameterSpec<T> {
    // type: string;
    // name: ArgumentSpec<T>['name'];
    // description: string;
    // required: boolean;
    // defaultValue: T;
    // optionalValues: T[];

    // constructor({
    //     type,
    //     name,
    //     description,
    //     required,
    //     defaultValue = undefined,
    //     optionalValues = undefined
    // }: {
    //     type?: string,
    //     name?: ArgumentSpec<T>['name'],
    //     description?: string,
    //     required?: boolean,
    //     defaultValue?: T,
    //     optionalValues?: T[]
    // }) {
    //     this.type = type;
    //     this.name = name;
    //     this.description = description;
    //     this.required = required;
    //     this.defaultValue = defaultValue;
    //     this.optionalValues = optionalValues;
    // }
}

interface PeerSpec {
    name: string;
    description: string;
    url: string;
    chains: string[];
}

interface ServiceSpec {
    name: string;
    description: string;
    url: string;
    chains: string[];
}

interface CommandSpec {
    name: string;
    description: string;
    url: string;
    chains: string[];
}

interface JobSpec {
    name: string;
    description: string;
    url: string;
    chains: string[];
}



type Spec<K extends TemplateKinds ,T = any> = K extends TemplateKinds.Peer ? PeerSpec : K extends TemplateKinds.Service ? ServiceSpec : K extends TemplateKinds.Command ? CommandSpec : K extends TemplateKinds.Job ? JobSpec : K extends TemplateKinds.Parameter ? ParameterSpec<T> : K extends TemplateKinds.Argument ? ArgumentSpec<T> : never;

interface Template<V extends ApiVersions = ApiVersions.v1, K extends TemplateKinds = TemplateKinds.Peer, T = any> {
    apiVersion: V;
    kind: K;
    metadata: TemplateMetadata;
    spec: Spec<K, T>;
}


export {
    type ApiVersion,
    ApiVersions,
    type TemplateKind,
    TemplateKinds,
    Template,
    ArgumentSpec,
    ParameterSpec,
    PeerSpec,
    ServiceSpec,
    CommandSpec,
};