import { Vector3 } from "./Vector3";
/**
 * 平面。
 */
export declare class Plane {
    /**平面的向量*/
    normal: Vector3;
    /**平面到坐标系原点的距离*/
    distance: number;
    /**平面与其他几何体相交类型*/
    static PlaneIntersectionType_Back: number;
    static PlaneIntersectionType_Front: number;
    static PlaneIntersectionType_Intersecting: number;
    /**
     * 创建一个 <code>Plane</code> 实例。
     * @param	normal 平面的向量
     * @param	d  平面到原点的距离
     */
    constructor(normal: Vector3, d?: number);
    /**
     * 通过三个点创建一个平面。
     * @param	point0 第零个点
     * @param	point1 第一个点
     * @param	point2 第二个点
     */
    static createPlaneBy3P(point0: Vector3, point1: Vector3, point2: Vector3, out: Plane): void;
    /**
     * 更改平面法线向量的系数，使之成单位长度。
     */
    normalize(): void;
    /**
     * 克隆。
     * @param	destObject 克隆源。
     */
    cloneTo(destObject: any): void;
    /**
     * 克隆。
     * @return	 克隆副本。
     */
    clone(): Plane;
}
