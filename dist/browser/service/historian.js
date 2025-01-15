var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Configurable, Configuration, Parameter } from "../artifacts";
var HistorianConfig = new Configuration({
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
var Historian = /** @class */ (function (_super) {
    __extends(Historian, _super);
    function Historian(config) {
        if (config === void 0) { config = HistorianConfig; }
        var _this = _super.call(this, {
            name: 'Historian',
            description: 'A historian that keeps a history of objects',
            configuration: config
        }) || this;
        _this.history = new Array();
        return _this;
    }
    Historian.prototype.checkIfHistoryIsEnabled = function () {
        return this.config.getValue('keepHistory');
    };
    Historian.prototype.checkIfHistoryLimitIsReached = function () {
        return this.history.length >= this.config.getValue('historyLimit');
    };
    Historian.prototype.checkIfObjectIsInHistory = function (object) {
        return this.history.includes(object);
    };
    Historian.prototype.clear = function () {
        this.history.length = 0;
    };
    Historian.prototype.getLatest = function () {
        return this.history[this.history.length - 1];
    };
    Historian.prototype.get = function () {
        return this.history;
    };
    Historian.prototype.add = function (object) {
        if (this.checkIfHistoryIsEnabled()
            && this.checkIfObjectIsInHistory(object) === false) {
            if (this.checkIfHistoryLimitIsReached()) {
                this.history.shift();
            }
            this.history.push(object);
        }
    };
    return Historian;
}(Configurable));
export { HistorianConfig, Historian };
//# sourceMappingURL=historian.js.map