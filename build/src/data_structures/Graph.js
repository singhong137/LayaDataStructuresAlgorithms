import Dictionary from "./Dictionary";
export default class Graph {
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
