import { Factory } from '../src/component/base/factory';
import { BaseType, BaseTypes } from '../src/component/base/base.types';

describe('Factory', () => {
    it('should create a new instance', () => {
        const factory = new Factory<BaseTypes.Custom>(BaseTypes.Custom);

        expect(factory).toBeInstanceOf(Factory);
    });

    it('should get the type', () => {
        const factory = new Factory<BaseTypes.Custom>(BaseTypes.Custom);

        expect(factory.type).toBe(BaseTypes.Custom);
    });
});