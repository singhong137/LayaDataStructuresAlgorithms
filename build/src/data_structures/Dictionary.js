import { ValuePair } from "./data_models/Value-pair";
import { default2String } from "../util";
export default class Dictionary {
    constructor(toStrFn = default2String) {
        this.toStrFn = toStrFn;
        this.table = {};
    }
    set(key, value) {
        if (key != null && value != null) {
            const tableKey = this.toStrFn(key);
            this.table[tableKey] = new ValuePair(key, value);
            return true;
        }
        return false;
    }
    get(key) {
        const valuePair = this.table[this.toStrFn(key)];
        return valuePair == null ? undefined : valuePair.value;
    }
    hasKey(key) {
        return this.table[this.toStrFn(key)] != null;
    }
    remove(key) {
        if (this.hasKey(key)) {
            delete this.table[this.toStrFn(key)];
            return true;
        }
        return false;
    }
    values() {
        return this.keyValues().map((valuePair) => valuePair.value);
    }
    keys() {
        return this.keyValues().map((valuePair) => valuePair.key);
    }
    keyValues() {
        const valuePairs = [];
        for (const k in this.table)
            if (this.hasKey(k))
                valuePairs.push(this.table[k]);
        return valuePairs;
    }
    forEach(callbackFn) {
        const valuePairs = this.keyValues();
        for (let i = 0; i < valuePairs.length; i++) {
            const result = callbackFn(valuePairs[i].key, valuePairs[i].value);
            if (result === false)
                break;
        }
    }
    isEmpty() {
        return this.size() === 0;
    }
    size() {
        return Object.keys(this.table).length;
    }
    clear() {
        this.table = {};
    }
    toString() {
        if (this.isEmpty())
            return '';
        const valuePairs = this.keyValues();
        let objString = `${valuePairs[0].toString()}`;
        for (let i = 1; i < valuePairs.length; i++)
            objString = `${objString},${valuePairs[i].toString()}`;
        return objString;
    }
}
