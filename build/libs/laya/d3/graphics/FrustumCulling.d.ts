import { SimpleSingletonList } from "../component/SimpleSingletonList";
import { Camera } from "../core/Camera";
import { RenderContext3D } from "../core/render/RenderContext3D";
import { Scene3D } from "../core/scene/Scene3D";
import { BoundFrustum } from "../math/BoundFrustum";
import { Plane } from "../math/Plane";
import { Vector3 } from "../math/Vector3";
import { Shader3D } from "../shader/Shader3D";
import { BoundSphere } from "../math/BoundSphere";
export declare class CameraCullInfo {
    position: Vector3;
    useOcclusionCulling: Boolean;
    boundFrustum: BoundFrustum;
    cullingMask: number;
}
export declare class ShadowCullInfo {
    position: Vector3;
    cullPlanes: Plane[];
    cullSphere: BoundSphere;
    cullPlaneCount: number;
    direction: Vector3;
}
/**
 * @internal
 * <code>FrustumCulling</code> 类用于裁剪。
 */
export declare class FrustumCulling {
    /**@internal */
    private static _tempColor0;
    /**@internal */
    private static _tempVector0;
    /**@internal */
    static _cameraCullInfo: CameraCullInfo;
    /**@internal */
    static _shadowCullInfo: ShadowCullInfo;
    /**@internal */
    static debugFrustumCulling: boolean;
    /**
     * @internal
     */
    static __init__(): void;
    /**
     * @internal
     */
    private static _drawTraversalCullingBound;
    /**
     * @internal
     */
    private static _traversalCulling;
    /**
     * @internal
     */
    static renderObjectCulling(cameraCullInfo: CameraCullInfo, scene: Scene3D, context: RenderContext3D, customShader: Shader3D, replacementTag: string, isShadowCasterCull: boolean): void;
    /**
     * @internal
     */
    static cullingShadow(cullInfo: ShadowCullInfo, scene: Scene3D, context: RenderContext3D): boolean;
    /**@internal	[NATIVE]*/
    static _cullingBufferLength: number;
    /**@internal	[NATIVE]*/
    static _cullingBuffer: Float32Array;
    /**
     * @internal [NATIVE]
     */
    static renderObjectCullingNative(camera: Camera, scene: Scene3D, context: RenderContext3D, renderList: SimpleSingletonList, customShader: Shader3D, replacementTag: string): void;
    /**
     * @internal [NATIVE]
     */
    static cullingNative(boundFrustumBuffer: Float32Array, cullingBuffer: Float32Array, cullingBufferIndices: Int32Array, cullingCount: number, cullingBufferResult: Int32Array): number;
}
