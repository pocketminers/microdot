import { PropertiesSpec } from "./properties";



class ServiceSpec {
    id: string;
    config: PropertiesSpec;
    
    constructor({
        id,
        config
    }: {
        id: string,
        config: PropertiesSpec
    }) {
        this.id = id;
        this.config = config;
    }
}

export { ServiceSpec };