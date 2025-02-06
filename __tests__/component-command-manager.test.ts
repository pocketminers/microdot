import { CommandManager } from "../src/component/command-manager";
import { CommandSpec, CommandResultSpec } from "../src/template/spec/v0/command";

describe("CommandManager", () => {
    let commandManager: CommandManager;

    beforeEach(() => {
        commandManager = new CommandManager();
    });

    it("should register a command", () => {
        const command = new CommandSpec({
            name: "test",
            description: "test",
            args: [],
            params: [],
            taskRunner: async () => undefined
        });

        commandManager.registerCommand(command);

        expect(commandManager.getCommand("test")).toEqual(command);
    });
    
});