export const DOES_NOT_EXIST = -1;
export var Compare;
(function (Compare) {
    Compare[Compare["LESS_THAN"] = -1] = "LESS_THAN";
    Compare[Compare["BIGGER_THAN"] = 1] = "BIGGER_THAN";
    Compare[Compare["EQUALS"] = 0] = "EQUALS";
})(Compare || (Compare = {}));
export var Colors;
(function (Colors) {
    Colors[Colors["WHITE"] = 0] = "WHITE";
    Colors[Colors["GRAY"] = 1] = "GRAY";
    Colors[Colors["BLACK"] = 2] = "BLACK";
})(Colors || (Colors = {}));
export function defaultEquals(a, b) {
    return a === b;
}
export function defaultCompare(a, b) {
    if (a === b)
        return Compare.EQUALS;
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}
export function default2String(item) {
    if (item === null) {
        return 'NULL';
    }
    else if (item === undefined) {
        return 'UNDEFINED';
    }
    else if (typeof item === 'string' || item instanceof String) {
        return `${item}`;
    }
    item.toString();
}
export function swap(array, a, b) {
    [array[a], array[b]] = [array[b], array[a]];
}
export function reverseCompare(compareFn) {
    return (a, b) => compareFn(b, a);
}
