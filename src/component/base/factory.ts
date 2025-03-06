import { BaseType, Base, BaseTypes } from './base.types';


/**
 * The Factory class is a base class for creating new instances of a specific type.
 */
class Factory<T extends BaseType>
    extends Base<T>
{
    constructor(type: T) {
        super(type);
    }

    // abstract create(data: E): D;
}

export {
    Factory
};