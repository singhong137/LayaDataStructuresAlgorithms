import { Vector3 } from "./Vector3";
import { Matrix4x4 } from "./Matrix4x4";
import { Plane } from "./Plane";
import { BoundBox } from "./BoundBox";
import { BoundSphere } from "./BoundSphere";
/**
 * 锥体角点。
 */
export declare enum FrustumCorner {
    FarBottomLeft = 0,
    FarTopLeft = 1,
    FarTopRight = 2,
    FarBottomRight = 3,
    nearBottomLeft = 4,
    nearTopLeft = 5,
    nearTopRight = 6,
    nearBottomRight = 7,
    unknown = 8
}
/**
 * <code>BoundFrustum</code> 类用于创建锥截体。
 */
export declare class BoundFrustum {
    /** @internal */
    private static _tempV30;
    /** @internal */
    private static _tempV31;
    /** @internal */
    private static _tempV32;
    /** @internal */
    private static _tempV33;
    /** @internal */
    private static _tempV34;
    /** @internal */
    private static _tempV35;
    /** @internal */
    private static _tempV36;
    /**
     * 根据矩阵获取6个包围平面。
     * @param  m 描述矩阵。
     * @param  np 近平面。
     * @param  fp 远平面。
     * @param  lp 左平面。
     * @param  rp 右平面。
     * @param  tp 顶平面。
     * @param  bp 底平面。
     */
    static getPlanesFromMatrix(m: Matrix4x4, np: Plane, fp: Plane, lp: Plane, rp: Plane, tp: Plane, bp: Plane): void;
    /** @internal */
    private _matrix;
    /** @internal */
    _near: Plane;
    /** @internal */
    _far: Plane;
    /** @internal */
    _left: Plane;
    /** @internal */
    _right: Plane;
    /** @internal */
    _top: Plane;
    /** @internal */
    _bottom: Plane;
    /**
     * 创建一个 <code>BoundFrustum</code> 实例。
     * @param	matrix 锥截体的描述4x4矩阵。
     */
    constructor(matrix: Matrix4x4);
    /**
     * 描述矩阵。
     */
    matrix: Matrix4x4;
    /**
     * 近平面。
     */
    readonly near: Plane;
    /**
     * 远平面。
     */
    readonly far: Plane;
    /**
     * 左平面。
     */
    readonly left: Plane;
    /**
     * 右平面。
     */
    readonly right: Plane;
    /**
     * 顶平面。
     */
    readonly top: Plane;
    /**
     * 底平面。
     */
    readonly bottom: Plane;
    /**
     * 判断是否与其他锥截体相等。
     * @param	other 锥截体。
     */
    equalsBoundFrustum(other: BoundFrustum): boolean;
    /**
     * 判断是否与其他对象相等。
     * @param	obj 对象。
     */
    equalsObj(obj: any): boolean;
    /**
     * 获取锥截体的任意一平面。
     * 0:近平面
     * 1:远平面
     * 2:左平面
     * 3:右平面
     * 4:顶平面
     * 5:底平面
     * @param	index 索引。
     */
    getPlane(index: number): Plane;
    /**
     * 锥截体三个相交平面的交点。
     * @param  p1  平面1。
     * @param  p2  平面2。
     * @param  p3  平面3。
     */
    static get3PlaneInterPoint(p1: Plane, p2: Plane, p3: Plane, out: Vector3): void;
    /**
     * 锥截体的8个顶点。
     * @param  corners  返回顶点的输出队列。
     */
    getCorners(corners: Vector3[]): void;
    /**
     * 与点的关系。
     * @param  point  点。
     * @returns 包涵:1,相交:2,不相交:0
     */
    containsPoint(point: Vector3): number;
    /**
     * 是否与包围盒交叉。
     * @param box 包围盒。
     * @returns boolean 是否相交
     */
    intersects(box: BoundBox): boolean;
    /**
     * 与包围盒的位置关系。
     * @param  box  包围盒。
     * @returns 包涵:1,相交:2,不相交:0
     */
    containsBoundBox(box: BoundBox): number;
    /**
     * 与包围球的位置关系
     * @param  sphere  包围球。
     * @returns 包涵:1,相交:2,不相交:0
     */
    containsBoundSphere(sphere: BoundSphere): number;
}
