import { Hashable } from "./hashable";
import { Argument } from "./argument";
import { Identifiable } from "./identifiable";
import { Parameter } from "./parameter";
import { Configurable } from "./configurable";
class ArtifactFactory {
    static async createHashable(entry) {
        const hashable = new Hashable(entry);
        await hashable.initialize();
        return hashable;
    }
    static async createIdentifiable(entry) {
        const identifiable = new Identifiable(entry);
        await identifiable.initialize();
        return identifiable;
    }
    static createArgument(entry) {
        return new Argument(entry);
    }
    static async createHashedArgument(entry) {
        const arg = new Argument(entry);
        await arg.initialize();
        return arg;
    }
    static createParameter(entry) {
        return new Parameter(entry);
    }
    static async createHashedParameter(entry) {
        const param = new Parameter(entry);
        await param.initialize();
        return param;
    }
    static createConfigurable(entry) {
        return new Configurable(entry);
    }
    static async createHashedConfigurable(entry) {
        const configurable = new Configurable(entry);
        await configurable.initialize();
        return configurable;
    }
}
export { ArtifactFactory };
//# sourceMappingURL=factory.js.map