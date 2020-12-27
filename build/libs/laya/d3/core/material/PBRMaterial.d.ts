import { BaseTexture } from "../../../resource/BaseTexture";
import { Vector4 } from "../../math/Vector4";
import { ShaderDefine } from "../../shader/ShaderDefine";
import { Material } from "./Material";
import { PBRRenderQuality } from "./PBRRenderQuality";
/**
 * 渲染模式。
 */
export declare enum PBRRenderMode {
    /**不透明。*/
    Opaque = 0,
    /**透明裁剪。*/
    Cutout = 1,
    /**透明混合_游戏中经常使用的透明。*/
    Fade = 2,
    /**透明混合_物理上看似合理的透明。*/
    Transparent = 3
}
/**
 * PBR材质的父类,该类为抽象类。
 */
export declare class PBRMaterial extends Material {
    /** @internal */
    static SHADERDEFINE_ALBEDOTEXTURE: ShaderDefine;
    /** @internal */
    static SHADERDEFINE_NORMALTEXTURE: ShaderDefine;
    /** @internal */
    static SHADERDEFINE_OCCLUSIONTEXTURE: ShaderDefine;
    /** @internal */
    static SHADERDEFINE_PARALLAXTEXTURE: ShaderDefine;
    /** @internal */
    static SHADERDEFINE_EMISSION: ShaderDefine;
    /** @internal */
    static SHADERDEFINE_EMISSIONTEXTURE: ShaderDefine;
    /** @internal */
    static SHADERDEFINE_TILINGOFFSET: ShaderDefine;
    /** @internal */
    static SHADERDEFINE_TRANSPARENTBLEND: ShaderDefine;
    /**@internal */
    static SHADERDEFINE_LAYA_PBR_BRDF_HIGH: ShaderDefine;
    /**@internal */
    static SHADERDEFINE_LAYA_PBR_BRDF_LOW: ShaderDefine;
    /** @internal */
    static ALBEDOTEXTURE: number;
    /** @internal */
    static ALBEDOCOLOR: number;
    /** @internal */
    static TILINGOFFSET: number;
    /** @internal */
    static NORMALTEXTURE: number;
    /** @internal */
    static NORMALSCALE: number;
    /** @internal */
    static SMOOTHNESS: number;
    /** @internal */
    static SMOOTHNESSSCALE: number;
    /** @internal */
    static OCCLUSIONTEXTURE: number;
    /** @internal */
    static OCCLUSIONSTRENGTH: number;
    /** @internal */
    static PARALLAXTEXTURE: number;
    /** @internal */
    static PARALLAXSCALE: number;
    /** @internal */
    static EMISSIONTEXTURE: number;
    /** @internal */
    static EMISSIONCOLOR: number;
    /** @internal */
    static CULL: number;
    /** @internal */
    static BLEND: number;
    /** @internal */
    static BLEND_SRC: number;
    /** @internal */
    static BLEND_DST: number;
    /** @internal */
    static DEPTH_TEST: number;
    /** @internal */
    static DEPTH_WRITE: number;
    /** 渲染质量。*/
    static renderQuality: PBRRenderQuality;
    /**
     * @private
     */
    static __init__(): void;
    /** @internal */
    private _enableEmission;
    /**
     * 漫反射颜色。
     */
    albedoColor: Vector4;
    /**
     * 漫反射贴图。
     */
    albedoTexture: BaseTexture;
    /**
     * 法线贴图。
     */
    normalTexture: BaseTexture;
    /**
     * 法线贴图缩放系数。
     */
    normalTextureScale: number;
    /**
     * 视差贴图。
     */
    parallaxTexture: BaseTexture;
    /**
     * 视差贴图缩放系数。
     */
    parallaxTextureScale: number;
    /**
     * 遮挡贴图。
     */
    occlusionTexture: BaseTexture;
    /**
     * 遮挡贴图强度,范围为0到1。
     */
    occlusionTextureStrength: number;
    /**
     * 光滑度,范围为0到1。
     */
    smoothness: number;
    /**
     * 光滑度缩放系数,范围为0到1。
     */
    smoothnessTextureScale: number;
    /**
     * 是否开启自发光。
     */
    enableEmission: boolean;
    /**
     * 自发光颜色。
     */
    emissionColor: Vector4;
    /**
     * 自发光贴图。
     */
    emissionTexture: BaseTexture;
    /**
     * 纹理平铺和偏移。
     */
    tilingOffset: Vector4;
    /**
     * 是否写入深度。
     */
    depthWrite: boolean;
    /**
     * 剔除方式。
     */
    cull: number;
    /**
     * 混合方式。
     */
    blend: number;
    /**
     * 混合源。
     */
    blendSrc: number;
    /**
     * 混合目标。
     */
    blendDst: number;
    /**
     * 深度测试方式。
     */
    depthTest: number;
    /**
     * 渲染模式。
     */
    renderMode: number;
    constructor();
    /**
     * @deprecated
     */
    enableReflection: boolean;
}
