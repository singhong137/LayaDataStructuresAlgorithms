import { Config3D } from "../../../../Config3D";
import { Vector3 } from "../../math/Vector3";
import { Sprite3D } from "../Sprite3D";
import { ShadowMode } from "./ShadowMode";
/**
 * @internal
 */
export var LightType;
(function (LightType) {
    LightType[LightType["Directional"] = 0] = "Directional";
    LightType[LightType["Spot"] = 1] = "Spot";
    LightType[LightType["Point"] = 2] = "Point";
})(LightType || (LightType = {}));
/**
 * <code>LightSprite</code> 类用于创建灯光的父类。
 */
export class LightSprite extends Sprite3D {
    /**
     * 创建一个 <code>LightSprite</code> 实例。
     */
    constructor() {
        super();
        /** @internal */
        this._shadowMode = ShadowMode.None;
        /** @internal */
        this._isAlternate = false;
        /** @internal */
        this._shadowResolution = 2048;
        /** @internal */
        this._shadowDistance = 50.0;
        /** @internal */
        this._shadowDepthBias = 1.0;
        /** @internal */
        this._shadowNormalBias = 1.0;
        /** @internal */
        this._shadowNearPlane = 0.1;
        /** @internal */
        this._shadowStrength = 1.0;
        this._intensity = 1.0;
        this._intensityColor = new Vector3();
        this.color = new Vector3(1.0, 1.0, 1.0);
        this._lightmapBakedType = LightSprite.LIGHTMAPBAKEDTYPE_REALTIME;
    }
    /**
     * 灯光强度。
     */
    get intensity() {
        return this._intensity;
    }
    set intensity(value) {
        this._intensity = value;
    }
    /**
     * 阴影模式。
     */
    get shadowMode() {
        return this._shadowMode;
    }
    set shadowMode(value) {
        this._shadowMode = value;
    }
    /**
     * 最大阴影距离。
     */
    get shadowDistance() {
        return this._shadowDistance;
    }
    set shadowDistance(value) {
        this._shadowDistance = value;
    }
    /**
     * 阴影贴图分辨率。
     */
    get shadowResolution() {
        return this._shadowResolution;
    }
    set shadowResolution(value) {
        this._shadowResolution = value;
    }
    /**
     * 阴影深度偏差。
     */
    get shadowDepthBias() {
        return this._shadowDepthBias;
    }
    set shadowDepthBias(value) {
        this._shadowDepthBias = value;
    }
    /**
     * 阴影法线偏差。
     */
    get shadowNormalBias() {
        return this._shadowNormalBias;
    }
    set shadowNormalBias(value) {
        this._shadowNormalBias = value;
    }
    /**
     * 阴影强度。
     */
    get shadowStrength() {
        return this._shadowStrength;
    }
    set shadowStrength(value) {
        this._shadowStrength = value;
    }
    /**
     * 阴影视锥的近裁面。
     */
    get shadowNearPlane() {
        return this._shadowNearPlane;
    }
    set shadowNearPlane(value) {
        this._shadowNearPlane = value;
    }
    /**
     * 灯光烘培类型。
     */
    get lightmapBakedType() {
        return this._lightmapBakedType;
    }
    set lightmapBakedType(value) {
        if (this._lightmapBakedType !== value) {
            this._lightmapBakedType = value;
            if (this.activeInHierarchy) {
                if (value !== LightSprite.LIGHTMAPBAKEDTYPE_BAKED)
                    this._addToScene();
                else
                    this._removeFromScene();
            }
        }
    }
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _parse(data, spriteMap) {
        super._parse(data, spriteMap);
        var colorData = data.color;
        this.color.fromArray(colorData);
        this.intensity = data.intensity;
        this.lightmapBakedType = data.lightmapBakedType;
    }
    /**
     * @internal
     */
    _addToScene() {
        var scene = this._scene;
        var maxLightCount = Config3D._config.maxLightCount;
        if (scene._lightCount < maxLightCount) {
            scene._lightCount++;
            this._addToLightQueue();
            this._isAlternate = false;
        }
        else {
            scene._alternateLights.add(this);
            this._isAlternate = true;
            console.warn("LightSprite:light count has large than maxLightCount,the latest added light will be ignore.");
        }
    }
    /**
     * @internal
     */
    _removeFromScene() {
        var scene = this._scene;
        if (this._isAlternate) {
            scene._alternateLights.remove(this);
        }
        else {
            scene._lightCount--;
            this._removeFromLightQueue();
            if (scene._alternateLights._length > 0) {
                var alternateLight = scene._alternateLights.shift();
                alternateLight._addToLightQueue();
                alternateLight._isAlternate = false;
                scene._lightCount++;
            }
        }
    }
    /**
     * @internal
     */
    _addToLightQueue() {
    }
    /**
     * @internal
     */
    _removeFromLightQueue() {
    }
    /**
     * @inheritDoc
     * @override
     */
    _onActive() {
        super._onActive();
        (this.lightmapBakedType !== LightSprite.LIGHTMAPBAKEDTYPE_BAKED) && (this._addToScene());
    }
    /**
     * @inheritDoc
     * @override
     */
    _onInActive() {
        super._onInActive();
        (this.lightmapBakedType !== LightSprite.LIGHTMAPBAKEDTYPE_BAKED) && (this._removeFromScene());
    }
    /**
     * @internal
     */
    _create() {
        return new LightSprite();
    }
    /**
     * @deprecated
     * please use color property instead.
     */
    get diffuseColor() {
        console.log("LightSprite: discard property,please use color property instead.");
        return this.color;
    }
    set diffuseColor(value) {
        console.log("LightSprite: discard property,please use color property instead.");
        this.color = value;
    }
}
/** 灯光烘培类型-实时。*/
LightSprite.LIGHTMAPBAKEDTYPE_REALTIME = 0;
/** 灯光烘培类型-混合。*/
LightSprite.LIGHTMAPBAKEDTYPE_MIXED = 1;
/** 灯光烘培类型-烘焙。*/
LightSprite.LIGHTMAPBAKEDTYPE_BAKED = 2;
