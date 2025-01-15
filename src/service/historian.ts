import { Configurable, Configuration, Parameter } from "@/artifacts";


const HistorianConfig: Configuration = new Configuration({
    name: 'HistorianConfiguration',
    description: 'Historian configuration',
    parameters: [
        new Parameter<boolean>({
            name: "keepHistory",
            description: "Keep History of Objects",
            defaultValue: true
        }),
        new Parameter<number>({
            name: "historyLimit",
            description: "History Limit",
            defaultValue: 100
        }),
    ]
});


class Historian<T>
    extends
        Configurable
{
    private readonly history: Array<T> = new Array<T>();

    constructor(config: Configuration = HistorianConfig) {
        super({
            id: 'historian',
            name: 'Historian',
            description: 'A historian that keeps a history of objects',
            configuration: config
        });
    }

    private checkIfHistoryIsEnabled(): boolean {
        return this.config.getValue('keepHistory');
    }

    private checkIfHistoryLimitIsReached(): boolean {
        return this.history.length >= this.config.getValue<number>('historyLimit');
    }

    private checkIfObjectIsInHistory(object: T): boolean {
        return this.history.includes(object);
    }

    public clear(): void {
        this.history.length = 0;
    }

    public getLatest(): T {
        return this.history[this.history.length - 1];
    }

    public get(): Array<T> {
        return this.history;
    }

    public add(object: T): void {
        if (
            this.checkIfHistoryIsEnabled()
            && this.checkIfObjectIsInHistory(object) === false
        ) {
            if (
                this.checkIfHistoryLimitIsReached()
            ) {
                this.history.shift();
            }
            this.history.push(object);
        }
    }
}

export {
    HistorianConfig,
    Historian
};