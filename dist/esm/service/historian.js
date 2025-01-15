import { Configurable, Configuration, Parameter } from "../artifacts";
const HistorianConfig = new Configuration({
    name: 'HistorianConfiguration',
    description: 'Historian configuration',
    parameters: [
        new Parameter({
            name: "keepHistory",
            description: "Keep History of Objects",
            defaultValue: true
        }),
        new Parameter({
            name: "historyLimit",
            description: "History Limit",
            defaultValue: 100
        }),
    ]
});
class Historian extends Configurable {
    history = new Array();
    constructor(config = HistorianConfig) {
        super({
            name: 'Historian',
            description: 'A historian that keeps a history of objects',
            configuration: config
        });
    }
    checkIfHistoryIsEnabled() {
        return this.config.getValue('keepHistory');
    }
    checkIfHistoryLimitIsReached() {
        return this.history.length >= this.config.getValue('historyLimit');
    }
    checkIfObjectIsInHistory(object) {
        return this.history.includes(object);
    }
    clear() {
        this.history.length = 0;
    }
    getLatest() {
        return this.history[this.history.length - 1];
    }
    get() {
        return this.history;
    }
    add(object) {
        if (this.checkIfHistoryIsEnabled()
            && this.checkIfObjectIsInHistory(object) === false) {
            if (this.checkIfHistoryLimitIsReached()) {
                this.history.shift();
            }
            this.history.push(object);
        }
    }
}
export { HistorianConfig, Historian };
//# sourceMappingURL=historian.js.map