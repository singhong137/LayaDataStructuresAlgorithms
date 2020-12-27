import { Vector3 } from "../../math/Vector3";
import { LightSprite, LightType } from "./LightSprite";
import { ShadowCascadesMode } from "./ShadowCascadesMode";
/**
 * <code>DirectionLight</code> 类用于创建平行光。
 */
export class DirectionLight extends LightSprite {
    /**
     * 创建一个 <code>DirectionLight</code> 实例。
     */
    constructor() {
        super();
        /** @internal */
        this._direction = new Vector3();
        /** @internal */
        this._shadowCascadesMode = ShadowCascadesMode.NoCascades;
        /** @internal */
        this._shadowTwoCascadeSplits = 1.0 / 3.0;
        /** @internal */
        this._shadowFourCascadeSplits = new Vector3(1.0 / 15, 3.0 / 15.0, 7.0 / 15.0);
        this._lightType = LightType.Directional;
    }
    /**
     * 阴影级联数量。
     */
    get shadowCascadesMode() {
        return this._shadowCascadesMode;
    }
    set shadowCascadesMode(value) {
        this._shadowCascadesMode = value;
    }
    /**
     * 二级级联阴影分割比例。
     */
    get shadowTwoCascadeSplits() {
        return this._shadowTwoCascadeSplits;
    }
    set shadowTwoCascadeSplits(value) {
        this._shadowTwoCascadeSplits = value;
    }
    /**
     * 四级级联阴影分割比例,X、Y、Z依次为其分割比例,Z必须大于Y,Y必须大于X。
     */
    get shadowFourCascadeSplits() {
        return this._shadowFourCascadeSplits;
    }
    set shadowFourCascadeSplits(value) {
        if (value.x > value.y || value.y > value.z || value.z > 1.0)
            throw "DiretionLight:Invalid value.";
        value.cloneTo(this._shadowFourCascadeSplits);
    }
    /**
     * @internal
     * @override
     */
    _addToLightQueue() {
        this._scene._directionLights.add(this);
    }
    /**
     * @internal
     * @override
     */
    _removeFromLightQueue() {
        this._scene._directionLights.remove(this);
    }
}
