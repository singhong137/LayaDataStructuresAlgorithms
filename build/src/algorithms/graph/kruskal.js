const INF = Number.MAX_SAFE_INTEGER;
const initializeCost = (graph) => {
    const cost = [];
    const length = graph.length;
    for (let i = 0; i < length; i++) {
        cost[i] = [];
        for (let j = 0; j < length; j++) {
            if (graph[i][j] === 0) {
                cost[i][j] = INF;
            }
            else {
                cost[i][j] = graph[i][j];
            }
        }
    }
    return cost;
};
const find = (i, parent) => {
    // while (parent[i] !== i) i = parent[i];
    // return i;
    while (parent[i]) {
        i = parent[i];
    }
    return i;
};
/* union(a, b) {
    let rootA = this.find(a);
    let rootB = this.find(b);

    // Roots are same so these are already connected.
    if (rootA === rootB) return;

    // Always make the element with smaller root the parent.
    if (rootA < rootB) {
        if (this.parent[b] != b) this.union(this.parent[b], a);
        this.parent[b] = this.parent[a];
    } else {
        if (this.parent[a] != a) this.union(this.parent[a], b);
        this.parent[a] = this.parent[b];
    }
} */
const union = (i, j, parent) => {
    if (i !== j) {
        parent[j] = i;
        return true;
    }
    return false;
    // let a = find(i, parent);
    // let b = find(j, parent);
    // if (a === b) return false;
    // if (a < b) {
    //     if (parent[b] != b) union(parent[b], a, parent);
    //     parent[b] = parent[a];
    // } else {
    //     if (parent[a] != a) union(parent[a], b, parent);
    //     parent[a] = parent[b];
    // }
    // return true;
};
export function kruskal(graph) {
    const length = graph.length;
    const parent = [];
    let ne = 0;
    let [a, b, u, v] = [0, 0, 0, 0];
    const cost = initializeCost(graph); //1
    // console.log(cost.toString())
    for (let i = 0; i < cost.length; i++)
        parent[i] = i;
    while (ne < length - 1) { //2
        for (let i = 0, min = INF; i < length; i++) { //3
            for (let j = 0; j < length; j++) {
                if (cost[i][j] < min) {
                    min = cost[i][j];
                    a = u = i;
                    b = v = j;
                    // console.log('min  a  b  :  ', min, a, b);
                }
            }
        }
        console.log('bef u v : ', u, v, 'parent: ' + parent);
        u = find(u, parent); //4
        v = find(v, parent); //5
        console.log('aft u v : ', u, v, 'parent: ' + parent);
        if (union(u, v, parent))
            ne++; //6
        cost[a][b] = cost[b][a] = INF; //7
        // cost[u][v] = cost[v][u] = INF;//7
    }
    return parent;
}
