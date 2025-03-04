import { BaseTypes, Factory } from "@/component";

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

class JobFactory
    extends Factory<BaseTypes.Job, Job>
{
    constructor() {
        super(BaseTypes.Job);
    }

    public create({
        id,
        name,
        description
    }: {
        id: string,
        name: string,
        description: string
    }): Job {
        return new Job(id, name, description);
    }
}