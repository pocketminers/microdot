type Identifier = string;
declare enum IdentifierTypes {
    UUID = "UUID",
    Random = "Random",
    Name = "Name",
    Password = "Password"
}
type IdentifierType = keyof typeof IdentifierTypes;
declare const createIdentifier: (type?: IdentifierType, { prefix, suffix }?: {
    prefix?: string;
    suffix?: string;
}) => Identifier;
export { type Identifier, createIdentifier, type IdentifierType, IdentifierTypes };
//# sourceMappingURL=identifier.d.ts.map