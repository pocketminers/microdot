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
import { Argument } from "./argument";
import { Parameter } from "./parameter";
var PropertyStore = /** @class */ (function (_super) {
    __extends(PropertyStore, _super);
    function PropertyStore(items) {
        var e_1, _a;
        if (items === void 0) { items = []; }
        if (!Array.isArray(items)) {
            throw new TypeError("Items must be an array");
        }
        if (!PropertyStore.hasUniqueNames({ items: items })) {
            throw new Error("Items must have unique names");
        }
        var artifacts = [];
        try {
            for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                var item = items_1_1.value;
                artifacts.push(PropertyStore.fromEntry(item));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return _super.apply(this, __spreadArray([], __read(artifacts), false)) || this;
    }
    PropertyStore.hasUniqueNames = function (_a) {
        var e_2, _b;
        var items = _a.items;
        var names = new Set();
        try {
            for (var items_2 = __values(items), items_2_1 = items_2.next(); !items_2_1.done; items_2_1 = items_2.next()) {
                var item = items_2_1.value;
                if (names.has(item.name)) {
                    return false;
                }
                names.add(item.name);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (items_2_1 && !items_2_1.done && (_b = items_2.return)) _b.call(items_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return true;
    };
    PropertyStore.fromEntry = function (entry) {
        if (Object.prototype.hasOwnProperty.call(entry, 'value')) {
            return new Argument(entry);
        }
        else if (Object.prototype.hasOwnProperty.call(entry, 'defaultValue')) {
            return new Parameter(entry);
        }
        else {
            throw new Error("Entry must have a unique name");
        }
    };
    PropertyStore.prototype.addEntry = function (entry) {
        var artifact = PropertyStore.fromEntry(entry);
        this.addArtifact(artifact);
    };
    PropertyStore.prototype.addArtifact = function (artifact) {
        if (this.getEntry(artifact.getName())) {
            throw new Error("Entry already exists: ".concat(artifact.getName()));
        }
        this.push(artifact);
    };
    PropertyStore.prototype.add = function (artifactsOrEntries) {
        var e_3, _a;
        try {
            for (var artifactsOrEntries_1 = __values(artifactsOrEntries), artifactsOrEntries_1_1 = artifactsOrEntries_1.next(); !artifactsOrEntries_1_1.done; artifactsOrEntries_1_1 = artifactsOrEntries_1.next()) {
                var item = artifactsOrEntries_1_1.value;
                if (item instanceof Argument || item instanceof Parameter) {
                    this.addArtifact(item);
                }
                else {
                    this.addEntry(item);
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (artifactsOrEntries_1_1 && !artifactsOrEntries_1_1.done && (_a = artifactsOrEntries_1.return)) _a.call(artifactsOrEntries_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    PropertyStore.prototype.getEntry = function (name) {
        return this.find(function (entry) { return entry.getName() === name; });
    };
    PropertyStore.prototype.getEntries = function () {
        return this;
    };
    PropertyStore.prototype.getNames = function () {
        var e_4, _a;
        var names = [];
        try {
            for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                var entry = _c.value;
                names.push(entry.getName());
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return names;
    };
    PropertyStore.prototype.removeEntryByName = function (name) {
        var index = this.findIndex(function (entry) { return entry.getName() === name; });
        try {
            if (index !== -1) {
                this.splice(index, 1);
            }
        }
        catch (error) {
            throw new Error("Error removing entry: ".concat(name));
        }
    };
    PropertyStore.prototype.removeEntry = function (entry) {
        this.removeEntryByName(entry.getName());
    };
    PropertyStore.prototype.updateEntry = function (entry) {
        var index = this.findIndex(function (item) { return item.getName() === entry.getName(); });
        if (index === -1) {
            throw new Error("Entry not found: ".concat(entry.getName()));
        }
        this[index] = entry;
    };
    return PropertyStore;
}(Array));
export { PropertyStore };
//# sourceMappingURL=store.js.map