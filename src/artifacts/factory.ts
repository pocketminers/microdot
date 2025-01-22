
import { Hashable, HashableEntry } from "./hashable";
import { Argument, ArgumentEntry } from "./argument";
import { Identifiable, IdentifiableEntry } from "./identifiable";
import { Parameter, ParameterEntry } from "./parameter";




class ArtifactsFactory {

    public static async createHashable<T>(entry: HashableEntry<T>): Promise<Hashable<T>> {
        const hashable = new Hashable<T>(entry);
        await hashable.initialize();
        return hashable;                
    }

    public static async createIdentifiable<T>(entry: IdentifiableEntry<T>): Promise<Identifiable<T>> {
        const identifiable = new Identifiable<T>(entry);
        await identifiable.initialize();
        return identifiable;
    }

    public static createArgument<T>(entry: ArgumentEntry<T>): Argument<T> {
        return new Argument<T>(entry);
    }

    public static async createHashedArgument<T>(entry: ArgumentEntry<T>): Promise<Argument<T>> {
        const arg = new Argument<T>(entry);
        await arg.initialize();
        return arg;
    }

    public static createParameter<T>(entry: ParameterEntry<T>): Parameter<T> {
        return new Parameter<T>(entry);
    }

    public static async createHashedParameter<T>(entry: ParameterEntry<T>): Promise<Parameter<T>> {
        const param = new Parameter<T>(entry);
        await param.initialize();
        return param;
    }

}


export {
    ArtifactsFactory
};