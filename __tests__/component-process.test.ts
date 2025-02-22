import {
    Process,
    ProcessEntry,
    ProcessParameters,
    ProcessType,
    ProcessTypes
} from '../src/component/processes'

import { defaultTaskRunner } from '../src/service/runner'

describe('Process', () => {
    it('should create a new Process', () => {
        const process = new Process<ProcessTypes.AUTH>({
            id: 'test',
            type: ProcessTypes.AUTH,
            name: 'test',
            description: 'test',
            args: [],
            instance: () => {},
            commands: [],
            metadata: {}
        })
        expect(process).toBeInstanceOf(Process)
    })

    it('should create a new Process with default name', () => {
        const process = new Process<ProcessTypes.AUTH>({
            id: 'test',
            type: ProcessTypes.AUTH,
            args: [],
            instance: () => {},
            commands: [],
            metadata: {}
        })
        expect(process).toBeInstanceOf(Process)
    })

    it('should create a new Process with default description', () => {
        const process = new Process<ProcessTypes.AUTH>({
            id: 'test',
            type: ProcessTypes.AUTH,
            name: 'test',
            args: [],
            instance: () => {},
            commands: [],
            metadata: {}
        })
        expect(process).toBeInstanceOf(Process)
    })

    it('should create a new Process with default args', () => {
        const process = new Process<ProcessTypes.AUTH>({
            id: 'test',
            type: ProcessTypes.AUTH,
            name: 'test',
            instance: () => {},
            commands: [],
            metadata: {}
        })
        expect(process).toBeInstanceOf(Process)
    })

    it('should create a new Process with default instance', () => {
        const process = new Process<ProcessTypes.AUTH>({
            id: 'test',
            type: ProcessTypes.AUTH,
            name: 'test',
            args: [],
            commands: [],
            metadata: {}
        })
        expect(process).toBeInstanceOf(Process)
    })

    it('should create a new Process with default commands', () => {
        const process = new Process<ProcessTypes.AUTH>({
            id: 'test',
            type: ProcessTypes.AUTH,
            name: 'test',
            args: [],
            instance: () => {},
            metadata: {}
        })
        expect(process).toBeInstanceOf(Process)
    })

    it('should create a new Process with default metadata', () => {
        const process = new Process<ProcessTypes.AUTH>({
            id: 'test',
            type: ProcessTypes.AUTH,
            name: 'test',
            args: [],
            instance: () => {},
            commands: []
        })
        expect(process).toBeInstanceOf(Process)
    })

    it('should create a new Process with default status', () => {
        const process = new Process<ProcessTypes.AUTH>({
            id: 'test',
            type: ProcessTypes.AUTH,
            name: 'test',
            args: [],
            instance: () => {},
            commands: [],
            metadata: {}
        })
        expect(process.status).toBe('New')
        expect(process.commands).toEqual([])
    }),

    it('should create a process and run it', async () => {
        const process = new Process<ProcessTypes.AUTH>({
            id: 'test',
            type: ProcessTypes.AUTH,
            name: 'test',
            args: [{
                name: 'retry',
                value: true
            }, {
                name: 'retryCount',
                value: 0
            }, {
                name: 'retryDelay',
                value: 0
            }, {
                name: 'timeout',
                value: 0
            }, {
                name: 'timeoutAction',
                value: 'fail'
            }],
            instance: ({args}:{ args: Record<string, any> }) => {
                return args.test
            },
            commands: [{
                id: 'test',
                description: 'test',
                properties: {
                    args: [],
                    params: [{
                        name: 'test',
                        description: 'test',
                        type: 'string',
                        required: true,
                        defaultValue: 'test',
                        optionalValues: []
                    }]
                },
                name: 'test',
                run: defaultTaskRunner
            }],
            metadata: {}
        })

        const result = await process.run({
            jobId: 'test',
            commandName: 'test',
            args: [
                {
                    name: 'test',
                    value: 'test'
                }
            ]
        })

        console.log(`result`, JSON.stringify(result, null, 2));

        expect(result).toEqual({
            run: {
                commandName: 'test',
                jobId: 'test',
                instance: expect.any(Function),
                processId: 'test',
                args: {
                    test: 'test'
                }
            },
            output: 'test',
            metrics: {
                start: expect.any(Number),
                end: expect.any(Number),
                duration: expect.any(Number),
                bytesIn: 15,
                bytesOut: 4
            }
        });   
    })

    it('should create a process and run it with retry', async () => {
        const process = new Process<ProcessTypes.AUTH>({
            id: 'test',
            type: ProcessTypes.AUTH,
            name: 'test',
            args: [{
                name: 'retry',
                value: true
            }, {
                name: 'retryCount',
                value: 1
            }, {
                name: 'retryDelay',
                value: 0
            }, {
                name: 'timeout',
                value: 0
            }, {
                name: 'timeoutAction',
                value: 'fail'
            }],
            instance: ({args}:{ args: Record<string, any> }) => {
                return args.test
            },
            commands: [{
                id: 'test',
                description: 'test',
                properties: {
                    args: [],
                    params: [{
                        name: 'test',
                        description: 'test',
                        type: 'string',
                        required: true,
                        defaultValue: 'test',
                        optionalValues: []
                    }]
                },
                name: 'test',
                run: defaultTaskRunner
            }],
            metadata: {}
        })

        const result = await process.run({
            jobId: 'test',
            commandName: 'test',
            args: [
                {
                    name: 'test',
                    value: 'test'
                }
            ]
        })

        console.log(`result`, JSON.stringify(result, null, 2));

        expect(result).toEqual({
            run: {
                commandName: 'test',
                jobId: 'test',
                instance: expect.any(Function),
                processId: 'test',
                args: {
                    test: 'test'
                }
            },
            output: 'test',
            metrics: {
                start: expect.any(Number),
                end: expect.any(Number),
                duration: expect.any(Number),
                bytesIn: 15,
                bytesOut: 4
            }
        });   
    });

    it('should create a process and run it with retry and fail', async () => {
        const process = new Process<ProcessTypes.AUTH>({
            id: 'test',
            type: ProcessTypes.AUTH,
            name: 'test',
            args: [{
                name: 'retry',
                value: true
            }, {
                name: 'retryCount',
                value: 1
            }, {
                name: 'retryDelay',
                value: 0
            }, {
                name: 'timeout',
                value: 0
            }, {
                name: 'timeoutAction',
                value: 'fail'
            }],
            instance: ({args}:{ args: Record<string, any> }) => {
                return args.test
            },
            commands: [{
                id: 'test',
                description: 'test',
                properties: {
                    args: [],
                    params: [{
                        name: 'test',
                        description: 'test',
                        type: 'string',
                        required: true,
                        defaultValue: 'test',
                        optionalValues: []
                    }]
                },
                name: 'test',
                run: async ({instance, args}) => {
                    throw new Error('test')
                }
            }],
            metadata: {}
        })

        const result = await process.run({
            jobId: 'test',
            commandName: 'test',
            args: [
                {
                    name: 'test',
                    value: 'test'
                }
            ]
        })

        console.log(`result`, JSON.stringify(result, null, 2));

        expect(result).toEqual({
            run: {
                commandName: 'test',
                jobId: 'test',
                instance: expect.any(Function),
                processId: 'test',
                args: {
                    test: 'test'
                }
            },
            output: new Error("test"),
            metrics: {
                start: expect.any(Number),
                end: expect.any(Number),
                duration: expect.any(Number),
                bytesIn: 15,
                bytesOut: 6
            }
        });   
    });

    it('should create a process and run it with retry and fail', async () => {
        const process = new Process<ProcessTypes.AUTH>({
            id: 'test',
            type: ProcessTypes.AUTH,
            name: 'test',
            args: [{
                name: 'retry',
                value: true
            }, {
                name: 'retryCount',
                value: 1
            }, {
                name: 'retryDelay',
                value: 0
            }, {
                name: 'timeout',
                value: 0
            }, {
                name: 'timeoutAction',
                value: 'fail'
            }],
            instance: ({args}:{ args: Record<string, any> }) => {
                return args.test
            },
            commands: [{
                id: 'test',
                description: 'test',
                properties: {
                    args: [],
                    params: [{
                        name: 'test',
                        description: 'test',
                        type: 'string',
                        required: true,
                        defaultValue: 'test',
                        optionalValues: []
                    }]
                },
                name: 'test',
                run: async ({instance, args}) => {
                    throw new Error('test')
                }
            }],
            metadata: {}
        })

        const result = await process.run({
            jobId: 'test',
            commandName: 'test',
            args: [
                {
                    name: 'test',
                    value: 'test'
                }
            ]
        })

        console.log(`result`, JSON.stringify(result, null, 2));

        expect(result).toEqual({
            run: {
                commandName: 'test',
                jobId: 'test',
                instance: expect.any(Function),
                processId: 'test',
                args: {
                    test: 'test'
                }
            },
            output: new Error("test"),
            metrics: {
                start: expect.any(Number),
                end: expect.any(Number),
                duration: expect.any(Number),
                bytesIn: 15,
                bytesOut: 6
            }
        });   
    });
})