import { Base, BaseTypes, Factory } from "../base";
import { ProcessInstance } from "./processInstance";
import { ProcessEntry, ProcessType } from "./process.types";


class ProcessFactory
    extends Factory<BaseTypes.Process>
{
    constructor() {
        super(BaseTypes.Process);
    }

    public create<T extends ProcessType, D extends Base<BaseTypes.Identity | BaseTypes.Command>[]>({
        id,
        type,
        name,
        description,
        args,
        instance,
        metadata,
        dependencies
    }: ProcessEntry<T, D>): ProcessInstance<T, D> {
        return new ProcessInstance<T, D>({id, type, name, description, args, instance, metadata, dependencies});
    }
}


export {
    ProcessFactory
};  