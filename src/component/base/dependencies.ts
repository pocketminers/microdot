import { ProcessManager, ProcessType, ProcessTypes } from "../processor";
import { Storage } from "./storage";

import { BaseTypes } from "@component/base/base.types";


class DependencyManager
    extends Array<ProcessManager<ProcessTypes>>
{
    constructor(
        processManagers: ProcessManager<ProcessTypes>[] = []
    ) {
        super(...processManagers);
    }

    public addProcessManager(
        processManager: ProcessManager<ProcessTypes>
    ): void {
        this.push(processManager);
    }

    public getProcessManager(
        processType: ProcessType
    ): ProcessManager<ProcessTypes> | undefined {
        return this.find((processManager) => processManager.name === processType);
    }
}

