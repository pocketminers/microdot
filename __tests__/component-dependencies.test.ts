import { DependencyManager } from '../src/component/base/dependencies';
import { ProcessInstance, ProcessTypes } from '../src/component/processor';


describe('DependencyManager', () => {
    let dependencyManager: DependencyManager;

    beforeEach(() => {
        dependencyManager = new DependencyManager();
    });

    it('should add a dependency', () => {
        const processInstance1 = new ProcessInstance({
            id: 'test-id-1',
            type: ProcessTypes.Custom,
            name: 'Test Process 1',
            description: 'A test process 1',
            instance: () => { console.log('test-instance-1'); return () => console.log},
            dependencies: [],
            metadata: {},
            commands: []
        });

        dependencyManager.addDependency(processInstance1);

        expect(dependencyManager.getDependency('test-id')).toEqual(processInstance1);
    });

    it('should remove a dependency', () => {
        const processInstance1 = new ProcessInstance({
            id: 'test-id-1',
            type: ProcessTypes.Custom,
            name: 'Test Process 1',
            description: 'A test process 1',
            instance: () => { console.log('test-instance-1'); return () => console.log},
            dependencies: [],
            metadata: {},
            commands: []
        });

        dependencyManager.addDependency(processInstance1);
        dependencyManager.removeDependency(processInstance1);

        expect(dependencyManager.getDependency('test-id')).toBeUndefined();
    });
   
})