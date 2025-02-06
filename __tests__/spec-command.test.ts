import { CommandSpec, CommandResultSpec, defaultTaskRunner } from '../src/template/spec/v0/command';
import { ArgumentSpec } from '../src/template/spec/v0/arg';
import { ParameterSpec } from '../src/template/spec/v0/param';

describe('CommandSpec - taskRunner functionality', () => {
    const defaultTaskRunner = async (instance: any, args: any) => {
        return await instance(args);
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a CommandSpec object properly', () => {
        const args: ArgumentSpec<any>[] = [];
        const params: ParameterSpec<any>[] = [];
        const command = new CommandSpec({
            name: 'testCommand',
            description: 'This is a test command',
            args,
            params,
            taskRunner: defaultTaskRunner
        });

        expect(command.name).toBe('testCommand');
        expect(command.description).toBe('This is a test command');
        expect(command.args).toBe(args);
        expect(command.params).toBe(params);
        expect(command.taskRunner).toBe(defaultTaskRunner);
    });

    it('should run the taskRunner properly', async () => {
        const args: ArgumentSpec<any>[] = [];
        const params: ParameterSpec<any>[] = [];
        const mockTaskRunner = jest.fn().mockResolvedValue('result');
        const command = new CommandSpec({
            name: 'testCommand',
            description: 'This is a test command',
            args,
            params,
            taskRunner: mockTaskRunner
        });

        const result = await command.taskRunner(undefined, {});

        expect(mockTaskRunner).toHaveBeenCalled();
        expect(result).toBe('result');
    });
});

describe('CommandResultSpec', () => {
    it('should create a CommandResultSpec object properly', () => {
        const runSpec = {
            name: 'testCommand',
            jobId: '123',
            args: {},
            instance: {}
        };
        const output = 'output';
        const metrics = {
            start: 0,
            end: 1,
            duration: 1,
            bytesIn: 100,
            bytesOut: 200
        };
        const commandResult: CommandResultSpec<string> = {
            run: runSpec,
            output,
            metrics
        };

        expect(commandResult.run).toBe(runSpec);
        expect(commandResult.output).toBe(output);
        expect(commandResult.metrics).toBe(metrics);
    });
});



describe('CommandSpec w/out mocks', () => {
    const command = new CommandSpec({
        name: 'testCommand',
        description: 'This is a test command',
        args: [],
        params: [],
        taskRunner: defaultTaskRunner
    });

    it('should return the name properly', () => {
        expect(command.name).toBe('testCommand');
    });

    it('should return the description properly', () => {
        expect(command.description).toBe('This is a test command');
    });

    it('should return the args properly', () => {
        expect(command.args).toEqual([]);
    });

    it('should return the params properly', () => {
        expect(command.params).toEqual([]);
    });

    it('should return the taskRunner properly', () => {
        expect(command.taskRunner).toBe(defaultTaskRunner);
    });
});


describe('CommandSpec w/ mocks', () => {
    const defaultTaskRunner = async (instance: any, args: any) => {
        return await instance(args);
    };

    const args: ArgumentSpec<any>[] = [];
    const params: ParameterSpec<any>[] = [];
    const mockTaskRunner = jest.fn().mockResolvedValue('result');
    const command = new CommandSpec({
        name: 'testCommand',
        description: 'This is a test command',
        args,
        params,
        taskRunner: mockTaskRunner
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a CommandSpec object properly', () => {
        expect(command.name).toBe('testCommand');
        expect(command.description).toBe('This is a test command');
        expect(command.args).toBe(args);
        expect(command.params).toBe(params);
        expect(command.taskRunner).toBe(mockTaskRunner);
    });

    it('should run the taskRunner properly', async () => {
        const result = await command.taskRunner(undefined, {});

        expect(mockTaskRunner).toHaveBeenCalled();
        expect(result).toBe('result');
    });
});