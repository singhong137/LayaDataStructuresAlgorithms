/**
 * @internal
 * <code>KeyframeNodeList</code> 类用于创建KeyframeNode节点队列。
 */
export class KeyframeNodeList {
    /**
     * 创建一个 <code>KeyframeNodeList</code> 实例。
     */
    constructor() {
        /** @internal */
        this._nodes = [];
    }
    /**
     *	节点个数。
     */
    get count() {
        return this._nodes.length;
    }
    set count(value) {
        this._nodes.length = value;
    }
    /**
     * 通过索引获取节点。
     * @param	index 索引。
     * @return 节点。
     */
    getNodeByIndex(index) {
        return this._nodes[index];
    }
    /**
     * 通过索引设置节点。
     * @param	index 索引。
     * @param 节点。
     */
    setNodeByIndex(index, node) {
        this._nodes[index] = node;
    }
}
// native
/*if ((window as any).conch && (window as any).conchKeyframeNodeList) {
    //@ts-ignore
    KeyframeNodeList = (window as any).conchKeyframeNodeList;
}
if ((window as any).qq && (window as any).qq.webglPlus) {
    //@ts-ignore
    KeyframeNodeList = (window as any).qq.webglPlus.conchKeyframeNodeList;
}*/
