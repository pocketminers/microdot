import { CommandRunSpec } from "./command";
import { PropertiesSpec } from "./properties";


interface JobConfigSpec {
    id: string;
    commands: CommandRunSpec[];
    name: string;
    description: string;
    runSequential: boolean;
    retryFailed: boolean;
    retryCount: number;
}

export { JobConfigSpec };