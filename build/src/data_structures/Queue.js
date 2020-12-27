import { defaultCompare, Compare } from "../util";
export class Queue {
    constructor() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }
    enqueue(element) {
        this.items[this.count] = element;
        this.count++;
    }
    dequeue() {
        if (this.isEmpty())
            return undefined;
        const result = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return result;
    }
    peek() {
        if (this.isEmpty())
            return undefined;
        return this.items[this.lowestCount];
    }
    isEmpty() {
        return this.size() === 0;
    }
    size() {
        return this.count - this.lowestCount;
    }
    clear() {
        this.items = {};
        this.count = 0;
        this.lowestCount = 0;
    }
    toString() {
        if (this.isEmpty())
            return '';
        let objString = `${this.items[this.lowestCount]}`;
        for (let i = this.lowestCount + 1; i < this.count; i++)
            objString = `${objString},${this.items[i]}`;
        return objString;
    }
}
export class Deque extends Queue {
    constructor() {
        super();
    }
    addFront(element) {
        if (super.isEmpty()) {
            this.addBack(element);
        }
        else if (this.lowestCount > 0) {
            this.lowestCount--;
            this.items[this.lowestCount] = element;
        }
        else {
            for (let i = this.count; i > 0; i--)
                this.items[i] = this.items[i - 1]; //items[i] is doesn't exist before this step, in this step, items[i] is last one.
            this.count++;
            this.lowestCount = 0;
            this.items[0] = element;
        }
    }
    addBack(element) {
        super.enqueue(element);
    }
    removeFront() {
        return super.dequeue();
    }
    removeBack() {
        if (super.isEmpty())
            return undefined;
        this.count--;
        const result = this.items[this.count];
        delete this.items[this.count];
        return result;
    }
    peekFront() {
        return super.peek();
    }
    peekBack() {
        if (super.isEmpty())
            return undefined;
        return this.items[this.count - 1];
    }
}
export class PriorityQueue {
    constructor(compareFn = defaultCompare, compare = Compare.LESS_THAN) {
        this.compareFn = compareFn;
        this.compare = compare;
        this.items = [];
    }
    enqueue(element) {
        let added = false;
        for (let i = 0; i < this.items.length; i++) {
            if (this.compareFn(element, this.items[i]) === this.compare) {
                this.items.splice(i, 0, element);
                added = true;
                break;
            }
        }
        if (!added)
            this.items.push(element);
    }
    dequeue() {
        return this.items.shift();
    }
    peek() {
        if (this.isEmpty())
            return undefined;
        return this.items[0];
    }
    isEmpty() {
        return this.items.length === 0;
    }
    clear() {
        this.items = [];
    }
    size() {
        return this.items.length;
    }
    toString() {
        if (this.isEmpty())
            return '';
        return this.items.toString();
    }
}
