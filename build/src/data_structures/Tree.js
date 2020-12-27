import { TreeNode, RedBlackNode, Colors } from "./data_models/Node";
import { defaultCompare, Compare } from "../util";
export class BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn;
    }
    insert(key) {
        if (this.root == null) {
            this.root = new TreeNode(key);
        }
        else {
            this.insertNode(this.root, key);
        }
    }
    insertNode(node, key) {
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            if (node.left == null) {
                node.left = new TreeNode(key);
            }
            else {
                this.insertNode(node.left, key);
            }
        }
        else if (node.right == null) {
            node.right = new TreeNode(key);
        }
        else {
            this.insertNode(node.right, key);
        }
    }
    getRoot() {
        return this.root;
    }
    search(key) {
        return this.searchNode(this.root, key);
    }
    searchNode(node, key) {
        if (node == null)
            return false;
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            return this.searchNode(node.left, key);
        }
        else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            return this.searchNode(node.right, key);
        }
        return true;
    }
    inOrderTraverse(callback) {
        this.inOrderTraverseNode(this.root, callback);
    }
    inOrderTraverseNode(node, callback) {
        if (node != null) {
            this.inOrderTraverseNode(node.left, callback);
            callback(node.key);
            this.inOrderTraverseNode(node.right, callback);
        }
    }
    preOrderTraverse(callback) {
        this.preOrderTraverseNode(this.root, callback);
    }
    preOrderTraverseNode(node, callback) {
        if (node != null) {
            callback(node.key);
            this.preOrderTraverseNode(node.left, callback);
            this.preOrderTraverseNode(node.right, callback);
        }
    }
    postOrderTraverse(callback) {
        this.postOrderTraverseNode(this.root, callback);
    }
    postOrderTraverseNode(node, callback) {
        if (node != null) {
            this.postOrderTraverseNode(node.left, callback);
            this.postOrderTraverseNode(node.right, callback);
            callback(node.key);
        }
    }
    min() {
        return this.minNode(this.root);
    }
    minNode(node) {
        let current = node;
        while (current != null && current.left != null)
            current = current.left;
        return current;
    }
    max() {
        return this.maxNode(this.root);
    }
    maxNode(node) {
        let current = node;
        while (current != null && current.right != null)
            current = current.right;
        return current;
    }
    remove(key) {
        return this.root = this.removeNode(this.root, key);
    }
    removeNode(node, key) {
        if (node == null)
            return null;
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            node.left = this.removeNode(node.left, key);
            return node;
        }
        else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            node.right = this.removeNode(node.right, key);
            return node;
        }
        else {
            // one leaf node
            if (node.left == null && node.right == null) {
                node = null;
                return node;
            }
            // one node with only one child
            if (node.left == null) {
                node = node.right;
                return node;
            }
            else if (node.right == null) {
                node = node.left;
                return node;
            }
            //one node with two children
            const aux = this.minNode(node.right);
            node.key = aux.key;
            node.right = this.removeNode(node.right, aux.key);
            return node;
        }
    }
}
var BalanceFactor;
(function (BalanceFactor) {
    BalanceFactor[BalanceFactor["UNBALANCED_RIGHT"] = 1] = "UNBALANCED_RIGHT";
    BalanceFactor[BalanceFactor["SLIGHTLY_UNBALANCED_RIGHT"] = 2] = "SLIGHTLY_UNBALANCED_RIGHT";
    BalanceFactor[BalanceFactor["BALANCED"] = 3] = "BALANCED";
    BalanceFactor[BalanceFactor["SLIGHTLY_UNBALANCED_LEFT"] = 4] = "SLIGHTLY_UNBALANCED_LEFT";
    BalanceFactor[BalanceFactor["UNBALANCED_LEFT"] = 5] = "UNBALANCED_LEFT";
})(BalanceFactor || (BalanceFactor = {}));
export class AVLTree extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        super(compareFn);
        this.compareFn = compareFn;
    }
    getNodeHeight(node) {
        if (node == null)
            return -1;
        return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1;
    }
    /**
     * Left left case: rotate right
     *
     *         b                           a
     *        / \                         / \
     *       a   e  -> rotationLL(b)->   c   b
     *      / \                         /   / \
     *     c   d                       f   d   e
     *    /
     *   f
     *
     */
    rotationLL(node) {
        const tmp = node.left; //tmp=a
        node.left = tmp.right; //b.left=a.right=d
        tmp.right = node; //a.right=b
        return tmp; //top=a
    }
    /**
     * Right right case: rotate right
     *
     *     a                                b
     *    / \                              / \
     *   c   b      -> rotationRR(a)->    a   e
     *      / \                          / \   \
     *     d   e                        c   d   f
     *          \
     *           f
     *
     */
    rotationRR(node) {
        const tmp = node.right; //tmp=b
        node.right = tmp.left; //a.right=b.left=d
        tmp.left = node; //b.left=a
        return tmp; //top=b
    }
    /**
     * Left right case: rotate left then right
     *
     *         b                              b                            d
     *        / \                            / \                          / \
     *       a   e  -> rotationRR(a)->      d   e  -> rotationLL(b)->    a   b
     *      / \                            / \                          /   / \
     *     c   d                          a   f                        c   f   e
     *          \                        /
     *           f                      c
     *
     */
    rotationLR(node) {
        node.left = this.rotationRR(node.left);
        return this.rotationLL(node);
    }
    /**
     * Right left case: rotate right then left
     *
     *         b                           b                               c
     *        / \                         / \                             / \
     *       a   e  -> rotationLL(e)->   a   c     -> rotationRR(b)->    b   e
     *          / \                         / \                         / \   \
     *         c   d                       f   e                       a   f   d
     *        /                                 \
     *       f                                   d
     *
     */
    rotationRL(node) {
        node.right = this.rotationLL(node.right);
        return this.rotationRR(node);
    }
    getBalanceFactor(node) {
        const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
        switch (heightDifference) {
            case -2: return BalanceFactor.UNBALANCED_RIGHT;
            case -1: return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
            case 1: return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
            case 2: return BalanceFactor.UNBALANCED_LEFT;
            default: return BalanceFactor.BALANCED;
        }
    }
    insert(key) {
        this.root = this.insertNode(this.root, key);
    }
    insertNode(node, key) {
        if (node == null) {
            return new TreeNode(key);
        }
        else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            node.left = this.insertNode(node.left, key);
        }
        else if (this.compareFn(key, node.key) == Compare.BIGGER_THAN) {
            node.right = this.insertNode(node.right, key);
        }
        else {
            return node;
        }
        const balanceState = this.getBalanceFactor(node);
        if (balanceState === BalanceFactor.UNBALANCED_LEFT) {
            if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
                node = this.rotationLL(node);
            }
            else {
                return this.rotationLR(node);
            }
        }
        if (balanceState === BalanceFactor.UNBALANCED_RIGHT) {
            if (this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) {
                node = this.rotationRR(node);
            }
            else {
                return this.rotationRL(node);
            }
        }
        return node;
    }
    removeNode(node, key) {
        if (node == null)
            return null;
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            node.left = this.removeNode(node.left, key); //The key to be deleted is in the left sub-tree
        }
        else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            node.right = this.removeNode(node.right, key); //this key to be deleted is in the right sub-tree
        }
        else { //node is the node to be deleted
            if (node.left == null && node.right == null) {
                node = null;
            }
            else if (node.left == null && node.right != null) {
                node = node.right;
            }
            else if (node.left != null && node.right == null) {
                node = node.left;
            }
            else { //node has 2 children,get the in-order successor. same to BinarySearchTree.removeNode function's  'one node with two children' case
                const inOrderSuccessor = this.minNode(node.right);
                node.key = inOrderSuccessor.key;
                node.right = this.removeNode(node.right, inOrderSuccessor.key);
            }
        }
        if (node == null)
            return node; //help to recursive
        const balanceState = this.getBalanceFactor(node); // verify if tree is balanced
        if (balanceState === BalanceFactor.UNBALANCED_LEFT) {
            if (this.getBalanceFactor(node.left) === BalanceFactor.BALANCED || this.getBalanceFactor(node.left) === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
                return this.rotationLL(node);
            }
            if (this.getBalanceFactor(node.left) === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
                return this.rotationLR(node.left);
            }
        }
        if (balanceState === BalanceFactor.UNBALANCED_RIGHT) {
            if (this.getBalanceFactor(node.right) === BalanceFactor.BALANCED || this.getBalanceFactor(node.right) === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
                return this.rotationRR(node);
            }
            if (this.getBalanceFactor(node.right) === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
                return this.rotationRL(node.right);
            }
        }
        return node;
    }
}
export class RedBlackTree extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        super();
        this.compareFn = compareFn;
    }
    /**
   * Left left case: rotate right
   *
   *       b                           a
   *      / \                         / \
   *     a   e -> rotationLL(b) ->   c   b
   *    / \                             / \
   *   c   d                           d   e
   *
   */
    rotationLL(node) {
        const tmp = node.left;
        node.left = tmp.right;
        if (tmp.right && tmp.right.key)
            tmp.right.parent = node;
        tmp.parent = node.parent;
        if (!node.parent) {
            this.root = tmp;
        }
        else {
            if (node === node.parent.left) {
                node.parent.left = tmp;
            }
            else {
                node.parent.right = tmp;
            }
        }
        tmp.right = node;
        node.parent = tmp;
    }
    /**
   * Right right case: rotate left
   *
   *     a                              b
   *    / \                            / \
   *   c   b   -> rotationRR(a) ->    a   e
   *      / \                        / \
   *     d   e                      c   d
   *
   */
    rotationRR(node) {
        const tmp = node.right;
        node.right = tmp.left;
        if (tmp.left && tmp.left.key)
            tmp.left.parent = node;
        tmp.parent = node.parent;
        if (!node.parent) {
            this.root = tmp;
        }
        else {
            if (node === node.parent.left) {
                node.parent.left = tmp;
            }
            else {
                node.parent.right = tmp;
            }
        }
        tmp.left = node;
        node.parent = tmp;
    }
    insert(key) {
        if (this.root == null) {
            this.root = new RedBlackNode(key);
            this.root.color = Colors.BLACK;
        }
        else {
            const newNode = this.insertNode(this.root, key);
            this.fixTreeProperties(newNode);
        }
    }
    insertNode(node, key) {
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            if (node.left == null) {
                node.left = new RedBlackNode(key);
                node.left.parent = node;
                return node.left;
            }
            else {
                return this.insertNode(node.left, key);
            }
        }
        else if (node.right == null) {
            node.right = new RedBlackNode(key);
            node.right.parent = node;
            return node.right;
        }
        else {
            return this.insertNode(node.right, key);
        }
    }
    fixTreeProperties(node) {
        while (node && node.parent && node.parent.color === Colors.RED && node.color !== Colors.BLACK) {
            let parent = node.parent;
            const grandParent = parent.parent;
            if (grandParent && grandParent.left === parent) { // case A: parent is left child of grand parent
                const uncle = grandParent.right;
                if (uncle && uncle.color === Colors.RED) { //case 1:uncle of node is also red -only recoloring
                    grandParent.color = Colors.RED;
                    uncle.color = Colors.BLACK;
                    node = grandParent;
                }
                else {
                    if (node === parent.right) { // case 2: node is right child - left rotate
                        this.rotationRR(parent);
                        node = parent;
                        parent = node.parent;
                    }
                    this.rotationLL(grandParent); // case 3: node is left child - right rotate
                    parent.color = Colors.BLACK;
                    grandParent.color = Colors.RED;
                    node = parent;
                }
            }
            else { // case B: parent is right child of grand parent
                const uncle = grandParent.left;
                if (uncle && uncle.color === Colors.RED) { // case 1: uncle is read - only recoloring
                    grandParent.color = Colors.RED;
                    parent.color = Colors.BLACK;
                    uncle.color = Colors.BLACK;
                    node = grandParent;
                }
                else {
                    if (node === parent.left) { // case 2: node is left child - left rotate
                        this.rotationLL(parent);
                        node = parent;
                        parent = node.parent;
                    }
                    this.rotationRR(grandParent); // case 3: node is right child - left rotate
                    parent.color = Colors.BLACK;
                    grandParent.color = Colors.RED;
                    node = parent;
                }
            }
        }
        this.root.color = Colors.BLACK;
    }
    getRoot() {
        return this.root;
    }
}
