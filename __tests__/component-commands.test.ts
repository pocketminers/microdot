import { Properties } from '../src/component/base';
import {
    CommandManager,
} from '../src/component/commands/commands.manager';
import { Command } from '../src/component/commands/command';


describe('CommandManager', () => {
    it('should create a new instance', () => {
        const commandManager = new CommandManager();

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

        commandManager.storage.addItem({index: 'test-command-1', item: new Command({name: 'test-command-1', description: 'test command 1'})});
        commandManager.storage.addItem({index: 'test-command-2', item: new Command({name: 'test-command-2', description: 'test command 2'})});
        commandManager.storage.addItem({index: 'test-command-3', item: new Command({name: 'test-command-3', description: 'test command 3'})});

        expect(commandManager.storage.size).toBe(3);
        expect(commandManager.storage.listItems()).toEqual([
            {name: 'test-command-1', description: 'test command 1', _type: 'Command', properties: new Properties({type: 'Command'}), run: expect.any(Function)},
            {name: 'test-command-2', description: 'test command 2', _type: 'Command', properties: new Properties({type: 'Command'}), run: expect.any(Function)},
            {name: 'test-command-3', description: 'test command 3', _type: 'Command', properties: new Properties({type: 'Command'}), run: expect.any(Function)}
        ]);
    });
});