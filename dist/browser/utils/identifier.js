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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { v4 as uuidv4 } from "uuid";
import { checkIsEmpty } from "./checks";
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
var IdentifierFactory = /** @class */ (function (_super) {
    __extends(IdentifierFactory, _super);
    function IdentifierFactory(identifiers) {
        if (identifiers === void 0) { identifiers = []; }
        var _this = _super.call(this) || this;
        if (typeof identifiers === "object") {
            if (Array.isArray(identifiers)) {
                identifiers.forEach(function (id) { return _this.add(id); });
            }
            else {
                identifiers.forEach(function (id, key) { return _this.set(key, id); });
            }
        }
        else {
            throw new Error("Invalid argument type: identifiers");
        }
        return _this;
    }
    IdentifierFactory.prototype.checkIfIdentifierExists = function (id) {
        var e_1, _a;
        var exists = false;
        try {
            for (var _b = __values(this.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var value = _c.value;
                if (value === id) {
                    exists = true;
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return exists;
    };
    IdentifierFactory.prototype.addFromRecord = function (record) {
        var e_2, _a, _b;
        var added = new Array();
        try {
            for (var _c = __values(Object.entries(record)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var _e = __read(_d.value, 2), key = _e[0], id = _e[1];
                if (this.checkIfIdentifierExists(id)) {
                    throw new Error("Identifier already exists: ".concat(id));
                }
                _super.prototype.set.call(this, Number(key), id);
                added.push((_b = {}, _b[key] = id, _b));
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return added;
    };
    IdentifierFactory.prototype.addFromIdentifier = function (id) {
        var _a;
        if (this.checkIfIdentifierExists(id)) {
            throw new Error("Identifier already exists: ".concat(id));
        }
        var key = this.size;
        _super.prototype.set.call(this, key, id);
        return _a = {}, _a[key] = id, _a;
    };
    IdentifierFactory.prototype.addFromArrayOfIdentifiers = function (ids) {
        var _this = this;
        var added = new Array();
        ids.forEach(function (id) {
            var completed = _this.addFromIdentifier(id);
            added.push(completed);
        });
        return added;
    };
    IdentifierFactory.prototype.addFromArrayOfRecords = function (ids) {
        var e_3, _a;
        var added = new Array();
        try {
            for (var ids_1 = __values(ids), ids_1_1 = ids_1.next(); !ids_1_1.done; ids_1_1 = ids_1.next()) {
                var id = ids_1_1.value;
                var completed = this.addFromRecord(id);
                added.push.apply(added, __spreadArray([], __read(completed), false));
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (ids_1_1 && !ids_1_1.done && (_a = ids_1.return)) _a.call(ids_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return added;
    };
    IdentifierFactory.prototype.addFromMap = function (map) {
        var e_4, _a, _b;
        var added = new Array();
        if (map.size === 0) {
            throw new Error("Map is empty");
        }
        try {
            for (var _c = __values(map.entries()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var _e = __read(_d.value, 2), key = _e[0], id = _e[1];
                if (checkIsEmpty([id, key])) {
                    throw new Error("Identifier or key is empty: ".concat(id, ", ").concat(key));
                }
                if (this.checkIfIdentifierExists(id)) {
                    throw new Error("Identifier already exists: ".concat(id));
                }
                var completed = this.addFromRecord((_b = {}, _b[key] = id, _b));
                added.push.apply(added, __spreadArray([], __read(completed), false));
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return added;
    };
    IdentifierFactory.prototype.add = function (idsOrRecords) {
        var e_5, _a;
        var added = new Array();
        if (Array.isArray(idsOrRecords)) {
            try {
                for (var idsOrRecords_1 = __values(idsOrRecords), idsOrRecords_1_1 = idsOrRecords_1.next(); !idsOrRecords_1_1.done; idsOrRecords_1_1 = idsOrRecords_1.next()) {
                    var id = idsOrRecords_1_1.value;
                    var completed = this.add(id);
                    added.push.apply(added, __spreadArray([], __read(completed), false));
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (idsOrRecords_1_1 && !idsOrRecords_1_1.done && (_a = idsOrRecords_1.return)) _a.call(idsOrRecords_1);
                }
                finally { if (e_5) throw e_5.error; }
            }
        }
        else if (idsOrRecords instanceof Map) {
            var completed = this.addFromMap(idsOrRecords);
            added.push.apply(added, __spreadArray([], __read(completed), false));
        }
        else if (typeof idsOrRecords === 'object') {
            var record = this.addFromRecord(idsOrRecords);
            added.push.apply(added, __spreadArray([], __read(record), false));
        }
        else if (typeof idsOrRecords === 'string') {
            var record = this.addFromIdentifier(idsOrRecords);
            added.push(record);
        }
        return added;
    };
    IdentifierFactory.prototype.getAll = function () {
        return this;
    };
    IdentifierFactory.prototype.getIdentifierByIndex = function (index) {
        var _a;
        var identifiers = this.getAll();
        if (index >= 0
            && identifiers.has(index)) {
            var id = identifiers.get(index);
            if (id) {
                return _a = {}, _a[index] = id, _a;
            }
        }
    };
    IdentifierFactory.prototype.getIdentifierByValue = function (value) {
        var e_6, _a, _b;
        try {
            for (var _c = __values(this.getAll().entries()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var _e = __read(_d.value, 2), key = _e[0], id = _e[1];
                if (id === value) {
                    return _b = {}, _b[key] = id, _b;
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_6) throw e_6.error; }
        }
    };
    IdentifierFactory.prototype.getRecord = function (identifier) {
        var id = undefined;
        if (typeof identifier === "number") {
            id = this.getIdentifierByIndex(identifier);
        }
        else {
            id = this.getIdentifierByValue(identifier);
        }
        if (!id) {
            throw new Error("Identifier not found: ".concat(identifier));
        }
        return id;
    };
    IdentifierFactory.prototype.getValue = function (identifier) {
        var id = this.getRecord(identifier);
        return Object.values(id)[0];
    };
    IdentifierFactory.prototype.remove = function (idsOrRecords) {
        var e_7, _a, e_8, _b, _c, e_9, _d, _e, _f;
        var removed = new Array();
        if (Array.isArray(idsOrRecords)
            && idsOrRecords.length > 0) {
            try {
                for (var idsOrRecords_2 = __values(idsOrRecords), idsOrRecords_2_1 = idsOrRecords_2.next(); !idsOrRecords_2_1.done; idsOrRecords_2_1 = idsOrRecords_2.next()) {
                    var id = idsOrRecords_2_1.value;
                    var completed = this.remove(id);
                    removed.push.apply(removed, __spreadArray([], __read(completed), false));
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (idsOrRecords_2_1 && !idsOrRecords_2_1.done && (_a = idsOrRecords_2.return)) _a.call(idsOrRecords_2);
                }
                finally { if (e_7) throw e_7.error; }
            }
        }
        else if (idsOrRecords instanceof Map) {
            try {
                for (var _g = __values(idsOrRecords.entries()), _h = _g.next(); !_h.done; _h = _g.next()) {
                    var _j = __read(_h.value, 2), key = _j[0], id = _j[1];
                    if (this.checkIfIdentifierExists(id)) {
                        _super.prototype.delete.call(this, key);
                        removed.push((_c = {}, _c[key] = id, _c));
                    }
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                }
                finally { if (e_8) throw e_8.error; }
            }
        }
        else if (typeof idsOrRecords === 'object') {
            var record = idsOrRecords;
            try {
                for (var _k = __values(Object.entries(record)), _l = _k.next(); !_l.done; _l = _k.next()) {
                    var _m = __read(_l.value, 2), key = _m[0], id = _m[1];
                    if (this.checkIfIdentifierExists(id)) {
                        _super.prototype.delete.call(this, Number(key));
                        removed.push((_e = {}, _e[key] = id, _e));
                    }
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (_l && !_l.done && (_d = _k.return)) _d.call(_k);
                }
                finally { if (e_9) throw e_9.error; }
            }
        }
        else if (typeof idsOrRecords === 'string') {
            var id = idsOrRecords;
            if (this.checkIfIdentifierExists(id)) {
                var key = Number(Object.keys(this.getRecord(id))[0]);
                _super.prototype.delete.call(this, key);
                removed.push((_f = {}, _f[key] = id, _f));
            }
        }
        return removed;
    };
    IdentifierFactory.prototype.create = function (type, _a) {
        var _b = _a === void 0 ? {} : _a, prefix = _b.prefix, suffix = _b.suffix;
        var id = createIdentifier(type, { prefix: prefix, suffix: suffix });
        this.add(id);
        return id;
    };
    return IdentifierFactory;
}(Map));
export { createIdentifier, IdentifierTypes, IdentifierFactory };
//# sourceMappingURL=identifier.js.map