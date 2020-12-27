/**
 * @internal
 */
export class KeyframeNode {
    constructor() {
        this._ownerPath = [];
        this._propertys = [];
        /**@internal */
        this._keyFrames = [];
    }
    /**
     * 精灵路径个数。
     */
    get ownerPathCount() {
        return this._ownerPath.length;
    }
    /**
     * 属性路径个数。
     */
    get propertyCount() {
        return this._propertys.length;
    }
    /**
     * 帧个数。
     */
    get keyFramesCount() {
        return this._keyFrames.length;
    }
    /**
     * @internal
     */
    _setOwnerPathCount(value) {
        this._ownerPath.length = value;
    }
    /**
     * @internal
     */
    _setOwnerPathByIndex(index, value) {
        this._ownerPath[index] = value;
    }
    /**
     * @internal
     */
    _joinOwnerPath(sep) {
        return this._ownerPath.join(sep);
    }
    /**
     * @internal
     */
    _setPropertyCount(value) {
        this._propertys.length = value;
    }
    /**
     * @internal
     */
    _setPropertyByIndex(index, value) {
        this._propertys[index] = value;
    }
    /**
     * @internal
     */
    _joinProperty(sep) {
        return this._propertys.join(sep);
    }
    /**
     * @internal
     */
    _setKeyframeCount(value) {
        this._keyFrames.length = value;
    }
    /**
     * @internal
     */
    _setKeyframeByIndex(index, value) {
        this._keyFrames[index] = value;
    }
    /**
     * 通过索引获取精灵路径。
     * @param index 索引。
     */
    getOwnerPathByIndex(index) {
        return this._ownerPath[index];
    }
    /**
     * 通过索引获取属性路径。
     * @param index 索引。
     */
    getPropertyByIndex(index) {
        return this._propertys[index];
    }
    /**
     * 通过索引获取帧。
     * @param index 索引。
     */
    getKeyframeByIndex(index) {
        return this._keyFrames[index];
    }
}
// native
/*if ((window as any).conch && (window as any).conchKeyframeNode) {
    //@ts-ignore
    KeyframeNode = (window as any).conchKeyframeNode;
}
if ((window as any).qq && (window as any).qq.webglPlus) {
    //@ts-ignore
    KeyframeNode = (window as any).qq.webglPlus.conchKeyframeNode;
}*/ 
