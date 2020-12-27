import { Script } from "laya/components/Script";
const lele = 3.14;
export default class Unit1 extends Script {
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
        console.timeEnd('a1'); //a1: 0.02001953125ms
        console.time('a2');
        let bb = 1;
        for (let j = 0; j < 1000; j++) {
            bb << 1;
        }
        console.timeEnd('a2'); //a2: 0.013916015625ms
        //a1 - a2 = 0.006103515625
        console.log(lele);
        let [a, b] = [1, 2];
        console.log(a, ' / ', b);
        [a, b] = [b, a];
        console.log(a, ' / ', b);
        let c = Math.pow(a, 3);
        console.log(`c:${c}`);
    }
}
