import { Laya } from "Laya";
import { Script } from "laya/components/Script";
import { BFS, breadthFirstSearch } from "../algorithms/graph/breadth-first-search";
import { depthFirstSearch, DFS } from "../algorithms/graph/depth-first-search";
import { dijkstra, dijkstraWithPath } from "../algorithms/graph/dijkstra";
import { floydWarshall, floydWarshallWithPath } from "../algorithms/graph/Floyd-warshall";
import { kruskal } from "../algorithms/graph/kruskal";
import { prim } from "../algorithms/graph/prim";
import Graph from "../data_structures/Graph";
import { Stack } from "../data_structures/Stack";
export default class GraphTest extends Script {
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
        // graph.addEdge('C', 'D');
        // graph.addEdge('B', 'E');
        // graph.addEdge('A', 'D');
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
        let pathN = floydWarshallWithPath(graphN);
        const graphO = [
            [INF, 3, 8, INF, -4],
            [INF, INF, INF, 1, 7],
            [INF, 4, INF, INF, INF],
            [2, INF, -5, INF, INF],
            [INF, INF, INF, 6, INF]
        ];
        let distO = floydWarshall(graphO);
        let pathO = floydWarshallWithPath(graphO);
        let printMatrix = (m) => {
            let s = '';
            for (let i = 0; i < m.length; ++i) {
                s = '';
                for (var j = 0; j < m.length; ++j) {
                    if (m[i][j] === INF) {
                        s += ' ';
                        s += 'INF ';
                    }
                    else {
                        if (m[i][j] >= 0)
                            s += ' ';
                        s += m[i][j] + '   ';
                    }
                }
                console.log(s);
            }
        };
        console.log('\n');
        console.log('floyd dist');
        printMatrix(distN);
        console.log('\n');
        printMatrix(distO);
        console.log('\n');
        console.log('floyd path');
        printMatrix(pathN);
        console.log('\n');
        printMatrix(pathO);
        // console.log(distN);
        const gt = (name) => {
            return this.owner.getChildByName(name);
        };
        let mm = [
            [gt('m00'), gt('m10'), gt('m20'), gt('m30'), gt('m40'), gt('m50')],
            [gt('m01'), gt('m11'), gt('m21'), gt('m31'), gt('m41'), gt('m51')],
            [gt('m02'), gt('m12'), gt('m22'), gt('m32'), gt('m42'), gt('m52')],
            [gt('m03'), gt('m13'), gt('m23'), gt('m33'), gt('m43'), gt('m53')],
            [gt('m04'), gt('m14'), gt('m24'), gt('m34'), gt('m44'), gt('m54')],
            [gt('m05'), gt('m15'), gt('m25'), gt('m35'), gt('m45'), gt('m55')]
        ];
        let kl = [];
        let il = [];
        let jl = [];
        for (let k = 0; k < 6; k++)
            for (let i = 0; i < 6; i++)
                for (let j = 0; j < 6; j++) {
                    kl.push(i, k);
                    il.push(k, j);
                    jl.push(i, j);
                }
        Laya.timer.loop(300, this, () => {
            let a = 0, b = 0;
            if (kl.length > 0) {
                a = kl.shift(), b = kl.shift();
                mm[a][b]['texture'] = 'test/t1.png';
            }
            if (il.length > 0) {
                a = il.shift(), b = il.shift();
                mm[a][b]['texture'] = 'test/c1.png';
            }
            if (jl.length > 0) {
                a = jl.shift(), b = jl.shift();
                mm[a][b]['texture'] = 'test/tra.png';
            }
        });
        const graphP = [
            [0, 2, 4, 0, 0, 0],
            [2, 0, 2, 4, 2, 0],
            [4, 2, 0, 0, 3, 0],
            [0, 4, 0, 0, 3, 2],
            [0, 2, 3, 3, 0, 2],
            [0, 0, 0, 2, 2, 0]
        ];
        console.log("********* Prim's Algorithm - Minimum Spanning Tree ***********");
        const pathP = prim(graphP);
        console.log('Edge   Weight');
        for (let i = 1; i < graphP.length; i++)
            console.log(pathP[i] + ' - ' + i + '   ' + graphP[i][pathP[i]]);
        console.log('\n');
        console.log('********* Kruskal Algorithm - Minimum Spanning Tree ***********');
        const pathQ = kruskal(graphP);
        console.log('Edge   Weight');
        for (let i = 1; i < graphP.length; i++)
            console.log(pathQ[i] + ' - ' + i + '   ' + graphP[i][pathQ[i]]);
        console.log('\n');
        let uf = new UnionFind(["A", "B", "C", "D", "E"]);
        uf.union("A", "B");
        uf.union("A", "C");
        uf.union("C", "D");
        console.log(uf.connected("B", "E"));
        console.log(uf.connected("B", "D"));
    }
}
class UnionFind {
    constructor(elements) {
        // Number of disconnected components
        this.count = elements.length;
        // Keep Track of connected components
        this.parent = [];
        // Initialize the data structure such that all
        // elements have themselves as parents
        elements.forEach(e => (this.parent[e] = e));
    }
    union(a, b) {
        let rootA = this.find(a);
        let rootB = this.find(b);
        // Roots are same so these are already connected.
        if (rootA === rootB)
            return;
        // Always make the element with smaller root the parent.
        if (rootA < rootB) {
            if (this.parent[b] != b)
                this.union(this.parent[b], a);
            this.parent[b] = this.parent[a];
        }
        else {
            if (this.parent[a] != a)
                this.union(this.parent[a], b);
            this.parent[a] = this.parent[b];
        }
    }
    // Returns final parent of a node
    find(a) {
        while (this.parent[a] !== a) {
            a = this.parent[a];
        }
        return a;
    }
    // Checks connectivity of the 2 nodes
    connected(a, b) {
        return this.find(a) === this.find(b);
    }
}
