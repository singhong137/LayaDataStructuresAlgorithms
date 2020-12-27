import { Script } from "laya/components/Script";
import { Scene } from "laya/display/Scene";
export default class Go2StartScene extends Script {
    constructor() {
        super();
    }
    onEnable() {
    }
    onClick() {
        Scene.open('Start.scene');
    }
}
