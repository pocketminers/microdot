import { Base, BaseType, BaseTypes } from "@component/base/base.types";
import { ProcessInstance } from "./processInstance";
import { ProcessEntry, ProcessType, ProcessTypes } from "./process.types";
import { HashedStorage } from "../base";


class ProcessStorage<
    T extends ProcessType = ProcessTypes.Custom,
    D extends Array<Base<BaseTypes.Identity> | Base<BaseTypes.Command> | Base<BaseTypes.Custom>> = Array<Base<BaseTypes.Identity> | Base<BaseTypes.Command> | Base<BaseTypes.Custom>>
>
    extends HashedStorage<BaseTypes.Process, ProcessEntry<T,D>, ProcessInstance<T,D>>
{
    constructor(processes: ProcessInstance<T,D>[] = []) {
        super({type: BaseTypes.Process, items: []});

        for (const process of processes) {
            this.addItem({index: process.id, item: process});
        }
    }
}


export {
    ProcessStorage
};