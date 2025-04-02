import { ProcessInstance, ProcessManager, ProcessType, ProcessTypes } from "../processor";
import { Storage } from "./storage";

import { BaseTypes } from "@component/base/base.types";


class DependencyManager
    extends Map<ProcessInstance['id'], ProcessInstance>
{
    public addDependency(process: ProcessInstance): void {
        this.set(process.id, process);
    }

    public removeDependency(process: ProcessInstance): void {
        this.delete(process.id);
    }

    public getDependencyById(id: ProcessInstance['id']): ProcessInstance | undefined {
        return this.get(id);
    }

    public getDependencyByName(name: string): ProcessInstance | undefined {
        return Array.from(this.values()).find((process) => process.name === name);
    }

    // public getDependencyByType(type: ProcessType): ProcessInstance | undefined {
    //     return Array.from(this.values()).find((process) => process.type === type);
    // }

    public hasDependency(process: ProcessInstance): boolean {
        return this.has(process.id);
    }

    public listDependencies(): ProcessInstance[] {
        return Array.from(this.values());
    }   
}


export {
    DependencyManager
};

