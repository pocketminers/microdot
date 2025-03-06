import { BaseTypes, Factory } from "@/component";
import { Job } from "./job";


class JobFactory
    extends Factory<BaseTypes.Job>
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


export {
    JobFactory
};