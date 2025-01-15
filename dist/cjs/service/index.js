"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = exports.ServiceConfig = exports.ServiceTypes = void 0;
const message_1 = require("@service/message");
const configuration_1 = require("@artifacts/configuration");
const command_1 = require("@service/command");
const configurable_1 = require("@/artifacts/configurable");
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
})(ServiceTypes || (exports.ServiceTypes = ServiceTypes = {}));
/**
 * ServiceConfig
 * @summary
 * Configuration for a Service
 */
const ServiceConfig = new configuration_1.Configuration({
    parameters: [
        { name: 'keepHistory', required: true, description: 'Keep history of bodys', defaultValue: true },
        { name: 'historyLimit', required: true, description: 'Limit of bodys to keep', defaultValue: 10 },
        { name: 'queueLimit', required: true, description: 'Limit of commands to run in parallel', defaultValue: 100 },
        { name: 'queueInterval', required: true, description: 'Interval to run commands in parallel', defaultValue: 1000 },
        { name: 'queueInSeries', required: true, description: 'Run commands in series', defaultValue: false },
        { name: 'startQueue', required: true, description: 'Start the queue', defaultValue: false },
    ]
});
exports.ServiceConfig = ServiceConfig;
/**
 * Service Class
 * @summary
 * A service is a collection of processes and commands that can be run
 */
class Service extends configurable_1.Configurable {
    type;
    processes;
    commands;
    queue = new Array();
    queueStatus = 'Stopped';
    history;
    constructor({ name, description, type, parameters, args, processes = new Map(), commands = [] }) {
        super({ name, description, parameters, args });
        this.type = type;
        this.processes = processes || new Map();
        this.commands = commands;
        this.history = [];
    }
    async initialize(args) {
        for (const process of this.processes.values()) {
            await process.initialize();
        }
    }
    getProcesses() {
        return this.processes;
    }
    getProcess(name) {
        return this.processes.get(name);
    }
    addToHistory(body) {
        const historyLimit = this.getArgumentValue('historyLimit');
        if (this.history.length >= historyLimit) {
            this.history.shift();
        }
        this.history.push(body);
    }
    addToQueue(command) {
        if (this.queue.length >= this.getArgumentValue('queueLimit')) {
            message_1.ErrorMessage.create({
                action: 'Service:AddToQueue',
                body: 'Queue limit reached',
                status: 400,
                throwError: true
            });
        }
        this.queue.push(command);
    }
    getCommand(name) {
        const command = this.commands.find(command => command.name === name);
        if (!command) {
            return message_1.ErrorMessage.create({
                action: 'Service:GetCommand',
                body: `Command not found: ${name}`,
                status: 404,
                throwError: false
            });
        }
        return command;
    }
    getProcessCommand(processName, commandName) {
        const process = this.processes.get(processName);
        if (process) {
            return process.getCommand(commandName);
        }
        else {
            return message_1.ErrorMessage.create({
                action: 'Service:GetSubCommand',
                body: `Process not found: ${processName}`,
                status: 404,
                throwError: false
            });
        }
    }
    async runServiceCommand(commandName, args = []) {
        const action = 'Service:Run';
        let result = message_1.ErrorMessage.create({
            action,
            body: 'Command not found',
            status: 404,
            throwError: false
        });
        const command = this.getCommand(commandName);
        if (command instanceof command_1.Command) {
            const output = await command.run({ args });
            if (output instanceof message_1.ErrorMessage) {
                result = output;
            }
            else {
                result = message_1.Message.create({
                    action,
                    body: 'Command executed',
                    status: 200,
                    data: output
                });
            }
        }
        else {
            return command;
        }
        this.addToHistory(result);
        return result;
    }
    async runProcessCommand(processName, commandName, args = []) {
        const process = this.processes.get(processName);
        if (!process) {
            return message_1.ErrorMessage.create({
                action: 'Service:Run',
                body: `Process not found: ${processName}`,
                status: 404,
                throwError: false
            });
        }
        const result = await process.run(commandName, args);
        this.addToHistory(result);
        return result;
    }
    async run(...args) {
        let result;
        if (args.length === 2) {
            result = await this.runServiceCommand(args[0], args[1]);
        }
        else if (args.length === 3) {
            result = await this.runProcessCommand(args[2], args[0], args[1]);
        }
        else {
            result = message_1.ErrorMessage.create({
                action: 'Service:Run',
                body: 'Invalid arguments',
                status: 400,
                throwError: false
            });
        }
        return result;
    }
    async runQueueInParallel(limit = 100) {
        const queue = this.queue.slice(0, limit);
        this.queue = this.queue.slice(limit);
        await Promise.all(queue.map(async (command) => {
            await this.run(command.commandName, command.args || [], command.processName);
        }));
        this.queue = [];
    }
    async runQueueInSeries() {
        for (const command of this.queue) {
            await this.run(command.commandName, command.args || [], command.processName);
            this.queue.shift();
        }
    }
    async startQueue(sequence = "Series") {
        if (this.queueStatus === 'Started') {
            return;
        }
        this.queueStatus = 'Started';
        try {
            while (this.queueStatus === 'Started') {
                if (sequence === 'Series') {
                    await this.runQueueInSeries();
                    this.queueStatus = 'Stopped';
                }
                else {
                    await this.runQueueInParallel();
                    this.queueStatus = 'Stopped';
                }
            }
            this.queueStatus = 'Stopped';
        }
        catch (error) {
            this.queueStatus = 'Stopped';
            message_1.ErrorMessage.create({
                action: 'Service:Queue',
                body: 'Queue error',
                status: 500,
                data: error,
                throwError: true
            });
        }
    }
    async stopQueue() {
        if (this.queueStatus === 'Stopped') {
            return;
        }
        this.queueStatus = 'Stopped';
    }
    async queueManager({ forceStart = false, forceStop = false, forceConfig = false, config = undefined } = {}) {
        const startQueue = this.getArgumentValue('startQueue');
        const queueInterval = this.getArgumentValue('queueInterval');
        const queueInSeries = this.getArgumentValue('queueInSeries');
        if (forceStart === true &&
            forceStop === true) {
            message_1.ErrorMessage.create({
                action: 'Service:QueueManager',
                body: 'Invalid arguments: forceStart and forceStop cannot be true at the same time',
                status: 400,
                throwError: true
            });
        }
        if (startQueue === true ||
            (forceStart === true &&
                this.queueStatus === 'Stopped')) {
            if (queueInSeries) {
                await this.startQueue('Series');
            }
            else {
                await this.startQueue('Parallel');
            }
        }
        else if (forceStop === true ||
            (forceStart === false &&
                forceStop === false &&
                this.queueStatus === 'Started')) {
            await this.stopQueue();
        }
        setTimeout(async () => {
            await this.queueManager({ forceStart, forceStop });
        }, queueInterval);
    }
    async start() {
        await this.initialize();
        await this.queueManager();
    }
}
exports.Service = Service;
__exportStar(require("./command"), exports);
//# sourceMappingURL=index.js.map