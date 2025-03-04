import { BaseType, Base } from './base';


/**
 * The Factory class is a base class for creating new instances of a specific type.
 */
abstract class Factory<T extends BaseType, D = any, E = any>
    extends Base<T>
{
    constructor(type: T) {
        super(type);
    }

    abstract create(data: E): D;
}

export {
    Factory
};