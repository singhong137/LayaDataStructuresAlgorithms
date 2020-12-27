import { defaultEquals, defaultCompare, Compare } from "../util";
import { Node, DoublyNode } from "./data_models/Node";
export class LinkedList {
    constructor(equalsFn = defaultEquals) {
        this.equalsFn = equalsFn;
        this.count = 0;
    }
    push(element) {
        const node = new Node(element);
        let current;
        if (this.head == null) {
            this.head = node;
        }
        else {
            current = this.head;
            while (current.next != null)
                current = current.next;
            current.next = node;
        }
        this.count++;
    }
    insert(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new Node(element);
            if (index === 0) {
                const current = this.head;
                node.next = current;
                this.head = node;
            }
            else {
                const previous = this.getElementAt(index - 1);
                node.next = previous.next;
                previous.next = node;
            }
            this.count++;
            return true;
        }
        return false;
    }
    getElementAt(index) {
        if (index >= 0 && index <= this.count) {
            let current = this.head;
            for (let i = 0; i < index && current != null; i++)
                current = current.next;
            return current;
        }
        return undefined;
    }
    remove(element) {
        const index = this.indexOf(element);
        return this.removeAt(index);
    }
    indexOf(element) {
        let current = this.head;
        for (let i = 0; i < this.count && current != null; i++) {
            if (this.equalsFn(element, current.element))
                return i;
            current = current.next;
        }
        return -1;
    }
    removeAt(index) {
        if (index >= 0 && index < this.count) {
            let current = this.head;
            if (index === 0) {
                this.head = current.next;
            }
            else {
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                previous.next = current.next;
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }
    isEmpty() {
        return this.size() === 0;
    }
    size() {
        return this.count;
    }
    getHead() {
        return this.head;
    }
    clear() {
        this.head = undefined;
        this.count = 0;
    }
    toString() {
        if (this.head == null)
            return '';
        let objString = `${this.head.element}`;
        let current = this.head.next;
        for (let i = 1; i < this.size() && current != null; i++) {
            objString = `${objString},${current.element}`;
            current = current.next;
        }
        return objString;
    }
}
export class DoublyLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
        super(equalsFn);
        this.equalsFn = equalsFn;
    }
    push(element) {
        const node = new DoublyNode(element);
        if (this.head == null) {
            this.head = node;
            this.tail = node;
        }
        else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
        this.count++;
    }
    insert(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new DoublyNode(element);
            let current = this.head;
            if (index == 0) {
                if (this.head == null) {
                    this.head = node;
                    this.tail = node;
                }
                else {
                    node.next = this.head;
                    this.head.prev = node;
                    this.head = node;
                }
            }
            else if (index === this.count) {
                current = this.tail;
                current.next = node;
                node.prev = current;
                this.tail = node;
            }
            else {
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                node.next = current;
                previous.next = node;
                current.prev = node;
                node.prev = previous;
            }
            this.count++;
            return true;
        }
        return false;
    }
    removeAt(index) {
        if (index >= 0 && index < this.count) {
            let current = this.head;
            if (index === 0) {
                this.head = this.head.next;
                if (this.count === 1) {
                    this.tail = undefined;
                }
                else {
                    this.head.prev = undefined;
                }
            }
            else if (index === this.count - 1) {
                current = this.tail;
                this.tail = current.prev;
                this.tail.next = undefined;
            }
            else {
                current = this.getElementAt(index);
                const previous = current.prev;
                previous.next = current.next;
                current.next.prev = previous;
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }
    getHead() {
        return this.head;
    }
    getTail() {
        return this.tail;
    }
    clear() {
        super.clear();
        this.tail = undefined;
    }
    inverseToString() {
        if (this.tail == null)
            return '';
        let objString = `${this.tail.element}`;
        let previous = this.tail.prev;
        while (previous != null) {
            objString = `${objString},${previous.element}`;
            previous = previous.prev;
        }
        return objString;
    }
}
export class CircularLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
        super(equalsFn);
        this.equalsFn = equalsFn;
    }
    push(element) {
        const node = new Node(element);
        let current;
        if (this.head == null) {
            this.head = node;
        }
        else {
            current = this.getElementAt(this.size() - 1);
            current.next = node;
        }
        node.next = this.head;
        this.count++;
    }
    insert(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new Node(element);
            let current = this.head;
            if (index === 0) {
                if (this.head == null) {
                    this.head = node;
                    node.next = this.head;
                }
                else {
                    node.next = current;
                    current = this.getElementAt(this.size());
                    this.head = node;
                    current.next = this.head;
                }
            }
            else {
                const previous = this.getElementAt(index - 1);
                node.next = previous.next;
                previous.next = node;
            }
            this.count++;
            return true;
        }
        return false;
    }
    removeAt(index) {
        if (index >= 0 && index < this.count) {
            let current = this.head;
            if (index === 0) {
                if (this.size() === 1) {
                    this.head = undefined;
                }
                else {
                    const removed = this.head;
                    current = this.getElementAt(this.size() - 1);
                    this.head = this.head.next;
                    current.next = this.head;
                    current = removed; //current is old head,can used to return
                }
            }
            else {
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                previous.next = current.next;
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }
}
export class SortedLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals, compareFn = defaultCompare) {
        super(equalsFn);
        this.equalsFn = equalsFn;
        this.compareFn = compareFn;
    }
    push(element) {
        if (this.isEmpty()) {
            super.push(element);
        }
        else {
            const index = this.getIndexNextSortedElement(element);
            super.insert(element, index);
        }
    }
    insert(element, index = 0) {
        if (this.isEmpty())
            return super.insert(element, 0); //2
        index = this.getIndexNextSortedElement(element); //3
        return super.insert(element, index); //4
    }
    getIndexNextSortedElement(element) {
        let current = this.head;
        let i = 0;
        for (; i < this.size() && current; i++) {
            const comp = this.compareFn(element, current.element); //5
            if (comp === Compare.LESS_THAN)
                return i; //6
            current = current.next;
        }
        return i; //7
    }
}
export class StackLinkedList {
    constructor() {
        this.items = new DoublyLinkedList();
    }
    push(element) {
        this.items.push(element);
    }
    pop() {
        if (this.isEmpty())
            return undefined;
        const result = this.items.removeAt(this.size() - 1);
        return result;
    }
    peek() {
        if (this.isEmpty())
            return undefined;
        return this.items.getElementAt(this.size() - 1).element;
    }
    isEmpty() {
        return this.items.isEmpty();
    }
    size() {
        return this.items.size();
    }
    clear() {
        this.items.clear();
    }
    toString() {
        return this.items.toString();
    }
}
