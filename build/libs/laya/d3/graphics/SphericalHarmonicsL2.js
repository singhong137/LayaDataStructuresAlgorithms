/**
 * 二阶球谐函数。
 */
export class SphericalHarmonicsL2 {
    constructor() {
        /** @internal */
        this._coefficients = new Float32Array(27);
    }
    /**
     * 获取颜色通道的系数。
     * @param i 通道索引，范围0到2。
     * @param j 系数索引，范围0到8。
     */
    getCoefficient(i, j) {
        return this._coefficients[i * 9 + j];
    }
    /**
     * 设置颜色通道的系数。
     * @param i 通道索引，范围0到2。
     * @param j 系数索引，范围0到8。
     */
    setCoefficient(i, j, coefficient) {
        this._coefficients[i * 9 + j] = coefficient;
    }
    /**
     * 设置颜色通道的系数。
     * @param i 通道索引，范围0到2。
     * @param coefficient0 系数0
     * @param coefficient1 系数1
     * @param coefficient2 系数2
     * @param coefficient3 系数3
     * @param coefficient4 系数4
     * @param coefficient5 系数5
     * @param coefficient6 系数6
     * @param coefficient7 系数7
     * @param coefficient8 系数8
     */
    setCoefficients(i, coefficient0, coefficient1, coefficient2, coefficient3, coefficient4, coefficient5, coefficient6, coefficient7, coefficient8) {
        var offset = i * 9;
        this._coefficients[offset] = coefficient0;
        this._coefficients[++offset] = coefficient1;
        this._coefficients[++offset] = coefficient2;
        this._coefficients[++offset] = coefficient3;
        this._coefficients[++offset] = coefficient4;
        this._coefficients[++offset] = coefficient5;
        this._coefficients[++offset] = coefficient6;
        this._coefficients[++offset] = coefficient7;
        this._coefficients[++offset] = coefficient8;
    }
    /**
     * 克隆
     * @param dest
     */
    cloneTo(dest) {
        if (this === dest)
            return;
        var coes = this._coefficients;
        var destCoes = dest._coefficients;
        for (var i = 0; i < 27; i++)
            destCoes[i] = coes[i];
    }
}
/** @internal */
SphericalHarmonicsL2._default = new SphericalHarmonicsL2();
