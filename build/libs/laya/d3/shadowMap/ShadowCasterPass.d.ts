import { Camera } from "../core/Camera";
import { DirectionLight } from "../core/light/DirectionLight";
import { RenderContext3D } from "../core/render/RenderContext3D";
import { Scene3D } from "../core/scene/Scene3D";
/**
 * @internal
 */
export declare class ShadowCasterPass {
    /**@internal */
    private static _tempVector30;
    /**@internal */
    private static _tempMatrix0;
    /** @internal */
    static SHADOW_BIAS: number;
    /** @internal */
    static SHADOW_LIGHT_DIRECTION: number;
    /** @internal */
    static SHADOW_SPLIT_SPHERES: number;
    /** @internal */
    static SHADOW_MATRICES: number;
    /** @internal */
    static SHADOW_MAP_SIZE: number;
    /** @internal */
    static SHADOW_MAP: number;
    /** @internal */
    static SHADOW_PARAMS: number;
    /** @internal */
    private static _maxCascades;
    /**@internal */
    private static _cascadesSplitDistance;
    /** @internal */
    private static _frustumPlanes;
    /** @internal */
    private _shadowBias;
    /** @internal */
    private _shadowParams;
    /** @internal */
    private _shadowMapSize;
    /** @internal */
    private _shadowMatrices;
    /**@internal */
    private _splitBoundSpheres;
    /** @internal */
    private _cascadeCount;
    /** @internal */
    private _shadowMapWidth;
    /** @internal */
    private _shadowMapHeight;
    /** @internal */
    private _shadowMap;
    /** @internal */
    private _shadowSliceDatas;
    /**@internal */
    private _light;
    /** @internal */
    private _lightUp;
    /** @internal */
    private _lightSide;
    /** @internal */
    private _lightForward;
    constructor();
    /**
     * @internal
     */
    private _setupShadowCasterShaderValues;
    /**
     * @internal
     */
    private _setupShadowReceiverShaderValues;
    /**
     * @internal
     */
    update(camera: Camera, light: DirectionLight): void;
    /**
     * @interal
     */
    render(context: RenderContext3D, scene: Scene3D): void;
    /**
     * @internal
     */
    cleanUp(): void;
}
