import { Configurable, Configuration } from "../artifacts";
declare const HistorianConfig: Configuration;
declare class Historian<T> extends Configurable {
    private readonly history;
    constructor(config?: Configuration);
    private checkIfHistoryIsEnabled;
    private checkIfHistoryLimitIsReached;
    private checkIfObjectIsInHistory;
    clear(): void;
    getLatest(): T;
    get(): Array<T>;
    add(object: T): void;
}
export { HistorianConfig, Historian };
//# sourceMappingURL=historian.d.ts.map