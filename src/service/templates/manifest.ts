import { ArgumentSpec } from "@service/templates/arg";
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


// type Spec<K extends TemplateKinds, T = any> = K extends TemplateKinds.Peer ? PeerSpec : K extends TemplateKinds.Service ? ServiceSpec : K extends TemplateKinds.Command ? CommandSpec : K extends TemplateKinds.Job ? JobSpec : K extends TemplateKinds.Parameter ? ParameterSpec<T> : K extends TemplateKinds.Argument ? ArgumentSpec<T> : never;

type Spec<K extends TemplateKinds, T = any> = K extends TemplateKinds.Argument ? ArgumentSpec<T> : never;


interface Template<V extends ApiVersions = ApiVersions.v1, K extends TemplateKinds = TemplateKinds.Peer, T = any> {
    apiVersion: V;
    kind: K;
    metadata: MetadataEntry;
    spec: Spec<K, T>;
}


export {
    type ApiVersion,
    ApiVersions,
    type TemplateKind,
    TemplateKinds,
    Template
};