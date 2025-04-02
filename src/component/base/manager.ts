import { Factory } from "./factory";
import { Base, BaseType } from "./base.types";
import { Storage } from "./storage";
import { ArgumentEntry, ParameterEntry, Properties } from "./properties";


class Manager<
    T extends BaseType,
    F extends Factory<T>,
    S extends Storage<T>,
    D extends Manager<BaseType, any, any, any>[] = []
> 
    extends Base<T>
{
    /**
     * The factory that is used to create the component.
     */
    public readonly factory: F;
    public readonly storage: S;
    public readonly properties: Properties<T>;
    public readonly dependencies: D

    constructor(
        {
            type,
            factory,
            storage,
            parameters = [],
            args = [],
            dependencies
        }:{
            type: T,
            factory: F,
            storage: S,
            parameters: ParameterEntry[],
            args: ArgumentEntry[],
            dependencies: D
        }
    ) {
        super(type);
        this.factory = factory;
        this.storage = storage;
        this.properties = new Properties<T>({type, params: parameters, args});
        this.dependencies = dependencies;
    }
}


export {
    Manager
}
