"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentifierTypes = exports.createIdentifier = void 0;
const uuid_1 = require("uuid");
var IdentifierTypes;
(function (IdentifierTypes) {
    IdentifierTypes["UUID"] = "UUID";
    IdentifierTypes["Random"] = "Random";
    IdentifierTypes["Name"] = "Name";
    IdentifierTypes["Password"] = "Password";
})(IdentifierTypes || (exports.IdentifierTypes = IdentifierTypes = {}));
const createIdentifier = (type = "UUID", { prefix, suffix } = {}) => {
    let id = "";
    switch (type) {
        case "UUID":
            id = (0, uuid_1.v4)();
            break;
        case "Name":
            id = `${Math.floor(Math.random() * 1000000)}`;
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
    return `${prefix ? prefix : ""}${id}${suffix ? suffix : ""}`;
};
exports.createIdentifier = createIdentifier;
