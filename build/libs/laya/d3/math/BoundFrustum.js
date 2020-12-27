import { Vector3 } from "./Vector3";
import { Plane } from "./Plane";
import { CollisionUtils } from "./CollisionUtils";
import { ContainmentType } from "./ContainmentType";
/**
 * 锥体角点。
 */
export var FrustumCorner;
(function (FrustumCorner) {
    FrustumCorner[FrustumCorner["FarBottomLeft"] = 0] = "FarBottomLeft";
    FrustumCorner[FrustumCorner["FarTopLeft"] = 1] = "FarTopLeft";
    FrustumCorner[FrustumCorner["FarTopRight"] = 2] = "FarTopRight";
    FrustumCorner[FrustumCorner["FarBottomRight"] = 3] = "FarBottomRight";
    FrustumCorner[FrustumCorner["nearBottomLeft"] = 4] = "nearBottomLeft";
    FrustumCorner[FrustumCorner["nearTopLeft"] = 5] = "nearTopLeft";
    FrustumCorner[FrustumCorner["nearTopRight"] = 6] = "nearTopRight";
    FrustumCorner[FrustumCorner["nearBottomRight"] = 7] = "nearBottomRight";
    FrustumCorner[FrustumCorner["unknown"] = 8] = "unknown";
})(FrustumCorner || (FrustumCorner = {}));
/**
 * <code>BoundFrustum</code> 类用于创建锥截体。
 */
export class BoundFrustum {
    /**
     * 创建一个 <code>BoundFrustum</code> 实例。
     * @param	matrix 锥截体的描述4x4矩阵。
     */
    constructor(matrix) {
        this._matrix = matrix;
        this._near = new Plane(new Vector3());
        this._far = new Plane(new Vector3());
        this._left = new Plane(new Vector3());
        this._right = new Plane(new Vector3());
        this._top = new Plane(new Vector3());
        this._bottom = new Plane(new Vector3());
        BoundFrustum.getPlanesFromMatrix(this._matrix, this._near, this._far, this._left, this._right, this._top, this._bottom);
    }
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
    static getPlanesFromMatrix(m, np, fp, lp, rp, tp, bp) {
        var matrixE = m.elements;
        var m11 = matrixE[0];
        var m12 = matrixE[1];
        var m13 = matrixE[2];
        var m14 = matrixE[3];
        var m21 = matrixE[4];
        var m22 = matrixE[5];
        var m23 = matrixE[6];
        var m24 = matrixE[7];
        var m31 = matrixE[8];
        var m32 = matrixE[9];
        var m33 = matrixE[10];
        var m34 = matrixE[11];
        var m41 = matrixE[12];
        var m42 = matrixE[13];
        var m43 = matrixE[14];
        var m44 = matrixE[15];
        //near
        var nearNorE = np.normal;
        nearNorE.x = m13;
        nearNorE.y = m23;
        nearNorE.z = m33;
        np.distance = m43;
        np.normalize();
        //far
        var farNorE = fp.normal;
        farNorE.x = m14 - m13;
        farNorE.y = m24 - m23;
        farNorE.z = m34 - m33;
        fp.distance = m44 - m43;
        fp.normalize();
        //left
        var leftNorE = lp.normal;
        leftNorE.x = m14 + m11;
        leftNorE.y = m24 + m21;
        leftNorE.z = m34 + m31;
        lp.distance = m44 + m41;
        lp.normalize();
        //right
        var rightNorE = rp.normal;
        rightNorE.x = m14 - m11;
        rightNorE.y = m24 - m21;
        rightNorE.z = m34 - m31;
        rp.distance = m44 - m41;
        rp.normalize();
        //top
        var topNorE = tp.normal;
        topNorE.x = m14 - m12;
        topNorE.y = m24 - m22;
        topNorE.z = m34 - m32;
        tp.distance = m44 - m42;
        tp.normalize();
        //bottom
        var bottomNorE = bp.normal;
        bottomNorE.x = m14 + m12;
        bottomNorE.y = m24 + m22;
        bottomNorE.z = m34 + m32;
        bp.distance = m44 + m42;
        bp.normalize();
    }
    /**
     * 描述矩阵。
     */
    get matrix() {
        return this._matrix;
    }
    set matrix(matrix) {
        matrix.cloneTo(this._matrix);
        BoundFrustum.getPlanesFromMatrix(this._matrix, this._near, this._far, this._left, this._right, this._top, this._bottom);
    }
    /**
     * 近平面。
     */
    get near() {
        return this._near;
    }
    /**
     * 远平面。
     */
    get far() {
        return this._far;
    }
    /**
     * 左平面。
     */
    get left() {
        return this._left;
    }
    /**
     * 右平面。
     */
    get right() {
        return this._right;
    }
    /**
     * 顶平面。
     */
    get top() {
        return this._top;
    }
    /**
     * 底平面。
     */
    get bottom() {
        return this._bottom;
    }
    /**
     * 判断是否与其他锥截体相等。
     * @param	other 锥截体。
     */
    equalsBoundFrustum(other) {
        return this._matrix.equalsOtherMatrix(other.matrix);
    }
    /**
     * 判断是否与其他对象相等。
     * @param	obj 对象。
     */
    equalsObj(obj) {
        if (obj instanceof BoundFrustum) {
            var bf = obj;
            return this.equalsBoundFrustum(bf);
        }
        return false;
    }
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
    getPlane(index) {
        switch (index) {
            case 0:
                return this._near;
            case 1:
                return this._far;
            case 2:
                return this._left;
            case 3:
                return this._right;
            case 4:
                return this._top;
            case 5:
                return this._bottom;
            default:
                return null;
        }
    }
    /**
     * 锥截体三个相交平面的交点。
     * @param  p1  平面1。
     * @param  p2  平面2。
     * @param  p3  平面3。
     */
    static get3PlaneInterPoint(p1, p2, p3, out) {
        var p1Nor = p1.normal;
        var p2Nor = p2.normal;
        var p3Nor = p3.normal;
        Vector3.cross(p2Nor, p3Nor, BoundFrustum._tempV30);
        Vector3.cross(p3Nor, p1Nor, BoundFrustum._tempV31);
        Vector3.cross(p1Nor, p2Nor, BoundFrustum._tempV32);
        var a = Vector3.dot(p1Nor, BoundFrustum._tempV30);
        var b = Vector3.dot(p2Nor, BoundFrustum._tempV31);
        var c = Vector3.dot(p3Nor, BoundFrustum._tempV32);
        Vector3.scale(BoundFrustum._tempV30, -p1.distance / a, BoundFrustum._tempV33);
        Vector3.scale(BoundFrustum._tempV31, -p2.distance / b, BoundFrustum._tempV34);
        Vector3.scale(BoundFrustum._tempV32, -p3.distance / c, BoundFrustum._tempV35);
        Vector3.add(BoundFrustum._tempV33, BoundFrustum._tempV34, BoundFrustum._tempV36);
        Vector3.add(BoundFrustum._tempV35, BoundFrustum._tempV36, out);
    }
    /**
     * 锥截体的8个顶点。
     * @param  corners  返回顶点的输出队列。
     */
    getCorners(corners) {
        BoundFrustum.get3PlaneInterPoint(this._near, this._bottom, this._right, corners[FrustumCorner.nearBottomRight]);
        BoundFrustum.get3PlaneInterPoint(this._near, this._top, this._right, corners[FrustumCorner.nearTopRight]);
        BoundFrustum.get3PlaneInterPoint(this._near, this._top, this._left, corners[FrustumCorner.nearTopLeft]);
        BoundFrustum.get3PlaneInterPoint(this._near, this._bottom, this._left, corners[FrustumCorner.nearBottomLeft]);
        BoundFrustum.get3PlaneInterPoint(this._far, this._bottom, this._right, corners[FrustumCorner.FarBottomRight]);
        BoundFrustum.get3PlaneInterPoint(this._far, this._top, this._right, corners[FrustumCorner.FarTopRight]);
        BoundFrustum.get3PlaneInterPoint(this._far, this._top, this._left, corners[FrustumCorner.FarTopLeft]);
        BoundFrustum.get3PlaneInterPoint(this._far, this._bottom, this._left, corners[FrustumCorner.FarBottomLeft]);
    }
    /**
     * 与点的关系。
     * @param  point  点。
     * @returns 包涵:1,相交:2,不相交:0
     */
    containsPoint(point) {
        var result = Plane.PlaneIntersectionType_Front;
        var planeResult = Plane.PlaneIntersectionType_Front;
        for (var i = 0; i < 6; i++) {
            switch (i) {
                case 0:
                    planeResult = CollisionUtils.intersectsPlaneAndPoint(this._near, point);
                    break;
                case 1:
                    planeResult = CollisionUtils.intersectsPlaneAndPoint(this._far, point);
                    break;
                case 2:
                    planeResult = CollisionUtils.intersectsPlaneAndPoint(this._left, point);
                    break;
                case 3:
                    planeResult = CollisionUtils.intersectsPlaneAndPoint(this._right, point);
                    break;
                case 4:
                    planeResult = CollisionUtils.intersectsPlaneAndPoint(this._top, point);
                    break;
                case 5:
                    planeResult = CollisionUtils.intersectsPlaneAndPoint(this._bottom, point);
                    break;
            }
            switch (planeResult) {
                case Plane.PlaneIntersectionType_Back:
                    return ContainmentType.Disjoint;
                case Plane.PlaneIntersectionType_Intersecting:
                    result = Plane.PlaneIntersectionType_Intersecting;
                    break;
            }
        }
        switch (result) {
            case Plane.PlaneIntersectionType_Intersecting:
                return ContainmentType.Intersects;
            default:
                return ContainmentType.Contains;
        }
    }
    /**
     * 是否与包围盒交叉。
     * @param box 包围盒。
     * @returns boolean 是否相交
     */
    intersects(box) {
        var min = box.min;
        var max = box.max;
        var minX = min.x;
        var minY = min.y;
        var minZ = min.z;
        var maxX = max.x;
        var maxY = max.y;
        var maxZ = max.z;
        var nearNormal = this._near.normal;
        if (this._near.distance + (nearNormal.x * (nearNormal.x < 0 ? minX : maxX)) + (nearNormal.y * (nearNormal.y < 0 ? minY : maxY)) + (nearNormal.z * (nearNormal.z < 0 ? minZ : maxZ)) < 0)
            return false;
        var leftNormal = this._left.normal;
        if (this._left.distance + (leftNormal.x * (leftNormal.x < 0 ? minX : maxX)) + (leftNormal.y * (leftNormal.y < 0 ? minY : maxY)) + (leftNormal.z * (leftNormal.z < 0 ? minZ : maxZ)) < 0)
            return false;
        var rightNormal = this._right.normal;
        if (this._right.distance + (rightNormal.x * (rightNormal.x < 0 ? minX : maxX)) + (rightNormal.y * (rightNormal.y < 0 ? minY : maxY)) + (rightNormal.z * (rightNormal.z < 0 ? minZ : maxZ)) < 0)
            return false;
        var bottomNormal = this._bottom.normal;
        if (this._bottom.distance + (bottomNormal.x * (bottomNormal.x < 0 ? minX : maxX)) + (bottomNormal.y * (bottomNormal.y < 0 ? minY : maxY)) + (bottomNormal.z * (bottomNormal.z < 0 ? minZ : maxZ)) < 0)
            return false;
        var topNormal = this._top.normal;
        if (this._top.distance + (topNormal.x * (topNormal.x < 0 ? minX : maxX)) + (topNormal.y * (topNormal.y < 0 ? minY : maxY)) + (topNormal.z * (topNormal.z < 0 ? minZ : maxZ)) < 0)
            return false;
        // Can ignore far plane when distant object culling is handled by another mechanism
        var farNormal = this._far.normal;
        if (this._far.distance + (farNormal.x * (farNormal.x < 0 ? minX : maxX)) + (farNormal.y * (farNormal.y < 0 ? minY : maxY)) + (farNormal.z * (farNormal.z < 0 ? minZ : maxZ)) < 0)
            return false;
        return true;
    }
    /**
     * 与包围盒的位置关系。
     * @param  box  包围盒。
     * @returns 包涵:1,相交:2,不相交:0
     */
    containsBoundBox(box) {
        var p = BoundFrustum._tempV30, n = BoundFrustum._tempV31;
        var boxMin = box.min;
        var boxMax = box.max;
        var result = ContainmentType.Contains;
        for (var i = 0; i < 6; i++) {
            var plane = this.getPlane(i);
            var planeNor = plane.normal;
            if (planeNor.x >= 0) {
                p.x = boxMax.x;
                n.x = boxMin.x;
            }
            else {
                p.x = boxMin.x;
                n.x = boxMax.x;
            }
            if (planeNor.y >= 0) {
                p.y = boxMax.y;
                n.y = boxMin.y;
            }
            else {
                p.y = boxMin.y;
                n.y = boxMax.y;
            }
            if (planeNor.z >= 0) {
                p.z = boxMax.z;
                n.z = boxMin.z;
            }
            else {
                p.z = boxMin.z;
                n.z = boxMax.z;
            }
            if (CollisionUtils.intersectsPlaneAndPoint(plane, p) === Plane.PlaneIntersectionType_Back)
                return ContainmentType.Disjoint;
            if (CollisionUtils.intersectsPlaneAndPoint(plane, n) === Plane.PlaneIntersectionType_Back)
                result = ContainmentType.Intersects;
        }
        return result;
    }
    /**
     * 与包围球的位置关系
     * @param  sphere  包围球。
     * @returns 包涵:1,相交:2,不相交:0
     */
    containsBoundSphere(sphere) {
        var result = Plane.PlaneIntersectionType_Front;
        var planeResult = Plane.PlaneIntersectionType_Front;
        for (var i = 0; i < 6; i++) {
            switch (i) {
                case 0:
                    planeResult = CollisionUtils.intersectsPlaneAndSphere(this._near, sphere);
                    break;
                case 1:
                    planeResult = CollisionUtils.intersectsPlaneAndSphere(this._far, sphere);
                    break;
                case 2:
                    planeResult = CollisionUtils.intersectsPlaneAndSphere(this._left, sphere);
                    break;
                case 3:
                    planeResult = CollisionUtils.intersectsPlaneAndSphere(this._right, sphere);
                    break;
                case 4:
                    planeResult = CollisionUtils.intersectsPlaneAndSphere(this._top, sphere);
                    break;
                case 5:
                    planeResult = CollisionUtils.intersectsPlaneAndSphere(this._bottom, sphere);
                    break;
            }
            switch (planeResult) {
                case Plane.PlaneIntersectionType_Back:
                    return ContainmentType.Disjoint;
                case Plane.PlaneIntersectionType_Intersecting:
                    result = Plane.PlaneIntersectionType_Intersecting;
                    break;
            }
        }
        switch (result) {
            case Plane.PlaneIntersectionType_Intersecting:
                return ContainmentType.Intersects;
            default:
                return ContainmentType.Contains;
        }
    }
}
/** @internal */
BoundFrustum._tempV30 = new Vector3();
/** @internal */
BoundFrustum._tempV31 = new Vector3();
/** @internal */
BoundFrustum._tempV32 = new Vector3();
/** @internal */
BoundFrustum._tempV33 = new Vector3();
/** @internal */
BoundFrustum._tempV34 = new Vector3();
/** @internal */
BoundFrustum._tempV35 = new Vector3();
/** @internal */
BoundFrustum._tempV36 = new Vector3();
