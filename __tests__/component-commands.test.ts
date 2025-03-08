import {
    CommandManager
} from '../src/component/commands/commands.manager';
import { CommandFactory } from '../src/component/commands/commands.factory';
import { CommandStorage } from '../src/component/commands/commands.storage';
import { Command } from '../src/component/commands/command';
import { IdentityManager } from '../src/component/identifier';

describe('Command', () => {
    let identityManager: IdentityManager;

    beforeEach( async () => {
        jest.clearAllMocks();
        identityManager = new IdentityManager();
    });

    it('should create a new instance', () => {
        const command = new Command({id: 'test-command', name: 'test-command', description: 'test command'});

        expect(command).toBeInstanceOf(Command);
        expect(command.name).toBe('test-command');
        expect(command.description).toBe('test command');
    });

    it('should create a new instance with id', () => {
        const command = new Command({id: 'test-command', name: 'test-command', description: 'test command'});

        expect(command).toBeInstanceOf(Command);
        expect(command.id).toBe('test-command');
        expect(command.name).toBe('test-command');
        expect(command.description).toBe('test command');
    });

});


describe('CommandFactory', () => {
    let identityManager: IdentityManager;

    beforeEach( async () => {
        jest.clearAllMocks();
        identityManager = new IdentityManager();
    });

    it('should create a new instance', () => {
        const commandFactory = new CommandFactory();

        expect(commandFactory).toBeInstanceOf(CommandFactory);
    });

    it('should create a new command', () => {
        const commandFactory = new CommandFactory();

        const command = commandFactory.create({id: 'test-command', name: 'test-command', description: 'test command'});
        expect(command).toBeInstanceOf(Command);
        expect(command.name).toBe('test-command');
        expect(command.description).toBe('test command');
    });

    it('should create a new command with id', () => {
        const commandFactory = new CommandFactory();

        const command = commandFactory.create({id: 'test-command', name: 'test-command', description: 'test command'});
        expect(command).toBeInstanceOf(Command);
        expect(command.id).toBe('test-command');
        expect(command.name).toBe('test-command');
        expect(command.description).toBe('test command');
    });
});


describe('CommandStorage', () => {
    let identityManager: IdentityManager;

    beforeEach( async () => {
        jest.clearAllMocks();
        identityManager = new IdentityManager();
    });

    it('should create a new instance', () => {
        const commandStorage = new CommandStorage();

        expect(commandStorage).toBeInstanceOf(CommandStorage);
        expect(commandStorage.size).toBe(0);
    });

    it('should add a command', () => {
        const commandStorage = new CommandStorage();

        const command: any = commandStorage.addItem({index: 'test-command', item: new Command({id: 'test-command', name: 'test-command', description: 'test command'})});
        expect(commandStorage.size).toBe(1);
        // expect(commandStorage.getItem({value: command.item})).toEqual({index: -1, value: undefined});
        expect(commandStorage.getCommand('test-command')).toEqual(command.item);
    });

    it('should remove a command', () => {
        const commandStorage = new CommandStorage();

        const command = commandStorage.addItem({index: 'test-command', item: new Command({id: 'test-command', name: 'test-command', description: 'test command'})});
        commandStorage.removeItem({item: command.item});

        expect(commandStorage.size).toBe(0);
        expect(commandStorage.getItem({value: command.item})).toEqual({index: -1, value: command.item});
    });

    it('should list commands', () => {
        const commandStorage = new CommandStorage();

        commandStorage.addItem({index: 'test-command-1', item: new Command({id: 'test-command-1', name: 'test-command-1', description: 'test command 1'})});
        commandStorage.addItem({index: 'test-command-2', item: new Command({id: 'test-command-2', name: 'test-command-2', description: 'test command 2'})});
        commandStorage.addItem({index: 'test-command-3', item: new Command({id: 'test-command-3', name: 'test-command-3', description: 'test command 3'})});

        expect(commandStorage.size).toBe(3);
        const commands = commandStorage.listItems();

        expect(commands.length).toBe(3);
    });
});


describe('CommandManager', () => {
    let identityManager: IdentityManager;

    beforeEach( async () => {
        jest.clearAllMocks();
        identityManager = new IdentityManager();
    });


    it('should create a new instance', () => {
        const commandManager = new CommandManager({dependencies: [identityManager]});

        expect(commandManager).toBeInstanceOf(CommandManager);
        expect(commandManager.storage.size).toBe(0);
    });

    it('should add a command', () => {
        const commandManager = new CommandManager({dependencies: [identityManager]});

        const command: any = commandManager.createCommand({name: 'test-command', description: 'test command'});
        expect(commandManager.storage.size).toBe(1);
        expect(commandManager.storage.getItem({value: command.item})).toEqual({index: -1, value: undefined});
    });

    it('should remove a command', () => {
        const commandManager = new CommandManager({dependencies: [identityManager]});

        const command = commandManager.storage.addItem({index: 'test-command', item: new Command({name: 'test-command', description: 'test command'})});
        commandManager.storage.removeItem({item: command.item});

        expect(commandManager.storage.size).toBe(0);
        expect(commandManager.storage.getItem({value: command.item})).toEqual({index: -1, value: command.item});
    });

    it('should list commands', () => {
        const commandManager = new CommandManager({dependencies: [identityManager]});

        commandManager.storage.addItem({index: 'test-command-1', item: new Command({id: 'test-command-1', name: 'test-command-1', description: 'test command 1'})});
        commandManager.storage.addItem({index: 'test-command-2', item: new Command({id: 'test-command-2', name: 'test-command-2', description: 'test command 2'})});
        commandManager.storage.addItem({index: 'test-command-3', item: new Command({id: 'test-command-3', name: 'test-command-3', description: 'test command 3'})});

        expect(commandManager.storage.size).toBe(3);
        console.log(`commandManager.storage.listItems()`, commandManager.storage.listItems());
        const commands = commandManager.storage.listItems();
        console.log(`commands`, commands);

        expect(commands.length).toBe(3);
    });
});