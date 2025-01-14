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
import { Configuration } from '../artifacts/configuration';
import { Hashable } from '../artifacts/hashable';
import { checkIsEmpty } from '../utils/checks';
var CommandResult = /** @class */ (function () {
    function CommandResult(_a) {
        var command = _a.command, args = _a.args, output = _a.output, metrics = _a.metrics;
        var _this = this;
        this.toJSON = function () {
            return {
                command: _this.command,
                args: _this.args,
                output: _this.output,
                metrics: _this.metrics
            };
        };
        this.toString = function () {
            return JSON.stringify(_this, null, 2);
        };
        this.command = command;
        this.args = args;
        this.output = output;
        this.metrics = metrics;
    }
    return CommandResult;
}());
var defaultTaskRunner = function (instance, args) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, instance(args)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var Command = /** @class */ (function (_super) {
    __extends(Command, _super);
    function Command(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.name, name = _c === void 0 ? 'Base Command' : _c, _d = _b.description, description = _d === void 0 ? 'The Base Command Class' : _d, _e = _b.taskRunner, taskRunner = _e === void 0 ? defaultTaskRunner : _e, config = _b.config, _f = _b.properties, properties = _f === void 0 ? [] : _f, _g = _b.parameters, parameters = _g === void 0 ? [] : _g, _h = _b.args, args = _h === void 0 ? [] : _h;
        var _this = _super.call(this, { name: name, description: description, config: config, properties: properties, parameters: parameters, args: args }) || this;
        _this.execute = function () {
            var args_1 = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args_1[_i] = arguments[_i];
            }
            return __awaiter(_this, __spreadArray([], __read(args_1), false), void 0, function (_a) {
                var _b = _a === void 0 ? {} : _a, instance = _b.instance, args = _b.args;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            this.setArguments(args || []);
                            return [4 /*yield*/, this.taskRunner(instance, this.config)];
                        case 1: return [2 /*return*/, _c.sent()];
                    }
                });
            });
        };
        _this.run = function () {
            var args_1 = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args_1[_i] = arguments[_i];
            }
            return __awaiter(_this, __spreadArray([], __read(args_1), false), void 0, function (_a) {
                var startTime, endTime, duration, output, bytesReceived, bytesReturned, error_1, stringified;
                var _b = _a === void 0 ? {} : _a, instance = _b.instance, args = _b.args;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            startTime = Date.now();
                            duration = 0;
                            bytesReceived = 0;
                            bytesReturned = 0;
                            if (args !== undefined
                                && checkIsEmpty([args])) {
                                bytesReceived = JSON.stringify(args).length;
                            }
                            _c.label = 1;
                        case 1:
                            _c.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.execute({ instance: instance, args: args })];
                        case 2:
                            output = _c.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _c.sent();
                            output = error_1;
                            return [3 /*break*/, 4];
                        case 4:
                            if (output === undefined
                                || output === null
                                || checkIsEmpty([output])) {
                                bytesReturned = 0;
                            }
                            else {
                                if (output instanceof Error) {
                                    bytesReturned = JSON.stringify(output.message).length;
                                }
                                else if (output instanceof Object
                                    || output instanceof Map
                                    || output instanceof Set
                                    || output instanceof WeakMap
                                    || output instanceof WeakSet
                                    || output instanceof Function) {
                                    bytesReturned = JSON.stringify(output).length;
                                }
                                else if (output instanceof Array) {
                                    stringified = output.map(function (item) { return JSON.stringify(item); });
                                    bytesReturned = stringified.join('').length;
                                }
                                else if (typeof output === 'string') {
                                    bytesReturned = output.length;
                                }
                            }
                            endTime = Date.now();
                            duration = endTime - startTime;
                            return [2 /*return*/, new CommandResult({
                                    command: this.name,
                                    args: this.config.toArguments(),
                                    output: output || null,
                                    metrics: {
                                        startTime: startTime,
                                        endTime: endTime,
                                        duration: duration,
                                        bytesReceived: bytesReceived,
                                        bytesReturned: bytesReturned
                                    }
                                })];
                    }
                });
            });
        };
        _this.name = name;
        _this.description = description;
        if (config !== undefined) {
            _this.config = config;
            _this.config.addEntries({ entries: __spreadArray(__spreadArray([], __read(properties), false), __read(parameters), false), args: args });
            _this.config.setArguments(args);
        }
        else {
            _this.config = new Configuration(properties, parameters, args);
        }
        _this.taskRunner = taskRunner;
        return _this;
    }
    Command.prototype.setArguments = function (args) {
        this.config.setArguments(args);
    };
    Command.prototype.getArguments = function () {
        return this.config.toArguments();
    };
    return Command;
}(Hashable));
export { Command, defaultTaskRunner };
//# sourceMappingURL=command.js.map