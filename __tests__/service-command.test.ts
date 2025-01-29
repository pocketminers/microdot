import { Command, TaskRunner, CommandResult } from '../src/service/command';
import { ArgumentEntry } from '../src/artifacts/argument';

describe('Command using mocks', () => {
    let command: Command<any, any>;
    let mockTaskRunner: TaskRunner<any, any>;

    beforeEach(() => {
        mockTaskRunner = jest.fn().mockResolvedValue('result');
        command = new Command({
            id: 'test',
            name: 'Test Command',
            description: 'A command for testing',
            taskRunner: mockTaskRunner
        });
    });

    it('should initialize with default values', () => {
        expect(command.name).toBe('Test Command');
        expect(command.description).toBe('A command for testing');
        expect(command.taskRunner).toBe(mockTaskRunner);
    });

    it('should execute the task runner', async () => {
        const result = await command.execute({ instance: undefined, args: [] });
        expect(result).toBe('result');
        expect(mockTaskRunner).toHaveBeenCalled();
    });

    it('should run the command and return CommandResult', async () => {
        const result: CommandResult<any, any> = await command.run({ instance: undefined, args: [] });
        expect(result.command).toBe('Test Command');
        expect(result.output).toBe('result');
        expect(result.metrics.startTime).toBeLessThanOrEqual(result.metrics.endTime);
        expect(result.metrics.duration).toBe(result.metrics.endTime - result.metrics.startTime);
    });

    it('should handle errors during execution', async () => {
        mockTaskRunner = jest.fn().mockRejectedValue(new Error('execution error'));
        command = new Command({
            id: 'test',
            name: 'Test Command',
            description: 'A command for testing',
            taskRunner: mockTaskRunner
        });

        const result = await command.run({ instance: undefined, args: [] });
        expect(result.command).toBe('Test Command');
        expect(result.output).toBeInstanceOf(Error);
        expect((result.output as Error).message).toBe('execution error');
    });

    it('should calculate bytesReceived and bytesReturned correctly', async () => {
        const result = await command.run({ instance: undefined, args: [] });
        expect(result.metrics.bytesReceived).toEqual(0);
        expect(result.metrics.bytesReturned).toBe('result'.length);
    });

    it('should handle incorrect args by throwing an error', async () => {
        const args: ArgumentEntry<any>[] = [{ name: 'Test Command', value: 'value' }];
        const result = await command.run({ instance: undefined, args });
        expect(result.output).toBeInstanceOf(Error);
        expect((result.output as Error).message).toBe('Invalid argument name: Test Command');
    });

    it('should handle undefined result', async () => {
        mockTaskRunner = jest.fn().mockResolvedValue(undefined);
        command = new Command({
            id: 'test',
            name: 'Test Command',
            description: 'A command for testing',
            taskRunner: mockTaskRunner
        });

        const result = await command.run({ instance: undefined, args: [] });
        expect(result.output).toBe(null);
        expect(result.metrics.bytesReturned).toBe(0);
    });

    it('should handle null result', async () => {
        mockTaskRunner = jest.fn().mockResolvedValue(null);
        command = new Command({
            id: 'test',
            name: 'Test Command',
            description: 'A command for testing',
            taskRunner: mockTaskRunner
        });

        const result = await command.run({ instance: undefined, args: [] });
        expect(result.output).toBe(null);
        expect(result.metrics.bytesReturned).toBe(0);
    });

    it('should handle undefined args', async () => {
        mockTaskRunner = jest.fn().mockResolvedValue({ data: 'result' });
        command = new Command({
            id: 'test',
            name: 'Test Command',
            description: 'A command for testing',
            taskRunner: mockTaskRunner
        });

        const result = await command.run({ instance: undefined });
        expect(result.metrics.bytesReceived).toBe(0);
    });

    it('should handle empty args', async () => {
        mockTaskRunner = jest.fn().mockResolvedValue({ data: 'result' });
        command = new Command({
            id: 'test',
            name: 'Test Command',
            description: 'A command for testing',
            taskRunner: mockTaskRunner
        });

        const result = await command.run({ instance: undefined, args: [] });
        expect(result.metrics.bytesReceived).toBe(0);
    });

    it('should handle empty args array', async () => {
        mockTaskRunner = jest.fn().mockResolvedValue({ data: 'result' });
        command = new Command({
            id: 'test',
            name: 'Test Command',
            description: 'A command for testing',
            taskRunner: mockTaskRunner
        });

        try {
            // @ts-expect-error - testing invalid argument
            await command.run({ instance: undefined, args: [{}] });
        }
        catch (error: any) {
            expect(error.message).toBe('Type "{}}" is missing the following properties from type "ArgumentEntry<any>": name, value');
        }
    });
});


describe('Command using real TaskRunner', () => {
    let command: Command<any, any>;

    beforeEach(() => {
        const taskRunner: TaskRunner<any, any> = async (instance, args) => {
            return {
                data: 'result'
            };
        };

        command = new Command({
            id: 'test',
            name: 'Test Command',
            description: 'A command for testing',
            taskRunner
        });
    });

    it('should execute the task runner', async () => {
        const result = await command.execute({ instance: undefined, args: [] });
        expect(result).toEqual({ data: 'result' });
    });

    it('should run the command and return CommandResult', async () => {
        const result: CommandResult<any, any> = await command.run({ instance: undefined, args: [] });
        expect(result.command).toBe('Test Command');
        expect(result.output).toEqual({ data: 'result' });
        expect(result.metrics.startTime).toBeLessThanOrEqual(result.metrics.endTime);
        expect(result.metrics.duration).toBe(result.metrics.endTime - result.metrics.startTime);
    });

    it('should handle errors during execution', async () => {
        const taskRunner: TaskRunner<any, any> = async (instance, args) => {
            throw new Error('execution error');
        };

        command = new Command({
            id: 'test',
            name: 'Test Command',
            description: 'A command for testing',
            taskRunner
        });

        const result = await command.run({ instance: undefined, args: [] });
        expect(result.command).toBe('Test Command');
        expect(result.output).toBeInstanceOf(Error);
        expect((result.output as Error).message).toBe('execution error');
    });
});
