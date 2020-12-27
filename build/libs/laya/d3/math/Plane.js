import { Vector3 } from "./Vector3";
/**
 * 平面。
 */
export class Plane {
    /**
     * 创建一个 <code>Plane</code> 实例。
     * @param	normal 平面的向量
     * @param	d  平面到原点的距离
     */
    constructor(normal, d = 0) {
        this.normal = normal;
        this.distance = d;
    }
    /**
     * 通过三个点创建一个平面。
     * @param	point0 第零个点
     * @param	point1 第一个点
     * @param	point2 第二个点
     */
    static createPlaneBy3P(point0, point1, point2, out) {
        var x1 = point1.x - point0.x;
        var y1 = point1.y - point0.y;
        var z1 = point1.z - point0.z;
        var x2 = point2.x - point0.x;
        var y2 = point2.y - point0.y;
        var z2 = point2.z - point0.z;
        var yz = (y1 * z2) - (z1 * y2);
        var xz = (z1 * x2) - (x1 * z2);
        var xy = (x1 * y2) - (y1 * x2);
        var invPyth = 1.0 / (Math.sqrt((yz * yz) + (xz * xz) + (xy * xy)));
        var x = yz * invPyth;
        var y = xz * invPyth;
        var z = xy * invPyth;
        var normal = out.normal;
        normal.x = x;
        normal.y = y;
        normal.z = z;
        out.distance = -((x * point0.x) + (y * point0.y) + (z * point0.z));
    }
    /**
     * 更改平面法线向量的系数，使之成单位长度。
     */
    normalize() {
        var normalEX = this.normal.x;
        var normalEY = this.normal.y;
        var normalEZ = this.normal.z;
        var magnitude = 1.0 / Math.sqrt(normalEX * normalEX + normalEY * normalEY + normalEZ * normalEZ);
        this.normal.x = normalEX * magnitude;
        this.normal.y = normalEY * magnitude;
        this.normal.z = normalEZ * magnitude;
        this.distance *= magnitude;
    }
    /**
     * 克隆。
     * @param	destObject 克隆源。
     */
    cloneTo(destObject) {
        var dest = destObject;
        this.normal.cloneTo(dest.normal);
        dest.distance = this.distance;
    }
    /**
     * 克隆。
     * @return	 克隆副本。
     */
    clone() {
        var dest = new Plane(new Vector3());
        this.cloneTo(dest);
        return dest;
    }
}
/**平面与其他几何体相交类型*/
Plane.PlaneIntersectionType_Back = 0;
Plane.PlaneIntersectionType_Front = 1;
Plane.PlaneIntersectionType_Intersecting = 2;
