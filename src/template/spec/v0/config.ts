import { PropertiesSpec } from "./properties";

interface ConfigSpec {
    id: string;
    name: string;
    description: string;
    properties: PropertiesSpec;
}

export { ConfigSpec };