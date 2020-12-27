import { Sprite } from "./Sprite";
import { Config } from "./../../Config";
import { Const } from "../Const";
import { Event } from "../events/Event";
import { ClassUtils } from "../utils/ClassUtils";
/**
 * 动画播放完毕后调度。
 * @eventType Event.COMPLETE
 */
/*[Event(name = "complete", type = "laya.events.Event")]*/
/**
 * 播放到某标签后调度。
 * @eventType Event.LABEL
 */
/*[Event(name = "label", type = "laya.events.Event")]*/
/**
 * <p>动画基类，提供了基础的动画播放控制方法和帧标签事件相关功能。</p>
 * <p>可以继承此类，但不要直接实例化此类，因为有些方法需要由子类实现。</p>
 */
export class AnimationBase extends Sprite {
    /**
     * 可以继承此类，但不要直接实例化此类，因为有些方法需要由子类实现。
     */
    constructor() {
        super();
        /**播放顺序类型：AnimationBase.WRAP_POSITIVE为正序播放(默认值)，AnimationBase.WRAP_REVERSE为倒序播放，AnimationBase.WRAP_PINGPONG为pingpong播放(当按指定顺序播放完结尾后，如果继续播发，则会改变播放顺序)。*/
        this.wrapMode = 0;
        /**@private 播放间隔(单位：毫秒)。*/
        this._interval = Config.animationInterval;
        /**是否是逆序播放*/
        this._isReverse = false;
        /**@private */
        this._frameRateChanged = false;
        this._setBitUp(Const.DISPLAY);
    }
    /**
     * <p>开始播放动画。play(...)方法被设计为在创建实例后的任何时候都可以被调用，当相应的资源加载完毕、调用动画帧填充方法(set frames)或者将实例显示在舞台上时，会判断是否正在播放中，如果是，则进行播放。</p>
     * <p>配合wrapMode属性，可设置动画播放顺序类型。</p>
     * @param	start	（可选）指定动画播放开始的索引(int)或帧标签(String)。帧标签可以通过addLabel(...)和removeLabel(...)进行添加和删除。
     * @param	loop	（可选）是否循环播放。
     * @param	name	（可选）动画名称。
     */
    play(start = 0, loop = true, name = "") {
        this._isPlaying = true;
        this._actionName = name;
        this.index = (typeof (start) == 'string') ? this._getFrameByLabel(start) : start;
        this.loop = loop;
        this._isReverse = this.wrapMode === AnimationBase.WRAP_REVERSE;
        if (this.index == 0 && this._isReverse) {
            this.index = this.count - 1;
        }
        if (this.interval > 0)
            this.timerLoop(this.interval, this, this._frameLoop, null, true, true);
    }
    /**
     * <p>动画播放的帧间隔时间(单位：毫秒)。默认值依赖于Config.animationInterval=50，通过Config.animationInterval可以修改默认帧间隔时间。</p>
     * <p>要想为某动画设置独立的帧间隔时间，可以使用set interval，注意：如果动画正在播放，设置后会重置帧循环定时器的起始时间为当前时间，也就是说，如果频繁设置interval，会导致动画帧更新的时间间隔会比预想的要慢，甚至不更新。</p>
     */
    get interval() {
        return this._interval;
    }
    set interval(value) {
        if (this._interval != value) {
            this._frameRateChanged = true;
            this._interval = value;
            if (this._isPlaying && value > 0) {
                this.timerLoop(value, this, this._frameLoop, null, true, true);
            }
        }
    }
    /**@private */
    _getFrameByLabel(label) {
        for (var i = 0; i < this._count; i++) {
            var item = this._labels[i];
            if (item && item.indexOf(label) > -1)
                return i;
        }
        return 0;
    }
    /**@private */
    _frameLoop() {
        if (this._isReverse) {
            this._index--;
            if (this._index < 0) {
                if (this.loop) {
                    if (this.wrapMode == AnimationBase.WRAP_PINGPONG) {
                        this._index = this._count > 0 ? 1 : 0;
                        this._isReverse = false;
                    }
                    else {
                        this._index = this._count - 1;
                    }
                    this.event(Event.COMPLETE);
                }
                else {
                    this._index = 0;
                    this.stop();
                    this.event(Event.COMPLETE);
                    return;
                }
            }
        }
        else {
            this._index++;
            if (this._index >= this._count) {
                if (this.loop) {
                    if (this.wrapMode == AnimationBase.WRAP_PINGPONG) {
                        this._index = this._count - 2 >= 0 ? this._count - 2 : 0;
                        this._isReverse = true;
                    }
                    else {
                        this._index = 0;
                    }
                    this.event(Event.COMPLETE);
                }
                else {
                    this._index--;
                    this.stop();
                    this.event(Event.COMPLETE);
                    return;
                }
            }
        }
        this.index = this._index;
    }
    /**@internal */
    _setControlNode(node) {
        if (this._controlNode) {
            this._controlNode.off(Event.DISPLAY, this, this._resumePlay);
            this._controlNode.off(Event.UNDISPLAY, this, this._resumePlay);
        }
        this._controlNode = node;
        if (node && node != this) {
            node.on(Event.DISPLAY, this, this._resumePlay);
            node.on(Event.UNDISPLAY, this, this._resumePlay);
        }
    }
    /**@internal
     * @override
    */
    _setDisplay(value) {
        super._setDisplay(value);
        this._resumePlay();
    }
    /**@private */
    _resumePlay() {
        if (this._isPlaying) {
            if (this._controlNode.displayedInStage)
                this.play(this._index, this.loop, this._actionName);
            else
                this.clearTimer(this, this._frameLoop);
        }
    }
    /**
     * 停止动画播放。
     */
    stop() {
        this._isPlaying = false;
        this.clearTimer(this, this._frameLoop);
    }
    /**
     * 是否正在播放中。
     */
    get isPlaying() {
        return this._isPlaying;
    }
    /**
     * 增加一个帧标签到指定索引的帧上。当动画播放到此索引的帧时会派发Event.LABEL事件，派发事件是在完成当前帧画面更新之后。
     * @param	label	帧标签名称
     * @param	index	帧索引
     */
    addLabel(label, index) {
        if (!this._labels)
            this._labels = {};
        if (!this._labels[index])
            this._labels[index] = [];
        this._labels[index].push(label);
    }
    /**
     * 删除指定的帧标签。
     * @param	label 帧标签名称。注意：如果为空，则删除所有帧标签！
     */
    removeLabel(label) {
        if (!label)
            this._labels = null;
        else if (this._labels) {
            for (var name in this._labels) {
                this._removeLabelFromList(this._labels[name], label);
            }
        }
    }
    /**@private */
    _removeLabelFromList(list, label) {
        if (!list)
            return;
        for (var i = list.length - 1; i >= 0; i--) {
            if (list[i] == label) {
                list.splice(i, 1);
            }
        }
    }
    /**
     * 将动画切换到指定帧并停在那里。
     * @param	position 帧索引或帧标签
     */
    gotoAndStop(position) {
        this.index = (typeof (position) == 'string') ? this._getFrameByLabel(position) : position;
        this.stop();
    }
    /**
     * 动画当前帧的索引。
     */
    get index() {
        return this._index;
    }
    set index(value) {
        this._index = value;
        this._displayToIndex(value);
        if (this._labels && this._labels[value]) {
            var tArr = this._labels[value];
            for (var i = 0, len = tArr.length; i < len; i++) {
                this.event(Event.LABEL, tArr[i]);
            }
        }
    }
    /**
     * @private
     * 显示到某帧
     * @param value 帧索引
     */
    _displayToIndex(value) {
    }
    /**
     * 当前动画中帧的总数。
     */
    get count() {
        return this._count;
    }
    /**
     * 停止动画播放，并清理对象属性。之后可存入对象池，方便对象复用。
     * @return 返回对象本身
     */
    clear() {
        this.stop();
        this._labels = null;
        return this;
    }
}
/**动画播放顺序类型：正序播放。 */
AnimationBase.WRAP_POSITIVE = 0;
/**动画播放顺序类型：逆序播放。 */
AnimationBase.WRAP_REVERSE = 1;
/**动画播放顺序类型：pingpong播放(当按指定顺序播放完结尾后，如果继续播放，则会改变播放顺序)。 */
AnimationBase.WRAP_PINGPONG = 2;
ClassUtils.regClass("laya.display.AnimationBase", AnimationBase);
ClassUtils.regClass("Laya.AnimationBase", AnimationBase);