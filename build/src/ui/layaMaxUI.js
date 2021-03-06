/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import { Scene } from "laya/display/Scene";
import { ClassUtils } from "laya/utils/ClassUtils";
var REG = ClassUtils.regClass;
import { Button } from "laya/ui/Button";
export var ui;
(function (ui) {
    class StartUI extends Scene {
        constructor() {
            super();
            this.referenceClass = [Button]; // 强制引用类,防止被编译器忽略
        }
    }
    ui.StartUI = StartUI;
})(ui || (ui = {}));
import { Image } from "laya/ui/Image";
import { Sprite } from "laya/display/Sprite";
import { FrameAnimation } from "laya/display/FrameAnimation";
import { EffectAnimation } from "laya/display/EffectAnimation";
import { View } from "laya/ui/View";
import { Label } from "laya/ui/Label";
(function (ui) {
    var test;
    (function (test) {
        class box2dUI extends Scene {
            constructor() {
                super();
                this.referenceClass = [Image]; // 强制引用类,防止被编译器忽略
            }
        }
        test.box2dUI = box2dUI;
        class ConsoleUnitUI extends Scene {
            constructor() {
                super();
                this.referenceClass = []; // 强制引用类,防止被编译器忽略
            }
        }
        test.ConsoleUnitUI = ConsoleUnitUI;
        class DictionarySceneUI extends Scene {
            constructor() {
                super();
                this.referenceClass = []; // 强制引用类,防止被编译器忽略
            }
        }
        test.DictionarySceneUI = DictionarySceneUI;
        class GraphSceneUI extends Scene {
            constructor() {
                super();
                this.referenceClass = [Sprite]; // 强制引用类,防止被编译器忽略
            }
        }
        test.GraphSceneUI = GraphSceneUI;
        class HashTableSceneUI extends Scene {
            constructor() {
                super();
                this.referenceClass = []; // 强制引用类,防止被编译器忽略
            }
        }
        test.HashTableSceneUI = HashTableSceneUI;
        class HeapSceneUI extends Scene {
            constructor() {
                super();
                this.referenceClass = []; // 强制引用类,防止被编译器忽略
            }
        }
        test.HeapSceneUI = HeapSceneUI;
        class LinkedListSceneUI extends Scene {
            constructor() {
                super();
                this.referenceClass = []; // 强制引用类,防止被编译器忽略
            }
        }
        test.LinkedListSceneUI = LinkedListSceneUI;
        class QueueSceneUI extends Scene {
            constructor() {
                super();
                this.referenceClass = []; // 强制引用类,防止被编译器忽略
            }
        }
        test.QueueSceneUI = QueueSceneUI;
        class RecursiveSceneUI extends Scene {
            constructor() {
                super();
                this.referenceClass = []; // 强制引用类,防止被编译器忽略
            }
        }
        test.RecursiveSceneUI = RecursiveSceneUI;
        class SetSceneUI extends Scene {
            constructor() {
                super();
                this.referenceClass = []; // 强制引用类,防止被编译器忽略
            }
        }
        test.SetSceneUI = SetSceneUI;
        class StackSceneUI extends Scene {
            constructor() {
                super();
                this.referenceClass = []; // 强制引用类,防止被编译器忽略
            }
        }
        test.StackSceneUI = StackSceneUI;
        class test1UI extends EffectAnimation {
            constructor() {
                super();
                this.referenceClass = [FrameAnimation, EffectAnimation, View, Sprite]; // 强制引用类,防止被编译器忽略
                this.effectData = ui.test.test1UI.uiView;
            }
        }
        test1UI.uiView = { "type": "View", "props": {}, "compId": 2, "child": [{ "type": "Sprite", "props": { "texture": "test/b1.png" }, "compId": 3 }], "animations": [{ "nodes": [{ "target": 3, "keyframes": { "y": [{ "value": 818, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "y", "index": 0 }, { "value": 818, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "y", "index": 1 }, { "value": 818, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "y", "index": 13 }], "x": [{ "value": 330, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "x", "index": 0 }, { "value": 330, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "x", "index": 1 }, { "value": 330, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "x", "index": 13 }], "scaleY": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleY", "index": 0 }, { "value": 0.2, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleY", "index": 1 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleY", "index": 13 }], "scaleX": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleX", "index": 0 }, { "value": 0.2, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleX", "index": 1 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleX", "index": 13 }], "pivotY": [{ "value": 50, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "pivotY", "index": 0 }], "pivotX": [{ "value": 50, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "pivotX", "index": 0 }] } }], "name": "ani1", "id": 1, "frameRate": 24, "action": 0 }], "loadList": ["test/b1.png"], "loadList3D": [] };
        test.test1UI = test1UI;
        REG("ui.test.test1UI", test1UI);
        class TestSceneUI extends Scene {
            constructor() {
                super();
                this.referenceClass = [Label, Button, Sprite]; // 强制引用类,防止被编译器忽略
            }
            createChildren() {
                super.createChildren();
                this.loadScene("test/TestScene");
            }
        }
        test.TestSceneUI = TestSceneUI;
        REG("ui.test.TestSceneUI", TestSceneUI);
        class TreeSceneUI extends Scene {
            constructor() {
                super();
                this.referenceClass = []; // 强制引用类,防止被编译器忽略
            }
        }
        test.TreeSceneUI = TreeSceneUI;
    })(test = ui.test || (ui.test = {}));
})(ui || (ui = {}));
