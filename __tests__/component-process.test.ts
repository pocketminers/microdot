import {
    Process,
    ProcessEntry,
    ProcessParameters,
    ProcessType,
    ProcessTypes
} from '../src/component/processes'

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
})