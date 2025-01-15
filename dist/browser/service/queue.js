var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Configurable, Configuration, Parameter } from "../artifacts";
var JobQueueConfig = new Configuration({
    name: 'JobQueueConfiguration',
    description: 'Job Queue configuration',
    parameters: [
        new Parameter({
            name: "keepHistory",
            description: "Keep History of Jobs",
            defaultValue: true
        }),
        new Parameter({
            name: "historyLimit",
            description: "History Limit",
            defaultValue: 100
        }),
        new Parameter({
            name: "runSequence",
            description: "Run Sequence",
            defaultValue: "FIFO",
            optionalValues: ["FIFO", "LIFO"]
        })
    ]
});
var JobQueue = /** @class */ (function (_super) {
    __extends(JobQueue, _super);
    function JobQueue(_a) {
        var id = _a.id, _b = _a.config, config = _b === void 0 ? JobQueueConfig : _b;
        return _super.call(this, {
            id: id,
            name: 'JobQueue',
            description: 'A queue of jobs',
            configuration: config
        }) || this;
    }
    return JobQueue;
}(Configurable));
export { JobQueue, JobQueueConfig };
//# sourceMappingURL=queue.js.map