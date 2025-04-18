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
interface IdentifierCreatorEntry extends Partial<Record<"type", IdentifierTypes>>, Partial<Record<'prefix', string>>, Partial<Record<'suffix', string>> {
}
/**
 * Creates a new identifier.
 * @summary Creates a new identifier with the specified type.
 */
declare const createIdentifier: ({ type, prefix, suffix }?: IdentifierCreatorEntry) => Identifier;
declare class IdentifierStore extends Map<number, Identifier> {
    constructor(identifiers?: Identifier[] | Map<number, Identifier>);
    private checkIfIndexExists;
    private checkIfIdentifierExists;
    private addFromRecord;
    private addFromIdentifier;
    private addFromArrayOfIdentifiers;
    private addFromArrayOfRecords;
    private addFromMap;
    add(ids: Identifier[]): Array<Record<number, Identifier | undefined>>;
    add(record: Record<number, Identifier>): Array<Record<number, Identifier | undefined>>;
    add(records: Record<number, Identifier>[]): Array<Record<number, Identifier | undefined>>;
    add(map: Map<number, Identifier>): Array<Record<number, Identifier | undefined>>;
    getAll(): Map<number, Identifier>;
    private getIdentifierByIndex;
    private getIdentifierByValue;
    getRecord(identifier: number | Identifier): Record<number, Identifier>;
    getValue(identifier: number | Identifier): Identifier;
    remove(ids: Identifier[]): Array<Record<number, Identifier | undefined>>;
    remove(record: Record<number, Identifier>): Array<Record<number, Identifier | undefined>>;
    remove(records: Record<number, Identifier>[]): Array<Record<number, Identifier | undefined>>;
    remove(map: Map<number, Identifier>): Array<Record<number, Identifier | undefined>>;
    create<T extends IdentifierTypes>(type?: T, { prefix, suffix }?: {
        prefix?: string;
        suffix?: string;
    }): Identifier;
}
export { type Identifier, createIdentifier, type IdentifierType, type IdentifierCreatorEntry, IdentifierTypes, IdentifierStore };
//# sourceMappingURL=identifier.d.ts.map