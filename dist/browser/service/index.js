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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { ErrorMessage, Message } from '../artifacts/message';
import { Configuration } from '../artifacts/configuration';
import { Command } from './command';
import { Configurable } from '../artifacts/configurable';
import { HistorianConfig } from './historian';
import { MessengerConfig } from './messenger';
import { JobQueueConfig } from './queue';
/**
 * ServiceTypes
 * @summary
 * Describes the type of service
 * - Internal: Service is private and not accessible from outside of the K8s cluster
 * - External: Service is public and accessible from outside of the K8s cluster
 */
var ServiceTypes;
(function (ServiceTypes) {
    ServiceTypes["Internal"] = "Internal";
    ServiceTypes["External"] = "External";
})(ServiceTypes || (ServiceTypes = {}));
var ServiceConfig = new Configuration({
    name: 'ServiceConfiguration',
    description: 'Service configuration',
    parameters: __spreadArray(__spreadArray(__spreadArray([], __read(HistorianConfig.toParameters()), false), __read(MessengerConfig.toParameters()), false), __read(JobQueueConfig.toParameters()), false)
});
/**
 * Service Class
 * @summary
 * A service is a collection of processes and commands that can be run
 */
var Service = /** @class */ (function (_super) {
    __extends(Service, _super);
    function Service(_a) {
        var id = _a.id, name = _a.name, _b = _a.description, description = _b === void 0 ? '' : _b, _c = _a.type, type = _c === void 0 ? ServiceTypes.Internal : _c, _d = _a.configuration, configuration = _d === void 0 ? ServiceConfig : _d, properties = _a.properties, parameters = _a.parameters, args = _a.args, _e = _a.processes, processes = _e === void 0 ? new Map() : _e, _f = _a.commands, commands = _f === void 0 ? [] : _f;
        var _this = _super.call(this, {
            id: id,
            name: name,
            description: description,
            configuration: configuration,
            properties: properties,
            parameters: parameters,
            args: args
        }) || this;
        _this.queue = new Array();
        _this.queueStatus = 'Stopped';
        _this.type = type;
        _this.processes = processes || new Map();
        _this.commands = commands;
        _this.history = [];
        return _this;
    }
    Service.prototype.initialize = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, process_1, e_1_1;
            var e_1, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, 6, 7]);
                        _a = __values(this.processes.values()), _b = _a.next();
                        _d.label = 1;
                    case 1:
                        if (!!_b.done) return [3 /*break*/, 4];
                        process_1 = _b.value;
                        return [4 /*yield*/, process_1.initialize()];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3:
                        _b = _a.next();
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 7];
                    case 6:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Service.prototype.getProcesses = function () {
        return this.processes;
    };
    Service.prototype.getProcess = function (name) {
        return this.processes.get(name);
    };
    Service.prototype.addToHistory = function (body) {
        var historyLimit = this.config.getValue('historyLimit');
        if (this.history.length >= historyLimit) {
            this.history.shift();
        }
        this.history.push(body);
    };
    Service.prototype.addToQueue = function (command) {
        if (this.queue.length >= this.config.getValue('queueLimit')) {
            ErrorMessage.create({
                action: 'Service:AddToQueue',
                body: 'Queue limit reached',
                status: 400,
                throwError: true
            });
        }
        this.queue.push(command);
    };
    Service.prototype.getCommand = function (name) {
        var command = this.commands.find(function (command) { return command.name === name; });
        if (!command) {
            return ErrorMessage.create({
                action: 'Service:GetCommand',
                body: "Command not found: ".concat(name),
                status: 404,
                throwError: false
            });
        }
        return command;
    };
    Service.prototype.getProcessCommand = function (processName, commandName) {
        var process = this.processes.get(processName);
        if (process) {
            return process.getCommand(commandName);
        }
        else {
            return ErrorMessage.create({
                action: 'Service:GetSubCommand',
                body: "Process not found: ".concat(processName),
                status: 404,
                throwError: false
            });
        }
    };
    Service.prototype.runServiceCommand = function (commandName_1) {
        return __awaiter(this, arguments, void 0, function (commandName, args) {
            var action, result, command, output;
            if (args === void 0) { args = []; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        action = 'Service:Run';
                        result = ErrorMessage.create({
                            action: action,
                            body: 'Command not found',
                            status: 404,
                            throwError: false
                        });
                        command = this.getCommand(commandName);
                        if (!(command instanceof Command)) return [3 /*break*/, 2];
                        return [4 /*yield*/, command.run({ args: args })];
                    case 1:
                        output = _a.sent();
                        if (output instanceof ErrorMessage) {
                            result = output;
                        }
                        else {
                            result = Message.create({
                                action: action,
                                body: 'Command executed',
                                status: 200,
                                data: output
                            });
                        }
                        return [3 /*break*/, 3];
                    case 2: return [2 /*return*/, command];
                    case 3:
                        this.addToHistory(result);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Service.prototype.runProcessCommand = function (processName_1, commandName_1) {
        return __awaiter(this, arguments, void 0, function (processName, commandName, args) {
            var process, result;
            if (args === void 0) { args = []; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        process = this.processes.get(processName);
                        if (!process) {
                            return [2 /*return*/, ErrorMessage.create({
                                    action: 'Service:Run',
                                    body: "Process not found: ".concat(processName),
                                    status: 404,
                                    throwError: false
                                })];
                        }
                        return [4 /*yield*/, process.run(commandName, args)];
                    case 1:
                        result = _a.sent();
                        this.addToHistory(result);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Service.prototype.run = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(args.length === 2)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.runServiceCommand(args[0], args[1])];
                    case 1:
                        result = _a.sent();
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(args.length === 3)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.runProcessCommand(args[2], args[0], args[1])];
                    case 3:
                        result = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        result = ErrorMessage.create({
                            action: 'Service:Run',
                            body: 'Invalid arguments',
                            status: 400,
                            throwError: false
                        });
                        _a.label = 5;
                    case 5: return [2 /*return*/, result];
                }
            });
        });
    };
    Service.prototype.runQueueInParallel = function () {
        return __awaiter(this, arguments, void 0, function (limit) {
            var queue;
            var _this = this;
            if (limit === void 0) { limit = 100; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queue = this.queue.slice(0, limit);
                        this.queue = this.queue.slice(limit);
                        return [4 /*yield*/, Promise.all(queue.map(function (command) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.run(command.commandName, command.args || [], command.processName)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 1:
                        _a.sent();
                        this.queue = [];
                        return [2 /*return*/];
                }
            });
        });
    };
    Service.prototype.runQueueInSeries = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, command, e_2_1;
            var e_2, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, 6, 7]);
                        _a = __values(this.queue), _b = _a.next();
                        _d.label = 1;
                    case 1:
                        if (!!_b.done) return [3 /*break*/, 4];
                        command = _b.value;
                        return [4 /*yield*/, this.run(command.commandName, command.args || [], command.processName)];
                    case 2:
                        _d.sent();
                        this.queue.shift();
                        _d.label = 3;
                    case 3:
                        _b = _a.next();
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        e_2_1 = _d.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 7];
                    case 6:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Service.prototype.startQueue = function () {
        return __awaiter(this, arguments, void 0, function (sequence) {
            var error_1;
            if (sequence === void 0) { sequence = "Series"; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.queueStatus === 'Started') {
                            return [2 /*return*/];
                        }
                        this.queueStatus = 'Started';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        _a.label = 2;
                    case 2:
                        if (!(this.queueStatus === 'Started')) return [3 /*break*/, 7];
                        if (!(sequence === 'Series')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.runQueueInSeries()];
                    case 3:
                        _a.sent();
                        this.queueStatus = 'Stopped';
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.runQueueInParallel()];
                    case 5:
                        _a.sent();
                        this.queueStatus = 'Stopped';
                        _a.label = 6;
                    case 6: return [3 /*break*/, 2];
                    case 7:
                        this.queueStatus = 'Stopped';
                        return [3 /*break*/, 9];
                    case 8:
                        error_1 = _a.sent();
                        this.queueStatus = 'Stopped';
                        ErrorMessage.create({
                            action: 'Service:Queue',
                            body: 'Queue error',
                            status: 500,
                            data: error_1,
                            throwError: true
                        });
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    Service.prototype.stopQueue = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.queueStatus === 'Stopped') {
                    return [2 /*return*/];
                }
                this.queueStatus = 'Stopped';
                return [2 /*return*/];
            });
        });
    };
    Service.prototype.queueManager = function () {
        return __awaiter(this, arguments, void 0, function (_a) {
            var startQueue, queueInterval, queueInSeries;
            var _this = this;
            var _b = _a === void 0 ? {} : _a, _c = _b.forceStart, forceStart = _c === void 0 ? false : _c, _d = _b.forceStop, forceStop = _d === void 0 ? false : _d, _e = _b.forceConfig, forceConfig = _e === void 0 ? false : _e, _f = _b.config, config = _f === void 0 ? undefined : _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        startQueue = this.config.getValue('startQueue');
                        queueInterval = this.config.getValue('queueInterval');
                        queueInSeries = this.config.getValue('queueInSeries');
                        if (forceStart === true &&
                            forceStop === true) {
                            ErrorMessage.create({
                                action: 'Service:QueueManager',
                                body: 'Invalid arguments: forceStart and forceStop cannot be true at the same time',
                                status: 400,
                                throwError: true
                            });
                        }
                        if (!(startQueue === true ||
                            (forceStart === true &&
                                this.queueStatus === 'Stopped'))) return [3 /*break*/, 5];
                        if (!queueInSeries) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.startQueue('Series')];
                    case 1:
                        _g.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.startQueue('Parallel')];
                    case 3:
                        _g.sent();
                        _g.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        if (!(forceStop === true ||
                            (forceStart === false &&
                                forceStop === false &&
                                this.queueStatus === 'Started'))) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.stopQueue()];
                    case 6:
                        _g.sent();
                        _g.label = 7;
                    case 7:
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.queueManager({ forceStart: forceStart, forceStop: forceStop })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, queueInterval);
                        return [2 /*return*/];
                }
            });
        });
    };
    Service.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initialize()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.queueManager()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Service;
}(Configurable));
export { ServiceTypes, ServiceConfig, Service, };
export * from "./command";
export * from "./historian";
export * from "./job";
export * from "./messenger";
export * from "./process";
export * from "./queue";
export * from "./status";
//# sourceMappingURL=index.js.map