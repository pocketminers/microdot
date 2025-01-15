import { Command, TaskRunner } from '../src/service/command';
import { Configuration } from '../src/artifacts/configuration';
import { Arguments } from '../src/artifacts/arguments';


describe('Command', () => {
    let command: Command<any, any>;
    let config: Configuration;
    let mockTaskRunner: TaskRunner<any, any>;


    beforeEach(() => {
        mockTaskRunner = jest.fn().mockResolvedValue('result');
        config = new Configuration({
            name: 'test',
            properties: [],
            parameters: [],
            args: new Arguments(),
            useArgs: true
        });
        command = new Command({
            id: 'test',
            name: 'Test Command',
            description: 'A command for testing',
            configuration: config,
            taskRunner: mockTaskRunner
        });
    });

    it('should initialize with default values', () => {
        expect(command.name).toBe('Test Command');
        expect(command.description).toBe('A command for testing');
        expect(command.config).toBe(config);
        expect(command.taskRunner).toBe(mockTaskRunner);
    });

    it('should execute the task runner', async () => {
        const mockTaskRunner: TaskRunner<any, any> = jest.fn().mockResolvedValue('result');
        command = new Command({
            id: 'test',
            name: 'Test Command',
            description: 'A command for testing',
            taskRunner: mockTaskRunner,
            configuration: config
        });

        const result = await command.execute({ instance: undefined, args: [] });
        expect(result).toBe('result');
        expect(mockTaskRunner).toHaveBeenCalled();
    });

    it('should run the command and return CommandResult', async () => {
        const mockTaskRunner: TaskRunner<any, any> = jest.fn().mockResolvedValue('result');
        command = new Command({
            id: 'test',
            name: 'Test Command',
            description: 'A command for testing',
            taskRunner: mockTaskRunner,
            configuration: config
        });

        const result = await command.run({ instance: undefined, args: [] });
        expect(result.command).toBe('Test Command');
        expect(result.output).toBe('result');
        expect(result.metrics.startTime).toBeLessThanOrEqual(result.metrics.endTime);
        expect(result.metrics.duration).toBe(result.metrics.endTime - result.metrics.startTime);
    });

    it('should handle errors during execution', async () => {
        const mockTaskRunner: TaskRunner<any, any> = jest.fn().mockRejectedValue(new Error('execution error'));
        command = new Command({
            id: 'test',
            name: 'Test Command',
            description: 'A command for testing',
            taskRunner: mockTaskRunner,
            configuration: config
        });

        const result = await command.run({ instance: undefined, args: [] });
        expect(result.command).toBe('Test Command');
        expect(result.output).toBeInstanceOf(Error);
        expect(result.output.message).toBe('execution error');
    });

    it('should calculate bytesReceived and bytesReturned correctly', async () => {
        const mockTaskRunner: TaskRunner<any, any> = jest.fn().mockResolvedValue('result');
        command = new Command({
            id: 'test',
            name: 'Test Command',
            description: 'A command for testing',
            taskRunner: mockTaskRunner,
            configuration: config
        });

        const result = await command.run({ instance: undefined, args: [] });

        expect(result.metrics.bytesReceived).toEqual(0);
        expect(result.metrics.bytesReturned).toBe(result.output.length);
    });

    it('should handle incorrect args by throwing an error', async () => {
        const mockTaskRunner: TaskRunner<any, any> = jest.fn().mockResolvedValue('result');
        command = new Command({
            id: 'test',
            name: 'Test Command',
            description: 'A command for testing',
            taskRunner: mockTaskRunner,
            configuration: config
        });

        const args = [{ name: 'Test Command', value: 'value' }];
        const result = await command.run({ instance: undefined, args });
        expect(result.output).toBeInstanceOf(Error);
        expect(result.output.message).toBe('Invalid arguments: Test Command');
    })

    it('should handle undefined result', async () => {
        const mockTaskRunner: TaskRunner<any, any> = jest.fn().mockResolvedValue(undefined);
        command = new Command({
            id: 'test',
            name: 'Test Command',
            description: 'A command for testing',
            taskRunner: mockTaskRunner,
            configuration: config
        });

        const result = await command.run({ instance: undefined, args: [] });
        expect(result.output).toBe(null);
        expect(result.metrics.bytesReturned).toBe(0);
    });

    it('should handle null result', async () => {
        const mockTaskRunner: TaskRunner<any, any> = jest.fn().mockResolvedValue(null);
        command = new Command({
            id: 'test',
            name: 'Test Command',
            description: 'A command for testing',
            taskRunner: mockTaskRunner,
            configuration: config
        });

        const result = await command.run({ instance: undefined, args: [] });
        expect(result.output).toBe(null);
        expect(result.metrics.bytesReturned).toBe(0);
    });

    it('should handle undefined args', async () => {
        const mockTaskRunner: TaskRunner<any, any> = jest.fn().mockResolvedValue({ data: 'result' });
        command = new Command({
            id: 'test',
            name: 'Test Command',
            description: 'A command for testing',
            taskRunner: mockTaskRunner,
            configuration: config
        });

        const result = await command.run({ instance: undefined });
        expect(result.metrics.bytesReceived).toBe(0);
    });

    it('should initialize with custom configuration', () => {
        const args = new Arguments([
            { name: 'test', value: 'value' }
        ]);
        const mockTaskRunner: TaskRunner<any, any> = jest.fn().mockResolvedValue('result');
        config = new Configuration({
            name: 'test',
            properties: [],
            parameters: [],
            args,
            useArgs: true
        });
        command = new Command({
            id: 'test',
            name: 'Test Command',
            description: 'A command for testing',
            configuration: config,
            taskRunner: mockTaskRunner
        });

        expect(command.config).toBe(config);
    });

    it('should set arguments', () => {
        const args = new Arguments([
            { "test": "value" }
        ]);
        command.setArguments(args, true);
        expect(command.getArguments()).toEqual(args);
    });

    it('should add a command named "name" to the config', () => {
        const args = new Arguments([
            { "name": "value" },
            { "description": "description" },
            { "properties": [] },
            { "parameters": [] },
            { "args": [] },
            { "useArgs": true }
        ]);
        command.setArguments(args, true);
        console.log(JSON.stringify(command));
        expect(command.getArguments()).toEqual(args);
    });
});