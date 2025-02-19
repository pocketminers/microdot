// import { CommandRunner } from "../src/component/runner";
// import { CommandSpec, CommandResultSpec } from "../src/template/spec/v0/command";

// describe("CommandRunner", () => {
//     let commandManager: CommandRunner;

//     beforeEach(() => {
//         commandManager = new CommandRunner();
//     });

//     it("should register a command", () => {
//         const command: CommandSpec = {
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
//         const command: CommandSpec = {
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

//         expect(commandManager.getCommand("test")).toBeUndefined();
//     });

//     it("should list commands", () => {
//         const command1: CommandSpec = {
//             id: "test1",
//             name: "test1",
//             description: "test1",
//             properties: {
//                 args: [],
//                 params: []
//             },
//             run: async () => undefined
//         };

//         const command2: CommandSpec = {
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

//         console.log(commandManager.listCommands());

//         expect(commandManager.listCommands()).toEqual([command1, command2]);
//     });

//     it("should list command names", () => {
//         const command1: CommandSpec = {
//             id: "test1",
//             name: "test1",
//             description: "test1",
//             properties: {
//                 args: [],
//                 params: []
//             },
//             run: async () => undefined
//         };

//         const command2: CommandSpec = {
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

//         expect(commandManager.listCommandNames()).toEqual(["test1", "test2"]);
//     });

//     it("should execute a command", async () => {
//         const command: CommandSpec = {
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

//         const result = await commandManager.executeCommand({
//             commandName: "test"
//         });

//         expect(result).toEqual({
//             run: {
//                 commandName: "test",
//                 processId: "default",
//                 args: undefined,
//                 jobId: expect.any(String),
//                 instance: undefined
//             },
//             output: null,
//             metrics: {
//                 start: expect.any(Number),
//                 end: expect.any(Number),
//                 duration: expect.any(Number),
//                 bytesIn: 0,
//                 bytesOut: 0
//             }
//         });
//     });

//     it("should execute a command with args", async () => {
//         const command: CommandSpec = {
//             id: "test",
//             name: "test",
//             description: "test",
//             properties: {
//                 args: [],
//                 params: []
//             },
//             run: async ({args}) => args
//         };

//         commandManager.registerCommand(command);

//         const result = await commandManager.executeCommand({
//             commandName: "test",
//             args: { test: "test" }
//         });

//         console.log(`result`, result);

//         expect(result).toEqual({
//             run: {
//                 commandName: "test",
//                 processId: "default",
//                 args: {
//                     test: "test"
//                 },
//                 jobId: expect.any(String),
//                 instance: undefined
//             },
//             output: { test: "test" },
//             metrics: {
//                 start: expect.any(Number),
//                 end: expect.any(Number),
//                 duration: expect.any(Number),
//                 bytesIn: 15,
//                 bytesOut: 15
//             }
//         });
//     });
// });