/**
 * 二阶球谐函数。
 */
export declare class SphericalHarmonicsL2 {
    /** @internal */
    static _default: SphericalHarmonicsL2;
    /** @internal */
    private _coefficients;
    /**
     * 获取颜色通道的系数。
     * @param i 通道索引，范围0到2。
     * @param j 系数索引，范围0到8。
     */
    getCoefficient(i: number, j: number): number;
    /**
     * 设置颜色通道的系数。
     * @param i 通道索引，范围0到2。
     * @param j 系数索引，范围0到8。
     */
    setCoefficient(i: number, j: number, coefficient: number): void;
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
    setCoefficients(i: number, coefficient0: number, coefficient1: number, coefficient2: number, coefficient3: number, coefficient4: number, coefficient5: number, coefficient6: number, coefficient7: number, coefficient8: number): void;
    /**
     * 克隆
     * @param dest
     */
    cloneTo(dest: SphericalHarmonicsL2): void;
}
