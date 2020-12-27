import { Vector3 } from "../../math/Vector3";
import { LightSprite } from "./LightSprite";
import { ShadowCascadesMode } from "./ShadowCascadesMode";
/**
 * <code>DirectionLight</code> 类用于创建平行光。
 */
export declare class DirectionLight extends LightSprite {
    /** @internal */
    _direction: Vector3;
    /** @internal */
    _shadowCascadesMode: ShadowCascadesMode;
    /** @internal */
    _shadowTwoCascadeSplits: number;
    /** @internal */
    _shadowFourCascadeSplits: Vector3;
    /**
     * 阴影级联数量。
     */
    shadowCascadesMode: ShadowCascadesMode;
    /**
     * 二级级联阴影分割比例。
     */
    shadowTwoCascadeSplits: number;
    /**
     * 四级级联阴影分割比例,X、Y、Z依次为其分割比例,Z必须大于Y,Y必须大于X。
     */
    shadowFourCascadeSplits: Vector3;
    /**
     * 创建一个 <code>DirectionLight</code> 实例。
     */
    constructor();
    /**
     * @internal
     * @override
     */
    protected _addToLightQueue(): void;
    /**
     * @internal
     * @override
     */
    protected _removeFromLightQueue(): void;
}
