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
import { Command } from './command';
import { Configuration } from '../artifacts/configuration';
import { ErrorMessage, Message } from '../artifacts/message';
import { Configurable } from '../artifacts/configurable';
var ProcessConfig = new Configuration({
    name: 'ProcessConfig',
    description: 'Process Configuration',
    parameters: [
        {
            name: 'initialize',
            required: true,
            description: 'Initialize the process instance',
            defaultValue: false,
            optionalValues: [true, false]
        },
        {
            name: 'initializer',
            required: false,
            description: 'Returns the process instance',
            defaultValue: null
        },
        {
            name: 'initializerConfig',
            required: false,
            description: 'Configuration for the initializer function',
            defaultValue: {}
        },
        {
            name: 'run',
            required: false,
            description: 'Run the process instance',
            defaultValue: false,
            optionalValues: [true, false]
        }
    ],
    args: []
});
var ProcessStatuses;
(function (ProcessStatuses) {
    ProcessStatuses["New"] = "New";
    ProcessStatuses["Ready"] = "Ready";
    ProcessStatuses["Initializing"] = "Initializing";
    ProcessStatuses["Initialized"] = "Initialized";
    ProcessStatuses["Idle"] = "Idle";
    ProcessStatuses["Running"] = "Running";
    ProcessStatuses["Stopped"] = "Stopped";
    ProcessStatuses["Paused"] = "Paused";
    ProcessStatuses["Error"] = "Error";
    ProcessStatuses["Completed"] = "Completed";
    ProcessStatuses["Unknown"] = "Unknown";
})(ProcessStatuses || (ProcessStatuses = {}));
var Process = /** @class */ (function (_super) {
    __extends(Process, _super);
    function Process(_a) {
        var id = _a.id, _b = _a.name, name = _b === void 0 ? 'Process' : _b, _c = _a.description, description = _c === void 0 ? '' : _c, _d = _a.configuration, configuration = _d === void 0 ? ProcessConfig : _d, _e = _a.properties, properties = _e === void 0 ? [] : _e, _f = _a.parameters, parameters = _f === void 0 ? [] : _f, _g = _a.args, args = _g === void 0 ? [] : _g, instance = _a.instance, _h = _a.commands, commands = _h === void 0 ? [] : _h;
        var _this = _super.call(this, { id: id, name: name, description: description, configuration: configuration, properties: properties, parameters: parameters, args: args }) || this;
        _this.status = 'New';
        _this.commands = [];
        _this.runCommand = function (command_1) {
            var args_1 = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args_1[_i - 1] = arguments[_i];
            }
            return __awaiter(_this, __spreadArray([command_1], __read(args_1), false), void 0, function (command, args) {
                var action, result, commandOutput, err_1;
                if (args === void 0) { args = []; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            action = 'Process:RunCommand';
                            result = ErrorMessage.create({
                                action: action,
                                body: 'Process not initialized',
                                status: 400,
                                throwError: false,
                                print: false
                            });
                            if (!(this.status === 'Ready' ||
                                this.status === 'Idle')) return [3 /*break*/, 5];
                            this.status = 'Running';
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, command.run({ instance: this.instance, args: args })];
                        case 2:
                            commandOutput = _a.sent();
                            this.status = 'Completed';
                            result = Message.create({
                                action: action,
                                body: 'Command executed successfully',
                                status: 200,
                                data: commandOutput,
                                print: false
                            });
                            return [3 /*break*/, 4];
                        case 3:
                            err_1 = _a.sent();
                            this.status = 'Error';
                            result = ErrorMessage.create({
                                action: action,
                                body: 'Error running command',
                                status: 500,
                                data: {
                                    error: err_1,
                                    command: command
                                },
                                throwError: false,
                                print: false
                            });
                            return [3 /*break*/, 4];
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            result = ErrorMessage.create({
                                action: action,
                                body: 'Process not ready to run command',
                                status: 400,
                                throwError: false,
                                data: {
                                    status: this.status
                                }
                            });
                            _a.label = 6;
                        case 6:
                            this.status = 'Idle';
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        _this.run = function (commandName, args) { return __awaiter(_this, void 0, void 0, function () {
            var action, result, command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        action = 'Process:Run';
                        result = ErrorMessage.create({
                            action: action,
                            body: 'Process not initialized',
                            status: 400,
                            throwError: false,
                            print: false
                        });
                        if (!(this.status === 'Ready' ||
                            this.status === 'Idle')) return [3 /*break*/, 4];
                        command = this.getCommand(commandName);
                        if (!(command instanceof Command)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.runCommand(command, args)];
                    case 1:
                        result = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        result = command;
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        result = ErrorMessage.create({
                            action: action,
                            body: 'Process not ready to run command, ',
                            status: 400,
                            throwError: false,
                            data: {
                                status: this.status
                            }
                        });
                        _a.label = 5;
                    case 5:
                        this.status = 'Idle';
                        return [2 /*return*/, result];
                }
            });
        }); };
        _this.getCommand = function (name) {
            var command = _this.commands.find(function (command) { return command.name === name; });
            if (!command) {
                return ErrorMessage.create({
                    action: 'Process:GetCommand',
                    body: "Command not found: ".concat(name, " in process: ").concat(_this.name),
                    status: 404,
                    throwError: false
                });
            }
            return command;
        };
        _this.commands = commands;
        if (instance !== undefined) {
            _this.instance = instance;
            _this.status = 'Ready';
        }
        else {
            _this.status = 'New';
        }
        return _this;
    }
    Process.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var initialize;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        initialize = this.config.getValue('initialize');
                        // const initializer: TaskRunner | undefined = this.getArgumentValue<TaskRunner>('initializer');
                        if (this.status === 'Ready' &&
                            initialize === true &&
                            // initializer !== undefined && 
                            this.instance !== undefined) {
                            ErrorMessage.create({
                                action: 'Process:Initialize',
                                body: 'Instance already initialized, but a seperate initializer is defined, disregarding the initializer',
                                status: 400,
                                throwError: true
                            });
                        }
                        if (!(this.status === 'New') // &&
                        ) return [3 /*break*/, 2]; // &&
                        this.status = 'Initializing';
                        Message.create({
                            action: 'Process:Initialize',
                            body: "Initializing process - ".concat(this.name),
                            status: 200,
                            // print: false
                        });
                        return [4 /*yield*/, this.initializeInstance()];
                    case 1:
                        _a.sent();
                        if (this.status.toString() === 'Initialized') {
                            this.status = 'Ready';
                        }
                        else {
                            this.status = 'Error';
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    Process.prototype.initializeInstance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var initializer, config, args, _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.status === 'Initializing')) return [3 /*break*/, 6];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        initializer = this.config.getValue('initializer');
                        config = this.config.getValue('initializerConfig') || undefined;
                        args = {};
                        if (config &&
                            config.size > 0) {
                            args = config.toArguments();
                            console.log('Initializer Config:', args);
                        }
                        if (!(initializer !== undefined)) return [3 /*break*/, 3];
                        _a = this;
                        return [4 /*yield*/, initializer(args)];
                    case 2:
                        _a.instance = _b.sent();
                        this.status = 'Initialized';
                        return [2 /*return*/];
                    case 3:
                        ErrorMessage.create({
                            action: 'Process:Initialize',
                            body: 'Initializer function not defined',
                            status: 400,
                            throwError: false
                        });
                        _b.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_1 = _b.sent();
                        this.status = 'Error';
                        ErrorMessage.create({
                            action: 'Process:Initialize',
                            body: 'Error initializing process',
                            status: 500,
                            data: error_1.body,
                            throwError: true
                        });
                        return [3 /*break*/, 6];
                    case 6:
                        if (this.status === 'Initialized' ||
                            this.status === 'Running' ||
                            this.status === 'Paused' ||
                            this.status === 'Stopped' ||
                            this.status === 'Error' ||
                            this.status === 'Completed' ||
                            this.status === 'Unknown') {
                            ErrorMessage.create({
                                action: 'Process:Initialize',
                                body: 'Process is already initialized',
                                status: 400,
                                throwError: false
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return Process;
}(Configurable));
export { Process, ProcessConfig, ProcessStatuses };
//# sourceMappingURL=process.js.map