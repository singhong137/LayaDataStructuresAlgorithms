import { BaseTexture } from "../../../resource/BaseTexture";
import { ShaderDefine } from "../../shader/ShaderDefine";
import { PBRMaterial } from "./PBRMaterial";
/**
 * 金属度PBR材质光滑度数据源。
 */
export declare enum PBRMetallicSmoothnessSource {
    /**金属度贴图的Alpha通道。*/
    MetallicGlossTextureAlpha = 0,
    /**反射率贴图的Alpha通道。*/
    AlbedoTextureAlpha = 1
}
/**
 * <code>PBRStandardMaterial</code> 类用于实现PBR材质。
 */
export declare class PBRStandardMaterial extends PBRMaterial {
    /** @internal */
    static SHADERDEFINE_SMOOTHNESSSOURCE_ALBEDOTEXTURE_ALPHA: ShaderDefine;
    /** @internal */
    static SHADERDEFINE_METALLICGLOSSTEXTURE: ShaderDefine;
    /** @internal */
    static METALLICGLOSSTEXTURE: number;
    /** @internal */
    static METALLIC: number;
    /** 默认材质，禁止修改*/
    static defaultMaterial: PBRStandardMaterial;
    /**
     * @internal
     */
    static __init__(): void;
    /** @internal */
    private _smoothnessSource;
    /**
     * 金属光滑度贴图。
     */
    metallicGlossTexture: BaseTexture;
    /**
     * 获取金属度,范围为0到1。
     */
    metallic: number;
    /**
     * 光滑度数据源,0或1。
     */
    smoothnessSource: PBRMetallicSmoothnessSource;
    /**
     * 创建一个 <code>PBRStandardMaterial</code> 实例。
     */
    constructor();
    /**
     * 克隆。
     * @return	 克隆副本。
     * @override
     */
    clone(): any;
}
