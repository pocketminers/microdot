/**
 * Check if a value is an array. Empty arrays will return false.
 */
declare const checkIsArray: (value: any) => boolean;
declare const checkIsBoolean: (value: any) => boolean;
/**
 * Check if a value is a string. Empty strings will return false.
 */
declare const checkIsString: (value: any) => boolean;
/**
 * Check if a value is an object. Empty objects will return false.
 */
declare const checkIsObject: (value: any) => boolean;
/**
 * Check if an object has a circular reference.
 */
declare const checkForCircularReference: (obj: any) => boolean;
/**
 * Check if an item is empty.
 */
declare const checkIsEmpty: (value: any) => boolean;
declare const checkHasEmpties: (...values: any[]) => boolean;
export { checkIsArray, checkIsBoolean, checkIsObject, checkForCircularReference, checkIsEmpty, checkHasEmpties, checkIsString, };
//# sourceMappingURL=checks.d.ts.map