interface HistoryEntry {
    id: string;
    name: string;
    description: string;
    annotations: Record<string, any>;
    labels: Record<string, any>;
    createdBy: string;
    hash: string;
    created: number;
}


class HistoryManager {
    public entries: HistoryEntry[] = [];


}

export {
    HistoryManager,
    HistoryEntry
}