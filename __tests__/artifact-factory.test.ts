import { ArtifactFactory } from "../src/artifacts/factory";
import { ArgumentEntry } from "../src/artifacts/argument";
import { ConfigurableEntry } from "../src/artifacts/configurable";
import { IdentifiableEntry } from "../src/artifacts/identifiable";
import { ParameterEntry } from "../src/artifacts/parameter";
import { HashableEntry } from "../src/artifacts/hashable";

describe('ArtifactFactory', () => {
    it('should create a Hashable instance', async () => {
        const entry: HashableEntry<string> = { data: 'hashable' };
        const hashable = await ArtifactFactory.createHashable<string>(entry);
        expect(hashable).toBeDefined();
    });

    it('should not create an Identifiable instance from undefined data', async () => {
        const entry: IdentifiableEntry<undefined> = { id: '2', name: 'identifiable', data: undefined };
        try {
            await ArtifactFactory.createIdentifiable(entry);
        }
        catch (error: any) {
            expect(error.message).toBe('Hashable:constructor:data cannot be empty.');
        }
    });

    it('should create an Argument instance', () => {
        const entry: ArgumentEntry<any> = { name: 'arg', value: 'value' };
        const argument = ArtifactFactory.createArgument(entry);
        expect(argument).toBeDefined();
        expect(argument.getName()).toBe('arg');
    });

    it('should create a Parameter instance', () => {
        const entry: ParameterEntry<any> = { name: 'param', defaultValue: 'default' };
        const parameter = ArtifactFactory.createParameter(entry);
        expect(parameter).toBeDefined();
        expect(parameter.getName()).toBe('param');
    });

    it('should create a Configurable instance', () => {
        const entry: ConfigurableEntry = { id: '3', name: 'configurable' };
        const configurable = ArtifactFactory.createConfigurable(entry);
        expect(configurable).toBeDefined();
        expect(configurable.getId()).toBe('3');
    });

    it('should create a HashedArgument instance', async () => {
        const entry: ArgumentEntry<any> = { name: 'hashedArg', value: 'value' };
        const hashedArgument = await ArtifactFactory.createHashedArgument(entry);
        expect(hashedArgument).toBeDefined();
        expect(hashedArgument.getName()).toBe('hashedArg');
        expect(hashedArgument.getValue()).toBe('value');
        expect(hashedArgument.getHash()).toBeDefined();
    });

    it('should create a HashedParameter instance', async () => {
        const entry: ParameterEntry<any> = { name: 'hashedParam', defaultValue: 'default' };
        const hashedParameter = await ArtifactFactory.createHashedParameter(entry);
        expect(hashedParameter).toBeDefined();
        expect(hashedParameter.getName()).toBe('hashedParam');
    });

    it('should create a HashedConfigurable instance', async () => {
        const entry: ConfigurableEntry = { id: '4', name: 'hashedConfigurable' };
        const hashedConfigurable = await ArtifactFactory.createHashedConfigurable(entry);
        expect(hashedConfigurable).toBeDefined();
        expect(hashedConfigurable.getId()).toBe('4');
    });
});