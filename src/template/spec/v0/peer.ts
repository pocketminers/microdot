import { PropertiesSpec } from "@template/spec/v0/config";

class PeerSpec {
    public id: string;
    private config: PropertiesSpec;
    public service: any

    constructor({
        id,
        config,
        service
    }: {
        id: string,
        config: PropertiesSpec,
        service: any
    }) {
        this.id = id;
        this.config = config;
        this.service = service;
    }
}

export {
    PeerSpec
};