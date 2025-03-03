import { Configurable } from "../src/component/configurable";
import { Properties } from "../src/component/properties";
import { Metadata } from "../src/template/meta";

describe('Configurable', () => {
    let configurable: Configurable<any>;

    beforeEach(() => {
        configurable = new Configurable<{
            customData: string;
        }>({
            id: "test-id",
            name: "test-name",
            description: "test-description",
            properties: { args: [{ name: "key", value: "value" }] },
            data: { customData: "data" },
            metadata: { annotations: {metaKey: "metaValue"} }
        });
    });

    test('should initialize with given id', () => {
        expect(configurable.id).toBe("test-id");
    });

    test('should initialize with given name', () => {
        expect(configurable.name).toBe("test-name");
    });

    test('should initialize with given description', () => {
        expect(configurable.description).toBe("test-description");
    });

    test('should initialize with given properties', () => {
        expect(configurable.properties).toBeInstanceOf(Properties);
        expect(configurable.properties.getValue('key')).toBe("value");
    });

    test('should initialize with given metadata', () => {
        expect(configurable.metadata.annotations.get('metaKey')).toBe("metaValue");
    });

    test('should return default properties if none are provided', () => {
        const defaultConfigurable = new Configurable();
        expect(defaultConfigurable.properties).toBeInstanceOf(Properties);
    });

    test('should return default metadata if none are provided', () => {
        const defaultConfigurable = new Configurable();
        expect(defaultConfigurable.metadata).toBeInstanceOf(Metadata);
    });
});