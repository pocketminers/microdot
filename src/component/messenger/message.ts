import { Metadata, MetadataEntry } from "@/template";
import { ArgumentEntry, BaseTypes, HashedStorageItem, Properties } from "../base";
import { MessageEntry } from "./message.types";
import { MessageLevel, MessageLevels, MessageStatus, MessageStatuses } from "@template/spec/v0/comms";
import { MessageConfigParameters } from "./message.params";


class Message<
    L extends MessageLevel = MessageLevels.Info,
    S extends MessageStatus = MessageStatuses.Success,
    B = any | undefined
> 
    extends
        HashedStorageItem<BaseTypes.Message, MessageEntry<L, S, B>>
{

    constructor({
        id,
        name,
        description,
        args,
        level = MessageLevels.Info as L,
        body = undefined as B,
        status = MessageStatuses.Success as S,
        metadata = new Metadata()
    }: {
        id?: string,
        name?: string,
        description?: string,
        args?: ArgumentEntry[],
        level?: L,
        body?: B
        status?: S,
        metadata?: MetadataEntry | Metadata
    } ={}) {
        super({
            type: BaseTypes.Message,
            data: {
                level,
                body,
                status
            },
            meta: metadata
        });

        this.meta.annotations.set('properties', new Properties<BaseTypes.Message>({ type: BaseTypes.Message, params: MessageConfigParameters, args }));

        this.meta.labels.set('id', id);
        this.meta.labels.set('name', name);
        this.meta.annotations.set('description', description);
    }

    public get id(): string {
        return this.meta.labels.get('id') || "";
    }

    public get name(): string {
        return this.meta.labels.get('name') || "";
    }

    public get description(): string {
        return this.meta.annotations.get('description') || "";
    }

    public get properties(): Properties<BaseTypes.Message> {
        return this.meta.annotations.get('properties') as Properties<BaseTypes.Message>;
    }

    public get level(): L {
        return this.data.level as L;
    }

    public get status(): S {
        return this.data.status as S;
    }

    public get body(): B {
        return this.data.body as B
    }

    public get timestamp(): string{
        const timestamp =  this.meta.annotations.timestamp;

        if (timestamp === undefined) {
            throw new Error(`Message:timestamp: The timestamp is undefined`);
        }

        return timestamp;
    }

    public get metadata(): Metadata {
        return this.meta;
    }

    private checkStatus(): void {
        if (
            this.status !== 'Success'
            && (
                this.data.level !== MessageLevels.Error
                && this.level !== MessageLevels.Warn
            )
        ) {
            throw new Error(`Message:checkStatus: The message status is not an error or warning: ${this.status}`);
        }
    }

    public print(): void {
        if (this.properties.getValue("print") === true) {
            console.log(`${this.body}`);
        }
    }

    public throw(): void {
        if (
            this.properties.getValue("throw") === true
            && this.level === MessageLevels.Error
        ) {
            throw new Error(`${this.body}`);
        }
    }
}




export {
    Message
}