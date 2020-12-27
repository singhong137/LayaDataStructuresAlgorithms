import { RenderTextureDepthFormat } from "../../../resource/RenderTextureFormat";
import { BoundSphere } from "../../math/BoundSphere";
import { Matrix4x4 } from "../../math/Matrix4x4";
import { Plane } from "../../math/Plane";
import { Vector3 } from "../../math/Vector3";
import { Vector4 } from "../../math/Vector4";
import { RenderTexture } from "../../resource/RenderTexture";
import { ShadowSliceData } from "../../shadowMap/ShadowSliceData";
import { DirectionLight } from "./DirectionLight";
import { LightSprite } from "./LightSprite";
import { ShadowCascadesMode } from "./ShadowCascadesMode";
/**
 * @internal
 */
export declare class ShadowUtils {
    /** @internal */
    private static _tempMatrix0;
    /** @internal */
    private static _shadowMapScaleOffsetMatrix;
    /** @internal */
    private static _shadowTextureFormat;
    /** @internal */
    private static _frustumCorners;
    /** @internal */
    private static _adjustNearPlane;
    /** @internal */
    private static _adjustFarPlane;
    /** @internal */
    private static _backPlaneFaces;
    /** @internal */
    private static _edgePlanePoint2;
    /** @internal */
    private static _frustumPlaneNeighbors;
    /** @internal */
    private static _frustumTwoPlaneCorners;
    /** @internal */
    static readonly atlasBorderSize: number;
    /**
    * @internal
    */
    static supportShadow(): boolean;
    /**
     * @internal
     */
    static init(): void;
    /**
     * @internal
     */
    static getTemporaryShadowTexture(witdh: number, height: number, depthFormat: RenderTextureDepthFormat): RenderTexture;
    /**
     * @internal
     */
    static getShadowBias(light: LightSprite, shadowProjectionMatrix: Matrix4x4, shadowResolution: number, out: Vector4): void;
    /**
     * @internal
     */
    static getCameraFrustumPlanes(cameraViewProjectMatrix: Matrix4x4, frustumPlanes: Plane[]): void;
    /**
    * @internal
    */
    static getFarWithRadius(radius: number, denominator: number): number;
    /**
    * @internal
    */
    static getCascadesSplitDistance(twoSplitRatio: number, fourSplitRatio: Vector3, cameraNear: number, shadowFar: number, fov: number, aspectRatio: number, cascadesMode: ShadowCascadesMode, out: number[]): void;
    /**
     * @internal
     */
    static applySliceTransform(shadowSliceData: ShadowSliceData, atlasWidth: number, atlasHeight: number, cascadeIndex: number, outShadowMatrices: Float32Array): void;
    /**
     * @internal
     */
    static getDirectionLightShadowCullPlanes(cameraFrustumPlanes: Array<Plane>, cascadeIndex: number, splitDistance: number[], cameraNear: number, direction: Vector3, shadowSliceData: ShadowSliceData): void;
    /**
     * @internal
     */
    static getBoundSphereByFrustum(near: number, far: number, fov: number, aspectRatio: number, cameraPos: Vector3, forward: Vector3, outBoundSphere: BoundSphere): number;
    /**
     * @inernal
     */
    static getMaxTileResolutionInAtlas(atlasWidth: number, atlasHeight: number, tileCount: number): number;
    /**
     * @internal
     */
    static getDirectionalLightMatrices(lightUp: Vector3, lightSide: Vector3, lightForward: Vector3, cascadeIndex: number, nearPlane: number, shadowResolution: number, shadowSliceData: ShadowSliceData, shadowMatrices: Float32Array): void;
    /**
     * @internal
     */
    static prepareShadowReceiverShaderValues(light: DirectionLight, shadowMapWidth: number, shadowMapHeight: number, shadowSliceDatas: ShadowSliceData[], cascadeCount: number, shadowMapSize: Vector4, shadowParams: Vector4, shadowMatrices: Float32Array, splitBoundSpheres: Float32Array): void;
}
