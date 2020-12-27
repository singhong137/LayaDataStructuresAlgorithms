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
            switch (this.owner.name) {
                case 'btn0':
                    Laya.Scene.open('test/ConsoleUnit.scene');
                    break;
                case 'btn1':
                    Laya.Scene.open('test/StackScene.scene');
                    break;
                case 'btn2':
                    Laya.Scene.open('test/QueueScene.scene');
                    break;
                case 'btn3':
                    Laya.Scene.open('test/LinkedListScene.scene');
                    break;
                case 'btn4':
                    Laya.Scene.open('test/SetScene.scene');
                    break;
                case 'btn5':
                    Laya.Scene.open('test/DictionaryScene.scene');
                    break;
                case 'btn6':
                    Laya.Scene.open('test/HashTableScene.scene');
                    break;
                case 'btn7':
                    Laya.Scene.open('test/RecursiveScene.scene');
                    break;
                case 'btn8':
                    Laya.Scene.open('test/TreeScene.scene');
                    break;
                case 'btn9':
                    Laya.Scene.open('test/HeapScene.scene');
                    break;
                case 'btn10':
                    Laya.Scene.open('test/GraphScene.scene');
                    break;
                case 'btn11':
                    Laya.Scene.open('test/SortingScene.scene');
                    break;
                case 'btn12':
                    Laya.Scene.open('test/SearchScene.scene');
                    break;
                case 'btn13':
                    Laya.Scene.open('test/DynamicProgramingScene.scene');
                    break;
                case 'btn14':
                    Laya.Scene.open('test/GreedyScene.scene');
                    break;
                case 'btn15':
                    Laya.Scene.open('test/BackTracingScene.scene');
                    break;
                case 'btn16':
                    Laya.Scene.open('test/FunctionalTest.scene');
                    break;
            }
        }
    }

    function ratInAMaze(maze) {
        const solution = [];
        for (let i = 0; i < maze.length; i++) {
            solution[i] = [];
            for (let j = 0; j < maze[i].length; j++)
                solution[i][j] = 0;
        }
        if (findPath(maze, 0, 0, solution) === true) {
            return solution;
        }
        else {
            return 'NO PATH FOUND';
        }
    }
    function findPath(maze, x, y, solution) {
        const n = maze.length;
        if (x === n - 1 && y === n - 1) {
            solution[x][y] = 1;
            return true;
        }
        if (isSafe(maze, x, y) === true) {
            solution[x][y] = 1;
            if (findPath(maze, x + 1, y, solution))
                return true;
            if (findPath(maze, x, y + 1, solution))
                return true;
            solution[x][y] = 0;
            return false;
        }
        return false;
    }
    function isSafe(maze, x, y) {
        const n = maze.length;
        if (x >= 0 && y >= 0 && x < n && y < n && maze[x][y] !== 0)
            return true;
        return false;
    }

    const UNASSIGNED = 0;
    function sudokuSolver(grid) {
        if (solveSudoku(grid) === true) {
            return grid;
        }
        else {
            return 'NO SOLUTION EXISTS!';
        }
    }
    function solveSudoku(grid) {
        let row = 0;
        let col = 0;
        let checkBlankSpaces = false;
        for (row = 0; row < grid.length; row++) {
            for (col = 0; col < grid[row].length; col++) {
                if (grid[row][col] === UNASSIGNED) {
                    checkBlankSpaces = true;
                    break;
                }
            }
            if (checkBlankSpaces === true)
                break;
        }
        if (checkBlankSpaces === false)
            return true;
        for (let num = 1; num <= 9; num++) {
            if (isSafe$1(grid, row, col, num)) {
                grid[row][col] = num;
                if (solveSudoku(grid))
                    return true;
            }
            grid[row][col] = UNASSIGNED;
        }
        return false;
    }
    function usedInRow(grid, row, num) {
        for (let col = 0; col < grid.length; col++)
            if (grid[row][col] === num)
                return true;
        return false;
    }
    function usedInCol(grid, col, num) {
        for (let row = 0; row < grid.length; row++)
            if (grid[row][col] === num)
                return true;
        return false;
    }
    function usedInBox(grid, boxStartRow, boxStartCol, num) {
        for (let row = 0; row < 3; row++)
            for (let col = 0; col < 3; col++)
                if (grid[row + boxStartRow][col + boxStartCol] === num)
                    return true;
        return false;
    }
    function isSafe$1(grid, row, col, num) {
        return (!usedInRow(grid, row, num) && !usedInCol(grid, col, num) && !usedInBox(grid, row - row % 3, col - col % 3, num));
    }

    class BackTracingTest extends Laya.Script {
        constructor() {
            super();
        }
        onEnable() {
            console.log('BackTracingTest~~~');
            const maze = [
                [1, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 1, 0],
                [0, 1, 1, 1]
            ];
            console.log('ratInAMaze: ', ratInAMaze(maze));
            const sudokuGrid = [
                [7, 0, 0, 0, 0, 6, 0, 0, 0],
                [4, 8, 0, 0, 0, 9, 0, 7, 0],
                [0, 0, 0, 4, 0, 0, 2, 5, 0],
                [6, 0, 0, 0, 2, 0, 0, 1, 0],
                [0, 9, 0, 0, 0, 0, 0, 6, 0],
                [0, 0, 1, 0, 0, 7, 4, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 3],
                [0, 0, 0, 1, 4, 0, 0, 0, 6],
                [0, 0, 2, 7, 0, 0, 0, 0, 9]
            ];
            console.log(`sudokuSolver

        [7, 0, 0, 0, 0, 6, 0, 0, 0],
        [4, 8, 0, 0, 0, 9, 0, 7, 0],
        [0, 0, 0, 4, 0, 0, 2, 5, 0],
        [6, 0, 0, 0, 2, 0, 0, 1, 0],
        [0, 9, 0, 0, 0, 0, 0, 6, 0],
        [0, 0, 1, 0, 0, 7, 4, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 3],
        [0, 0, 0, 1, 4, 0, 0, 0, 6],
        [0, 0, 2, 7, 0, 0, 0, 0, 9]
        :`, sudokuSolver(sudokuGrid));
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
    function defaultDiff(a, b) {
        return Number(a) - Number(b);
    }
    function lesserEquals(a, b, compareFn) {
        const comp = compareFn(a, b);
        return comp === Compare.LESS_THAN || comp === Compare.EQUALS;
    }
    function biggerEquals(a, b, compareFn) {
        const comp = compareFn(a, b);
        return comp === Compare.BIGGER_THAN || comp === Compare.EQUALS;
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

    function knapSackDP(capacity, weights, values, n) {
        const ks = [];
        for (let i = 0; i <= n; i++) {
            ks[i] = [];
            for (let w = 0; w <= capacity; w++) {
                if (i === 0 || w === 0) {
                    ks[i][w] = 0;
                }
                else if (weights[i - 1] <= w) {
                    const a = values[i - 1] + ks[i - 1][w - weights[i - 1]];
                    const b = ks[i - 1][w];
                    ks[i][w] = a > b ? a : b;
                }
                else {
                    ks[i][w] = ks[i - 1][w];
                }
            }
        }
        findValues(n, capacity, ks, weights, values);
        return ks[n][capacity];
    }
    function findValues(n, capacity, ks, weights, values) {
        let [i, k] = [n, capacity];
        while (i > 0 && k > 0) {
            if (ks[i][k] !== ks[i - 1][k]) {
                console.log('item ' + i + 'can be part of solution w,v: ' + weights[i - 1] + ',' + values[i - 1]);
                i--;
                k -= ks[i][k];
            }
            else {
                i--;
            }
            ;
        }
    }

    function lcsDP(wordX, wordY) {
        const m = wordX.length;
        const n = wordY.length;
        const l = [];
        const solution = [];
        for (let i = 0; i <= m; i++) {
            l[i] = [];
            solution[i] = [];
            for (let j = 0; j <= n; j++) {
                l[i][j] = 0;
                solution[i][j] = '0';
            }
        }
        for (let i = 0; i <= m; i++) {
            for (let j = 0; j <= n; j++) {
                if (i === 0 || j === 0) {
                    l[i][j] = 0;
                }
                else if (wordX[i - 1] === wordY[j - 1]) {
                    l[i][j] = l[i - 1][j - 1] + 1;
                    solution[i][j] = 'diagonal';
                }
                else {
                    const a = l[i - 1][j];
                    const b = l[i][j - 1];
                    l[i][j] = a > b ? a : b;
                    solution[i][j] = l[i][j] === l[i - 1][j] ? 'top' : 'left';
                }
            }
        }
        console.log('l,solution: ', l, solution);
        return printSolution(solution, wordX, m, n);
    }
    function printSolution(solution, wordX, m, n) {
        let [a, b, answer] = [m, n, ''];
        let x = solution[a][b];
        while (x !== '0') {
            if (solution[a][b] === 'diagonal') {
                answer = wordX[a - 1] + answer;
                a--;
                b--;
            }
            else if (solution[a][b] === 'left') {
                b--;
            }
            else if (solution[a][b] === 'top') {
                a--;
            }
            x = solution[a][b];
        }
        return answer;
    }

    function matrixChainOrder(p) {
        const n = p.length;
        const m = [];
        const s = [];
        for (let i = 1; i <= n; i++) {
            m[i] = [];
            m[i][i] = 0;
        }
        for (let i = 0; i <= n; i++) {
            s[i] = [];
            for (let j = 0; j <= n; j++)
                s[i][j] = 0;
        }
        for (let l = 2; l < n; l++) {
            for (let i = 1; i < n - l + 1; i++) {
                const j = i + l - 1;
                m[i][j] = Number.MAX_SAFE_INTEGER;
                for (let k = i; k <= j - 1; k++) {
                    const q = m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j];
                    if (q < m[i][j]) {
                        m[i][j] = q;
                        s[i][j] = k;
                    }
                }
            }
        }
        let out = { s: '' };
        printOptimalParenthesis(s, 1, n - 1, out);
        console.log('m', m);
        console.log('s', s);
        console.log('MatrixChainOrder: ', out.s);
        return m[1][n - 1];
    }
    function printOptimalParenthesis(s, i, j, out) {
        if (i === j) {
            out.s += '[' + i + ']';
        }
        else {
            out.s += '(';
            printOptimalParenthesis(s, i, s[i][j], out);
            printOptimalParenthesis(s, s[i][j] + 1, j, out);
            out.s += ')';
        }
    }

    function minCoinChangeDP(coins, amount) {
        const cache = [];
        const makeChange = (amount) => {
            if (!amount)
                return [];
            if (cache[amount])
                return cache[amount];
            let min = [];
            let newMin;
            let newAmount = 0;
            for (let i = 0; i < coins.length; i++) {
                const coin = coins[i];
                newAmount = amount - coin;
                if (newAmount >= 0)
                    newMin = makeChange(newAmount);
                if (newAmount >= 0 &&
                    (newMin.length < min.length - 1 || !min.length) &&
                    (newMin.length || !newAmount)) {
                    min = [coin].concat(newMin);
                    console.log('new Min ' + min + ' for ' + amount);
                }
            }
            return cache[amount] = min;
        };
        return makeChange(amount);
    }

    class DynamicProgramingTest extends Laya.Script {
        constructor() {
            super();
        }
        onEnable() {
            console.log('DynamicProgramingTest~~~');
            console.log('minCoinChangeDP([1, 5, 10], 15): ', minCoinChangeDP([1, 5, 10], 15));
            console.log('minCoinChangeDP([1, 3, 4], 6): ', minCoinChangeDP([1, 3, 4], 6));
            console.log('minCoinChangeDP([1, 5, 10, 25], 36): ', minCoinChangeDP([1, 5, 10, 25], 36));
            const values = [3, 4, 5];
            const weights = [2, 3, 4];
            const capacity = 5;
            const n = values.length;
            console.log('knapSack： ', knapSackDP(capacity, weights, values, n));
            const wordX = 'acbaed';
            const wordY = 'abcadf';
            console.log('lcsDP: ', lcsDP(wordX, wordY));
            const p = [10, 100, 5, 50, 1];
            console.log('matrixChainMultiplicationDPCount [10, 100, 5, 50, 1]: ', matrixChainOrder(p));
            const q = [30, 35, 15, 5, 10, 20, 25];
            console.log('matrixChainMultiplicationDPCount [30, 35, 15, 5, 10, 20, 25]: ', matrixChainOrder(q));
        }
    }

    class FunctionalTest extends Laya.Script {
        constructor() {
            super();
        }
        onEnable() {
            console.log('Functional Test~~~');
            const printArray = function (array) {
                for (let i = 0; i < array.length; i++)
                    console.log(array[i]);
            };
            printArray([1, 2, 3, 4, 5]);
            const forEach = function (array, action) {
                for (let i = 0; i < array.length; i++)
                    action(array[i]);
            };
            const logItem = function (item) {
                console.log(item);
            };
            forEach([1, 2, 3, 4, 5], logItem);
            var findMinArray = function (array) {
                let minValue = array[0];
                for (let i = 1; i < array.length; i++)
                    if (minValue > array[i])
                        minValue = array[i];
                return minValue;
            };
            console.log(findMinArray([8, 6, 4, 5, 9]));
            const min_ = function (array) {
                return Math.min(...array);
            };
            console.log(min_([8, 6, 4, 5, 9]));
            const daysOfWeek = [{ name: 'Monday', value: 1 }, { name: 'Tuesday', value: 2 }, { name: 'Wednesday', value: 7 }];
            let daysOfWeekValues_ = [];
            for (let i = 0; i < daysOfWeek.length; i++)
                daysOfWeekValues_.push(daysOfWeek[i].value);
            console.log(daysOfWeekValues_);
            const daysOfWeekValues = daysOfWeek.map(day => day.value);
            console.log(daysOfWeekValues);
            const positiveNumbers_ = function (array) {
                let positive = [];
                for (let i = 0; i < array.length; i++)
                    if (array[i] >= 0)
                        positive.push(array[i]);
                return positive;
            };
            console.log(positiveNumbers_([-1, 1, 2, -3]));
            const positiveNumbers = (array) => array.filter(num => (num >= 0));
            console.log(positiveNumbers([-1, 1, 2, -3]));
            const sumValues = function (array) {
                let total = array[0];
                for (let i = 1; i < array.length; i++)
                    total += array[i];
                return total;
            };
            console.log(sumValues([1, 2, 3, 4, 5]));
            const sum = (arr) => arr.reduce((a, b) => a + b);
            console.log(sum([1, 2, 3, 4, 5]));
            const mergeArrays_ = function (arrays) {
                const count = arrays.length;
                let newArray = [];
                let k = 0;
                for (let i = 0; i < count; i++)
                    for (let j = 0; j < arrays[i].length; j++)
                        newArray[k++] = arrays[i][j];
                return newArray;
            };
            console.log(mergeArrays_([[1, 2, 3], [4, 5], [6]]));
            const mergeArraysConcat = (arrays) => {
                return arrays.reduce((p, n) => { return p.concat(n); });
            };
            console.log(mergeArraysConcat([[1, 2, 3], [4, 5], [6]]));
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
    function floydWarshallWithPath(graph) {
        const dist = [];
        const length = graph.length;
        const paths = graph.slice(0);
        for (let i = 0; i < length; i++) {
            dist[i] = [];
            paths[i] = graph[i].slice(0);
            paths[i].fill(0);
            for (let j = 0; j < length; j++) {
                paths[i][j] = j;
                if (i === j) {
                    dist[i][j] = 0;
                    paths[i][j] = Infinity;
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
                        paths[i][j] = paths[i][k];
                    }
                }
            }
        }
        return paths;
    }

    const INF$1 = 9;
    const initializeCost = (graph) => {
        const cost = [];
        const length = graph.length;
        for (let i = 0; i < length; i++) {
            cost[i] = [];
            for (let j = 0; j < length; j++) {
                if (graph[i][j] === 0) {
                    cost[i][j] = INF$1;
                }
                else {
                    cost[i][j] = graph[i][j];
                }
            }
        }
        return cost;
    };
    const find = (i, parent) => {
        while (parent[i] > 0)
            i = parent[i];
        return i;
    };
    const union = (i, j, parent) => {
        if (i != j) {
            parent[i] = j;
            return true;
        }
        return false;
    };
    function kruskal(graph) {
        const length = graph.length;
        const parent = new Array(length).fill(-1);
        const cost = initializeCost(graph);
        const edges = [];
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
                if (cost[i][j] != INF$1) {
                    let edge = [i, j, cost[i][j]];
                    edges.push(edge);
                    cost[i][j] = cost[j][i] = INF$1;
                }
            }
        }
        edges.sort((a, b) => { return a[2] - b[2]; });
        let mst = [];
        build: for (let m = 0; m < edges.length; m++) {
            let a = find(edges[m][0], parent);
            let b = find(edges[m][1], parent);
            union(a, b, parent);
            if (union(a, b, parent))
                mst.push(edges[m]);
            if (mst.length == length - 1)
                break build;
        }
        return mst;
    }

    const INF$2 = Number.MAX_SAFE_INTEGER;
    const minKey = (length, key, visited) => {
        let min = INF$2;
        let minIndex = 0;
        for (let v = 0; v < length; v++) {
            if (visited[v] === false && key[v] < min) {
                min = key[v];
                minIndex = v;
            }
        }
        return minIndex;
    };
    function prim(graph) {
        const parent = [];
        const key = [];
        const visited = [];
        const length = graph.length;
        for (let i = 0; i < length; i++) {
            key[i] = INF$2;
            visited[i] = false;
        }
        key[0] = 0;
        parent[0] = -1;
        for (let i = 0; i < length - 1; i++) {
            const u = minKey(length, key, visited);
            visited[u] = true;
            for (let v = 0; v < length; v++) {
                if (graph[u][v] && visited[v] === false && graph[u][v] < key[v]) {
                    parent[v] = u;
                    key[v] = graph[u][v];
                }
            }
        }
        return parent;
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
            const graphP = [
                [0, 2, 4, 0, 0, 0],
                [2, 0, 1, 4, 2, 0],
                [4, 1, 0, 0, 3, 0],
                [0, 4, 0, 0, 3, 2],
                [0, 2, 3, 3, 0, 2],
                [0, 0, 0, 2, 2, 0]
            ];
            console.log("********* Prim's Algorithm - Minimum Spanning Tree ***********");
            const pathP = prim(graphP);
            console.log('Edge   Weight');
            for (let i = 1; i < graphP.length; i++)
                console.log(pathP[i] + ' - ' + i + '   ' + graphP[i][pathP[i]]);
            console.log('prims parent:', pathP);
            console.log('\n');
            console.log('********* Kruskal Algorithm - Minimum Spanning Tree ***********');
            const pathQ = kruskal(graphP);
            console.log('Edge   Weight');
            for (let i = 0; i < graphP.length - 1; i++)
                console.log(pathQ[i][0] + ' - ' + pathQ[i][1] + '   ' + pathQ[i][2]);
            console.log('\n');
            console.log('kruskals parent:', pathQ);
            let uf = new UnionFind(["A", "B", "C", "D", "E"]);
            uf.union("A", "B");
            uf.union("A", "C");
            uf.union("C", "D");
            console.log(uf.connected("B", "E"));
            console.log(uf.connected("B", "D"));
            uf = new UnionFind([0, 1, 2, 3, 4]);
            uf.union(0, 1);
            uf.union(0, 2);
            uf.union(2, 3);
            console.log(uf.connected(1, 4));
            console.log(uf.connected(1, 3));
            let tb = [];
            tb[77.8] = 0.134739;
            let ssin = (n) => {
                return tb[n];
            };
            console.time('a1');
            let aa = 1;
            for (let i = 0; i < 10000; i++) {
                aa = Math.sin(77.8);
            }
            console.timeEnd('a1');
            console.time('a2');
            let bb = 1;
            for (let j = 0; j < 10000; j++) {
                bb = ssin(77.8);
            }
            console.timeEnd('a2');
            console.time('a3');
            let cc = 1;
            for (let j = 0; j < 10000; j++) {
                cc = tb[77.8];
            }
            console.timeEnd('a3');
            let tb1 = [];
            tb1[77.8] = 0.134739;
            console.time('a4');
            let dd = 1;
            for (let j = 0; j < 10000; j++) {
                dd = tb1[77.8];
            }
            console.timeEnd('a4');
            let ff = (a, b) => {
                return b(a);
            };
            console.time('a5');
            let ee = 1;
            for (let j = 0; j < 10000; j++) {
                ee = ff(77.8, ssin);
            }
            console.timeEnd('a5');
        }
    }
    class UnionFind {
        constructor(elements) {
            this.count = elements.length;
            this.parent = [];
            elements.forEach(e => (this.parent[e] = e));
        }
        union(a, b) {
            let rootA = this.find(a);
            let rootB = this.find(b);
            if (rootA === rootB)
                return;
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
        find(a) {
            while (this.parent[a] !== a) {
                a = this.parent[a];
            }
            return a;
        }
        connected(a, b) {
            return this.find(a) === this.find(b);
        }
    }

    function knapSackGreedy(capacity, weights, values) {
        const n = values.length;
        let [load, val] = [0, 0];
        for (let i = 0; i < n && load < capacity; i++) {
            if (weights[i] <= capacity - load) {
                val += values[i];
                load += weights[i];
                console.log('using item ' + (i + 1) + ' for the solution');
            }
            else {
                const r = (capacity - load) / weights[i];
                val += r * values[i];
                load += weights[i];
                console.log('using ratio of ' + r + ' for item ' + (i + 1) + ' for the solution');
            }
        }
        return val;
    }

    function minCoinChangeGreedy(coins, amount) {
        const change = [];
        let total = 0;
        for (let i = coins.length; i >= 0; i--) {
            const coin = coins[i];
            while (total + coin <= amount) {
                change.push(coin);
                total += coin;
            }
        }
        return change;
    }

    class GreedyTest extends Laya.Script {
        constructor() {
            super();
        }
        onEnable() {
            console.log('Greedy Test~~~');
            console.log('minCoinChangeGreedy [1, 5, 10],15: ', minCoinChangeGreedy([1, 5, 10], 15));
            console.log('minCoinChangeGreedy [1, 3, 4],6: ', minCoinChangeGreedy([1, 3, 4], 6));
            const values = [3, 4, 5];
            const weights = [2, 3, 4];
            const capacity = 6;
            console.log('KnapSackGreedy: ', knapSackGreedy(capacity, weights, values));
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

    function partition(array, left, right, compareFn) {
        const pivot = array[(right + left) / 2 | 0];
        let [i, j] = [left, right];
        while (i <= j) {
            while (compareFn(array[i], pivot) === Compare.LESS_THAN)
                i++;
            while (compareFn(array[j], pivot) === Compare.BIGGER_THAN)
                j--;
            if (i <= j) {
                swap(array, i, j);
                i++;
                j--;
            }
        }
        return i;
    }
    function quick(array, left, right, compareFn) {
        let index;
        if (array.length > 1) {
            index = partition(array, left, right, compareFn);
            if (left < index - 1)
                quick(array, left, index - 1, compareFn);
            if (index < right)
                quick(array, index, right, compareFn);
        }
        return array;
    }
    function quickSort(array, compareFn = defaultCompare) {
        return quick(array, 0, array.length - 1, compareFn);
    }

    function binarySearchRecursive(array, value, low, high, compareFn = defaultCompare) {
        if (low <= high) {
            const mid = (low + high) >> 1 | 0;
            const element = array[mid];
            if (compareFn(element, value) === Compare.LESS_THAN) {
                return binarySearchRecursive(array, value, mid + 1, high, compareFn);
            }
            else if (compareFn(element, value) === Compare.BIGGER_THAN) {
                return binarySearchRecursive(array, value, low, mid - 1, compareFn);
            }
            else {
                return mid;
            }
        }
        return DOES_NOT_EXIST;
    }
    function binarySearch(array, value, compareFn = defaultCompare) {
        const sortedArray = quickSort(array);
        const low = 0;
        const high = sortedArray.length - 1;
        return binarySearchRecursive(array, value, low, high, compareFn);
    }

    function binarySearchIteration(array, value, compareFn = defaultCompare) {
        const sortedArray = quickSort(array);
        let low = 0;
        let high = sortedArray.length - 1;
        while (low <= high) {
            const mid = (low + high) / 2 | 0;
            const element = sortedArray[mid];
            if (compareFn(element, value) === Compare.LESS_THAN) {
                low = mid + 1;
            }
            else if (compareFn(element, value) === Compare.BIGGER_THAN) {
                high = mid - 1;
            }
            else {
                return mid;
            }
        }
        return DOES_NOT_EXIST;
    }

    function interpolationSearch(array, value, compareFn = defaultCompare, equalsFn = defaultEquals, diffFn = defaultDiff) {
        const length = array.length;
        let [low, high, position, delta] = [0, length - 1, -1, -1];
        while (low <= high && biggerEquals(value, array[low], compareFn) && lesserEquals(value, array[high], compareFn)) {
            delta = diffFn(value, array[low]) / diffFn(array[high], array[low]);
            position = low + (high - low) * delta | 0;
            if (equalsFn(array[position], value))
                return position;
            compareFn(array[position], value) === Compare.LESS_THAN ? low = position + 1 : high = position - 1;
        }
        return DOES_NOT_EXIST;
    }

    function sequentialSearch(array, value, equalsFn = defaultEquals) {
        for (let i = 0; i < array.length; i++)
            if (equalsFn(value, array[i]))
                return i;
        return DOES_NOT_EXIST;
    }

    class SearchTest extends Laya.Script {
        constructor() {
            super();
        }
        onEnable() {
            console.log('SearchTest~~~');
            let arr = [5, 4, 3, 2, 1];
            console.log('SequentialSearch: ', sequentialSearch(arr.slice(0), 3));
            console.log('BinarySearch: ', binarySearch(arr.slice(0), 4));
            console.log('InterpolationSearch: ', interpolationSearch(quickSort(arr.slice(0)), 2));
            console.log('BinarySearchIteration: ', binarySearchIteration(arr.slice(0), 5));
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

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const randomIndex = Math.random() * (i + 1) | 0;
            swap(array, i, randomIndex);
        }
        return array;
    }

    function BubbleSort(array, compareFn = defaultCompare) {
        const length = array.length;
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length - 1 - i; j++) {
                if (compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN)
                    swap(array, j, j + 1);
            }
        }
        return array;
    }

    function insertionSort(array, compareFn = defaultCompare) {
        const length = array.length;
        let temp;
        for (let i = 1; i < length; i++) {
            let j = i;
            temp = array[i];
            while (j > 0 && compareFn(array[j - 1], temp) === Compare.BIGGER_THAN) {
                array[j] = array[j - 1];
                j--;
            }
            array[j] = temp;
        }
        return array;
    }

    function createBuckets(array, bucketSize) {
        let minValue = array[0];
        let maxValue = array[0];
        for (let i = 1; i < array.length; i++) {
            if (array[i] < minValue) {
                minValue = array[i];
            }
            else if (array[i] > maxValue) {
                maxValue = array[i];
            }
        }
        const bucketCount = ((maxValue - minValue) / bucketSize | 0) + 1;
        const buckets = [];
        for (let i = 0; i < bucketCount; i++)
            buckets[i] = [];
        for (let j = 0; j < array.length; j++)
            buckets[(array[j] - minValue) / bucketSize | 0].push(array[j]);
        return buckets;
    }
    function sortBuckets(buckets) {
        const sortedArray = [];
        for (let i = 0; i < buckets.length; i++) {
            if (buckets[i] != null) {
                insertionSort(buckets[i]);
                sortedArray.push(...buckets[i]);
            }
        }
        return sortedArray;
    }
    function bucketSort(array, bucketSize = 5) {
        if (array.length < 2)
            return array;
        const buckets = createBuckets(array, bucketSize);
        return sortBuckets(buckets);
    }

    function findMaxValue(array, compareFn = defaultCompare) {
        if (array && array.length > 0) {
            let max = array[0];
            for (let i = 1; i < array.length; i++)
                if (compareFn(max, array[i]) === Compare.LESS_THAN)
                    max = array[i];
            return max;
        }
        return undefined;
    }
    function findMinValue(array, compareFn = defaultCompare) {
        if (array && array.length > 0) {
            let min = array[0];
            for (let i = 1; i < array.length; i++)
                if (compareFn(min, array[i]) === Compare.BIGGER_THAN)
                    min = array[i];
            return min;
        }
        return undefined;
    }

    function countingSort(array) {
        if (array.length < 2)
            return array;
        const maxValue = findMaxValue(array);
        let sortedIndex = 0;
        const counts = new Array(maxValue + 1);
        array.forEach(element => {
            if (!counts[element])
                counts[element] = 0;
            counts[element]++;
        });
        counts.forEach((element, i) => {
            while (element > 0) {
                array[sortedIndex++] = i;
                element--;
            }
        });
        return array;
    }

    function merge(left, right, compareFn) {
        let [i, j] = [0, 0];
        const result = [];
        while (i < left.length && j < right.length) {
            result.push(compareFn(left[i], right[j]) === Compare.LESS_THAN ? left[i++] : right[j++]);
        }
        return result.concat(i < left.length ? left.slice(i) : right.slice(j));
    }
    function mergeSort(array, compareFn = defaultCompare) {
        if (array.length > 1) {
            const length = array.length;
            const middle = length / 2 | 0;
            const left = mergeSort(array.slice(0, middle), compareFn);
            const right = mergeSort(array.slice(middle, length), compareFn);
            array = merge(left, right, compareFn);
        }
        return array;
    }

    function countingSortForRadix(array, radixBase, significantDigit, minValue) {
        let bucketsIndex;
        const buckets = [];
        const aux = [];
        for (let i = 0; i < radixBase; i++)
            buckets[i] = 0;
        for (let i = 0; i < array.length; i++) {
            bucketsIndex = ((array[i] - minValue) / significantDigit) % radixBase | 0;
            console.log('~~~  ', array[i], minValue, significantDigit, radixBase, bucketsIndex);
            buckets[bucketsIndex]++;
        }
        console.log(buckets);
        for (let i = 1; i < radixBase; i++)
            buckets[i] += buckets[i - 1];
        console.log(buckets);
        for (let i = array.length - 1; i >= 0; i--) {
            bucketsIndex = ((array[i] - minValue) / significantDigit) % radixBase | 0;
            aux[--buckets[bucketsIndex]] = array[i];
            console.log('``` ', array[i], minValue, significantDigit, radixBase, bucketsIndex);
        }
        console.log(buckets);
        for (let i = 0; i < array.length; i++)
            array[i] = aux[i];
        return array;
    }
    function radixSort(array, radixBase = 10) {
        if (array.length < 2)
            return array;
        const [minValue, maxValue] = [findMinValue(array), findMaxValue(array)];
        let significantDigit = 1;
        while ((maxValue - minValue) / significantDigit >= 1) {
            array = countingSortForRadix(array, radixBase, significantDigit, minValue);
            significantDigit *= radixBase;
        }
        return array;
    }

    function selectionSort(array, compareFn = defaultCompare) {
        const length = array.length;
        let indexMin;
        for (let i = 0; i < length - 1; i++) {
            indexMin = i;
            for (let j = i; j < length; j++) {
                if (compareFn(array[indexMin], array[j]) === Compare.BIGGER_THAN)
                    indexMin = j;
            }
            if (i !== indexMin)
                swap(array, i, indexMin);
        }
        return array;
    }

    function shellSort(array, compareFn = defaultCompare) {
        const length = array.length;
        let temp;
        let gap = 1;
        while (gap < length / 3)
            gap = gap * 3 + 1;
        for (gap; gap > 0; gap = gap / 3 | 0) {
            console.log('gap: ', gap);
            for (let i = gap; i < length; i++) {
                temp = array[i];
                let j = i - gap;
                while (j >= 0 && compareFn(array[j], temp) === Compare.BIGGER_THAN) {
                    array[j + gap] = array[j];
                    j -= gap;
                }
                array[j + gap] = temp;
            }
        }
        return array;
    }

    class SortingTest extends Laya.Script {
        constructor() {
            super();
        }
        onEnable() {
            let createNonSortedArray = (l = 5) => {
                let array = [];
                for (let i = l; i > 0; i--)
                    array.push(i);
                shuffle(array);
                return array;
            };
            const noiseArray = createNonSortedArray();
            const arrayBubble = BubbleSort(noiseArray.slice(0));
            console.log('bubbleSort: ', noiseArray.toString(), ' to ', arrayBubble.toString());
            const arraySelection = selectionSort(noiseArray.slice(0));
            console.log('selectionSort: ', noiseArray.toString(), ' to ', arraySelection.toString());
            const arrayInsertion = insertionSort(noiseArray.slice(0));
            console.log('insertionSort: ', noiseArray.toString(), ' to ', arrayInsertion.toString());
            const arrayMerge = mergeSort(noiseArray.slice(0));
            console.log('mergeSort: ', noiseArray.toString(), ' to ', arrayMerge.toString());
            const quickNoiseArray = [3, 5, 1, 6, 4, 7, 2];
            const arrayQuick = quickSort(quickNoiseArray.slice(0));
            console.log('quickSort: ', quickNoiseArray.toString(), ' to ', arrayQuick.toString());
            const countingArray = [4, 5, 3, 2, 3, 1];
            const arrayCounting = countingSort(countingArray.slice(0));
            console.log('countingSort: ', countingArray.toString(), ' to ', arrayCounting.toString());
            const bucketArray = [1, 3, 9, 6, 4, 7, 8, 5, 2];
            const arrayBucket = bucketSort(bucketArray.slice(0));
            console.log('bucketSort: ', bucketArray.toString(), ' to ', arrayBucket.toString());
            const radixArray = [1, 3, 9, 6, 4, 7, 8, 5, 2, 11, 15, 41, 23, 33, 17];
            const arrayRadix = radixSort(radixArray.slice(0));
            console.log('radixSort: ', radixArray.toString(), ' to ', arrayRadix.toString());
            const shellArray = createNonSortedArray(10);
            const arrayShell = shellSort(shellArray.slice(0));
            console.log('shellSort: ', shellArray.toString(), ' to ', arrayShell.toString());
            const shellArray1 = radixArray;
            const arrayShell1 = shellSort(shellArray1.slice(0));
            console.log('shellSort: ', shellArray1.toString(), ' to ', arrayShell1.toString());
            const shellArray2 = createNonSortedArray(3);
            const arrayShell2 = shellSort(shellArray2.slice(0));
            console.log('shellSort: ', shellArray2.toString(), ' to ', arrayShell2.toString());
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

    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        class StartUI extends Laya.Scene {
            constructor() {
                super();
                this.referenceClass = [Laya.Button, Laya.Sprite];
            }
        }
        ui.StartUI = StartUI;
    })(ui || (ui = {}));
    (function (ui) {
        var test;
        (function (test) {
            class BackTracingSceneUI extends Laya.Scene {
                constructor() {
                    super();
                    this.referenceClass = [Laya.Button];
                }
            }
            test.BackTracingSceneUI = BackTracingSceneUI;
            class ConsoleUnitUI extends Laya.Scene {
                constructor() {
                    super();
                    this.referenceClass = [Laya.Button];
                }
            }
            test.ConsoleUnitUI = ConsoleUnitUI;
            class DictionarySceneUI extends Laya.Scene {
                constructor() {
                    super();
                    this.referenceClass = [Laya.Button];
                }
            }
            test.DictionarySceneUI = DictionarySceneUI;
            class DynamicProgramingSceneUI extends Laya.Scene {
                constructor() {
                    super();
                    this.referenceClass = [Laya.Button];
                }
            }
            test.DynamicProgramingSceneUI = DynamicProgramingSceneUI;
            class FunctionalTestUI extends Laya.Scene {
                constructor() {
                    super();
                    this.referenceClass = [Laya.Button];
                }
            }
            test.FunctionalTestUI = FunctionalTestUI;
            class GraphSceneUI extends Laya.Scene {
                constructor() {
                    super();
                    this.referenceClass = [Laya.Button];
                }
            }
            test.GraphSceneUI = GraphSceneUI;
            class GreedySceneUI extends Laya.Scene {
                constructor() {
                    super();
                    this.referenceClass = [Laya.Button];
                }
            }
            test.GreedySceneUI = GreedySceneUI;
            class HashTableSceneUI extends Laya.Scene {
                constructor() {
                    super();
                    this.referenceClass = [Laya.Button];
                }
            }
            test.HashTableSceneUI = HashTableSceneUI;
            class HeapSceneUI extends Laya.Scene {
                constructor() {
                    super();
                    this.referenceClass = [Laya.Button];
                }
            }
            test.HeapSceneUI = HeapSceneUI;
            class LinkedListSceneUI extends Laya.Scene {
                constructor() {
                    super();
                    this.referenceClass = [Laya.Button];
                }
            }
            test.LinkedListSceneUI = LinkedListSceneUI;
            class QueueSceneUI extends Laya.Scene {
                constructor() {
                    super();
                    this.referenceClass = [Laya.Button];
                }
            }
            test.QueueSceneUI = QueueSceneUI;
            class RecursiveSceneUI extends Laya.Scene {
                constructor() {
                    super();
                    this.referenceClass = [Laya.Button];
                }
            }
            test.RecursiveSceneUI = RecursiveSceneUI;
            class SearchSceneUI extends Laya.Scene {
                constructor() {
                    super();
                    this.referenceClass = [Laya.Button];
                }
            }
            test.SearchSceneUI = SearchSceneUI;
            class SetSceneUI extends Laya.Scene {
                constructor() {
                    super();
                    this.referenceClass = [Laya.Button];
                }
            }
            test.SetSceneUI = SetSceneUI;
            class SortingSceneUI extends Laya.Scene {
                constructor() {
                    super();
                    this.referenceClass = [Laya.Button];
                }
            }
            test.SortingSceneUI = SortingSceneUI;
            class StackSceneUI extends Laya.Scene {
                constructor() {
                    super();
                    this.referenceClass = [Laya.Button];
                }
            }
            test.StackSceneUI = StackSceneUI;
            class TreeSceneUI extends Laya.Scene {
                constructor() {
                    super();
                    this.referenceClass = [Laya.Button];
                }
            }
            test.TreeSceneUI = TreeSceneUI;
        })(test = ui.test || (ui.test = {}));
    })(ui || (ui = {}));

    class GameConfig {
        constructor() {
        }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("ui", ui);
            reg("script/Start.ts", Start);
            reg("script/BackTracingTest.ts", BackTracingTest);
            reg("script/Go2StartScene.ts", Go2StartScene);
            reg("script/UnitConsole.ts", UnitConsole);
            reg("script/DictionaryTest.ts", DictionaryTest);
            reg("script/DynamicProgramingTest.ts", DynamicProgramingTest);
            reg("script/FunctionalTest.ts", FunctionalTest);
            reg("script/GraphTest.ts", GraphTest);
            reg("script/GreedyTest.ts", GreedyTest);
            reg("script/HashTableTest.ts", HashTableTest);
            reg("script/HeapTest.ts", HeapTest);
            reg("script/LinkedListTest.ts", LinkedListTest);
            reg("script/QueueTest.ts", QueueTest);
            reg("script/RecursiveTest.ts", RecursiveTest);
            reg("script/SearchTest.ts", SearchTest);
            reg("script/SetTest.ts", SetTest);
            reg("script/SortingTest.ts", SortingTest);
            reg("script/StackTest.ts", StackTest);
            reg("script/TreeTest.ts", TreeTest);
        }
    }
    GameConfig.width = 640;
    GameConfig.height = 1136;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "Start.scene";
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
//# sourceMappingURL=bundle.js.map
