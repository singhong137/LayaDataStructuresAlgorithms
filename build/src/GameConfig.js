/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import Start from "./script/Start";
import Go2StartScene from "./script/Go2StartScene";
import UnitConsole from "./script/UnitConsole";
import DictionaryTest from "./script/DictionaryTest";
import GraphTest from "./script/GraphTest";
import HashTableTest from "./script/HashTableTest";
import HeapTest from "./script/HeapTest";
import LinkedListTest from "./script/LinkedListTest";
import QueueTest from "./script/QueueTest";
import RecursiveTest from "./script/RecursiveTest";
import SetTest from "./script/SetTest";
import StackTest from "./script/StackTest";
import GameUI from "./script/GameUI";
import GameControl from "./script/GameControl";
import TreeTest from "./script/TreeTest";
import Bullet from "./script/Bullet";
import DropBox from "./script/DropBox";
import { BoxCollider } from "laya/physics/BoxCollider";
import { RigidBody } from "laya/physics/RigidBody";
import { EffectAnimation } from "laya/display/EffectAnimation";
import { CircleCollider } from "laya/physics/CircleCollider";
import { Text } from "laya/display/Text";
import { ClassUtils } from "laya/utils/ClassUtils";
import { ui } from "./ui/layaMaxUI";
/*
* 游戏初始化配置;
*/
export default class GameConfig {
    constructor() {
    }
    static init() {
        var reg = ClassUtils.regClass;
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
        reg("Laya.BoxCollider", BoxCollider);
        reg("Laya.RigidBody", RigidBody);
        reg("Laya.EffectAnimation", EffectAnimation);
        reg("Laya.CircleCollider", CircleCollider);
        reg("Laya.Text", Text);
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
