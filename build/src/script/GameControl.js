import { Script } from "laya/components/Script";
import { Pool } from "laya/utils/Pool";
import { Laya } from "Laya";
/**
 * 游戏控制脚本。定义了几个dropBox，bullet，createBoxInterval等变量，能够在IDE显示及设置该变量
 * 更多类型定义，请参考官方文档
 */
export default class GameControl extends Script {
    constructor() {
        super();
        /** @prop {name:createBoxInterval,tips:"间隔多少毫秒创建一个下跌的容器",type:int,default:1000}*/
        this.createBoxInterval = 1000;
        /**开始时间*/
        this._time = 0;
        /**是否已经开始游戏 */
        this._started = false;
    }
    onEnable() {
        this._time = Date.now();
        this._gameBox = this.owner.getChildByName("gameBox");
        this.t1 = this.owner.getChildByName('t1');
    }
    onUpdate() {
        //每间隔一段时间创建一个盒子
        let now = Date.now();
        if (now - this._time > this.createBoxInterval && this._started) {
            this._time = now;
            this.createBox();
        }
        // console.log(this.t1.x+' / '+this.t1.y)
        // this.t1.pos(330,818)
    }
    createBox() {
        //使用对象池创建盒子
        let box = Pool.getItemByCreateFun("dropBox", this.dropBox.create, this.dropBox);
        box.pos(Math.random() * (Laya.stage.width - 100), -100);
        this._gameBox.addChild(box);
    }
    onStageClick(e) {
        //停止事件冒泡，提高性能，当然也可以不要
        e.stopPropagation();
        //舞台被点击后，使用对象池创建子弹
        let flyer = Pool.getItemByCreateFun("bullet", this.bullet.create, this.bullet);
        flyer.pos(Laya.stage.mouseX, Laya.stage.mouseY);
        this._gameBox.addChild(flyer);
        // (this.owner.getChildByName('t1') as Sprite).x=300;(this.owner.getChildByName('t1') as Sprite).y=500;
    }
    /**开始游戏，通过激活本脚本方式开始游戏*/
    startGame() {
        if (!this._started) {
            this._started = true;
            this.enabled = true;
        }
    }
    /**结束游戏，通过非激活本脚本停止游戏 */
    stopGame() {
        this._started = false;
        this.enabled = false;
        this.createBoxInterval = 1000;
        this._gameBox.removeChildren();
    }
}