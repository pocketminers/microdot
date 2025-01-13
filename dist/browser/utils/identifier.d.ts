/**
 * The Identifier type is a string that is used to uniquely identify an object.
 */
type Identifier = string;
declare enum IdentifierTypes {
    UUID = "UUID",
    Random = "Random",
    Name = "Name",
    Password = "Password"
}
/**
 * The IdentifierType type is a string that is used to specify the type of identifier to create.
 */
type IdentifierType = keyof typeof IdentifierTypes;
/**
 * Creates a new identifier.
 * @summary Creates a new identifier with the specified type.
 * @param type The type of identifier to create.
 * @param prefix The prefix to add to the identifier.
 * @param suffix The suffix to add to the identifier.
 * @returns The new identifier.
 */
declare const createIdentifier: (type?: IdentifierType, { prefix, suffix }?: {
    prefix?: string;
    suffix?: string;
}) => Identifier;
export { type Identifier, createIdentifier, type IdentifierType, IdentifierTypes };
//# sourceMappingURL=identifier.d.ts.map