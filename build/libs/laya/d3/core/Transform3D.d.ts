import { EventDispatcher } from "../../events/EventDispatcher";
import { AnimationTransform3D } from "../animation/AnimationTransform3D";
import { Matrix4x4 } from "../math/Matrix4x4";
import { Quaternion } from "../math/Quaternion";
import { Vector3 } from "../math/Vector3";
import { Sprite3D } from "./Sprite3D";
/**
 * <code>Transform3D</code> 类用于实现3D变换。
 */
export declare class Transform3D extends EventDispatcher {
    /** @internal */
    private static _tempVector30;
    /** @internal */
    private static _tempQuaternion0;
    /** @internal */
    private static _tempMatrix0;
    /** @internal */
    private static _tempMatrix3x30;
    /** @internal */
    private static _tempMatrix3x31;
    /** @internal */
    private static _tempMatrix3x32;
    /** @internal */
    private static _tempMatrix3x33;
    /**@internal */
    static TRANSFORM_LOCALQUATERNION: number;
    /**@internal */
    static TRANSFORM_LOCALEULER: number;
    /**@internal */
    static TRANSFORM_LOCALMATRIX: number;
    /**@internal */
    static TRANSFORM_WORLDPOSITION: number;
    /**@internal */
    static TRANSFORM_WORLDQUATERNION: number;
    /**@internal */
    static TRANSFORM_WORLDSCALE: number;
    /**@internal */
    static TRANSFORM_WORLDMATRIX: number;
    /**@internal */
    static TRANSFORM_WORLDEULER: number;
    /**@internal */
    private static _angleToRandin;
    /** @internal */
    private _owner;
    /** @internal */
    private _localPosition;
    /** @internal */
    private _localRotation;
    /** @internal */
    private _localScale;
    /**@internal */
    private _localRotationEuler;
    /** @internal */
    private _localMatrix;
    /** @internal */
    private _position;
    /** @internal */
    private _rotation;
    /** @internal */
    private _scale;
    /**@internal */
    private _rotationEuler;
    /** @internal */
    private _worldMatrix;
    /** @internal */
    private _children;
    /** @internal */
    _parent: Transform3D;
    /**@internal */
    _dummy: AnimationTransform3D;
    /**@internal */
    _transformFlag: number;
    /**
     * @internal
     */
    readonly _isFrontFaceInvert: boolean;
    /**
     * 所属精灵。
     */
    readonly owner: Sprite3D;
    /**
     * 世界矩阵是否需要更新。
     */
    readonly worldNeedUpdate: boolean;
    /**
     * 局部位置X轴分量。
     */
    localPositionX: number;
    /**
     * 局部位置Y轴分量。
     */
    localPositionY: number;
    /**
     * 局部位置Z轴分量。
     */
    localPositionZ: number;
    /**
     * 局部位置。
     */
    localPosition: Vector3;
    /**
     * 局部旋转四元数X分量。
     */
    localRotationX: number;
    /**
     * 局部旋转四元数Y分量。
     */
    localRotationY: number;
    /**
     * 局部旋转四元数Z分量。
     */
    localRotationZ: number;
    /**
     * 局部旋转四元数W分量。
     */
    localRotationW: number;
    /**
     * 局部旋转。
     */
    localRotation: Quaternion;
    /**
     * 局部缩放X。
     */
    localScaleX: number;
    /**
     * 局部缩放Y。
     */
    localScaleY: number;
    /**
     * 局部缩放Z。
     */
    localScaleZ: number;
    /**
     * 局部缩放。
     */
    localScale: Vector3;
    /**
     * 局部空间的X轴欧拉角。
     */
    localRotationEulerX: number;
    /**
     * 局部空间的Y轴欧拉角。
     */
    localRotationEulerY: number;
    /**
     * 局部空间的Z轴欧拉角。
     */
    localRotationEulerZ: number;
    /**
     * 局部空间欧拉角。
     */
    localRotationEuler: Vector3;
    /**
     * 局部矩阵。
     */
    localMatrix: Matrix4x4;
    /**
     * 世界位置。
     */
    position: Vector3;
    /**
     * 世界旋转。
     */
    rotation: Quaternion;
    /**
     * 世界空间的旋转角度，顺序为x、y、z。
     */
    rotationEuler: Vector3;
    /**
     * 世界矩阵。
     */
    worldMatrix: Matrix4x4;
    /**
     * 创建一个 <code>Transform3D</code> 实例。
     * @param owner 所属精灵。
     */
    constructor(owner: Sprite3D);
    /**
     * @internal
     */
    private _getScaleMatrix;
    /**
     * @internal
     */
    _setTransformFlag(type: number, value: boolean): void;
    /**
     * @internal
     */
    _getTransformFlag(type: number): boolean;
    /**
     * @internal
     */
    _setParent(value: Transform3D): void;
    /**
     * @internal
     */
    private _onWorldPositionRotationTransform;
    /**
     * @internal
     */
    private _onWorldPositionScaleTransform;
    /**
     * @internal
     */
    private _onWorldPositionTransform;
    /**
     * @internal
     */
    private _onWorldRotationTransform;
    /**
     * @internal
     */
    private _onWorldScaleTransform;
    /**
     * @internal
     */
    _onWorldTransform(): void;
    /**
     * 平移变换。
     * @param 	translation 移动距离。
     * @param 	isLocal 是否局部空间。
     */
    translate(translation: Vector3, isLocal?: boolean): void;
    /**
     * 旋转变换。
     * @param 	rotations 旋转幅度。
     * @param 	isLocal 是否局部空间。
     * @param 	isRadian 是否弧度制。
     */
    rotate(rotation: Vector3, isLocal?: boolean, isRadian?: boolean): void;
    /**
     * 获取向前方向。
     * @param 前方向。
     */
    getForward(forward: Vector3): void;
    /**
     * 获取向上方向。
     * @param 上方向。
     */
    getUp(up: Vector3): void;
    /**
     * 获取向右方向。
     * @param 右方向。
     */
    getRight(right: Vector3): void;
    /**
     * 观察目标位置。
     * @param	target 观察目标。
     * @param	up 向上向量。
     * @param	isLocal 是否局部空间。
     */
    lookAt(target: Vector3, up: Vector3, isLocal?: boolean): void;
    /**
     * 世界缩放。
     * 某种条件下获取该值可能不正确（例如：父节点有缩放，子节点有旋转），缩放会倾斜，无法使用Vector3正确表示,必须使用Matrix3x3矩阵才能正确表示。
     * @return	世界缩放。
     */
    getWorldLossyScale(): Vector3;
    /**
     * 设置世界缩放。
     * 某种条件下设置该值可能不正确（例如：父节点有缩放，子节点有旋转），缩放会倾斜，无法使用Vector3正确表示,必须使用Matrix3x3矩阵才能正确表示。
     * @return	世界缩放。
     */
    setWorldLossyScale(value: Vector3): void;
    /**
     * @deprecated
     */
    /**
    * @deprecated
    */
    scale: Vector3;
}
