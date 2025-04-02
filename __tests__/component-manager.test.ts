import {
    Manager
} from "../src/component/base/manager";

import {
    BaseTypes
} from "../src/component/base";


describe('Manager', () => {
    class TestManager
        extends Manager<BaseTypes.Custom, any, any>
    {
        constructor() {
            super({
                type: BaseTypes.Custom,
                factory: null,
                storage: null,
                parameters: [],
                args: [],
                dependencies: []
            });
        }
    }

    it('should create a new instance', () => {
        const manager = new TestManager();
        expect(manager).toBeInstanceOf(TestManager);
    });
});