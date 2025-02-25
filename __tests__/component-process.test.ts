import {
    Process,
    ProcessEntry,
    ProcessParameters,
    ProcessType,
    ProcessTypes
} from '../src/component/processes'

import {
    ProcessStatuses
} from '../src/template/spec/v0/process'
import { ArgumentEntry } from '../src/component/properties'

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
    })

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
            // jobId: 'test',
            commandName: 'test',
            args: [
                {
                    name: 'test',
                    value: 'test'
                }
            ]
        })

      // console.log(`result`, JSON.stringify(result, null, 2));

        expect(result).toEqual({
            run: {
            commandName: 'test',
            // jobId: 'test',
            instance: expect.any(Function),
            processId: 'test',
            args: {
                test: 'test',
                // retry: true,
                // retryCount: 0,
                // retryDelay: 0,
                // timeout: 0,
                // timeoutAction: 'fail',
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
            // jobId: 'test',
            commandName: 'test',
            args: [
                {
                    name: 'test',
                    value: 'test'
                }
            ]
        })

        // console.log(`result`, JSON.stringify(result, null, 2));

        expect(result).toEqual({
            run: {
                commandName: 'test',
                // jobId: 'test',
                instance: expect.any(Function),
                processId: 'test',
                args: {
                    test: 'test',
                    // retry: true,
                    // retryCount: 1,
                    // retryDelay: 0,
                    // timeout: 0,
                    // timeoutAction: 'fail',
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
            // jobId: 'test',
            commandName: 'test',
            args: [
                {
                    name: 'test',
                    value: 'test'
                }
            ]
        })

        // console.log(`result`, JSON.stringify(result?, null, 2));


        expect(result).toEqual({
            run: {
                commandName: 'test',
                // jobId: 'test',
                instance: expect.any(Function),
                processId: 'test',
                args: {
                    test: 'test',
                    // retry: true,
                    // retryCount: 1,
                    // retryDelay: 0,
                    // timeout: 0,
                    // timeoutAction: 'fail'
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
            // jobId: 'test',
            commandName: 'test',
            args: [
                {
                    name: 'test',
                    value: 'test'
                }
            ]
        })

        // console.log(`result`, JSON.stringify(result, null, 2));

        expect(result).toEqual({
            run: {
                commandName: 'test',
                // jobId: 'test',
                instance: expect.any(Function),
                processId: 'test',
                args: {
                    test: 'test',
                    // retry: true,
                    // retryCount: 1,
                    // retryDelay: 0,
                    // timeout: 0,
                    // timeoutAction: 'fail'
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

    it('should create a process and run it and timeout', async () => {
        let result;
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
                value: 1000
            }, {
                name: 'timeoutAction',
                value: 'fail'
            }],
            instance: async ({args}:{ args: Record<string, any> }) => {
                await new Promise((resolve) => setTimeout(resolve, 1001));
                return args
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
                run: async ({instance, args}: {instance?: any, args?: Record<string, any>} = {}) => {
                    const timeout = await new Promise((resolve) => setTimeout(resolve, 1001));
                    return instance(args);
                }
            }],
            metadata: {}
        })

        try {
            result = await process.run({
                // jobId: 'test',
                commandName: 'test',
                args: [
                    {
                        name: 'test',
                        value: 'test'
                    }
                ]
            })
        }
        catch (error) {
          // console.log(`error`, error);
            expect(error).toEqual(new Error('Process test timed out'));
        }

      // console.log(`result`, JSON.stringify(result?, null, 2));

        expect(result).toEqual({
            run: {
                commandName: 'test',
                // jobId: 'test',
                processId: 'test',
                instance: expect.any(Function),
                args: {
                    test: 'test',
                    // retry: true,
                    // retryCount: 1,
                    // retryDelay: 0,
                    // timeout: 1000,
                    // timeoutAction: 'fail'
                }
            
            },
            output: new Error('Process test timed out'),
            metrics: {
                start: expect.any(Number),
                end: expect.any(Number),
                duration: expect.any(Number),
                bytesIn: 15,
                bytesOut: 24
            }
        });

        expect(process.status).toBe(ProcessStatuses.Error);
    });

    it('should create a process that does not require an initialization', async () => {
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
            }, {
                name: 'initialize',
                value: false
            }, {
                name: 'initializeFunction',
                value: null
            }],
            instance: console.log,
            commands: [{
                id: 'test',
                description: 'test',
                properties: {
                    args: [],
                    params: [{
                        name: 'message',
                        description: 'message to write using console.log',
                        type: 'string',
                        required: true,
                        defaultValue: 'test',
                        optionalValues: []
                    }]
                },
                name: 'test',
                run: ({instance, args}) => {
                    return instance(args?.message)
                }
            }],
            metadata: {}
        })

      // console.log(`process`, JSON.stringify(process, null, 2));

        await process.initialize();

        const result = await process.run({
            // jobId: 'test',
            commandName: 'test',
            args: [
                {
                    name: 'message',
                    value: 'test'
                }
            ]
        })

      // console.log(`result`, JSON.stringify(result, null, 2));

        expect(result).toEqual({
            run: {
                commandName: 'test',
                // jobId: 'test',
                instance: console.log,   
                processId: 'test',
                args: {
                    // initialize: false,
                    // initializeFunction: null,
                    message: 'test',
                    // retry: true,
                    // retryCount: 1,
                    // retryDelay: 0,
                    // timeout: 0,
                    // timeoutAction: 'fail'
                }
            },
            output: undefined,
            metrics: {
                start: expect.any(Number),
                end: expect.any(Number),
                duration: expect.any(Number),
                bytesIn: 18,
                bytesOut: 0
            }
        });   
    });

    it('should create a process that requires an initialization', async () => {
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
            }, {
                name: 'initialize',
                value: true
            }, {
                name: 'initializeFunction',
                value: () => console.log
            }],
            instance: undefined,
            commands: [{
                id: 'test',
                description: 'test',
                properties: {
                    args: [],
                    params: [{
                        name: 'message',
                        description: 'message to write using console.log',
                        type: 'string',
                        required: true,
                        defaultValue: 'test',
                        optionalValues: []
                    }]
                },
                name: 'test',
                run: ({instance, args}) => {
                    return instance(args?.message)
                }
            }],
            metadata: {}
        })

      // console.log(`process`, JSON.stringify(process, null, 2));

        await process.initialize();

        const result = await process.run({
            // jobId: 'test',
            commandName: 'test',
            args: [
                {
                    name: 'message',
                    value: 'test'
                }
            ]
        })

      // console.log(`result`, JSON.stringify(result, null, 2));

        expect(result).toEqual({
            run: {
                commandName: 'test',
                // jobId: 'test',
                instance: console.log,   
                processId: 'test',
                args: {
                    // initialize: true,
                    // initializeFunction: expect.any(Function),
                    message: 'test',
                    // retry: true,
                    // retryCount: 1,
                    // retryDelay: 0,
                    // timeout: 0,
                    // timeoutAction: 'fail'
                }
            },
            output: undefined,
            metrics: {
                start: expect.any(Number),
                end: expect.any(Number),
                duration: expect.any(Number),
                bytesIn: 18,
                bytesOut: 0
            }
        });   
    });

    it('should create a process that requires an initialization and fail', async () => {
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
            }, {
                name: 'initialize',
                value: true
            }, {
                name: 'initializeFunction',
                value: () => { throw new Error('test') }
            }],
            instance: undefined,
            commands: [{
                id: 'test',
                description: 'test',
                properties: {
                    args: [],
                    params: [{
                        name: 'message',
                        description: 'message to write using console.log',
                        type: 'string',
                        required: true,
                        defaultValue: 'test',
                        optionalValues: []
                    }]
                },
                name: 'test',
                run: ({instance, args}) => {
                    return instance(args?.message)
                }
            }],
            metadata: {}
        })

      // console.log(`process`, JSON.stringify(process, null, 2));

        try {
            await process.initialize();
        }
        catch (error) {
          // console.log(`error`, error);
            expect(error).toEqual(new Error('Failed to create instance: Error: test'));
        }

        const result = await process.run({
            // jobId: 'test',
            commandName: 'test',
            args: [
                {
                    name: 'message',
                    value: 'test'
                }
            ]
        })

      // console.log(`result`, JSON.stringify(result, null, 2));

        // expect(result).toEqual(new TypeError('instance is not a function'));

        expect(result).toEqual({
            run: {
                commandName: 'test',
                // jobId: 'test',
                instance: undefined,   
                processId: 'test',
                args: {
                    // initialize: true,
                    // initializeFunction: expect.any(Function),
                    message: 'test',
                    // retry: true,
                    // retryCount: 1,
                    // retryDelay: 0,
                    // timeout: 0,
                    // timeoutAction: 'fail'
                }
            },
            // output: new Map<number, any>([[1, new TypeError('instance is not a function')]]),
            output: new TypeError('instance is not a function'),
            metrics: {
                start: expect.any(Number),
                end: expect.any(Number),
                duration: expect.any(Number),
                bytesIn: 18,
                bytesOut: 28
            }

        });
    });
});