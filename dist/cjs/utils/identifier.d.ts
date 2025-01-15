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
declare class IdentifierFactory extends Map<number, Identifier> {
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
    create<T extends IdentifierType>(type?: T, { prefix, suffix }?: {
        prefix?: string;
        suffix?: string;
    }): Identifier;
}
export { type Identifier, createIdentifier, type IdentifierType, IdentifierTypes, IdentifierFactory };
//# sourceMappingURL=identifier.d.ts.map