import { Properties } from '../src/component/base';
import {
    CommandManager
} from '../src/component/commands/commands.manager';
import { Command } from '../src/component/commands/command';
import { IdentityManager } from '../src/component/identifier';


describe('CommandManager', () => {
    it('should create a new instance', () => {
        const identityManager = new IdentityManager([]);
        const commandManager = new CommandManager({dependencies: [identityManager]});

        expect(commandManager).toBeInstanceOf(CommandManager);
        expect(commandManager.storage.size).toBe(0);
    });

    it('should add a command', () => {
        const commandManager = new CommandManager();

        const command: any = commandManager.createCommand({name: 'test-command', description: 'test command'});
        expect(commandManager.storage.size).toBe(1);
        expect(commandManager.storage.getItem({value: command.item})).toEqual({index: -1, value: undefined});
    });

    it('should remove a command', () => {
        const commandManager = new CommandManager();

        const command = commandManager.storage.addItem({index: 'test-command', item: new Command({name: 'test-command', description: 'test command'})});
        commandManager.storage.removeItem({item: command.item});

        expect(commandManager.storage.size).toBe(0);
        expect(commandManager.storage.getItem({value: command.item})).toEqual({index: -1, value: command.item});
    });

    it('should list commands', () => {
        const commandManager = new CommandManager();

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