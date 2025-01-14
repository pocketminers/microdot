import { v4 as uuidv4 } from "uuid";
import { checkIsEmpty } from "./checks";

/**
 * The Identifier type is a string that is used to uniquely identify an object.
 */
type Identifier = string;

enum IdentifierTypes {
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
const createIdentifier = (
    type: IdentifierType = "UUID",
    {
        prefix,
        suffix
    } : {prefix?: string, suffix?: string} = {}
): Identifier => {
    let id = "";

    switch(type) {
        case "UUID":
            id = uuidv4();
            break;
        case "Name":
            id = `${Math.floor(Math.random() * 1000000)}`;
            break;
        case "Random":
            id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            break;
        case "Password":
            id =  Math.random().toString(36).substring(2, 4) + "-" + Math.random().toString(36).substring(2, 4) + "-" + Math.random().toString(36).substring(2, 4) + "-" + Math.random().toString(36).substring(2, 4);
            break;
        default:
            id = createIdentifier("UUID");
            break;
    }
    return `${prefix ? prefix : ""}${id}${suffix ? suffix : ""}`;
};

class IdentifierFactory
    extends Map<number, Identifier>
{
    public constructor(
        identifiers: Identifier[] | Map<number, Identifier> = []
    ) {
        super();
        if (typeof identifiers === "object") {
            if (Array.isArray(identifiers)) {
                identifiers.forEach(id => this.add(id));
            } else {
                identifiers.forEach((id, key) => this.set(key, id));
            }
        }
        else {
            throw new Error("Invalid argument type: identifiers");
        }
    }

    private checkIfIndexExists(index: number): boolean {
        return super.has(index);
    }

    private checkIfIdentifierExists(id: Identifier): boolean {
        let exists = false;
        for (const [index, value ] of this.entries()) {

            if (
                typeof id !== "string"
                || typeof value !== "string"
                || typeof index !== "number"
                || checkIsEmpty([value, index])
            ) {
                throw new Error(`Invalid identifier or index type: ${value}, ${index}`);
            }

            if (value === id) {
                exists = true;
                break;
            }
        }
        return exists;
    }

    private addFromRecord(record: Record<number, Identifier>): Array<Record<number, Identifier | undefined>> {
        const added = new Array<Record<number, Identifier | undefined>>();

        for (const [key, id] of Object.entries(record)) {
            if (
                this.checkIfIdentifierExists(id)
                || this.checkIfIndexExists(Number(key))
            ) {
                throw new Error(`Identifier already exists: ${id}`);
            }
            super.set(Number(key), id);
            added.push({ [key]: id });
        }

        return added;
    }

    private addFromIdentifier(id: Identifier): Record<number, Identifier | undefined> {
        if (
            this.checkIfIdentifierExists(id)
            || typeof id !== "string"
        ) {
            throw new Error(`Identifier already exists: ${id}`);
        }
        const key = this.size;
        super.set(key, id);
        return { [key]: id };
    }

    private addFromArrayOfIdentifiers(ids: Identifier[]): Array<Record<number, Identifier | undefined>> {
        const added = new Array<Record<number, Identifier | undefined>>();
        ids.forEach(id => {
            const completed = this.addFromIdentifier(id);
            added.push(completed);
        });
        return added;
    }

    private addFromArrayOfRecords(ids: Record<number, Identifier>[]): Array<Record<number, Identifier | undefined>> {
        const added = new Array<Record<number, Identifier | undefined>>();
        for (const id of ids) {
            const completed = this.addFromRecord(id);
            added.push(...completed);
        }
        return added;
    }

    private addFromMap(map: Map<number, Identifier>): Array<Record<number, Identifier | undefined>> {
        const added = new Array<Record<number, Identifier | undefined>>();
        if(map.size === 0) {
            throw new Error("Map is empty");
        }

        for (const [key, id] of map.entries()) {
            if (checkIsEmpty([id, key])) {
                throw new Error(`Identifier or key is empty: ${id}, ${key}`);
            }

            if (
                this.checkIfIdentifierExists(id)
                || this.checkIfIndexExists(key)
            ) {
                throw new Error(`Identifier already exists: ${id}`);
            }
            const completed = this.addFromRecord({ [key]: id });

            added.push(...completed);
        }
        return added;
    }
    
    public add(ids: Identifier[]): Array<Record<number, Identifier | undefined>>;
    public add(record: Record<number, Identifier>): Array<Record<number, Identifier | undefined>>;
    public add(records: Record<number, Identifier>[]): Array<Record<number, Identifier | undefined>>;
    public add(map: Map<number, Identifier>): Array<Record<number, Identifier | undefined>>;
    public add(idsOrRecords: Identifier | Identifier[] | Record<number, Identifier> | Record<number, Identifier>[] | Map<number, Identifier>): Array<Record<number, Identifier | undefined>> {
        const added = new Array<Record<number, Identifier | undefined>>();
        
        if (Array.isArray(idsOrRecords)) {
            for (const id of idsOrRecords) {
                const completed = this.add(id);
                added.push(...completed);
            }
        }
        else if (idsOrRecords instanceof Map) {
            const completed = this.addFromMap(idsOrRecords);
            added.push(...completed);
        }
        else if (typeof idsOrRecords === 'object') {
            const record = this.addFromRecord(idsOrRecords as Record<number, Identifier>)
            added.push(...record);
        }
        else if (typeof idsOrRecords === 'string') {
            const record = this.addFromIdentifier(idsOrRecords);
            added.push(record);
        }
        else {
            throw new Error(`Invalid argument type: ${typeof idsOrRecords}`);
        }

        return added;
    }

    public getAll(): Map<number, Identifier> {
        return this;
    }

    private getIdentifierByIndex(index: number): Record<number, Identifier> | undefined {
        const identifiers = this.getAll();

        if (
            index >= 0
            && identifiers.has(index)
        ) {
            const id = identifiers.get(index);

            if (id) {
                return { [index]: id };
            }
        }
    }

    private getIdentifierByValue(value: Identifier): Record<number, Identifier> | undefined {
        for (const [key, id] of this.getAll().entries()) {
            if (id === value) {
                return { [key]: id };
            }
        }
    }

    public getRecord(identifier: number | Identifier): Record<number, Identifier> {
        let id: Record<number, Identifier> | undefined = undefined;

        if (typeof identifier === "number") {
            id = this.getIdentifierByIndex(identifier);
        } else {
            id = this.getIdentifierByValue(identifier);
        }

        if (!id) {
            throw new Error(`Identifier not found: ${identifier}`);
        }

        return id;
    }

    public getValue(identifier: number | Identifier): Identifier {
        const id = this.getRecord(identifier)

        return Object.values(id)[0];
    }

    public remove(ids: Identifier[]): Array<Record<number, Identifier | undefined>>;
    public remove(record: Record<number, Identifier>): Array<Record<number, Identifier | undefined>>;
    public remove(records: Record<number, Identifier>[]): Array<Record<number, Identifier | undefined>>;
    public remove(map: Map<number, Identifier>): Array<Record<number, Identifier | undefined>>;
    public remove(idsOrRecords: Identifier | Identifier[] | Record<number, Identifier> | Record<number, Identifier>[] | Map<number, Identifier>): Array<Record<number, Identifier | undefined>> {
        const removed = new Array<Record<number, Identifier | undefined>>();

        if (
            Array.isArray(idsOrRecords)
            && idsOrRecords.length > 0
            && checkIsEmpty([idsOrRecords])
        ) {
            for (const id of idsOrRecords) {
                const completed = this.remove(id);
                removed.push(...completed);
            }
        }
        else if (idsOrRecords instanceof Map) {
            for (const [key, id] of idsOrRecords.entries()) {
                if (
                    this.checkIfIdentifierExists(id)
                    && this.checkIfIndexExists(key)
                ) {
                    super.delete(key);
                    removed.push({ [key]: id });
                }
            }
        }
        else if (typeof idsOrRecords === 'object') {
            const record = idsOrRecords as Record<number, Identifier>;
            for (const [key, id] of Object.entries(record)) {
                if (
                    this.checkIfIdentifierExists(id)
                    && this.checkIfIndexExists(Number(key))
                ) {
                    super.delete(Number(key));
                    removed.push({ [key]: id });
                }
            }
        }
        else if (typeof idsOrRecords === 'string') {
            const id = idsOrRecords;
            if (this.checkIfIdentifierExists(id)) {
                const key = Number(Object.keys(this.getRecord(id))[0]);
                super.delete(key);
                removed.push({ [key]: id });
            }
        }
        else {
            throw new Error(`Invalid argument type: ${typeof idsOrRecords}`);
        }


        return removed;
    }

    public create<T extends IdentifierType>(
        type: T,
        {
            prefix,
            suffix
        } : {prefix?: string, suffix?: string} = {}
    ): Identifier {
        const id = createIdentifier(type, { prefix, suffix });
        this.add(id);
        return id;
    }
}

export {
    type Identifier,
    createIdentifier,
    type IdentifierType,
    IdentifierTypes,
    IdentifierFactory
};