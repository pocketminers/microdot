import { checkIsEmpty } from "./checks";

/**
 * Decorator to check if the input is not empty
 */
function IsNotEmpty(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (args: any[]) {
        if (checkIsEmpty([args]) === true) {
            throw new Error(`${target.name}:${propertyKey}:input cannot be empty.`);
        }
        // return originalMethod.apply(this, args);
    };

    return descriptor;
}

export { IsNotEmpty };