import { Point } from "./Point";
/**
 * <p> <code>Matrix</code> 类表示一个转换矩阵，它确定如何将点从一个坐标空间映射到另一个坐标空间。</p>
 * <p>您可以对一个显示对象执行不同的图形转换，方法是设置 Matrix 对象的属性，将该 Matrix 对象应用于 Transform 对象的 matrix 属性，然后应用该 Transform 对象作为显示对象的 transform 属性。这些转换函数包括平移（x 和 y 重新定位）、旋转、缩放和倾斜。</p>
 */
export declare class Matrix {
    /**@private 一个初始化的 <code>Matrix</code> 对象，不允许修改此对象内容。*/
    static EMPTY: Matrix;
    /**用于中转使用的 <code>Matrix</code> 对象。*/
    static TEMP: Matrix;
    /**@internal */
    static _createFun: Function | null;
    /**缩放或旋转图像时影响像素沿 x 轴定位的值。*/
    a: number;
    /**旋转或倾斜图像时影响像素沿 y 轴定位的值。*/
    b: number;
    /**旋转或倾斜图像时影响像素沿 x 轴定位的值。*/
    c: number;
    /**缩放或旋转图像时影响像素沿 y 轴定位的值。*/
    d: number;
    /**沿 x 轴平移每个点的距离。*/
    tx: number;
    /**沿 y 轴平移每个点的距离。*/
    ty: number;
    /**@internal 是否有旋转缩放操作*/
    _bTransform: boolean;
    /**
     * 使用指定参数创建新的 <code>Matrix</code> 对象。
     * @param a		（可选）缩放或旋转图像时影响像素沿 x 轴定位的值。
     * @param b		（可选）旋转或倾斜图像时影响像素沿 y 轴定位的值。
     * @param c		（可选）旋转或倾斜图像时影响像素沿 x 轴定位的值。
     * @param d		（可选）缩放或旋转图像时影响像素沿 y 轴定位的值。
     * @param tx	（可选）沿 x 轴平移每个点的距离。
     * @param ty	（可选）沿 y 轴平移每个点的距离。
     */
    constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number, nums?: number);
    /**
     * 将本矩阵设置为单位矩阵。
     * @return 返回当前矩形。
     */
    identity(): Matrix;
    /**@internal */
    _checkTransform(): boolean;
    /**
     * 设置沿 x 、y 轴平移每个点的距离。
     * @param	x 沿 x 轴平移每个点的距离。
     * @param	y 沿 y 轴平移每个点的距离。
     * @return	返回对象本身
     */
    setTranslate(x: number, y: number): Matrix;
    /**
     * 沿 x 和 y 轴平移矩阵，平移的变化量由 x 和 y 参数指定。
     * @param	x 沿 x 轴向右移动的量（以像素为单位）。
     * @param	y 沿 y 轴向下移动的量（以像素为单位）。
     * @return 返回此矩形对象。
     */
    translate(x: number, y: number): Matrix;
    /**
     * 对矩阵应用缩放转换。
     * @param	x 用于沿 x 轴缩放对象的乘数。
     * @param	y 用于沿 y 轴缩放对象的乘数。
     * @return	返回矩阵对象本身
     */
    scale(x: number, y: number): Matrix;
    /**
     * 对 Matrix 对象应用旋转转换。
     * @param	angle 以弧度为单位的旋转角度。
     * @return	返回矩阵对象本身
     */
    rotate(angle: number): Matrix;
    /**
     * 对 Matrix 对象应用倾斜转换。
     * @param	x 沿着 X 轴的 2D 倾斜弧度。
     * @param	y 沿着 Y 轴的 2D 倾斜弧度。
     * @return 当前 Matrix 对象。
     */
    skew(x: number, y: number): Matrix;
    /**
     * 对指定的点应用当前矩阵的逆转化并返回此点。
     * @param	out 待转化的点 Point 对象。
     * @return	返回out
     */
    invertTransformPoint(out: Point): Point;
    /**
     * 将 Matrix 对象表示的几何转换应用于指定点。
     * @param	out 用来设定输出结果的点。
     * @return	返回out
     */
    transformPoint(out: Point): Point;
    /**
     * 将 Matrix 对象表示的几何转换应用于指定点，忽略tx、ty。
     * @param	out 用来设定输出结果的点。
     * @return	返回out
     */
    transformPointN(out: Point): Point;
    /**
     * 获取 X 轴缩放值。
     * @return  X 轴缩放值。
     */
    getScaleX(): number;
    /**
     * 获取 Y 轴缩放值。
     * @return Y 轴缩放值。
     */
    getScaleY(): number;
    /**
     * 执行原始矩阵的逆转换。
     * @return 当前矩阵对象。
     */
    invert(): Matrix;
    /**
     *  将 Matrix 的成员设置为指定值。
     * @param	a 缩放或旋转图像时影响像素沿 x 轴定位的值。
     * @param	b 旋转或倾斜图像时影响像素沿 y 轴定位的值。
     * @param	c 旋转或倾斜图像时影响像素沿 x 轴定位的值。
     * @param	d 缩放或旋转图像时影响像素沿 y 轴定位的值。
     * @param	tx 沿 x 轴平移每个点的距离。
     * @param	ty 沿 y 轴平移每个点的距离。
     * @return 当前矩阵对象。
     */
    setTo(a: number, b: number, c: number, d: number, tx: number, ty: number): Matrix;
    /**
     * 将指定矩阵与当前矩阵连接，从而将这两个矩阵的几何效果有效地结合在一起。
     * @param	matrix 要连接到源矩阵的矩阵。
     * @return	当前矩阵。
     */
    concat(matrix: Matrix): Matrix;
    /**
     * 将指定的两个矩阵相乘后的结果赋值给指定的输出对象。
     * @param	m1 矩阵一。
     * @param	m2 矩阵二。
     * @param	out 输出对象。
     * @return	结果输出对象 out。
     */
    static mul(m1: Matrix, m2: Matrix, out: Matrix): Matrix;
    /**
     * 将指定的两个矩阵相乘，结果赋值给指定的输出数组，长度为16。
     * @param m1	矩阵一。
     * @param m2	矩阵二。
     * @param out	输出对象Array。
     * @return 结果输出对象 out。
     */
    static mul16(m1: Matrix, m2: Matrix, out: any[]): any[];
    /**
     * @private
     * 对矩阵应用缩放转换。反向相乘
     * @param	x 用于沿 x 轴缩放对象的乘数。
     * @param	y 用于沿 y 轴缩放对象的乘数。
     */
    scaleEx(x: number, y: number): void;
    /**
     * @private
     * 对 Matrix 对象应用旋转转换。反向相乘
     * @param	angle 以弧度为单位的旋转角度。
     */
    rotateEx(angle: number): void;
    /**
     * 返回此 Matrix 对象的副本。
     * @return 与原始实例具有完全相同的属性的新 Matrix 实例。
     */
    clone(): Matrix;
    /**
     * 将当前 Matrix 对象中的所有矩阵数据复制到指定的 Matrix 对象中。
     * @param	dec 要复制当前矩阵数据的 Matrix 对象。
     * @return	已复制当前矩阵数据的 Matrix 对象。
     */
    copyTo(dec: Matrix): Matrix;
    /**
     * 返回列出该 Matrix 对象属性的文本值。
     * @return 一个字符串，它包含 Matrix 对象的属性值：a、b、c、d、tx 和 ty。
     */
    toString(): string;
    /**
     * 销毁此对象。
     */
    destroy(): void;
    /**
     * 回收到对象池，方便复用
     */
    recover(): void;
    /**
     * 从对象池中创建一个 <code>Matrix</code> 对象。
     * @return <code>Matrix</code> 对象。
     */
    static create(): Matrix;
}
