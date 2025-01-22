"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Historian = exports.HistorianConfig = void 0;
const artifacts_1 = require("@/artifacts");
const HistorianConfig = new artifacts_1.Configuration({
    name: 'HistorianConfiguration',
    description: 'Historian configuration',
    parameters: [
        new artifacts_1.Parameter({
            name: "keepHistory",
            description: "Keep History of Objects",
            defaultValue: true
        }),
        new artifacts_1.Parameter({
            name: "historyLimit",
            description: "History Limit",
            defaultValue: 100
        }),
    ]
});
exports.HistorianConfig = HistorianConfig;
class Historian extends artifacts_1.Configurable {
    history = new Array();
    constructor(config = HistorianConfig) {
        super({
            id: 'historian',
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
exports.Historian = Historian;
//# sourceMappingURL=historian.js.map