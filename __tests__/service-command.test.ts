import { Command, CommandResult, ExecutionMetrics, TaskRunner, defaultTaskRunner } from '../src/service/command';
import { Configuration } from '../src/artifacts/configuration';
import { Arguments } from '../src/artifacts/arguments';

describe('Command', () => {
    let command: Command<any, any>;
    let config: Configuration;

    beforeEach(() => {
        config = new Configuration([], [], []);
        command = new Command({
            name: 'Test Command',
            description: 'A command for testing',
            config
        });
    });

    test('should initialize with default values', () => {
        expect(command.name).toBe('Test Command');
        expect(command.description).toBe('A command for testing');
        expect(command.config).toBe(config);
        expect(command.taskRunner).toBe(defaultTaskRunner);
    });

    test('should execute the task runner', async () => {
        const mockTaskRunner: TaskRunner<any, any> = jest.fn().mockResolvedValue('result');
        command = new Command({
            name: 'Test Command',
            description: 'A command for testing',
            taskRunner: mockTaskRunner,
            config
        });

        const result = await command.execute({ instance: undefined, args: [] });
        expect(result).toBe('result');
        expect(mockTaskRunner).toHaveBeenCalled();
    });

    test('should run the command and return CommandResult', async () => {
        const mockTaskRunner: TaskRunner<any, any> = jest.fn().mockResolvedValue('result');
        command = new Command({
            name: 'Test Command',
            description: 'A command for testing',
            taskRunner: mockTaskRunner,
            config
        });

        const result = await command.run({ instance: undefined, args: [] });
        expect(result.command).toBe('Test Command');
        expect(result.output).toBe('result');
        expect(result.metrics.startTime).toBeLessThanOrEqual(result.metrics.endTime);
        expect(result.metrics.duration).toBe(result.metrics.endTime - result.metrics.startTime);
    });

    test('should handle errors during execution', async () => {
        const mockTaskRunner: TaskRunner<any, any> = jest.fn().mockRejectedValue(new Error('execution error'));
        command = new Command({
            name: 'Test Command',
            description: 'A command for testing',
            taskRunner: mockTaskRunner,
            config
        });

        const result = await command.run({ instance: undefined, args: [] });
        expect(result.command).toBe('Test Command');
        expect(result.output).toBeInstanceOf(Error);
        expect(result.output.message).toBe('execution error');
    });

    test('should calculate bytesReceived and bytesReturned correctly', async () => {
        const mockTaskRunner: TaskRunner<any, any> = jest.fn().mockResolvedValue('result');
        command = new Command({
            name: 'Test Command',
            description: 'A command for testing',
            taskRunner: mockTaskRunner,
            config
        });

        const result = await command.run({ instance: undefined, args: [] });

        expect(result.metrics.bytesReceived).toEqual(0);
        expect(result.metrics.bytesReturned).toBe(result.output.length);
    });

    test('should handle incorrect args by throwing an error', async () => {
        const mockTaskRunner: TaskRunner<any, any> = jest.fn().mockResolvedValue('result');
        command = new Command({
            name: 'Test Command',
            description: 'A command for testing',
            taskRunner: mockTaskRunner,
            config
        });

        const args = [{ name: 'Test Command', value: 'value' }];
        const result = await command.run({ instance: undefined, args });
        expect(result.output).toBeInstanceOf(Error);
        expect(result.output.message).toBe('Invalid arguments: Test Command');
    })

    test('should handle undefined result', async () => {
        const mockTaskRunner: TaskRunner<any, any> = jest.fn().mockResolvedValue(undefined);
        command = new Command({
            name: 'Test Command',
            description: 'A command for testing',
            taskRunner: mockTaskRunner,
            config
        });

        const result = await command.run({ instance: undefined, args: [] });
        expect(result.output).toBe(null);
        expect(result.metrics.bytesReturned).toBe(0);
    });

    test('should handle null result', async () => {
        const mockTaskRunner: TaskRunner<any, any> = jest.fn().mockResolvedValue(null);
        command = new Command({
            name: 'Test Command',
            description: 'A command for testing',
            taskRunner: mockTaskRunner,
            config
        });

        const result = await command.run({ instance: undefined, args: [] });
        expect(result.output).toBe(null);
        expect(result.metrics.bytesReturned).toBe(0);
    });

    test('should handle undefined args', async () => {
        const mockTaskRunner: TaskRunner<any, any> = jest.fn().mockResolvedValue({ data: 'result' });
        command = new Command({
            name: 'Test Command',
            description: 'A command for testing',
            taskRunner: mockTaskRunner,
            config
        });

        const result = await command.run({ instance: undefined });
        expect(result.metrics.bytesReceived).toBe(0);
    });

    test('should initialize with custom configuration', () => {
        const args = new Arguments([
            { name: 'test', value: 'value' }
        ]);
        config = new Configuration([], [], args);
        command = new Command({
            name: 'Test Command',
            description: 'A command for testing',
            config
        });

        expect(command.config).toBe(config);
    });
});