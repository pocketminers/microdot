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
var checkForCircularReference = function (obj) {
    var seen = new WeakSet();
    var hasCircular = function (obj) {
        if (obj !== null && typeof obj === "object") {
            if (seen.has(obj)) {
                return true;
            }
            seen.add(obj);
            for (var key in obj) {
                if (hasCircular(obj[key])) {
                    return true;
                }
            }
        }
        return false;
    };
    return hasCircular(obj);
};
var checkIsEmpty = function (values) {
    var e_1, _a;
    if (values !== undefined &&
        values !== null) {
        try {
            for (var values_1 = __values(values), values_1_1 = values_1.next(); !values_1_1.done; values_1_1 = values_1.next()) {
                var value = values_1_1.value;
                if (value === undefined ||
                    value === null ||
                    value === "") {
                    return true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (values_1_1 && !values_1_1.done && (_a = values_1.return)) _a.call(values_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    else {
        return true;
    }
    return false;
};
export { checkForCircularReference, checkIsEmpty };
//# sourceMappingURL=checks.js.map