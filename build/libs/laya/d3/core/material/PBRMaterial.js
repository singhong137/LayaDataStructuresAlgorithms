import { Vector4 } from "../../math/Vector4";
import { Shader3D } from "../../shader/Shader3D";
import { Material } from "./Material";
import { RenderState } from "./RenderState";
import { PBRRenderQuality } from "./PBRRenderQuality";
/**
 * 渲染模式。
 */
export var PBRRenderMode;
(function (PBRRenderMode) {
    /**不透明。*/
    PBRRenderMode[PBRRenderMode["Opaque"] = 0] = "Opaque";
    /**透明裁剪。*/
    PBRRenderMode[PBRRenderMode["Cutout"] = 1] = "Cutout";
    /**透明混合_游戏中经常使用的透明。*/
    PBRRenderMode[PBRRenderMode["Fade"] = 2] = "Fade";
    /**透明混合_物理上看似合理的透明。*/
    PBRRenderMode[PBRRenderMode["Transparent"] = 3] = "Transparent";
})(PBRRenderMode || (PBRRenderMode = {}));
/**
 * PBR材质的父类,该类为抽象类。
 */
export class PBRMaterial extends Material {
    constructor() {
        super();
        /** @internal */
        this._enableEmission = false;
        this._shaderValues.setVector(PBRMaterial.ALBEDOCOLOR, new Vector4(1.0, 1.0, 1.0, 1.0));
        this._shaderValues.setVector(PBRMaterial.EMISSIONCOLOR, new Vector4(1.0, 1.0, 1.0, 1.0));
        this._shaderValues.setNumber(PBRMaterial.SMOOTHNESS, 0.5);
        this._shaderValues.setNumber(PBRMaterial.SMOOTHNESSSCALE, 1.0);
        this._shaderValues.setNumber(PBRMaterial.OCCLUSIONSTRENGTH, 1.0);
        this._shaderValues.setNumber(PBRMaterial.NORMALSCALE, 1.0);
        this._shaderValues.setNumber(PBRMaterial.PARALLAXSCALE, 0.001);
        this._shaderValues.setNumber(Material.ALPHATESTVALUE, 0.5);
        this.renderMode = PBRRenderMode.Opaque;
    }
    /**
     * @private
     */
    static __init__() {
        PBRMaterial.SHADERDEFINE_ALBEDOTEXTURE = Shader3D.getDefineByName("ALBEDOTEXTURE");
        PBRMaterial.SHADERDEFINE_NORMALTEXTURE = Shader3D.getDefineByName("NORMALTEXTURE");
        PBRMaterial.SHADERDEFINE_PARALLAXTEXTURE = Shader3D.getDefineByName("PARALLAXTEXTURE");
        PBRMaterial.SHADERDEFINE_OCCLUSIONTEXTURE = Shader3D.getDefineByName("OCCLUSIONTEXTURE");
        PBRMaterial.SHADERDEFINE_EMISSION = Shader3D.getDefineByName("EMISSION");
        PBRMaterial.SHADERDEFINE_EMISSIONTEXTURE = Shader3D.getDefineByName("EMISSIONTEXTURE");
        PBRMaterial.SHADERDEFINE_TILINGOFFSET = Shader3D.getDefineByName("TILINGOFFSET");
        PBRMaterial.SHADERDEFINE_TRANSPARENTBLEND = Shader3D.getDefineByName("TRANSPARENTBLEND");
        PBRMaterial.SHADERDEFINE_LAYA_PBR_BRDF_HIGH = Shader3D.getDefineByName("LAYA_PBR_BRDF_HIGH");
        PBRMaterial.SHADERDEFINE_LAYA_PBR_BRDF_LOW = Shader3D.getDefineByName("LAYA_PBR_BRDF_LOW");
    }
    /**
     * 漫反射颜色。
     */
    get albedoColor() {
        return this._shaderValues.getVector(PBRMaterial.ALBEDOCOLOR);
    }
    set albedoColor(value) {
        this._shaderValues.setVector(PBRMaterial.ALBEDOCOLOR, value);
    }
    /**
     * 漫反射贴图。
     */
    get albedoTexture() {
        return this._shaderValues.getTexture(PBRMaterial.ALBEDOTEXTURE);
    }
    set albedoTexture(value) {
        if (value)
            this._shaderValues.addDefine(PBRMaterial.SHADERDEFINE_ALBEDOTEXTURE);
        else
            this._shaderValues.removeDefine(PBRMaterial.SHADERDEFINE_ALBEDOTEXTURE);
        this._shaderValues.setTexture(PBRMaterial.ALBEDOTEXTURE, value);
    }
    /**
     * 法线贴图。
     */
    get normalTexture() {
        return this._shaderValues.getTexture(PBRMaterial.NORMALTEXTURE);
    }
    set normalTexture(value) {
        if (value) {
            this._shaderValues.addDefine(PBRMaterial.SHADERDEFINE_NORMALTEXTURE);
        }
        else {
            this._shaderValues.removeDefine(PBRMaterial.SHADERDEFINE_NORMALTEXTURE);
        }
        this._shaderValues.setTexture(PBRMaterial.NORMALTEXTURE, value);
    }
    /**
     * 法线贴图缩放系数。
     */
    get normalTextureScale() {
        return this._shaderValues.getNumber(PBRMaterial.NORMALSCALE);
    }
    set normalTextureScale(value) {
        this._shaderValues.setNumber(PBRMaterial.NORMALSCALE, value);
    }
    /**
     * 视差贴图。
     */
    get parallaxTexture() {
        return this._shaderValues.getTexture(PBRMaterial.PARALLAXTEXTURE);
    }
    set parallaxTexture(value) {
        if (value)
            this._shaderValues.addDefine(PBRMaterial.SHADERDEFINE_PARALLAXTEXTURE);
        else
            this._shaderValues.removeDefine(PBRMaterial.SHADERDEFINE_PARALLAXTEXTURE);
        this._shaderValues.setTexture(PBRMaterial.PARALLAXTEXTURE, value);
    }
    /**
     * 视差贴图缩放系数。
     */
    get parallaxTextureScale() {
        return this._shaderValues.getNumber(PBRMaterial.PARALLAXSCALE);
    }
    set parallaxTextureScale(value) {
        this._shaderValues.setNumber(PBRMaterial.PARALLAXSCALE, Math.max(0.005, Math.min(0.08, value)));
    }
    /**
     * 遮挡贴图。
     */
    get occlusionTexture() {
        return this._shaderValues.getTexture(PBRMaterial.OCCLUSIONTEXTURE);
    }
    set occlusionTexture(value) {
        if (value)
            this._shaderValues.addDefine(PBRMaterial.SHADERDEFINE_OCCLUSIONTEXTURE);
        else
            this._shaderValues.removeDefine(PBRMaterial.SHADERDEFINE_OCCLUSIONTEXTURE);
        this._shaderValues.setTexture(PBRMaterial.OCCLUSIONTEXTURE, value);
    }
    /**
     * 遮挡贴图强度,范围为0到1。
     */
    get occlusionTextureStrength() {
        return this._shaderValues.getNumber(PBRMaterial.OCCLUSIONSTRENGTH);
    }
    set occlusionTextureStrength(value) {
        this._shaderValues.setNumber(PBRMaterial.OCCLUSIONSTRENGTH, Math.max(0.0, Math.min(1.0, value)));
    }
    /**
     * 光滑度,范围为0到1。
     */
    get smoothness() {
        return this._shaderValues.getNumber(PBRMaterial.SMOOTHNESS);
    }
    set smoothness(value) {
        this._shaderValues.setNumber(PBRMaterial.SMOOTHNESS, Math.max(0.0, Math.min(1.0, value)));
    }
    /**
     * 光滑度缩放系数,范围为0到1。
     */
    get smoothnessTextureScale() {
        return this._shaderValues.getNumber(PBRMaterial.SMOOTHNESSSCALE);
    }
    set smoothnessTextureScale(value) {
        this._shaderValues.setNumber(PBRMaterial.SMOOTHNESSSCALE, Math.max(0.0, Math.min(1.0, value)));
    }
    /**
     * 是否开启自发光。
     */
    get enableEmission() {
        return this._enableEmission;
    }
    set enableEmission(value) {
        if (value)
            this._shaderValues.addDefine(PBRMaterial.SHADERDEFINE_EMISSION);
        else
            this._shaderValues.removeDefine(PBRMaterial.SHADERDEFINE_EMISSION);
        this._enableEmission = value;
    }
    /**
     * 自发光颜色。
     */
    get emissionColor() {
        return this._shaderValues.getVector(PBRMaterial.EMISSIONCOLOR);
    }
    set emissionColor(value) {
        this._shaderValues.setVector(PBRMaterial.EMISSIONCOLOR, value);
    }
    /**
     * 自发光贴图。
     */
    get emissionTexture() {
        return this._shaderValues.getTexture(PBRMaterial.EMISSIONTEXTURE);
    }
    set emissionTexture(value) {
        if (value)
            this._shaderValues.addDefine(PBRMaterial.SHADERDEFINE_EMISSIONTEXTURE);
        else
            this._shaderValues.removeDefine(PBRMaterial.SHADERDEFINE_EMISSIONTEXTURE);
        this._shaderValues.setTexture(PBRMaterial.EMISSIONTEXTURE, value);
    }
    /**
     * 纹理平铺和偏移。
     */
    get tilingOffset() {
        return this._shaderValues.getVector(PBRMaterial.TILINGOFFSET);
    }
    set tilingOffset(value) {
        if (value) {
            if (value.x != 1 || value.y != 1 || value.z != 0 || value.w != 0)
                this._shaderValues.addDefine(PBRMaterial.SHADERDEFINE_TILINGOFFSET);
            else
                this._shaderValues.removeDefine(PBRMaterial.SHADERDEFINE_TILINGOFFSET);
        }
        else {
            this._shaderValues.removeDefine(PBRMaterial.SHADERDEFINE_TILINGOFFSET);
        }
        this._shaderValues.setVector(PBRMaterial.TILINGOFFSET, value);
    }
    /**
     * 是否写入深度。
     */
    get depthWrite() {
        return this._shaderValues.getBool(PBRMaterial.DEPTH_WRITE);
    }
    set depthWrite(value) {
        this._shaderValues.setBool(PBRMaterial.DEPTH_WRITE, value);
    }
    /**
     * 剔除方式。
     */
    get cull() {
        return this._shaderValues.getInt(PBRMaterial.CULL);
    }
    set cull(value) {
        this._shaderValues.setInt(PBRMaterial.CULL, value);
    }
    /**
     * 混合方式。
     */
    get blend() {
        return this._shaderValues.getInt(PBRMaterial.BLEND);
    }
    set blend(value) {
        this._shaderValues.setInt(PBRMaterial.BLEND, value);
    }
    /**
     * 混合源。
     */
    get blendSrc() {
        return this._shaderValues.getInt(PBRMaterial.BLEND_SRC);
    }
    set blendSrc(value) {
        this._shaderValues.setInt(PBRMaterial.BLEND_SRC, value);
    }
    /**
     * 混合目标。
     */
    get blendDst() {
        return this._shaderValues.getInt(PBRMaterial.BLEND_DST);
    }
    set blendDst(value) {
        this._shaderValues.setInt(PBRMaterial.BLEND_DST, value);
    }
    /**
     * 深度测试方式。
     */
    get depthTest() {
        return this._shaderValues.getInt(PBRMaterial.DEPTH_TEST);
    }
    set depthTest(value) {
        this._shaderValues.setInt(PBRMaterial.DEPTH_TEST, value);
    }
    /**
     * 渲染模式。
     */
    set renderMode(value) {
        switch (value) {
            case PBRRenderMode.Opaque:
                this.alphaTest = false;
                this.renderQueue = Material.RENDERQUEUE_OPAQUE;
                this.depthWrite = true;
                this.cull = RenderState.CULL_BACK;
                this.blend = RenderState.BLEND_DISABLE;
                this.depthTest = RenderState.DEPTHTEST_LESS;
                this._shaderValues.removeDefine(PBRMaterial.SHADERDEFINE_TRANSPARENTBLEND);
                break;
            case PBRRenderMode.Cutout:
                this.renderQueue = Material.RENDERQUEUE_ALPHATEST;
                this.alphaTest = true;
                this.depthWrite = true;
                this.cull = RenderState.CULL_BACK;
                this.blend = RenderState.BLEND_DISABLE;
                this.depthTest = RenderState.DEPTHTEST_LESS;
                this._shaderValues.removeDefine(PBRMaterial.SHADERDEFINE_TRANSPARENTBLEND);
                break;
            case PBRRenderMode.Fade:
                this.renderQueue = Material.RENDERQUEUE_TRANSPARENT;
                this.alphaTest = false;
                this.depthWrite = false;
                this.cull = RenderState.CULL_BACK;
                this.blend = RenderState.BLEND_ENABLE_ALL;
                this.blendSrc = RenderState.BLENDPARAM_SRC_ALPHA;
                this.blendDst = RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
                this.depthTest = RenderState.DEPTHTEST_LESS;
                this._shaderValues.removeDefine(PBRMaterial.SHADERDEFINE_TRANSPARENTBLEND);
                break;
            case PBRRenderMode.Transparent:
                this.renderQueue = Material.RENDERQUEUE_TRANSPARENT;
                this.alphaTest = false;
                this.depthWrite = false;
                this.cull = RenderState.CULL_BACK;
                this.blend = RenderState.BLEND_ENABLE_ALL;
                this.blendSrc = RenderState.BLENDPARAM_ONE;
                this.blendDst = RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
                this.depthTest = RenderState.DEPTHTEST_LESS;
                this._shaderValues.addDefine(PBRMaterial.SHADERDEFINE_TRANSPARENTBLEND);
                break;
            default:
                throw new Error("PBRMaterial:unknown renderMode value.");
        }
    }
    //---------------------------------------------------------------deprecated------------------------------------------------------------------
    /**
     * @deprecated
     */
    get enableReflection() {
        return true;
    }
    set enableReflection(value) {
    }
}
/** @internal */
PBRMaterial.ALBEDOTEXTURE = Shader3D.propertyNameToID("u_AlbedoTexture");
/** @internal */
PBRMaterial.ALBEDOCOLOR = Shader3D.propertyNameToID("u_AlbedoColor");
/** @internal */
PBRMaterial.TILINGOFFSET = Shader3D.propertyNameToID("u_TilingOffset");
/** @internal */
PBRMaterial.NORMALTEXTURE = Shader3D.propertyNameToID("u_NormalTexture");
/** @internal */
PBRMaterial.NORMALSCALE = Shader3D.propertyNameToID("u_NormalScale");
/** @internal */
PBRMaterial.SMOOTHNESS = Shader3D.propertyNameToID("u_Smoothness");
/** @internal */
PBRMaterial.SMOOTHNESSSCALE = Shader3D.propertyNameToID("u_SmoothnessScale");
/** @internal */
PBRMaterial.OCCLUSIONTEXTURE = Shader3D.propertyNameToID("u_OcclusionTexture");
/** @internal */
PBRMaterial.OCCLUSIONSTRENGTH = Shader3D.propertyNameToID("u_occlusionStrength");
/** @internal */
PBRMaterial.PARALLAXTEXTURE = Shader3D.propertyNameToID("u_ParallaxTexture");
/** @internal */
PBRMaterial.PARALLAXSCALE = Shader3D.propertyNameToID("u_ParallaxScale");
/** @internal */
PBRMaterial.EMISSIONTEXTURE = Shader3D.propertyNameToID("u_EmissionTexture");
/** @internal */
PBRMaterial.EMISSIONCOLOR = Shader3D.propertyNameToID("u_EmissionColor");
/** @internal */
PBRMaterial.CULL = Shader3D.propertyNameToID("s_Cull");
/** @internal */
PBRMaterial.BLEND = Shader3D.propertyNameToID("s_Blend");
/** @internal */
PBRMaterial.BLEND_SRC = Shader3D.propertyNameToID("s_BlendSrc");
/** @internal */
PBRMaterial.BLEND_DST = Shader3D.propertyNameToID("s_BlendDst");
/** @internal */
PBRMaterial.DEPTH_TEST = Shader3D.propertyNameToID("s_DepthTest");
/** @internal */
PBRMaterial.DEPTH_WRITE = Shader3D.propertyNameToID("s_DepthWrite");
/** 渲染质量。*/
PBRMaterial.renderQuality = PBRRenderQuality.High;
