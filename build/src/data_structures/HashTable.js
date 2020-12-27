import { ValuePair, ValuePairLazy } from "./data_models/Value-pair";
import { default2String } from "../util";
import { LinkedList } from "./LinkedList";
export class HashTable {
    constructor(toStrFn = default2String) {
        this.toStrFn = toStrFn;
        // this.table = this.tableType;
        this.table = {};
    }
    loseloseHashCode(key) {
        if (typeof key === 'number')
            return key;
        const tableKey = this.toStrFn(key);
        let hash = 0;
        for (let i = 0; i < tableKey.length; i++)
            hash += tableKey.charCodeAt(i);
        return hash % 37;
    }
    djb2HashCode(key) {
        const tableKey = this.toStrFn(key);
        let hash = 5381;
        for (let i = 0; i < tableKey.length; i++)
            hash = (hash * 33) + tableKey.charCodeAt(i);
        return hash % 1013;
    }
    hashCode(key) {
        return this.loseloseHashCode(key);
    }
    put(key, value) {
        if (key != null && value != null) {
            const position = this.hashCode(key);
            this.table[position] = new ValuePair(key, value);
            return true;
        }
        return false;
    }
    get(key) {
        const valuePai = this.table[this.hashCode(key)];
        return valuePai == null ? undefined : valuePai.value;
    }
    remove(key) {
        const hash = this.hashCode(key);
        const valuePair = this.table[hash];
        if (valuePair != null) {
            delete this.table[hash];
            return true;
        }
        return false;
    }
    getTable() {
        return this.table;
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
        const keys = Object.keys(this.table);
        let objString = `{${keys[0]}=>${this.table[keys[0]].toString()}}`;
        for (let i = 1; i < keys.length; i++)
            objString = `${objString},{${keys[i]}=>${this.table[keys[i]].toString()}}`;
        return objString;
    }
}
export class HashTableSeparateChaining {
    constructor(toStrFn = default2String) {
        this.toStrFn = toStrFn;
        this.table = {};
    }
    loseloseHashCode(key) {
        if (typeof key === 'number')
            return key;
        const tableKey = this.toStrFn(key);
        let hash = 0;
        for (let i = 0; i < tableKey.length; i++)
            hash += tableKey.charCodeAt(i);
        return hash % 37;
    }
    djb2HashCode(key) {
        const tableKey = this.toStrFn(key);
        let hash = 5381;
        for (let i = 0; i < tableKey.length; i++)
            hash = (hash * 33) + tableKey.charCodeAt(i);
        return hash % 1013;
    }
    hashCode(key) {
        return this.loseloseHashCode(key);
    }
    put(key, value) {
        if (key != null && value != null) {
            const position = this.hashCode(key);
            if (this.table[position] == null)
                this.table[position] = new LinkedList();
            this.table[position].push(new ValuePair(key, value));
            return true;
        }
        return false;
    }
    get(key) {
        const position = this.hashCode(key);
        const linkedList = this.table[position];
        if (linkedList != null && !linkedList.isEmpty()) {
            let current = linkedList.getHead();
            while (current != null) {
                if (current.element.key === key)
                    return current.element.value;
                current = current.next;
            }
        }
        return undefined;
    }
    remove(key) {
        const position = this.hashCode(key);
        const linkedList = this.table[position];
        if (linkedList != null && !linkedList.isEmpty()) {
            let current = linkedList.getHead();
            while (current != null) {
                if (current.element.key === key) {
                    linkedList.remove(current.element);
                    if (linkedList.isEmpty())
                        delete this.table[position];
                    return true;
                }
                current = current.next;
            }
        }
        return false;
    }
    getTable() {
        return this.table;
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
        const keys = Object.keys(this.table);
        let objString = `{${keys[0]}=>${this.table[keys[0]].toString()}}`;
        for (let i = 1; i < keys.length; i++)
            objString = `${objString},{${keys[i]}=>${this.table[keys[i]].toString()}}`;
        return objString;
    }
}
export class HashTableLinearProbing {
    constructor(toStrFn = default2String) {
        this.toStrFn = toStrFn;
        this.table = {};
    }
    loseloseHashCode(key) {
        if (typeof key === 'number')
            return key;
        const tableKey = this.toStrFn(key);
        let hash = 0;
        for (let i = 0; i < tableKey.length; i++)
            hash += tableKey.charCodeAt(i);
        return hash % 37;
    }
    djb2HashCode(key) {
        const tableKey = this.toStrFn(key);
        let hash = 5381;
        for (let i = 0; i < tableKey.length; i++)
            hash = (hash * 33) + tableKey.charCodeAt(i);
        return hash % 1013;
    }
    hashCode(key) {
        return this.loseloseHashCode(key);
    }
    put(key, value) {
        if (key != null && value != null) {
            const position = this.hashCode(key);
            if (this.table[position] == null) {
                this.table[position] = new ValuePair(key, value);
            }
            else {
                let index = position + 1;
                while (this.table[index] != null)
                    index++;
                this.table[index] = new ValuePair(key, value);
            }
            return true;
        }
        return false;
    }
    get(key) {
        const position = this.hashCode(key);
        if (this.table[position] != null) {
            if (this.table[position].key === key)
                return this.table[position].value;
            let index = position + 1;
            while (this.table[index] != null && this.table[index].key !== key)
                index++;
            if (this.table[index] != null && this.table[index].key === key)
                return this.table[position].value;
        }
        return undefined;
    }
    remove(key) {
        const position = this.hashCode(key);
        if (this.table[position] != null) {
            if (this.table[position].key === key) {
                delete this.table[position];
                this.verifyRemoveSideEffect(key, position);
                return true;
            }
            let index = position + 1;
            while (this.table[index] != null && this.table[index].key !== key)
                index++;
            if (this.table[index] != null && this.table[index].key === key) {
                delete this.table[index];
                this.verifyRemoveSideEffect(key, index);
                return true;
            }
        }
        return false;
    }
    verifyRemoveSideEffect(key, removedPosition) {
        const hash = this.hashCode(key);
        let index = removedPosition + 1;
        while (this.table[index] != null) {
            const posHash = this.hashCode(this.table[index].key);
            if (posHash <= hash || posHash <= removedPosition) {
                this.table[removedPosition] = this.table[index];
                delete this.table[index];
                removedPosition = index;
            }
            index++;
        }
    }
    getTable() {
        return this.table;
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
        const keys = Object.keys(this.table);
        let objString = `{${keys[0]}=>${this.table[keys[0]].toString()}}`;
        for (let i = 1; i < keys.length; i++)
            objString = `${objString},{${keys[i]}=>${this.table[keys[i]].toString()}}`;
        return objString;
    }
}
export class HashTableLinearProbingLazy {
    constructor(toStrFn = default2String) {
        this.toStrFn = toStrFn;
        this.table = {};
    }
    loseloseHashCode(key) {
        if (typeof key === 'number')
            return key;
        const tableKey = this.toStrFn(key);
        let hash = 0;
        for (let i = 0; i < tableKey.length; i++)
            hash += tableKey.charCodeAt(i);
        return hash % 37;
    }
    djb2HashCode(key) {
        const tableKey = this.toStrFn(key);
        let hash = 5381;
        for (let i = 0; i < tableKey.length; i++)
            hash = (hash * 33) + tableKey.charCodeAt(i);
        return hash % 1013;
    }
    hashCode(key) {
        return this.loseloseHashCode(key);
    }
    put(key, value) {
        if (key != null && value != null) {
            const position = this.hashCode(key);
            if (this.table[position] == null || (this.table[position] != null && this.table[position].isDeleted)) {
                this.table[position] = new ValuePairLazy(key, value);
            }
            else {
                let index = position + 1;
                while (this.table[index] != null && !this.table[position].isDeleted)
                    index++;
                this.table[index] = new ValuePairLazy(key, value);
            }
            return true;
        }
        return false;
    }
    get(key) {
        const position = this.hashCode(key);
        if (this.table[position] != null) {
            if (this.table[position].key === key && !this.table[position].isDeleted)
                return this.table[position].value;
            let index = position + 1;
            while (this.table[index] != null && (this.table[index].key !== key || this.table[index].isDeleted)) {
                if (this.table[index].key === key && this.table[index].isDeleted)
                    return undefined;
                index++;
            }
            if (this.table[index] != null && this.table[index].key === key && !this.table[index].isDeleted)
                return this.table[position].value;
        }
        return undefined;
    }
    remove(key) {
        const position = this.hashCode(key);
        if (this.table[position] != null) {
            if (this.table[position].key === key && !this.table[position].isDeleted) {
                this.table[position].isDeleted = true;
                return true;
            }
            let index = position + 1;
            while (this.table[index] != null && (this.table[index].key !== key || this.table[index].isDeleted))
                index++;
            if (this.table[index] != null && this.table[index].key === key && !this.table[index].isDeleted) {
                this.table[index].isDeleted = true;
                return true;
            }
        }
        return false;
    }
    getTable() {
        return this.table;
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
        const keys = Object.keys(this.table);
        let objString = `{${keys[0]}=>${this.table[keys[0]].toString()}}`;
        for (let i = 1; i < keys.length; i++)
            objString = `${objString},{${keys[i]}=>${this.table[keys[i]].toString()}}`;
        return objString;
    }
}
