import { Script } from "laya/components/Script";
import { Scene } from "laya/display/Scene";
export default class Start extends Script {
    constructor() {
        super();
    }
    onEnable() {
    }
    onClick() {
        Scene.open('test/box2d.scene');
    }
}
