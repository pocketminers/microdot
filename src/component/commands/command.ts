import { CommandSpec, Metadata, TaskRunner } from "@/template";
import { Base, BaseTypes, HashedStorageItem, Parameter, Properties } from "../base/index";
import { CommandEntry, CommandStorageEntryItem, defaultTaskRunner } from "./command.types";
import { Identifier, IdentityManager } from "../identifier";


class Command<
    R = any,
    T = any
>
    extends
        HashedStorageItem<BaseTypes.Command, CommandStorageEntryItem<R, T>>
{
    constructor({
        id,
        name,
        description,
        parameters,
        run,
        metadata
    }: CommandEntry<R, T>) {
        super({
            type: BaseTypes.Command,
            data: {
                id,
                name,
                description,
                properties: new Properties<BaseTypes.Command>({ type: BaseTypes.Command, params: parameters }),
                run: run !== undefined ? run : defaultTaskRunner
            },
            meta: metadata !== undefined ? new Metadata(metadata) : new Metadata()    
        });
    }

    public get id(): string {
        return this.data.id || "";
    }

    public get name(): string {
        return this.data.name || "";
    }

    public get description(): string {
        return this.data.description || "";
    }

    public get parameters(): Parameter[] {
        return this.data.properties.params || [];
    }

    public get run(): TaskRunner<R, T> {
        return this.data.run;
    }
}


export {
    Command
}