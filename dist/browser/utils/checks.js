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
    if (values !== undefined &&
        values !== null) {
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            if (value === undefined ||
                value === null ||
                value === "") {
                return true;
            }
        }
    }
    else {
        return true;
    }
    return false;
};
export { checkForCircularReference, checkIsEmpty };
