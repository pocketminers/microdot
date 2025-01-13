import { v4 as uuidv4 } from "uuid";
var IdentifierTypes;
(function (IdentifierTypes) {
    IdentifierTypes["UUID"] = "UUID";
    IdentifierTypes["Random"] = "Random";
    IdentifierTypes["Name"] = "Name";
    IdentifierTypes["Password"] = "Password";
})(IdentifierTypes || (IdentifierTypes = {}));
/**
 * Creates a new identifier.
 * @summary Creates a new identifier with the specified type.
 * @param type The type of identifier to create.
 * @param prefix The prefix to add to the identifier.
 * @param suffix The suffix to add to the identifier.
 * @returns The new identifier.
 */
var createIdentifier = function (type, _a) {
    if (type === void 0) { type = "UUID"; }
    var _b = _a === void 0 ? {} : _a, prefix = _b.prefix, suffix = _b.suffix;
    var id = "";
    switch (type) {
        case "UUID":
            id = uuidv4();
            break;
        case "Name":
            id = "".concat(Math.floor(Math.random() * 1000000));
            break;
        case "Random":
            id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            break;
        case "Password":
            id = Math.random().toString(36).substring(2, 4) + "-" + Math.random().toString(36).substring(2, 4) + "-" + Math.random().toString(36).substring(2, 4) + "-" + Math.random().toString(36).substring(2, 4);
            break;
        default:
            id = createIdentifier("UUID");
            break;
    }
    return "".concat(prefix ? prefix : "").concat(id).concat(suffix ? suffix : "");
};
export { createIdentifier, IdentifierTypes };
//# sourceMappingURL=identifier.js.map