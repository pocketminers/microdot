// import {
//     CommandManager,
//     Command
// }  from "../src/service/commands";


// describe("CommandManager", () => {
//     let commandManager: CommandManager;

//     beforeEach(() => {
//         commandManager = new CommandManager();
//     });

//     it("should register a command", () => {
//         const command: Command = {
//             id: "test",
//             name: "test",
//             description: "test",
//             properties: {
//                 args: [],
//                 params: []
//             },
//             run: async () => undefined
//         };
//         commandManager.registerCommand(command);
//         expect(commandManager.getCommand("test")).toEqual(command);
//     });
    
//     it("should unregister a command", () => {
//         const command: Command = {
//             id: "test",
//             name: "test",
//             description: "test",
//             properties: {
//                 args: [],
//                 params: []
//             },
//             run: async () => undefined
//         };

//         commandManager.registerCommand(command);
//         commandManager.unregisterCommand("test");

//         try {
//             commandManager.getCommand("test");
//         }
//         catch (error: any) {
//             expect(error.message).toEqual("Command test not found");
//         }
//     });

//     it("should list commands", () => {
//         const command1: Command = {
//             id: "test1",
//             name: "test1",
//             description: "test1",
//             properties: {
//                 args: [],
//                 params: []
//             },
//             run: async () => undefined
//         };

//         const command2: Command = {
//             id: "test2",
//             name: "test2",
//             description: "test2",
//             properties: {
//                 args: [],
//                 params: []
//             },
//             run: async () => undefined
//         };

//         commandManager.registerCommand(command1);
//         commandManager.registerCommand(command2);

//         expect(commandManager.listCommands()).toEqual([command1, command2]);
//     });
// });