import { createHash } from "crypto";
function sha256(input) {
    return createHash("sha256").update(input).digest("hex");
}
export { sha256 };
