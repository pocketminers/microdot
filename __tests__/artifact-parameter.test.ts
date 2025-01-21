import { Parameter } from "../src/artifacts/parameter";

describe("Parameter", () => {
    it("should create a parameter with default values", () => {
        const param = new Parameter<number>({ name: "param1" });
        expect(param.name).toBe("param1");
        expect(param.required).toBe(false);
        expect(param.description).toBe("A parameter");
        expect(param.defaultValue).toBeUndefined();
        expect(param.optionalValues).toEqual([]);
    });

    it("should create a parameter with given values", () => {
        const param = new Parameter<number>({
            name: "param1",
            required: true,
            description: "A test parameter",
            defaultValue: 123,
            optionalValues: [123, 456]
        });
        expect(param.name).toBe("param1");
        expect(param.required).toBe(true);
        expect(param.description).toBe("A test parameter");
        expect(param.defaultValue).toBe(123);
        expect(param.optionalValues).toEqual([123, 456]);
    });

    it("should throw an error if default value is not in optional values", () => {
        expect(() => {
            new Parameter<number>({
                name: "param1",
                defaultValue: 789,
                optionalValues: [123, 456]
            });
        }).toThrow("Value is not in optional values: param1");
    });

    it("should return the default value if no value is provided", () => {
        const param = new Parameter<number>({
            name: "param1",
            defaultValue: 123,
            optionalValues: [123, 456]
        });
        expect(param.getValue()).toBe(123);
    });

    it("should return the provided value if it is in optional values", () => {
        const param = new Parameter<number>({
            name: "param1",
            defaultValue: 123,
            optionalValues: [123, 456]
        });
        expect(param.getValue(123)).toBe(123);
    });

    it("should throw an error if the provided value is not in optional values", () => {
        const param = new Parameter<number>({
            name: "param1",
            optionalValues: [123, 456]
        });
        expect(() => param.getValue(789)).toThrow("Value is not in optional values: param1");
    });

    it("should throw an error if value is required but not provided", () => {
        const param = new Parameter<number>({
            name: "param1",
            required: true
        });
        expect(() => param.getValue()).toThrow("Value is required: param1");
    });

    it("should convert the parameter to JSON", () => {
        const param = new Parameter<number>({
            name: "param1",
            required: true,
            description: "A test parameter",
            defaultValue: 123,
            optionalValues: [123, 456]
        });
        expect(param.toJSON()).toEqual({
            name: "param1",
            required: true,
            description: "A test parameter",
            defaultValue: 123,
            optionalValues: [123, 456]
        });
    });

    it("should convert the parameter to a string", () => {
        const param = new Parameter<number>({
            name: "param1",
            required: true,
            description: "A test parameter",
            defaultValue: 123,
            optionalValues: [123, 456]
        });
        expect(param.toString()).toContain("name: param1");
        expect(param.toString()).toContain("description: A test parameter");
        expect(param.toString()).toContain("required: true");
        expect(param.toString()).toContain("default: 123");
        expect(param.toString()).toContain("options: 123, 456");
    });

    it("should convert the parameter to a record", () => {
        const param = new Parameter<number>({
            name: "param1",
            required: true,
            description: "A test parameter",
            defaultValue: 123,
            optionalValues: [123, 456]
        });
        expect(param.toRecord()).toEqual({
            name: "param1",
            required: true,
            description: "A test parameter",
            defaultValue: 123,
            optionalValues: [123, 456]
        });
    });
});