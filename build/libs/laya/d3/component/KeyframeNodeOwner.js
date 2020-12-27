/**
 * @internal
 * <code>KeyframeNodeOwner</code> 类用于保存帧节点的拥有者信息。
 */
export class KeyframeNodeOwner {
    /**
     * 创建一个 <code>KeyframeNodeOwner</code> 实例。
     */
    constructor() {
        /**@internal */
        this.indexInList = -1;
        /**@internal */
        this.referenceCount = 0;
        /**@internal */
        this.updateMark = -1;
        /**@internal */
        this.type = -1;
        /**@internal */
        this.fullPath = null;
        /**@internal */
        this.propertyOwner = null;
        /**@internal */
        this.property = null;
        /**@internal */
        this.defaultValue = null;
        /**@internal */
        this.value = null;
        /**@internal */
        this.crossFixedValue = null;
    }
    /**
     * @internal
     */
    saveCrossFixedValue() {
        var pro = this.propertyOwner;
        if (pro) {
            switch (this.type) {
                case 0:
                    this.crossFixedValue = this.value;
                    break;
                case 1:
                case 3:
                case 4:
                    this.value.cloneTo(this.crossFixedValue);
                    break;
                case 2:
                    this.value.cloneTo(this.crossFixedValue);
                    break;
                default:
                    throw "Animator:unknown type.";
            }
        }
    }
}
