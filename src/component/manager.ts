import { Factory } from "./factory";
import { Storage } from "./storage";
import { ArgumentEntry, ParameterEntry, Properties } from "./properties";
import { Base, BaseType } from "./base";


class Manager<
    T extends BaseType,
    F extends Factory<T>,
    S extends Storage<T>
> 
    extends Base<T>
{
    /**
     * The factory that is used to create the component.
     */
    public readonly factory: F;
    public readonly storage: S;
    public readonly properties: Properties<T>;

    constructor(
        {
            type,
            factory,
            storage,
            parameters = [],
            args = []
        }:{
            type: T,
            factory: F,
            storage: S,
            parameters: ParameterEntry[],
            args: ArgumentEntry[]
        }
    ) {
        super(type);
        this.factory = factory !== undefined ? factory : new Factory<T>(type) as F;
        this.storage = storage !== undefined ? storage : new Storage<T>(type) as S;
        this.properties = new Properties<T>({type, params: parameters, args});
    }
}


export {
    Manager
}
