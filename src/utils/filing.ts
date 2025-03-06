import { promises as fs } from 'fs';


class Filing {

    public static async exists(path: string): Promise<boolean> {
        try {
            await fs.access(path, fs.constants.F_OK);
            return true;
        }
        catch (error: any) {
            return false;
        }
    }
    
    public static async readFile(path: string): Promise<string> {
        try {
            return await fs.readFile(path, 'utf-8');
        }
        catch (error: any) {
            throw new Error(`Filing:readFile: ${error.message}`); 
        }
    }

    public static async writeFile(path: string, data: string): Promise<void> {
        try {
            await fs.writeFile(path, data, 'utf-8');
        }
        catch (error: any) {
            throw new Error(`Filing:writeFile: ${error.message}`);
        }
    }

    public static async appendFile(path: string, data: string): Promise<void> {
        try {
            await fs.appendFile(path, data, 'utf-8');
        }
        catch (error: any) {
            throw new Error(`Filing:appendFile: ${error.message}`);
        }
    }

    public static async deleteFile(path: string): Promise<void> {
        try {
            await fs.unlink(path);
        }
        catch (error: any) {
            throw new Error(`Filing:deleteFile: ${error.message}`);
        }
    }

    public static async createFile(path: string): Promise<void> {
        try {
            await fs.writeFile(path, '', 'utf-8');
        }
        catch (error: any) {
            throw new Error(`Filing:createFile: ${error.message}`);
        }
    }

    public static async createDirectory(path: string): Promise<void> {
        try {
            await fs.mkdir(path);
        }
        catch (error: any) {
            throw new Error(`Filing:createDirectory: ${error.message}`);
        }
    }

    public static async deleteDirectory(path: string): Promise<void> {
        try {
            await fs.rmdir(path);
        }
        catch (error: any) {
            throw new Error(`Filing:deleteDirectory: ${error.message}`);
        }
    }


}

export {
    Filing
}