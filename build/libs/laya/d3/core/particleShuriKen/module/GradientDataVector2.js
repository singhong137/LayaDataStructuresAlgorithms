/**
 * <code>GradientDataVector2</code> 类用于创建二维向量渐变。
 */
export class GradientDataVector2 {
    /**
     * 创建一个 <code>GradientDataVector2</code> 实例。
     */
    constructor() {
        this._currentLength = 0;
        this._elements = new Float32Array(12);
    }
    /**二维向量渐变数量。*/
    get gradientCount() {
        return this._currentLength / 3;
    }
    /**
     * 增加二维向量渐变。
     * @param	key 生命周期，范围为0到1。
     * @param	value 二维向量值。
     */
    add(key, value) {
        if (this._currentLength < 8) {
            if ((this._currentLength === 6) && ((key !== 1))) {
                key = 1;
                console.log("GradientDataVector2 warning:the forth key is  be force set to 1.");
            }
            this._elements[this._currentLength++] = key;
            this._elements[this._currentLength++] = value.x;
            this._elements[this._currentLength++] = value.y;
        }
        else {
            console.log("GradientDataVector2 warning:data count must lessEqual than 4");
        }
    }
    /**
     * 克隆。
     * @param	destObject 克隆源。
     */
    cloneTo(destObject) {
        var destGradientDataVector2 = destObject;
        destGradientDataVector2._currentLength = this._currentLength;
        var destElements = destGradientDataVector2._elements;
        for (var i = 0, n = this._elements.length; i < n; i++) {
            destElements[i] = this._elements[i];
        }
    }
    /**
     * 克隆。
     * @return	 克隆副本。
     */
    clone() {
        var destGradientDataVector2 = new GradientDataVector2();
        this.cloneTo(destGradientDataVector2);
        return destGradientDataVector2;
    }
}
