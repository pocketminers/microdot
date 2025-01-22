import { Argument, ArgumentEntry } from "./argument";
import { Identifiable, IdentifiableEntry } from "./identifiable";
import { Parameter, ParameterEntry } from "./parameter";
import { ArtifactStore } from "./store";


interface ConfigurationEntry
    extends
        IdentifiableEntry<any>,
        Partial<Record<'parameters', ParameterEntry<any>[] | Parameter<any>[]>>,
        Partial<Record<'args', ArgumentEntry<any>[] | Argument<any>>> {}

class Configuration
    extends Identifiable<{ parameters: ArtifactStore<Parameter<any>>, args: ArtifactStore<Argument<any>> }>
{
    public readonly parameters: ArtifactStore<Parameter<any>>;
    public readonly args: ArtifactStore<Argument<any>>;

    constructor(
        {
            id,
            name = 'Configuration',
            description = 'A configuration object that can be set by arguments',
            parameters = [],
            args = []
        }: ConfigurationEntry
    ) {
        const arguments = new ArtifactStore<Argument<any>>(args);

        super({id, name, description, data: {}});

        this.parameters = new ArtifactStore(parameters);
        this.args = new ArtifactStore(args);
    }

    public setArguments(args: Argument<any>[] | ArgumentEntry<any>[], asProperties: boolean = false): void {
        if (asProperties) {
            this.parameters.addEntries(args);
        }
        else {
            this.args.addEntries(args);
        }
    }

    public getArguments(): Argument<any>[] {
        return this.args;
    }

    public getParameters(): Parameter<any>[] {
        return this.parameters;
    }

    public toJSON(): { name: string, description: string, parameters: Parameter<any>[], args: Argument<any>[] } {
        const { name, description, parameters, args } = this.getData();

        return {
            name,
            description,
            parameters,
            args
        };
    }
}


export {
    Configuration,
    type ConfigurationEntry
}
