import { BaseTexture } from "../../../resource/BaseTexture";
import { Vector4 } from "../../math/Vector4";
import { ShaderDefine } from "../../shader/ShaderDefine";
import { PBRMaterial } from "./PBRMaterial";
/**
 * 光滑度数据源。
 */
export declare enum PBRSpecularSmoothnessSource {
    /**金属度贴图的Alpha通道。*/
    SpecularTextureAlpha = 0,
    /**反射率贴图的Alpha通道。*/
    AlbedoTextureAlpha = 1
}
/**
 * <code>PBRSpecularMaterial</code> 类用于实现PBR(Specular)材质。
 */
export declare class PBRSpecularMaterial extends PBRMaterial {
    /** @internal */
    static SHADERDEFINE_SMOOTHNESSSOURCE_ALBEDOTEXTURE_ALPHA: ShaderDefine;
    /** @internal */
    static SHADERDEFINE_SPECULARGLOSSTEXTURE: ShaderDefine;
    /** @internal */
    static SPECULARTEXTURE: number;
    /** @internal */
    static SPECULARCOLOR: number;
    /** 默认材质，禁止修改*/
    static defaultMaterial: PBRSpecularMaterial;
    /**
     * @internal
     */
    static __init__(): void;
    /**
     * 高光贴图。
     */
    specularTexture: BaseTexture;
    /**
     * 高光颜色。
     */
    specularColor: Vector4;
    /**
     * 创建一个 <code>PBRSpecularMaterial</code> 实例。
     */
    constructor();
    /**
     * 克隆。
     * @return	 克隆副本。
     * @override
     */
    clone(): any;
}
