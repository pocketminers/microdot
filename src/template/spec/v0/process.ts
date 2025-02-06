import { CommandSpec } from "./command";
import { PropertiesSpec } from "./properties";

interface ProcessConfigSpec {
    id: string;
    name: string;
    description: string;
    commands: CommandSpec[];
    config: PropertiesSpec;
    history: HistoryManager;
}

export { ProcessConfigSpec };