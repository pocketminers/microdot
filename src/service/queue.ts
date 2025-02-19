import { ParameterSpec, JobRunSpec, CommandRunSpec } from "@/template/spec";
import { ParameterEntry } from "@component/properties";

const JobQueueOptions: ParameterEntry[] = [
    {
        name: "maxConcurrency",
        description: "The maximum number of jobs that can be run at the same time.",
        type: "number",
        defaultValue: 1,
        required: false
    },
    {
        name: "maxRetries",
        description: "The maximum number of times a job can be retried on failure.",
        type: "number",
        defaultValue: 0,
        required: false
    },
    {
        name: "retryDelay",
        description: "The delay in seconds between retries of a job. This is only used if maxRetries is greater than 0.",
        type: "number",
        defaultValue: 5,
        required: false
    },
    {
        name: "retryTimeout",
        description: "The timeout in seconds for a job before it is retried. This is only used if maxRetries is greater than 0.",
        type: "number",
        defaultValue: 60,
        required: false
    }
];

interface JobEntry
    extends
        Pick<JobRunSpec, "id" | "name" | "description" | "properties">,
        Partial<Pick<JobRunSpec, "commands">> {}


interface Job
    extends
        Pick<JobRunSpec, "id" | "name" | "description" | "properties"> {}

class JobQueue {
    private queue: Job[] = [];
    private running: boolean = false;
    private maxConcurrency: number;
    private maxRetries: number;
    private retryDelay: number;
    private retryTimeout: number;

    constructor({
        maxConcurrency = 1,
        maxRetries = 0,
        retryDelay = 5,
        retryTimeout = 60
    }: {
        maxConcurrency?: number,
        maxRetries?: number,
        retryDelay?: number,
        retryTimeout?: number
    }) {
        this.maxConcurrency = maxConcurrency;
        this.maxRetries = maxRetries;
        this.retryDelay = retryDelay;
        this.retryTimeout = retryTimeout;
    }

    public add(job: Job) {
        this.queue.push(job);
        this.run();
    }

    public async run() {
        if (this.running) return;
        this.running = true;

        while (this.queue.length > 0) {
            const jobsToRun = this.queue.splice(0, this.maxConcurrency);
            await Promise.all(jobsToRun.map(job => job.run()));
        }

        this.running = false;
    }
}