import { BoundSphere } from "../math/BoundSphere";
import { Matrix4x4 } from "../math/Matrix4x4";
import { Plane } from "../math/Plane";
import { Vector3 } from "../math/Vector3";
import { ShaderData } from "../shader/ShaderData";
/**
 * @internal
 * 阴影分割数据。
 */
export declare class ShadowSliceData {
    cameraShaderValue: ShaderData;
    position: Vector3;
    offsetX: number;
    offsetY: number;
    resolution: number;
    viewMatrix: Matrix4x4;
    projectionMatrix: Matrix4x4;
    viewProjectMatrix: Matrix4x4;
    cullPlanes: Array<Plane>;
    cullPlaneCount: number;
    splitBoundSphere: BoundSphere;
    sphereCenterZ: number;
}
