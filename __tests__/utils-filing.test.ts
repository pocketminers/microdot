import {
    Filing
} from "../src/utils/filing";


describe('Filing', () => {
    beforeAll(async () => {
        try {
            await Filing.deleteFile('./test-file.txt');
        }
        catch (error: any) {
            console.log(`error: ${error.message}`);
        }
    });


    it('should create a new instance', () => {
        const filing = new Filing();

        expect(filing).toBeInstanceOf(Filing);
    });

    it ('should check if a file exists', async () => {
        const path = './test-file.txt';
        const filing = new Filing();

        const file: any = await Filing.exists(path)
        expect(file).toBe(false);
    });

    it('should add a file', async () => {
        const path = './test-file.txt';
        const filing = new Filing();

        const file: any = await Filing.exists(path)
        expect(file).toBe(false);

        await Filing.createFile(path);

        const fileExists: boolean = await Filing.exists(path);
        expect(fileExists).toBe(true);

        await Filing.deleteFile(path);
    });

    it('should read a file', async () => {
        const path = './test-file.txt';
        const filing = new Filing();

        await Filing.createFile(path);

        const fileExists: boolean = await Filing.exists(path);

        expect(fileExists).toBe(true);

        await Filing.writeFile(path, 'test data');

        const data = await Filing.readFile(path);

        expect(data).toBe('test data');

        await Filing.deleteFile(path);
    });

    it('should write a file', async () => {
        const path = './test-file.txt';
        const filing = new Filing();

        await Filing.createFile(path);

        const fileExists: boolean = await Filing.exists(path);

        expect(fileExists).toBe(true);

        await Filing.writeFile(path, 'test data');

        const data = await Filing.readFile(path);

        expect(data).toBe('test data');

        await Filing.deleteFile(path);
    });
});