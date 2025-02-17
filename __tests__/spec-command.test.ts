import { defaultTaskRunner } from '../src/component/runner';
import { CommandSpec, CommandResultSpec } from '../src/template/spec/v0/command';
import { ArgumentSpec, ParameterSpec } from '../src/template/spec/v0/config';

describe('CommandSpec - taskRunner functionality', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a CommandSpec object properly', () => {
        const args: ArgumentSpec<any>[] = [];
        const params: ParameterSpec<any>[] = [];
        const command: CommandSpec = {
            id: 'testCommand',
            name: 'testCommand',
            description: 'This is a test command',
            properties: {
                args,
                params
            },
            run: defaultTaskRunner
        };

        expect(command.name).toBe('testCommand');
        expect(command.description).toBe('This is a test command');
        expect(command.properties.args).toBe(args);
        expect(command.properties.params).toBe(params);
        expect(command.run).toBe(defaultTaskRunner);
    });

    it('should run the taskRunner properly', async () => {
        const args: ArgumentSpec<any>[] = [];
        const params: ParameterSpec<any>[] = [];
        const mockTaskRunner = jest.fn().mockResolvedValue('result');
        const command: CommandSpec ={
            id: 'testCommand',
            name: 'testCommand',
            description: 'This is a test command',
            properties: {
                args,
                params
            },
            run: mockTaskRunner
        };

        const result = await command.run({});

        expect(mockTaskRunner).toHaveBeenCalled();
        expect(result).toBe('result');
    });
});

describe('CommandResultSpec', () => {
    it('should create a CommandResultSpec object properly', () => {
        const runSpec = {
            name: 'testCommand',
            jobId: '123',
            processId: '456',
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
    const command: CommandSpec = {
        id: 'testCommand',
        name: 'testCommand',
        description: 'This is a test command',
        properties: {
            args: [],
            params: []
        },
        run: defaultTaskRunner
    };

    it('should return the name properly', () => {
        expect(command.name).toBe('testCommand');
    });

    it('should return the description properly', () => {
        expect(command.description).toBe('This is a test command');
    });

    it('should return the args properly', () => {
        expect(command.properties.args).toEqual([]);
    });

    it('should return the params properly', () => {
        expect(command.properties.params).toEqual([]);
    });

    it('should return the taskRunner properly', () => {
        expect(command.run).toBe(defaultTaskRunner);
    });
});


describe('CommandSpec w/ mocks', () => {

    const args: ArgumentSpec<any>[] = [];
    const params: ParameterSpec<any>[] = [];
    const mockTaskRunner = jest.fn().mockResolvedValue('result');
    const command: CommandSpec = {
        id: 'testCommand',
        name: 'testCommand',
        description: 'This is a test command',
        properties: {
            args,
            params
        },
        run: mockTaskRunner,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a CommandSpec object properly', () => {
        expect(command.name).toBe('testCommand');
        expect(command.description).toBe('This is a test command');
        expect(command.properties.args).toBe(args);
        expect(command.properties.params).toBe(params);
        expect(command.run).toBe(mockTaskRunner);
    });

    it('should run the taskRunner properly', async () => {
        const result = await command.run({});

        expect(mockTaskRunner).toHaveBeenCalled();
        expect(result).toBe('result');
    });
});