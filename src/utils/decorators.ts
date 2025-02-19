import { Checks } from "./checks";

/**
 * Decorator to check if the input is not empty
 */
function IsNotEmpty(target: any, propertyKey: string, descriptor: PropertyDescriptor = {}): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        // console.log(`${target.name}:${propertyKey}:input is: ${args}`);
        // if (args === undefined || args === null || args.length === 0 || Checks.isEmpty(args) === true) {
        //     // console.log(`${target.name}:${propertyKey}:input cannot be empty.`);
        //     throw new Error(`${target.name}:${propertyKey}:input cannot be empty.`);
        // }
        if (Checks.hasEmpties(...args) === true) {
            // console.log(`${target.name}:${propertyKey}:input ${args.toString()} cannot be empty.`);
            throw new Error(`${target.name}:${propertyKey}:input cannot be empty.`);
        }
        return originalMethod.apply(this, args || []);

    };

    return descriptor;
}

export { IsNotEmpty };