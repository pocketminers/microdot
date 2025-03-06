class Job {
    public readonly id: string;
    public readonly name: string;
    public readonly description: string;

    constructor(id: string, name: string, description: string) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}


export {
    Job
}