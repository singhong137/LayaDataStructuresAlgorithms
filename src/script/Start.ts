import { Laya } from "Laya";
import { Script } from "laya/components/Script";
import { Scene } from "laya/display/Scene";

export default class Start extends Script {
    constructor() {
        super();
    }

    onEnable() {

    }

    onClick() {
        // Scene.open('test/BackTracingScene.scene');
        // console.log(this.owner);
        switch (this.owner.name) {
            case 'btn0':
                Scene.open('test/ConsoleUnit.scene');
                break
            case 'btn1':
                Scene.open('test/StackScene.scene');
                break;
            case 'btn2':
                Scene.open('test/QueueScene.scene');
                break
            case 'btn3':
                Scene.open('test/LinkedListScene.scene');
                break;
            case 'btn4':
                Scene.open('test/SetScene.scene');
                break
            case 'btn5':
                Scene.open('test/DictionaryScene.scene');
                break;
            case 'btn6':
                Scene.open('test/HashTableScene.scene');
                break
            case 'btn7':
                Scene.open('test/RecursiveScene.scene');
                break;
            case 'btn8':
                Scene.open('test/TreeScene.scene');
                break
            case 'btn9':
                Scene.open('test/HeapScene.scene');
                break;
            case 'btn10':
                Scene.open('test/GraphScene.scene');
                break
            case 'btn11':
                Scene.open('test/SortingScene.scene');
                break;
            case 'btn12':
                Scene.open('test/SearchScene.scene');
                break
            case 'btn13':
                Scene.open('test/DynamicProgramingScene.scene');
                break;
            case 'btn14':
                Scene.open('test/GreedyScene.scene');
                break
            case 'btn15':
                Scene.open('test/BackTracingScene.scene');
                break;
            case 'btn16':
                Scene.open('test/FunctionalTest.scene');
                break;
        }
    }
}