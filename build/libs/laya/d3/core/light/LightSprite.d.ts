import { Node } from "../../../display/Node";
import { Vector3 } from "../../math/Vector3";
import { Sprite3D } from "../Sprite3D";
import { ShadowMode } from "./ShadowMode";
/**
 * @internal
 */
export declare enum LightType {
    Directional = 0,
    Spot = 1,
    Point = 2
}
/**
 * <code>LightSprite</code> 类用于创建灯光的父类。
 */
export declare class LightSprite extends Sprite3D {
    /** 灯光烘培类型-实时。*/
    static LIGHTMAPBAKEDTYPE_REALTIME: number;
    /** 灯光烘培类型-混合。*/
    static LIGHTMAPBAKEDTYPE_MIXED: number;
    /** 灯光烘培类型-烘焙。*/
    static LIGHTMAPBAKEDTYPE_BAKED: number;
    /** @internal */
    protected _shadowMode: ShadowMode;
    /** @internal */
    _isAlternate: boolean;
    /** @internal */
    _intensityColor: Vector3;
    /** @internal */
    _intensity: number;
    /** @internal */
    _shadowResolution: number;
    /** @internal */
    _shadowDistance: number;
    /** @internal */
    _shadowDepthBias: number;
    /** @internal */
    _shadowNormalBias: number;
    /** @internal */
    _shadowNearPlane: number;
    /** @internal */
    _shadowStrength: number;
    /** @internal */
    _lightmapBakedType: number;
    /** @internal */
    _lightType: LightType;
    /** 灯光颜色。 */
    color: Vector3;
    /**
     * 灯光强度。
     */
    intensity: number;
    /**
     * 阴影模式。
     */
    shadowMode: ShadowMode;
    /**
     * 最大阴影距离。
     */
    shadowDistance: number;
    /**
     * 阴影贴图分辨率。
     */
    shadowResolution: number;
    /**
     * 阴影深度偏差。
     */
    shadowDepthBias: number;
    /**
     * 阴影法线偏差。
     */
    shadowNormalBias: number;
    /**
     * 阴影强度。
     */
    shadowStrength: number;
    /**
     * 阴影视锥的近裁面。
     */
    shadowNearPlane: number;
    /**
     * 灯光烘培类型。
     */
    lightmapBakedType: number;
    /**
     * 创建一个 <code>LightSprite</code> 实例。
     */
    constructor();
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _parse(data: any, spriteMap: any): void;
    /**
     * @internal
     */
    private _addToScene;
    /**
     * @internal
     */
    private _removeFromScene;
    /**
     * @internal
     */
    protected _addToLightQueue(): void;
    /**
     * @internal
     */
    protected _removeFromLightQueue(): void;
    /**
     * @inheritDoc
     * @override
     */
    protected _onActive(): void;
    /**
     * @inheritDoc
     * @override
     */
    protected _onInActive(): void;
    /**
     * @internal
     */
    protected _create(): Node;
    /**
     * @deprecated
     * please use color property instead.
     */
    diffuseColor: Vector3;
}
