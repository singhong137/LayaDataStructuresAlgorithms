export class Node {
    constructor(element, next) {
        this.element = element;
        this.next = next;
    }
}
export class DoublyNode extends Node {
    constructor(element, next, prev) {
        super(element, next);
        this.element = element;
        this.next = next;
        this.prev = prev;
    }
}
export class TreeNode {
    constructor(key) {
        this.key = key;
    }
    toString() {
        return `${this.key}`;
    }
}
export var Colors;
(function (Colors) {
    Colors[Colors["RED"] = 0] = "RED";
    Colors[Colors["BLACK"] = 1] = "BLACK";
})(Colors || (Colors = {}));
export class RedBlackNode extends TreeNode {
    constructor(key) {
        super(key);
        this.key = key;
        this.color = Colors.RED;
    }
    isRed() {
        return this.color === Colors.RED;
    }
    flipColor() {
        this.color === Colors.RED ? this.color = Colors.BLACK : this.color = Colors.RED;
    }
}
