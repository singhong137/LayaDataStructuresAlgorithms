import { Quaternion } from "../math/Quaternion";
import { Vector3 } from "../math/Vector3";
import { Render } from "../../renders/Render";
import { ConchVector3 } from "../math/Native/ConchVector3";
import { ConchQuaternion } from "../math/Native/ConchQuaternion";
/**
 * <code>AnimatorState</code> 类用于创建动作状态。
 */
export class AnimatorState {
    /**
     * 创建一个 <code>AnimatorState</code> 实例。
     */
    constructor() {
        /** @internal */
        this._referenceCount = 0;
        /** @internal */
        this._clip = null;
        /** @internal */
        this._nodeOwners = []; //TODO:提出去
        /** @internal */
        this._currentFrameIndices = null;
        /**
         * @internal
         * to avoid data confused,must put realtime datas in animatorState,can't be in animationClip,
         * for example use crossFade() with different animatorState but the sample clip source.
         */
        this._realtimeDatas = [];
        /** @internal */
        this._scripts = null;
        /**动画播放速度,1.0为正常播放速度。*/
        this.speed = 1.0;
        /**动作播放起始时间。*/
        this.clipStart = 0.0;
        /**动作播放结束时间。*/
        this.clipEnd = 1.0;
    }
    /**
     * 动作。
     */
    get clip() {
        return this._clip;
    }
    set clip(value) {
        if (this._clip !== value) {
            if (this._clip)
                (this._referenceCount > 0) && (this._clip._removeReference(this._referenceCount));
            if (value) {
                var realtimeDatas = this._realtimeDatas;
                var clipNodes = value._nodes;
                var count = clipNodes.count;
                this._currentFrameIndices = new Int16Array(count);
                this._resetFrameIndices();
                (this._referenceCount > 0) && (value._addReference(this._referenceCount));
                this._realtimeDatas.length = count;
                for (var i = 0; i < count; i++) {
                    switch (clipNodes.getNodeByIndex(i).type) {
                        case 0:
                            break;
                        case 1:
                        case 3:
                        case 4:
                            realtimeDatas[i] = Render.supportWebGLPlusAnimation ? new ConchVector3 : new Vector3();
                            break;
                        case 2:
                            realtimeDatas[i] = Render.supportWebGLPlusAnimation ? new ConchQuaternion : new Quaternion();
                            break;
                        default:
                            throw "AnimationClipParser04:unknown type.";
                    }
                }
            }
            this._clip = value;
        }
    }
    /**
     * @implements IReferenceCounter
     */
    _getReferenceCount() {
        return this._referenceCount;
    }
    /**
     * @implements IReferenceCounter
     */
    _addReference(count = 1) {
        (this._clip) && (this._clip._addReference(count));
        this._referenceCount += count;
    }
    /**
     * @implements IReferenceCounter
     */
    _removeReference(count = 1) {
        (this._clip) && (this._clip._removeReference(count));
        this._referenceCount -= count;
    }
    /**
     * @implements IReferenceCounter
     */
    _clearReference() {
        this._removeReference(-this._referenceCount);
    }
    /**
     * @internal
     */
    _resetFrameIndices() {
        for (var i = 0, n = this._currentFrameIndices.length; i < n; i++)
            this._currentFrameIndices[i] = -1; //-1表示没到第0帧,首帧时间可能大于
    }
    /**
     * 添加脚本。
     * @param	type  组件类型。
     * @return 脚本。
     *
     */
    addScript(type) {
        var script = new type();
        this._scripts = this._scripts || [];
        this._scripts.push(script);
        return script;
    }
    /**
     * 获取脚本。
     * @param	type  组件类型。
     * @return 脚本。
     *
     */
    getScript(type) {
        if (this._scripts) {
            for (var i = 0, n = this._scripts.length; i < n; i++) {
                var script = this._scripts[i];
                if (script instanceof type)
                    return script;
            }
        }
        return null;
    }
    /**
     * 获取脚本集合。
     * @param	type  组件类型。
     * @return 脚本集合。
     *
     */
    getScripts(type) {
        var coms;
        if (this._scripts) {
            for (var i = 0, n = this._scripts.length; i < n; i++) {
                var script = this._scripts[i];
                if (script instanceof type) {
                    coms = coms || [];
                    coms.push(script);
                }
            }
        }
        return coms;
    }
    /**
     * 克隆。
     * @param	destObject 克隆源。
     */
    cloneTo(destObject) {
        var dest = destObject;
        dest.name = this.name;
        dest.speed = this.speed;
        dest.clipStart = this.clipStart;
        dest.clipEnd = this.clipEnd;
        dest.clip = this._clip;
    }
    /**
     * 克隆。
     * @return	 克隆副本。
     */
    clone() {
        var dest = new AnimatorState();
        this.cloneTo(dest);
        return dest;
    }
}
