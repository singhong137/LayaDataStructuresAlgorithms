window.Laya=window.Laya||{};

(function (Laya) {
    'use strict';

    class Start extends Laya.Script {
        constructor() {
            super();
        }
        onEnable() {
        }
        onClick() {
            Laya.Scene.open('test/box2d.scene');
        }
    }

    class Go2StartScene extends Laya.Script {
        constructor() {
            super();
        }
        onEnable() {
        }
        onClick() {
            Laya.Scene.open('Start.scene');
        }
    }

    const lele = 3.14;
    class UnitConsole extends Laya.Script {
        constructor() {
            super();
            const lalala = 9;
        }
        onEnable() {
            console.time('a1');
            let aa = 1;
            for (let i = 0; i < 1000; i++) {
                aa *= 2;
            }
            console.timeEnd('a1');
            console.time('a2');
            let bb = 1;
            for (let j = 0; j < 1000; j++) {
                bb << 1;
            }
            console.timeEnd('a2');
            console.log(lele);
            let [a, b] = [1, 2];
            console.log(a, ' / ', b);
            [a, b] = [b, a];
            console.log(a, ' / ', b);
            let c = Math.pow(a, 3);
            console.log(`c:${c}`);
            const fibonacci = [];
            fibonacci[0] = 1;
            fibonacci[1] = 1;
            for (let i = 2; i < 20; i++) {
                fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
            }
            console.log(fibonacci);
            fibonacci.splice(5, 0, -1, -2, -3);
            console.log(fibonacci);
            let tm = [
                [1, 2],
                [3, 4],
                [5, 6]
            ];
            for (let i = 0; i < tm.length; i++) {
                for (let j = 0; j < tm[0].length; j++) {
                    console.log(tm[i][j]);
                }
            }
            console.table(tm);
            const m333 = [];
            for (let i = 0; i < 3; i++) {
                m333[i] = [];
                for (let j = 0; j < 3; j++) {
                    m333[i][j] = [];
                    for (let k = 0; k < 3; k++) {
                        m333[i][j][k] = i + j + k;
                    }
                }
            }
            console.log(m333);
            console.table(m333);
            let cc = [1, 3, 5, 7, 8];
            let mtc = (x) => {
                console.log(x);
                return x % 2 === 0;
            };
            console.log('every:', cc.every(mtc));
            console.log('some', cc.some(mtc));
            console.log('---------');
            cc.forEach((a, b, c) => { a *= 2; console.log(a, b, c); });
            console.log(cc);
            console.log('map:', cc.map(mtc));
            console.log('filter:', cc.filter(mtc));
            console.log('reduce:', cc.reduce((m, n) => { return m + n; }));
            let dd = [1, 2, 3, 4, 5];
            let iterator = cc[Symbol.iterator]();
            console.log(iterator);
            for (let i = 0; i < 5; i++)
                console.log(iterator.next().value);
            console.log('---------');
            iterator = cc[Symbol.iterator]();
            for (let nn of iterator)
                console.log(nn);
            let [entries, keys, values] = [cc.entries(), cc.keys(), cc.values()];
            for (let i of entries)
                console.log('entries:', i);
            for (let i of keys)
                console.log('keys:', i);
            for (let i of values)
                console.log('values:', i);
            let ee = Array.from(cc);
            console.log('from:', ee);
            let ff = Array.from(ee, a => a % 2 == 1);
            console.log('from cb:', ff);
            let gg = Array.of(1);
            gg = Array.of(...ee);
            console.log('of:', gg);
            let hh = Array.of(...gg);
            hh.fill(0);
            console.log('fill:', hh);
            let ii = Array.from(gg);
            ii.copyWithin(0, 3);
            console.log('copyWithin:', ii);
            let jj = new Array(15);
            jj.fill(1);
            for (let i = 0; i < 15; i++)
                jj[i] = jj[i] + i;
            let multiple3 = (a, b, c) => { return a % 3 == 0; };
            console.log(jj);
            console.log('find:', jj.find(multiple3));
            console.log('findIndex:', jj.findIndex(multiple3));
            const friends = [
                { name: 'john', age: 30 },
                { name: 'ana', age: 20 },
                { name: 'chris', age: 25 },
            ];
            let comparePenson = (z1, z2) => {
                let rt = 0;
                z1.age < z2.age ? rt = -1 : rt = 1;
                return rt;
            };
            console.log('Array sort:', friends.sort(comparePenson));
            console.log('join:', jj.join('~'));
            let lt = 50;
            let int16 = new Int16Array(lt);
            let array16 = [];
            array16.length = lt;
            for (let i = 0; i < lt; i++)
                int16[i] = i++;
            console.log('TypedArray:', int16);
        }
    }

    class ValuePair {
        constructor(key, value) {
            this.key = key;
            this.value = value;
        }
        toString() {
            return `[#${this.key}:${this.value}]`;
        }
    }
    class ValuePairLazy extends ValuePair {
        constructor(key, value, isDeleted = false) {
            super(key, value);
            this.key = key;
            this.value = value;
            this.isDeleted = isDeleted;
        }
    }

    const DOES_NOT_EXIST = -1;
    var Compare;
    (function (Compare) {
        Compare[Compare["LESS_THAN"] = -1] = "LESS_THAN";
        Compare[Compare["BIGGER_THAN"] = 1] = "BIGGER_THAN";
        Compare[Compare["EQUALS"] = 0] = "EQUALS";
    })(Compare || (Compare = {}));
    var Colors;
    (function (Colors) {
        Colors[Colors["WHITE"] = 0] = "WHITE";
        Colors[Colors["GRAY"] = 1] = "GRAY";
        Colors[Colors["BLACK"] = 2] = "BLACK";
    })(Colors || (Colors = {}));
    function defaultEquals(a, b) {
        return a === b;
    }
    function defaultCompare(a, b) {
        if (a === b)
            return Compare.EQUALS;
        return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
    }
    function default2String(item) {
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
    function swap(array, a, b) {
        [array[a], array[b]] = [array[b], array[a]];
    }
    function reverseCompare(compareFn) {
        return (a, b) => compareFn(b, a);
    }

    class Dictionary {
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

    class DictionaryTest extends Laya.Script {
        constructor() {
            super();
        }
        onEnable() {
            console.log('DictionaryTest');
            const dictionary = new Dictionary();
            dictionary.set('Gandalf', 'gandalf@email.com');
            dictionary.set('John', 'johnsnow@email.com');
            dictionary.set('Tyrion', 'tyrion@email.com');
            console.log(dictionary.hasKey('Gandalf'));
            console.log(dictionary.size());
            console.log(dictionary.keys());
            console.log(dictionary.values());
            console.log(dictionary.get('Tyrion'));
            dictionary.remove('John');
            console.log(dictionary.keys());
            console.log(dictionary.values());
            console.log(dictionary.keyValues());
            dictionary.forEach((k, v) => { console.log('forEach: ', `key:${k},value:${v}`); });
        }
    }

    class Queue {
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
    class Deque extends Queue {
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
                    this.items[i] = this.items[i - 1];
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
    class PriorityQueue {
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

    const initializeColor = (vertices) => {
        const color = {};
        for (let i = 0; i < vertices.length; i++)
            color[vertices[i]] = Colors.WHITE;
        return color;
    };
    function breadthFirstSearch(graph, startVertex, callback) {
        const vertices = graph.getVertices();
        const adjList = graph.getAdjList();
        const color = initializeColor(vertices);
        const queue = new Queue();
        queue.enqueue(startVertex);
        while (!queue.isEmpty()) {
            const u = queue.dequeue();
            const neighbors = adjList.get(u);
            color[u] = Colors.GRAY;
            for (let i = 0; i < neighbors.length; i++) {
                const w = neighbors[i];
                if (color[w] === Colors.WHITE) {
                    color[w] = Colors.GRAY;
                    queue.enqueue(w);
                }
            }
            color[u] = Colors.BLACK;
            if (callback)
                callback(u);
        }
    }
    ;
    function BFS(graph, startVertex) {
        const vertices = graph.getVertices();
        const adjList = graph.getAdjList();
        const color = initializeColor(vertices);
        const queue = new Queue();
        const distances = {};
        const predecessors = {};
        queue.enqueue(startVertex);
        for (let i = 0; i < vertices.length; i++) {
            distances[vertices[i]] = 0;
            predecessors[vertices[i]] = null;
        }
        while (!queue.isEmpty()) {
            const u = queue.dequeue();
            const neighbors = adjList.get(u);
            color[u] = Colors.GRAY;
            for (let i = 0; i < neighbors.length; i++) {
                const w = neighbors[i];
                if (color[w] === Colors.WHITE) {
                    color[w] = Colors.GRAY;
                    distances[w] = distances[u] + 1;
                    predecessors[w] = u;
                    queue.enqueue(w);
                }
            }
            color[u] = Colors.BLACK;
        }
        return {
            distances: distances,
            predecessors: predecessors
        };
    }

    const initializeColor$1 = (vertices) => {
        const color = {};
        for (let i = 0; i < vertices.length; i++)
            color[vertices[i]] = Colors.WHITE;
        return color;
    };
    const depthFirstSearchVisit = (u, color, adjList, callback) => {
        color[u] = Colors.GRAY;
        if (callback)
            callback(u);
        const neighbors = adjList.get(u);
        for (let i = 0; i < neighbors.length; i++) {
            const w = neighbors[i];
            if (color[w] === Colors.WHITE)
                depthFirstSearchVisit(w, color, adjList, callback);
        }
        color[u] = Colors.BLACK;
    };
    function depthFirstSearch(graph, callback) {
        const vertices = graph.getVertices();
        const adjList = graph.getAdjList();
        const color = initializeColor$1(vertices);
        for (let i = 0; i < vertices.length; i++) {
            if (color[vertices[i]] === Colors.WHITE)
                depthFirstSearchVisit(vertices[i], color, adjList, callback);
        }
    }
    ;
    const DFSVisit = (u, color, d, f, p, time, adjList) => {
        color[u] = Colors.GRAY;
        d[u] = ++time['count'];
        const neighbors = adjList.get(u);
        for (let i = 0; i < neighbors.length; i++) {
            const w = neighbors[i];
            if (color[w] === Colors.WHITE) {
                p[w] = u;
                DFSVisit(w, color, d, f, p, time, adjList);
            }
        }
        color[u] = Colors.BLACK;
        f[u] = ++time['count'];
    };
    function DFS(graph) {
        const vertices = graph.getVertices();
        const adjList = graph.getAdjList();
        const color = initializeColor$1(vertices);
        const d = {};
        const f = {};
        const p = {};
        const time = { count: 0 };
        for (let i = 0; i < vertices.length; i++) {
            f[vertices[i]] = 0;
            d[vertices[i]] = 0;
            p[vertices[i]] = null;
        }
        for (let i = 0; i < vertices.length; i++) {
            if (color[vertices[i]] === Colors.WHITE)
                DFSVisit(vertices[i], color, d, f, p, time, adjList);
        }
        return {
            discovery: d,
            finished: f,
            predecessors: p
        };
    }

    const INF = Number.MAX_SAFE_INTEGER;
    const minDistance = (dist, visited) => {
        let min = INF;
        let minIndex = -1;
        for (let v = 0; v < dist.length; v++) {
            if (visited[v] === false && dist[v] <= min) {
                min = dist[v];
                minIndex = v;
            }
        }
        return minIndex;
    };
    function dijkstra(graph, src) {
        const dist = [];
        const visited = [];
        const length = graph.length;
        for (let i = 0; i < length; i++) {
            dist[i] = INF;
            visited[i] = false;
        }
        dist[src] = 0;
        for (let i = 0; i < length - 1; i++) {
            const u = minDistance(dist, visited);
            visited[u] = true;
            for (let v = 0; v < length; v++) {
                if (!visited[v] && graph[u][v] != 0 && dist[u] !== INF && dist[u] + graph[u][v] < dist[v]) {
                    dist[v] = dist[u] + graph[u][v];
                }
            }
        }
        return dist;
    }
    function dijkstraWithPath(graph, src) {
        let paths = graph.slice(0);
        const dist = [];
        const visited = [];
        const length = graph.length;
        for (let i = 0; i < length; i++) {
            dist[i] = INF;
            visited[i] = false;
            paths[i] = graph[i].slice(0);
            paths[i].fill(0);
        }
        dist[src] = 0;
        for (let i = 0; i < length - 1; i++) {
            const u = minDistance(dist, visited);
            visited[u] = true;
            for (let v = 0; v < length; v++) {
                if (!visited[v] && graph[u][v] != 0 && dist[u] !== INF && dist[u] + graph[u][v] < dist[v]) {
                    dist[v] = dist[u] + graph[u][v];
                    paths[v] = paths[u].slice(0);
                    paths[v][v] = paths[u][u] + 1;
                }
            }
        }
        return paths;
    }

    function floydWarshall(graph) {
        const dist = [];
        const length = graph.length;
        for (let i = 0; i < length; i++) {
            dist[i] = [];
            for (let j = 0; j < length; j++) {
                if (i === j) {
                    dist[i][j] = 0;
                }
                else if (!isFinite(graph[i][j])) {
                    dist[i][j] = Infinity;
                }
                else {
                    dist[i][j] = graph[i][j];
                }
            }
        }
        for (let k = 0; k < length; k++) {
            for (let i = 0; i < length; i++) {
                for (let j = 0; j < length; j++) {
                    if (dist[i][k] + dist[k][j] < dist[i][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                    }
                }
            }
        }
        return dist;
    }

    class Graph {
        constructor(isDirected = false) {
            this.isDirected = isDirected;
            this.vertices = [];
            this.adjList = new Dictionary();
        }
        addVertex(v) {
            if (this.vertices.indexOf(v) == -1) {
                this.vertices.push(v);
                this.adjList.set(v, []);
            }
        }
        addEdge(a, b) {
            if (!this.adjList.get(a))
                this.addVertex(a);
            if (!this.adjList.get(b))
                this.addVertex(b);
            this.adjList.get(a).push(b);
            if (!this.isDirected)
                this.adjList.get(b).push(a);
        }
        getVertices() {
            return this.vertices;
        }
        getAdjList() {
            return this.adjList;
        }
        toString() {
            let s = '';
            for (let i = 0; i < this.vertices.length; i++) {
                s += this.vertices[i] + '->';
                const neighbors = this.adjList.get(this.vertices[i]);
                for (let j = 0; j < neighbors.length; j++)
                    s += neighbors[j] + ' ';
                s += '\n';
            }
            return s;
        }
    }

    class StackArray {
        constructor() {
            this.items = [];
        }
        push(element) {
            this.items.push(element);
        }
        pop() {
            return this.items.pop();
        }
        peek() {
            return this.items[this.items.length - 1];
        }
        isEmpty() {
            return this.items.length == 0;
        }
        clear() {
            this.items = [];
        }
        size() {
            return this.items.length;
        }
        toArray() {
            return this.items;
        }
        toString() {
            return this.items.toString();
        }
    }
    class Stack {
        constructor() {
            this.count = 0;
            this.items = {};
        }
        push(element) {
            this.items[this.count] = element;
            this.count++;
        }
        size() {
            return this.count;
        }
        isEmpty() {
            return this.count === 0;
        }
        pop() {
            if (this.isEmpty())
                return undefined;
            this.count--;
            const result = this.items[this.count];
            delete this.items[this.count];
            return result;
        }
        peek() {
            if (this.isEmpty())
                return undefined;
            return this.items[this.count - 1];
        }
        clear() {
            this.items = {};
            this.count = 0;
        }
        toString() {
            if (this.isEmpty())
                return '';
            let objString = `${this.items[0]}`;
            for (let i = 1; i < this.count; i++)
                objString = `${objString},${this.items[i]}`;
            return objString;
        }
    }

    class GraphTest extends Laya.Script {
        constructor() {
            super();
        }
        onEnable() {
            console.log('GraphTest---');
            let graph = new Graph();
            let myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
            for (let i = 0; i < myVertices.length; i++)
                graph.addVertex(myVertices[i]);
            graph.addEdge('A', 'B');
            graph.addEdge('A', 'C');
            graph.addEdge('A', 'D');
            graph.addEdge('C', 'D');
            graph.addEdge('C', 'G');
            graph.addEdge('D', 'G');
            graph.addEdge('D', 'H');
            graph.addEdge('B', 'E');
            graph.addEdge('B', 'F');
            graph.addEdge('E', 'I');
            console.log('********* printing graph ***********');
            console.log(graph.toString());
            console.log(graph.getAdjList().get('B'));
            const printVertex = (value) => console.log('Visited vertex: ' + value);
            console.log('start from A :');
            breadthFirstSearch(graph, myVertices[0], printVertex);
            console.log('start from D :');
            breadthFirstSearch(graph, 'D', printVertex);
            console.log('********* sorthest path from A- BFS ***********');
            const shortestPathA = BFS(graph, myVertices[0]);
            console.log(shortestPathA.distances);
            console.log(shortestPathA.predecessors);
            console.log('********* sorthest path from D- BFS ***********');
            const shortestPathD = BFS(graph, 'D');
            console.log(shortestPathD.distances);
            console.log(shortestPathD.predecessors);
            console.log('********* from A to all other vertices ***********');
            const fromVertex = myVertices[0];
            for (let i = 1; i < myVertices.length; i++) {
                const toVertex = myVertices[i];
                const path = new Stack();
                for (let v = toVertex; v !== fromVertex; v = shortestPathA.predecessors[v])
                    path.push(v);
                path.push(fromVertex);
                let s = path.pop();
                while (!path.isEmpty())
                    s += ' _ ' + path.pop();
                console.log(s);
            }
            console.log('********* dfs with callback ***********');
            depthFirstSearch(graph, printVertex);
            console.log('********* topological sort - DFS ***********');
            graph = new Graph();
            for (let i = 0; i < myVertices.length; i++)
                graph.addVertex(myVertices[i]);
            graph.addEdge('A', 'B');
            graph.addEdge('A', 'C');
            graph.addEdge('A', 'D');
            graph.addEdge('C', 'D');
            graph.addEdge('C', 'G');
            graph.addEdge('D', 'G');
            graph.addEdge('D', 'H');
            graph.addEdge('B', 'E');
            graph.addEdge('B', 'F');
            graph.addEdge('E', 'I');
            let result = DFS(graph);
            console.log('discovery', result.discovery);
            console.log('finished', result.finished);
            console.log('predecessors', result.predecessors);
            graph = new Graph(true);
            myVertices = ['A', 'B', 'C', 'D', 'E', 'F'];
            for (let i = 0; i < myVertices.length; i++) {
                graph.addVertex(myVertices[i]);
            }
            graph.addEdge('A', 'C');
            graph.addEdge('A', 'D');
            graph.addEdge('B', 'D');
            graph.addEdge('B', 'E');
            graph.addEdge('C', 'F');
            graph.addEdge('F', 'E');
            result = DFS(graph);
            console.log('discovery', result.discovery);
            console.log('finished', result.finished);
            console.log('predecessors', result.predecessors);
            const fTimes = result.finished;
            let s = '';
            for (let count = 0; count < myVertices.length; count++) {
                let max = 0;
                let maxName = null;
                for (let i = 0; i < myVertices.length; i++) {
                    if (fTimes[myVertices[i]] > max) {
                        max = fTimes[myVertices[i]];
                        maxName = myVertices[i];
                    }
                }
                s += ' _ ' + maxName;
                delete fTimes[maxName];
            }
            console.log(s);
            const graphM = [
                [0, 2, 4, 0, 0, 0],
                [0, 0, 1, 4, 2, 0],
                [0, 0, 0, 0, 3, 0],
                [0, 0, 0, 0, 0, 2],
                [0, 0, 0, 3, 0, 2],
                [0, 0, 0, 0, 0, 0]
            ];
            console.log("********* Dijkstra's Algorithm - Shortest Path ***********");
            console.log(` 
        [0, 2, 4, 0, 0, 0],
        [0, 0, 1, 4, 2, 0],
        [0, 0, 0, 0, 3, 0],
        [0, 0, 0, 0, 0, 2],
        [0, 0, 0, 3, 0, 2],
        [0, 0, 0, 0, 0, 0]`);
            let dist = dijkstra(graphM, 0);
            dist.forEach((v, i) => { console.log(i + '\t\t' + v); });
            let distPath = dijkstraWithPath(graphM, 0);
            distPath.forEach((v, i) => console.log(v + '\t\t'));
            console.log('********* Floyd-Warshall Algorithm - All-Pairs Shortest Path ***********');
            const INF = Infinity;
            const graphN = [
                [INF, 2, 4, INF, INF, INF],
                [INF, INF, 1, 4, 2, INF],
                [INF, INF, INF, INF, 3, INF],
                [INF, INF, INF, INF, INF, 2],
                [INF, INF, INF, 3, INF, 2],
                [INF, INF, INF, INF, INF, INF]
            ];
            let distN = floydWarshall(graphN);
            s = '';
            for (let i = 0; i < distN.length; ++i) {
                s = '';
                for (var j = 0; j < distN.length; ++j) {
                    if (distN[i][j] === INF)
                        s += 'INF ';
                    else
                        s += distN[i][j] + '   ';
                }
                console.log(s);
            }
            console.log(distN);
        }
    }

    class Node {
        constructor(element, next) {
            this.element = element;
            this.next = next;
        }
    }
    class DoublyNode extends Node {
        constructor(element, next, prev) {
            super(element, next);
            this.element = element;
            this.next = next;
            this.prev = prev;
        }
    }
    class TreeNode {
        constructor(key) {
            this.key = key;
        }
        toString() {
            return `${this.key}`;
        }
    }
    var Colors$1;
    (function (Colors) {
        Colors[Colors["RED"] = 0] = "RED";
        Colors[Colors["BLACK"] = 1] = "BLACK";
    })(Colors$1 || (Colors$1 = {}));
    class RedBlackNode extends TreeNode {
        constructor(key) {
            super(key);
            this.key = key;
            this.color = Colors$1.RED;
        }
        isRed() {
            return this.color === Colors$1.RED;
        }
        flipColor() {
            this.color === Colors$1.RED ? this.color = Colors$1.BLACK : this.color = Colors$1.RED;
        }
    }

    class LinkedList {
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
    class DoublyLinkedList extends LinkedList {
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
    class CircularLinkedList extends LinkedList {
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
                        current = removed;
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
    class SortedLinkedList extends LinkedList {
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
                return super.insert(element, 0);
            index = this.getIndexNextSortedElement(element);
            return super.insert(element, index);
        }
        getIndexNextSortedElement(element) {
            let current = this.head;
            let i = 0;
            for (; i < this.size() && current; i++) {
                const comp = this.compareFn(element, current.element);
                if (comp === Compare.LESS_THAN)
                    return i;
                current = current.next;
            }
            return i;
        }
    }
    class StackLinkedList {
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

    class HashTable {
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
    class HashTableSeparateChaining {
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
    class HashTableLinearProbing {
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
    class HashTableLinearProbingLazy {
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

    class HashTableTest extends Laya.Script {
        constructor() {
            super();
        }
        onEnable() {
            console.log('HashTableTest');
            const hash = new HashTableLinearProbing();
            hash.put('Gandalf', 'gandalf@email.com');
            hash.put('John', 'johnsnow@email.com');
            hash.put('Tyrion', 'tyrion@email.com');
            console.log(hash.hashCode('Gandalf') + ' -Gandalf');
            console.log(hash.hashCode('John') + ' -John');
            console.log(hash.hashCode('Tyrion') + ' -Tyrion');
            hash.remove('Gandalf');
            console.log(hash.get('Gandalf'));
            hash.put('Jack', 'jack@email.com');
            hash.put('Athelstan', 'athelstan@email.com');
            console.log(hash.hashCode('Jack') + ' -Jack');
            console.log(hash.hashCode('Athelstan') + ' -Athelstan');
            console.log(hash.toString());
            console.log('map');
            const map = new Map();
            map.set('Gandalf', 'gandalf@email.com');
            map.set('John', 'johnsnow@email.com');
            map.set('Tyrion', 'tyrion@email.com');
            console.log(map.has('Gandalf'));
            console.log(map.size);
            console.log(map.keys());
            console.log(map.values());
            console.log(map.get('Tyrion'));
            map.delete('John');
            console.log(map);
            console.log('weakMap');
            const weakMap = new WeakMap();
            const ob1 = { name: 'Gandalf' };
            const ob2 = { name: 'John' };
            const ob3 = { name: 'Tyrion' };
            weakMap.set(ob1, 'gandalf@email.com');
            weakMap.set(ob2, 'johnsnow@email.com');
            weakMap.set(ob3, 'tyrion@email.com');
            console.log(weakMap.has(ob1));
            console.log(weakMap.get(ob3));
            weakMap.delete(ob2);
            console.log(weakMap);
        }
    }

    class MinHeap {
        constructor(compareFn = defaultCompare) {
            this.compareFn = compareFn;
            this.heap = [];
        }
        getLeftIndex(index) {
            return 2 * index + 1;
        }
        getRightIndex(index) {
            return 2 * index + 2;
        }
        getParentIndex(index) {
            if (index === 0)
                return undefined;
            return Math.floor((index - 1) / 2);
        }
        size() {
            return this.heap.length;
        }
        isEmpty() {
            return this.size() <= 0;
        }
        clear() {
            this.heap = [];
        }
        findMinimum() {
            return this.isEmpty() ? undefined : this.heap[0];
        }
        insert(value) {
            if (value != null) {
                const index = this.heap.length;
                this.heap.push(value);
                this.siftUp(index);
                return true;
            }
            return false;
        }
        siftDown(index) {
            let element = index;
            const left = this.getLeftIndex(index);
            const right = this.getRightIndex(index);
            const size = this.size();
            if (left < size && this.compareFn(this.heap[element], this.heap[left]) === Compare.BIGGER_THAN)
                element = left;
            if (right < size && this.compareFn(this.heap[element], this.heap[right]) === Compare.BIGGER_THAN)
                element = right;
            if (index !== element) {
                swap(this.heap, index, element);
                this.siftDown(element);
            }
        }
        siftUp(index) {
            let parent = this.getParentIndex(index);
            while (index > 0 && this.compareFn(this.heap[parent], this.heap[index]) === Compare.BIGGER_THAN) {
                swap(this.heap, parent, index);
                index = parent;
                parent = this.getParentIndex(index);
            }
        }
        extract() {
            if (this.isEmpty())
                return undefined;
            if (this.size() === 1)
                return this.heap.shift();
            const removedValue = this.heap[0];
            this.heap[0] = this.heap.pop();
            this.siftDown(0);
            return removedValue;
        }
        heapify(array) {
            if (array)
                this.heap = array;
            for (let i = Math.floor(this.size() / 2); i >= 0; --i)
                this.siftDown(i);
            return this.heap;
        }
        heapSort1(array, compareFn = defaultCompare) {
            this.heapify(array);
            let sortedArray = [];
            let l = this.size();
            for (let i = 0; i < l; i++)
                sortedArray.push(this.extract());
            return this.heap = sortedArray;
        }
        getAsArray() {
            return this.heap;
        }
    }
    class MaxHeap extends MinHeap {
        constructor(compareFn = defaultCompare) {
            super(compareFn);
            this.compareFn = compareFn;
            this.compareFn = reverseCompare(compareFn);
        }
    }

    function heapify(array, index, heapSize, compareFn) {
        let largest = index;
        const left = 2 * index + 1;
        const right = 2 * index + 2;
        if (left < heapSize && compareFn(array[left], array[index]) > 0)
            largest = left;
        if (right < heapSize && compareFn(array[right], array[largest]) > 0)
            largest = right;
        if (largest !== index) {
            swap(array, index, largest);
            heapify(array, largest, heapSize, compareFn);
        }
    }
    function buildMaxHeap(array, compareFn) {
        for (let i = Math.floor(array.length / 2); i >= 0; --i)
            heapify(array, i, array.length, compareFn);
        return array;
    }
    function heapSort(array, compareFn = defaultCompare) {
        let heapSize = array.length;
        buildMaxHeap(array, compareFn);
        while (heapSize > 1) {
            swap(array, 0, --heapSize);
            heapify(array, 0, heapSize, compareFn);
        }
        return array;
    }

    class HeapTest extends Laya.Script {
        constructor() {
            super();
        }
        onEnable() {
            console.log('HeapTest');
            const heap = new MinHeap();
            heap.insert(2);
            heap.insert(3);
            heap.insert(4);
            heap.insert(5);
            heap.insert(1);
            heap.insert(6);
            heap.insert(9);
            heap.insert(8);
            heap.insert(7);
            console.log(heap.size());
            console.log(heap.isEmpty());
            console.log(heap.findMinimum());
            console.log(heap.getAsArray().toString());
            console.log('heap sort--');
            console.log(heap.extract());
            console.log(heap.extract());
            console.log(heap.extract());
            console.log(heap.extract());
            console.log('array [2, 3, 4, 5, 1]');
            console.log('heapify-');
            heap.heapify([2, 3, 4, 5, 1]);
            console.log(heap.getAsArray().toString());
            console.log('array [2, 1, 4, 5, 3]');
            console.log('heapify-');
            heap.heapify([2, 1, 4, 5, 3]);
            console.log(heap.getAsArray().toString());
            console.log('array [2, 1, 4, 5, 3, 7, 8, 6, 10, 19, 9]');
            console.log('heapify-');
            heap.heapify([2, 1, 4, 5, 3, 7, 8, 6, 10, 19, 9]);
            console.log(heap.getAsArray().toString());
            console.log('array [8, 7, 10, 6, 9, 1, 3, 5]');
            console.log('heapify-');
            heap.heapify([8, 7, 10, 6, 9, 1, 3, 5]);
            console.log(heap.getAsArray().toString());
            console.log('array [7, 6, 3, 5, 4, 1, 2]');
            console.log('heapify-');
            heap.heapify([7, 6, 3, 5, 4, 1, 2]);
            console.log(heap.getAsArray().toString());
            console.log(heap.getAsArray().toString());
            console.log(heapSort([8, 7, 10, 6, 9]).toString());
            console.log(heapSort([7, 1, 4, 5, 3, 2, 8, 6, 10, 19, 9]).toString());
            console.log(heapSort([17, 11, 14, 15, 13, 12, 18, 16, 20, 29, 19]).toString());
            console.log(heapSort([7, 6, 3, 5, 4, 1, 2]).toString());
        }
    }

    class LinkedListTest extends Laya.Script {
        constructor() {
            super();
        }
        onEnable() {
            const list = new DoublyLinkedList();
            list.push(15);
            list.push(10);
            list.push(8);
            console.log(list.toString());
            list.insert(9, 2);
            console.log(list.toString());
            console.log(list.getElementAt(3));
            console.log(list.toString());
            console.log(list.remove(15));
            console.log(list.toString());
            console.log(list.indexOf(9));
            console.log(list.removeAt(2));
            console.log(list.toString());
            console.log(list.size());
            console.log(list.isEmpty());
            console.log(list.getHead());
            console.log(list.getTail());
            console.log(list.inverseToString());
            console.log('==========');
            const sortedLinkedList = new SortedLinkedList();
            sortedLinkedList.push(1);
            sortedLinkedList.insert(4, 1);
            console.log(sortedLinkedList.toString());
            sortedLinkedList.push(2);
            sortedLinkedList.insert(3, 0);
            console.log(sortedLinkedList.toString());
        }
    }

    class QueueTest extends Laya.Script {
        constructor() {
            super();
        }
        onEnable() {
            const queue = new Queue();
            console.log(queue.isEmpty());
            queue.enqueue('John');
            queue.enqueue('Jack');
            console.log(queue.toString());
            queue.enqueue('Camila');
            console.log(queue.toString());
            console.log(queue.size());
            console.log(queue.isEmpty());
            queue.dequeue();
            queue.dequeue();
            console.log(queue.toString());
            console.log('--------');
            const deque = new Deque();
            console.log(deque.isEmpty());
            deque.addBack('John');
            deque.addBack('Jack');
            console.log(deque.toString());
            deque.addBack('Camila');
            console.log(deque.toString());
            console.log(deque.size());
            console.log(deque.isEmpty());
            deque.removeFront();
            console.log(deque.toString());
            deque.removeBack();
            console.log(deque.toString());
            deque.addFront('John');
            console.log(deque.toString());
            let dd = new Deque();
            dd.addFront('a0');
            dd.addFront('a1');
            dd.addFront('a2');
            console.log(dd.toString());
            const hotPotato = (elementsList, num) => {
                const queue = new Queue();
                const elimintatedList = [];
                for (let i = 0; i < elementsList.length; i++)
                    queue.enqueue(elementsList[i]);
                while (queue.size() > 1) {
                    for (let i = 0; i < num; i++)
                        queue.enqueue(queue.dequeue());
                    elimintatedList.push(queue.dequeue());
                }
                return {
                    eliminated: elimintatedList,
                    winner: queue.dequeue()
                };
            };
            const names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl'];
            const result = hotPotato(names, 7);
            result.eliminated.forEach(name => console.log(`${name} was eliminated `));
            console.log(`Winner is ${result.winner}`);
            const palindromeChecker = (aString) => {
                if (aString === undefined || aString === null || (aString !== null && aString.length == 0))
                    return false;
                const deque = new Deque();
                const lowerString = aString.toLocaleLowerCase().split(' ').join('');
                let isEqual = true;
                let [firstChar, lastChar] = ['', ''];
                for (let i = 0; i < lowerString.length; i++)
                    deque.addBack(lowerString.charAt(i));
                while (deque.size() > 1 && isEqual) {
                    firstChar = deque.removeFront();
                    lastChar = deque.removeBack();
                    if (firstChar !== lastChar)
                        isEqual = false;
                }
                return isEqual;
            };
            console.log('a', palindromeChecker('a'));
            console.log('aa', palindromeChecker('aa'));
            console.log('kayak', palindromeChecker('kayak'));
            console.log('level', palindromeChecker('level'));
            console.log('was it a car or a cat i saw', palindromeChecker('was it a car or a cat i saw'));
            console.log('step on no pets', palindromeChecker('step on no pets'));
            console.log('=================');
            const priorityQueue = new PriorityQueue();
            priorityQueue.enqueue(4);
            priorityQueue.enqueue(5);
            priorityQueue.enqueue(3);
            console.log(priorityQueue.toString());
            priorityQueue.dequeue();
            console.log(priorityQueue.toString());
        }
    }

    class RecursiveTest extends Laya.Script {
        constructor() {
            super();
        }
        onEnable() {
            console.log('RecursiveTest---');
            const factorial = (n) => {
                if (n === 1 || n === 0)
                    return 1;
                return n * factorial(n - 1);
            };
            console.log('factorial ', factorial(5));
            const fibonacciIterative = (n) => {
                if (n < 1)
                    return 0;
                let [fibNMinus2, fibNMinus1, fibN] = [0, 1, n];
                for (let i = 2; i <= n; i++) {
                    fibN = fibNMinus1 + fibNMinus2;
                    fibNMinus2 = fibNMinus1;
                    fibNMinus1 = fibN;
                }
                return fibN;
            };
            console.log('fibonacciIterative ', fibonacciIterative(5));
            const fibonacci = (n) => {
                if (n < 1)
                    return 0;
                if (n <= 2)
                    return 1;
                return fibonacci(n - 1) + fibonacci(n - 2);
            };
            console.log('fibonacci ', fibonacci(5));
            const fibonacciMemorization = (n) => {
                if (n < 1)
                    return 0;
                const memo = [0, 1];
                console.log(memo);
                const fibonacciMem = (num) => {
                    if (memo[num] != null)
                        return memo[num];
                    return (memo[num] = fibonacciMem(num - 1) + fibonacciMem(num - 2));
                };
                return fibonacciMem(n);
            };
            console.log('fibonacciMemorization ', fibonacciMemorization(5));
        }
    }

    class Set {
        constructor() {
            this.items = {};
        }
        add(element) {
            if (!this.has(element)) {
                this.items[element] = element;
                return true;
            }
            return false;
        }
        delete(element) {
            if (this.has(element)) {
                delete this.items[element];
                return true;
            }
            return false;
        }
        has(element) {
            return Object.prototype.hasOwnProperty.call(this.items, element);
        }
        size() {
            return Object.keys(this.items).length;
        }
        values() {
            let values = [];
            for (let key in this.items)
                if (this.items.hasOwnProperty(key))
                    values.push(key);
            return values;
        }
        union(otherSet) {
            const unionSet = new Set();
            this.values().forEach(value => unionSet.add(value));
            otherSet.values().forEach(value => unionSet.add(value));
            return unionSet;
        }
        intersection(otherSet) {
            const intersectionSet = new Set();
            const values = this.values();
            const otherValues = otherSet.values();
            let biggerSet = values;
            let smallerSet = otherValues;
            if (otherValues.length - values.length > 0) {
                biggerSet = otherValues;
                smallerSet = values;
            }
            smallerSet.forEach(value => {
                if (biggerSet.indexOf(value) != -1)
                    intersectionSet.add(value);
            });
            return intersectionSet;
        }
        difference(otherSet) {
            const differenceSet = new Set();
            this.values().forEach(value => {
                if (!otherSet.has(value))
                    differenceSet.add(value);
            });
            return differenceSet;
        }
        isSubsetOf(otherSet) {
            if (this.size() > otherSet.size())
                return false;
            let isSubset = true;
            this.values().every(value => {
                if (!otherSet.has(value)) {
                    isSubset = false;
                    return false;
                }
                return true;
            });
            return isSubset;
        }
    }

    class SetTest extends Laya.Script {
        constructor() {
            super();
        }
        onEnable() {
            console.log('SET');
            const set = new Set();
            set.add(1);
            console.log(set.values());
            console.log(set.has(1));
            console.log(set.size());
            set.add(2);
            console.log(set.values());
            console.log(set.has(2));
            console.log(set.size());
            set.delete(1);
            console.log(set.values());
            set.delete(2);
            console.log(set.values());
            const setA = new Set();
            setA.add(1);
            setA.add(2);
            setA.add(3);
            setA.add(6);
            const setB = new Set();
            setB.add(3);
            setB.add(4);
            setB.add(5);
            setB.add(6);
            const unionAB = setA.union(setB);
            console.log('unionAB', unionAB.values());
            const intersectionAB = setA.intersection(setB);
            console.log('intersetionAB', intersectionAB.values());
            const differenceAB = setA.difference(setB);
            console.log('differenceAB', differenceAB.values());
            const setC = new Set();
            setC.add(1);
            setC.add(2);
            setC.add(3);
            setC.add(6);
            setC.add(4);
            console.log('isSubsetOf', setA.isSubsetOf(setC));
        }
    }

    class StackTest extends Laya.Script {
        constructor() {
            super();
        }
        onEnable() {
            const stack = new StackArray();
            console.log(stack.isEmpty());
            stack.push(5);
            stack.push(8);
            console.log(stack.peek());
            stack.push(11);
            console.log(stack.size());
            console.log(stack.isEmpty());
            stack.push(15);
            stack.pop();
            stack.pop();
            console.log(stack.size());
            const stack1 = new Stack();
            stack1.push(5);
            stack1.push(8);
            stack1.clear();
            let decimal2Binary = (decNum) => {
                const remStack = new Stack();
                let number = decNum;
                let rem;
                let binaryString = '';
                while (number > 0) {
                    rem = Math.floor(number % 2);
                    remStack.push(rem);
                    number = Math.floor(number / 2);
                }
                while (!remStack.isEmpty()) {
                    binaryString += remStack.pop().toString();
                }
                return binaryString;
            };
            console.log('decimal2Binary:');
            console.log(decimal2Binary(233));
            console.log(decimal2Binary(10));
            console.log(decimal2Binary(1000));
            console.log(decimal2Binary(13));
            let baseConverter = (decNumber, base) => {
                const remStack = new Stack();
                const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                let number = decNumber;
                let rem;
                let baseString = '';
                if (!(base >= 2 && base <= 36))
                    return '';
                while (number > 0) {
                    rem = Math.floor(number % base);
                    remStack.push(rem);
                    number = Math.floor(number / base);
                }
                while (!remStack.isEmpty())
                    baseString += digits[remStack.pop()];
                return baseString;
            };
            console.log('baseConverter:');
            console.log(baseConverter(100345, 2));
            console.log(baseConverter(100345, 8));
            console.log(baseConverter(100345, 16));
            console.log(baseConverter(100345, 35));
        }
    }

    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        class StartUI extends Laya.Scene {
            constructor() {
                super();
                this.referenceClass = [Laya.Button];
            }
        }
        ui.StartUI = StartUI;
    })(ui || (ui = {}));
    (function (ui) {
        var test;
        (function (test) {
            class box2dUI extends Laya.Scene {
                constructor() {
                    super();
                    this.referenceClass = [Laya.Image];
                }
            }
            test.box2dUI = box2dUI;
            class ConsoleUnitUI extends Laya.Scene {
                constructor() {
                    super();
                    this.referenceClass = [];
                }
            }
            test.ConsoleUnitUI = ConsoleUnitUI;
            class DictionarySceneUI extends Laya.Scene {
                constructor() {
                    super();
                    this.referenceClass = [];
                }
            }
            test.DictionarySceneUI = DictionarySceneUI;
            class GraphSceneUI extends Laya.Scene {
                constructor() {
                    super();
                    this.referenceClass = [Laya.Sprite];
                }
            }
            test.GraphSceneUI = GraphSceneUI;
            class HashTableSceneUI extends Laya.Scene {
                constructor() {
                    super();
                    this.referenceClass = [];
                }
            }
            test.HashTableSceneUI = HashTableSceneUI;
            class HeapSceneUI extends Laya.Scene {
                constructor() {
                    super();
                    this.referenceClass = [];
                }
            }
            test.HeapSceneUI = HeapSceneUI;
            class LinkedListSceneUI extends Laya.Scene {
                constructor() {
                    super();
                    this.referenceClass = [];
                }
            }
            test.LinkedListSceneUI = LinkedListSceneUI;
            class QueueSceneUI extends Laya.Scene {
                constructor() {
                    super();
                    this.referenceClass = [];
                }
            }
            test.QueueSceneUI = QueueSceneUI;
            class RecursiveSceneUI extends Laya.Scene {
                constructor() {
                    super();
                    this.referenceClass = [];
                }
            }
            test.RecursiveSceneUI = RecursiveSceneUI;
            class SetSceneUI extends Laya.Scene {
                constructor() {
                    super();
                    this.referenceClass = [];
                }
            }
            test.SetSceneUI = SetSceneUI;
            class StackSceneUI extends Laya.Scene {
                constructor() {
                    super();
                    this.referenceClass = [];
                }
            }
            test.StackSceneUI = StackSceneUI;
            class test1UI extends Laya.EffectAnimation {
                constructor() {
                    super();
                    this.referenceClass = [Laya.FrameAnimation, Laya.EffectAnimation, Laya.View, Laya.Sprite];
                    this.effectData = ui.test.test1UI.uiView;
                }
            }
            test1UI.uiView = { "type": "View", "props": {}, "compId": 2, "child": [{ "type": "Sprite", "props": { "texture": "test/b1.png" }, "compId": 3 }], "animations": [{ "nodes": [{ "target": 3, "keyframes": { "y": [{ "value": 818, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "y", "index": 0 }, { "value": 818, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "y", "index": 1 }, { "value": 818, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "y", "index": 13 }], "x": [{ "value": 330, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "x", "index": 0 }, { "value": 330, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "x", "index": 1 }, { "value": 330, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "x", "index": 13 }], "scaleY": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleY", "index": 0 }, { "value": 0.2, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleY", "index": 1 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleY", "index": 13 }], "scaleX": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleX", "index": 0 }, { "value": 0.2, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleX", "index": 1 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleX", "index": 13 }], "pivotY": [{ "value": 50, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "pivotY", "index": 0 }], "pivotX": [{ "value": 50, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "pivotX", "index": 0 }] } }], "name": "ani1", "id": 1, "frameRate": 24, "action": 0 }], "loadList": ["test/b1.png"], "loadList3D": [] };
            test.test1UI = test1UI;
            REG("ui.test.test1UI", test1UI);
            class TestSceneUI extends Laya.Scene {
                constructor() {
                    super();
                    this.referenceClass = [Laya.Label, Laya.Button, Laya.Sprite];
                }
                createChildren() {
                    super.createChildren();
                    this.loadScene("test/TestScene");
                }
            }
            test.TestSceneUI = TestSceneUI;
            REG("ui.test.TestSceneUI", TestSceneUI);
            class TreeSceneUI extends Laya.Scene {
                constructor() {
                    super();
                    this.referenceClass = [];
                }
            }
            test.TreeSceneUI = TreeSceneUI;
        })(test = ui.test || (ui.test = {}));
    })(ui || (ui = {}));

    class GameControl extends Laya.Script {
        constructor() {
            super();
            this.createBoxInterval = 1000;
            this._time = 0;
            this._started = false;
        }
        onEnable() {
            this._time = Date.now();
            this._gameBox = this.owner.getChildByName("gameBox");
            this.t1 = this.owner.getChildByName('t1');
        }
        onUpdate() {
            let now = Date.now();
            if (now - this._time > this.createBoxInterval && this._started) {
                this._time = now;
                this.createBox();
            }
        }
        createBox() {
            let box = Laya.Pool.getItemByCreateFun("dropBox", this.dropBox.create, this.dropBox);
            box.pos(Math.random() * (Laya.Laya.stage.width - 100), -100);
            this._gameBox.addChild(box);
        }
        onStageClick(e) {
            e.stopPropagation();
            let flyer = Laya.Pool.getItemByCreateFun("bullet", this.bullet.create, this.bullet);
            flyer.pos(Laya.Laya.stage.mouseX, Laya.Laya.stage.mouseY);
            this._gameBox.addChild(flyer);
        }
        startGame() {
            if (!this._started) {
                this._started = true;
                this.enabled = true;
            }
        }
        stopGame() {
            this._started = false;
            this.enabled = false;
            this.createBoxInterval = 1000;
            this._gameBox.removeChildren();
        }
    }

    class GameUI extends ui.test.TestSceneUI {
        constructor() {
            super();
            GameUI.instance = this;
            Laya.MouseManager.multiTouchEnabled = false;
        }
        onEnable() {
            this._control = this.getComponent(GameControl);
            this.tipLbll.on(Laya.Event.CLICK, this, this.onTipClick);
        }
        onTipClick(e) {
            this.tipLbll.visible = false;
            this._score = 0;
            this.scoreLbl.text = "";
            this._control.startGame();
        }
        addScore(value = 1) {
            this._score += value;
            this.scoreLbl.changeText("分数：" + this._score);
            if (this._control.createBoxInterval > 600 && this._score % 20 == 0)
                this._control.createBoxInterval -= 20;
        }
        stopGame() {
            this.tipLbll.visible = true;
            this.tipLbll.text = "游戏结束了，点击屏幕重新开始";
            this._control.stopGame();
        }
    }

    class BinarySearchTree {
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
                if (node.left == null && node.right == null) {
                    node = null;
                    return node;
                }
                if (node.left == null) {
                    node = node.right;
                    return node;
                }
                else if (node.right == null) {
                    node = node.left;
                    return node;
                }
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
    class AVLTree extends BinarySearchTree {
        constructor(compareFn = defaultCompare) {
            super(compareFn);
            this.compareFn = compareFn;
        }
        getNodeHeight(node) {
            if (node == null)
                return -1;
            return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1;
        }
        rotationLL(node) {
            const tmp = node.left;
            node.left = tmp.right;
            tmp.right = node;
            return tmp;
        }
        rotationRR(node) {
            const tmp = node.right;
            node.right = tmp.left;
            tmp.left = node;
            return tmp;
        }
        rotationLR(node) {
            node.left = this.rotationRR(node.left);
            return this.rotationLL(node);
        }
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
                node.left = this.removeNode(node.left, key);
            }
            else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
                node.right = this.removeNode(node.right, key);
            }
            else {
                if (node.left == null && node.right == null) {
                    node = null;
                }
                else if (node.left == null && node.right != null) {
                    node = node.right;
                }
                else if (node.left != null && node.right == null) {
                    node = node.left;
                }
                else {
                    const inOrderSuccessor = this.minNode(node.right);
                    node.key = inOrderSuccessor.key;
                    node.right = this.removeNode(node.right, inOrderSuccessor.key);
                }
            }
            if (node == null)
                return node;
            const balanceState = this.getBalanceFactor(node);
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
    class RedBlackTree extends BinarySearchTree {
        constructor(compareFn = defaultCompare) {
            super();
            this.compareFn = compareFn;
        }
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
                this.root.color = Colors$1.BLACK;
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
            while (node && node.parent && node.parent.color === Colors$1.RED && node.color !== Colors$1.BLACK) {
                let parent = node.parent;
                const grandParent = parent.parent;
                if (grandParent && grandParent.left === parent) {
                    const uncle = grandParent.right;
                    if (uncle && uncle.color === Colors$1.RED) {
                        grandParent.color = Colors$1.RED;
                        uncle.color = Colors$1.BLACK;
                        node = grandParent;
                    }
                    else {
                        if (node === parent.right) {
                            this.rotationRR(parent);
                            node = parent;
                            parent = node.parent;
                        }
                        this.rotationLL(grandParent);
                        parent.color = Colors$1.BLACK;
                        grandParent.color = Colors$1.RED;
                        node = parent;
                    }
                }
                else {
                    const uncle = grandParent.left;
                    if (uncle && uncle.color === Colors$1.RED) {
                        grandParent.color = Colors$1.RED;
                        parent.color = Colors$1.BLACK;
                        uncle.color = Colors$1.BLACK;
                        node = grandParent;
                    }
                    else {
                        if (node === parent.left) {
                            this.rotationLL(parent);
                            node = parent;
                            parent = node.parent;
                        }
                        this.rotationRR(grandParent);
                        parent.color = Colors$1.BLACK;
                        grandParent.color = Colors$1.RED;
                        node = parent;
                    }
                }
            }
            this.root.color = Colors$1.BLACK;
        }
        getRoot() {
            return this.root;
        }
    }

    class TreeTest extends Laya.Script {
        constructor() {
            super();
        }
        onEnable() {
            console.log('TreeTest---');
            const tree = new RedBlackTree();
            tree.insert(11);
            tree.insert(7);
            tree.insert(15);
            tree.insert(5);
            tree.insert(3);
            tree.insert(9);
            tree.insert(8);
            tree.insert(10);
            tree.insert(13);
            tree.insert(12);
            tree.insert(14);
            tree.insert(20);
            tree.insert(18);
            tree.insert(25);
            tree.insert(6);
            const printNode = (value) => console.log(value);
            console.log('inOrderTraverse...');
            tree.inOrderTraverse(printNode);
            console.log('preOrderTraverse...');
            tree.preOrderTraverse(printNode);
            console.log('postOrderTraverse...');
            tree.postOrderTraverse(printNode);
            console.log('search min max...', tree.min(), tree.max());
            console.log(tree.search(1) ? 'key 1 found.' : 'key 1 not found.');
            console.log(tree.search(8) ? 'key 8 found.' : 'key 8 not found.');
            console.log('remove 6...');
            tree.remove(6);
            tree.inOrderTraverse(printNode);
            console.log('remove 5...');
            tree.remove(5);
            tree.inOrderTraverse(printNode);
            console.log('remove 15...');
            tree.remove(15);
            tree.inOrderTraverse(printNode);
        }
    }

    class Bullet extends Laya.Script {
        constructor() { super(); }
        onEnable() {
            var rig = this.owner.getComponent(Laya.RigidBody);
            rig.setVelocity({ x: 0, y: -10 });
        }
        onTriggerEnter(other, self, contact) {
            this.owner.removeSelf();
        }
        onUpdate() {
            if (this.owner.y < -10) {
                this.owner.removeSelf();
            }
        }
        onDisable() {
            Laya.Pool.recover("bullet", this.owner);
        }
    }

    class DropBox extends Laya.Script {
        constructor() {
            super();
            this.level = 1;
        }
        onEnable() {
            this._rig = this.owner.getComponent(Laya.RigidBody);
            this.level = Math.round(Math.random() * 5) + 1;
            this._text = this.owner.getChildByName("levelTxt");
            this._text.text = this.level + "";
        }
        onUpdate() {
            this.owner.rotation++;
        }
        onTriggerEnter(other, self, contact) {
            var owner = this.owner;
            if (other.label === "buttle") {
                if (this.level > 1) {
                    this.level--;
                    this._text.changeText(this.level + "");
                    owner.getComponent(Laya.RigidBody).setVelocity({ x: 0, y: -10 });
                    Laya.SoundManager.playSound("sound/hit.wav");
                }
                else {
                    if (owner.parent) {
                        let effect = Laya.Pool.getItemByCreateFun("effect", this.createEffect, this);
                        effect.pos(owner.x, owner.y);
                        owner.parent.addChild(effect);
                        effect.play(0, true);
                        owner.removeSelf();
                        Laya.SoundManager.playSound("sound/destroy.wav");
                    }
                }
                GameUI.instance.addScore(1);
            }
            else if (other.label === "ground") {
                owner.removeSelf();
                GameUI.instance.stopGame();
            }
        }
        createEffect() {
            let ani = new Laya.Animation();
            ani.loadAnimation("test/TestAni.ani");
            ani.on(Laya.Event.COMPLETE, null, recover);
            function recover() {
                ani.removeSelf();
                Laya.Pool.recover("effect", ani);
            }
            return ani;
        }
        onDisable() {
            Laya.Pool.recover("dropBox", this.owner);
        }
    }

    class GameConfig {
        constructor() {
        }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("ui", ui);
            reg("script/Start.ts", Start);
            reg("script/Go2StartScene.ts", Go2StartScene);
            reg("script/UnitConsole.ts", UnitConsole);
            reg("script/DictionaryTest.ts", DictionaryTest);
            reg("script/GraphTest.ts", GraphTest);
            reg("script/HashTableTest.ts", HashTableTest);
            reg("script/HeapTest.ts", HeapTest);
            reg("script/LinkedListTest.ts", LinkedListTest);
            reg("script/QueueTest.ts", QueueTest);
            reg("script/RecursiveTest.ts", RecursiveTest);
            reg("script/SetTest.ts", SetTest);
            reg("script/StackTest.ts", StackTest);
            reg("script/GameUI.ts", GameUI);
            reg("script/GameControl.ts", GameControl);
            reg("script/TreeTest.ts", TreeTest);
            reg("script/Bullet.ts", Bullet);
            reg("script/DropBox.ts", DropBox);
            reg("Laya.BoxCollider", Laya.BoxCollider);
            reg("Laya.RigidBody", Laya.RigidBody);
            reg("Laya.EffectAnimation", Laya.EffectAnimation);
            reg("Laya.CircleCollider", Laya.CircleCollider);
            reg("Laya.Text", Laya.Text);
        }
    }
    GameConfig.width = 640;
    GameConfig.height = 1136;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "test/GraphScene.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class Main {
        constructor() {
            if (window["Laya3D"])
                window["Laya3D"].init(GameConfig.width, GameConfig.height);
            else
                Laya.Laya.init(GameConfig.width, GameConfig.height, Laya.WebGL);
            Laya.Physics.enable();
            Laya.Laya["DebugPanel"] && Laya.Laya["DebugPanel"].enable();
            Laya.Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.Laya.stage.screenMode = GameConfig.screenMode;
            Laya.Laya.stage.alignV = GameConfig.alignV;
            Laya.Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.Laya.enableDebugPanel();
            if (GameConfig.physicsDebug)
                Laya.PhysicsDebugDraw.enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.Laya.alertGlobalError(true);
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        }
    }
    new Main();

}(Laya));
