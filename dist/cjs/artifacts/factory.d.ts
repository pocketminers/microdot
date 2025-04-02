import { Hashable, HashableEntry } from "./hashable";
import { Argument, ArgumentEntry } from "./argument";
import { Identifiable, IdentifiableEntry } from "./identifiable";
import { Parameter, ParameterEntry } from "./parameter";
import { Configurable, ConfigurableEntry } from "./configurable";
declare class ArtifactFactory {
    static createHashable<T>(entry: HashableEntry<T>): Promise<Hashable<T>>;
    static createIdentifiable<T>(entry: IdentifiableEntry<T>): Promise<Identifiable<T>>;
    static createArgument<T>(entry: ArgumentEntry<T>): Argument<T>;
    static createHashedArgument<T>(entry: ArgumentEntry<T>): Promise<Argument<T>>;
    static createParameter<T>(entry: ParameterEntry<T>): Parameter<T>;
    static createHashedParameter<T>(entry: ParameterEntry<T>): Promise<Parameter<T>>;
    static createConfigurable(entry: ConfigurableEntry): Configurable;
    static createHashedConfigurable(entry: ConfigurableEntry): Promise<Configurable>;
}
export { ArtifactFactory };
//# sourceMappingURL=factory.d.ts.map