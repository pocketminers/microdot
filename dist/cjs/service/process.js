"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessStatuses = exports.ProcessConfig = exports.Process = void 0;
const command_1 = require("./command");
const message_1 = require("../artifacts/message");
const configurable_1 = require("../artifacts/configurable");
const ProcessConfig = (id) => {
    return {
        id,
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
    };
};
exports.ProcessConfig = ProcessConfig;
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
})(ProcessStatuses || (exports.ProcessStatuses = ProcessStatuses = {}));
class Process extends configurable_1.Configurable {
    instance;
    status = 'New';
    commands = [];
    constructor({ id, name = 'Process', description = '', configuration = ProcessConfig, properties = [], parameters = [], args = [], instance, commands = [] }) {
        super({ id, name, description, configuration, properties, parameters, args });
        this.commands = commands;
        if (instance !== undefined) {
            this.instance = instance;
            this.status = 'Ready';
        }
        else {
            this.status = 'New';
        }
    }
    async initialize() {
        const initialize = this.config.getValue('initialize');
        // const initializer: TaskRunner | undefined = this.getArgumentValue<TaskRunner>('initializer');
        if (this.status === 'Ready' &&
            initialize === true &&
            // initializer !== undefined && 
            this.instance !== undefined) {
            message_1.ErrorMessage.createMsg({
                action: 'Process:Initialize',
                body: 'Instance already initialized, but a seperate initializer is defined, disregarding the initializer',
                status: 400,
                throwError: true
            });
        }
        if (this.status === 'New' // &&
        // initialize === true
        // initializer !== undefined
        ) {
            this.status = 'Initializing';
            message_1.Message.createMsg({
                action: 'Process:Initialize',
                body: `Initializing process - ${this.name}`,
                status: 200,
                // print: false
            });
            await this.initializeInstance();
            if (this.status.toString() === 'Initialized') {
                this.status = 'Ready';
            }
            else {
                this.status = 'Error';
            }
        }
    }
    async initializeInstance() {
        if (this.status === 'Initializing') {
            try {
                const initializer = this.config.getValue('initializer');
                const config = this.config.getValue('initializerConfig') || undefined;
                let args = {};
                if (config &&
                    config.size > 0) {
                    args = config.toArguments();
                    console.log('Initializer Config:', args);
                }
                if (initializer !== undefined) {
                    this.instance = await initializer(args);
                    this.status = 'Initialized';
                    return;
                }
                else {
                    message_1.ErrorMessage.createMsg({
                        action: 'Process:Initialize',
                        body: 'Initializer function not defined',
                        status: 400,
                        throwError: false
                    });
                }
            }
            catch (error) {
                this.status = 'Error';
                message_1.ErrorMessage.createMsg({
                    action: 'Process:Initialize',
                    body: 'Error initializing process',
                    status: 500,
                    metadata: error.body,
                    throwError: true
                });
            }
        }
        if (this.status === 'Initialized' ||
            this.status === 'Running' ||
            this.status === 'Paused' ||
            this.status === 'Stopped' ||
            this.status === 'Error' ||
            this.status === 'Completed' ||
            this.status === 'Unknown') {
            message_1.ErrorMessage.createMsg({
                action: 'Process:Initialize',
                body: 'Process is already initialized',
                status: 400,
                throwError: false
            });
        }
    }
    runCommand = async (command, args = []) => {
        const action = 'Process:RunCommand';
        let result = message_1.ErrorMessage.createMsg({
            action,
            body: 'Process not initialized',
            status: 400,
            throwError: false,
            print: false
        });
        if (this.status === 'Ready' ||
            this.status === 'Idle') {
            this.status = 'Running';
            try {
                const commandOutput = await command.run({ instance: this.instance, args });
                this.status = 'Completed';
                result = message_1.Message.createMsg({
                    action,
                    body: 'Command executed successfully',
                    status: 200,
                    metadata: commandOutput,
                    print: false
                });
            }
            catch (err) {
                this.status = 'Error';
                result = message_1.ErrorMessage.createMsg({
                    action,
                    body: 'Error running command',
                    status: 500,
                    metadata: {
                        error: err,
                        command
                    },
                    throwError: false,
                    print: false
                });
            }
        }
        else {
            result = message_1.ErrorMessage.createMsg({
                action,
                body: 'Process not ready to run command',
                status: 400,
                throwError: false,
                metadata: {
                    status: this.status
                }
            });
        }
        this.status = 'Idle';
        return result;
    };
    run = async (commandName, args) => {
        const action = 'Process:Run';
        let result = message_1.ErrorMessage.createMsg({
            action,
            body: 'Process not initialized',
            status: 400,
            throwError: false,
            print: false
        });
        if (this.status === 'Ready' ||
            this.status === 'Idle') {
            const command = this.getCommand(commandName);
            if (command instanceof command_1.Command) {
                result = await this.runCommand(command, args);
            }
            else {
                result = command;
            }
        }
        else {
            result = message_1.ErrorMessage.createMsg({
                action,
                body: 'Process not ready to run command, ',
                status: 400,
                throwError: false,
                metadata: {
                    status: this.status
                }
            });
        }
        this.status = 'Idle';
        return result;
    };
    getCommand = (name) => {
        const command = this.commands.find(command => command.name === name);
        if (!command) {
            return message_1.ErrorMessage.createMsg({
                action: 'Process:GetCommand',
                body: `Command not found: ${name} in process: ${this.name}`,
                status: 404,
                throwError: false
            });
        }
        return command;
    };
}
exports.Process = Process;
//# sourceMappingURL=process.js.map