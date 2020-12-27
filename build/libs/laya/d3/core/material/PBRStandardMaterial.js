import { VertexMesh } from "../../graphics/Vertex/VertexMesh";
import PBRPS from "../../shader/files/PBR.fs";
import PBRVS from "../../shader/files/PBR.vs";
import PBRShadowCasterPS from "../../shader/files/PBRShadowCaster.fs";
import PBRShadowCasterVS from "../../shader/files/PBRShadowCaster.vs";
import { Shader3D } from "../../shader/Shader3D";
import { SubShader } from "../../shader/SubShader";
import { PBRMaterial } from "./PBRMaterial";
/**
 * 金属度PBR材质光滑度数据源。
 */
export var PBRMetallicSmoothnessSource;
(function (PBRMetallicSmoothnessSource) {
    /**金属度贴图的Alpha通道。*/
    PBRMetallicSmoothnessSource[PBRMetallicSmoothnessSource["MetallicGlossTextureAlpha"] = 0] = "MetallicGlossTextureAlpha";
    /**反射率贴图的Alpha通道。*/
    PBRMetallicSmoothnessSource[PBRMetallicSmoothnessSource["AlbedoTextureAlpha"] = 1] = "AlbedoTextureAlpha";
})(PBRMetallicSmoothnessSource || (PBRMetallicSmoothnessSource = {}));
/**
 * <code>PBRStandardMaterial</code> 类用于实现PBR材质。
 */
export class PBRStandardMaterial extends PBRMaterial {
    /**
     * 创建一个 <code>PBRStandardMaterial</code> 实例。
     */
    constructor() {
        super();
        /** @internal */
        this._smoothnessSource = 0;
        this.setShaderName("PBR");
        this._shaderValues.setNumber(PBRStandardMaterial.METALLIC, 0.0);
    }
    /**
     * @internal
     */
    static __init__() {
        PBRStandardMaterial.SHADERDEFINE_METALLICGLOSSTEXTURE = Shader3D.getDefineByName("METALLICGLOSSTEXTURE");
        PBRStandardMaterial.SHADERDEFINE_SMOOTHNESSSOURCE_ALBEDOTEXTURE_ALPHA = Shader3D.getDefineByName("SMOOTHNESSSOURCE_ALBEDOTEXTURE_ALPHA");
        var attributeMap = {
            'a_Position': VertexMesh.MESH_POSITION0,
            'a_Normal': VertexMesh.MESH_NORMAL0,
            'a_Tangent0': VertexMesh.MESH_TANGENT0,
            'a_Texcoord0': VertexMesh.MESH_TEXTURECOORDINATE0,
            'a_Texcoord1': VertexMesh.MESH_TEXTURECOORDINATE1,
            'a_BoneWeights': VertexMesh.MESH_BLENDWEIGHT0,
            'a_BoneIndices': VertexMesh.MESH_BLENDINDICES0,
            'a_MvpMatrix': VertexMesh.MESH_MVPMATRIX_ROW0,
            'a_WorldMat': VertexMesh.MESH_WORLDMATRIX_ROW0
        };
        var uniformMap = {
            'u_Bones': Shader3D.PERIOD_CUSTOM,
            'u_MvpMatrix': Shader3D.PERIOD_SPRITE,
            'u_WorldMat': Shader3D.PERIOD_SPRITE,
            'u_LightmapScaleOffset': Shader3D.PERIOD_SPRITE,
            'u_LightMap': Shader3D.PERIOD_SPRITE,
            'u_LightMapDirection': Shader3D.PERIOD_SPRITE,
            'u_CameraPos': Shader3D.PERIOD_CAMERA,
            'u_View': Shader3D.PERIOD_CAMERA,
            'u_ProjectionParams': Shader3D.PERIOD_CAMERA,
            'u_Viewport': Shader3D.PERIOD_CAMERA,
            'u_ViewProjection': Shader3D.PERIOD_CAMERA,
            'u_AlphaTestValue': Shader3D.PERIOD_MATERIAL,
            'u_AlbedoColor': Shader3D.PERIOD_MATERIAL,
            'u_EmissionColor': Shader3D.PERIOD_MATERIAL,
            'u_AlbedoTexture': Shader3D.PERIOD_MATERIAL,
            'u_NormalTexture': Shader3D.PERIOD_MATERIAL,
            'u_ParallaxTexture': Shader3D.PERIOD_MATERIAL,
            'u_OcclusionTexture': Shader3D.PERIOD_MATERIAL,
            'u_EmissionTexture': Shader3D.PERIOD_MATERIAL,
            'u_Smoothness': Shader3D.PERIOD_MATERIAL,
            'u_SmoothnessScale': Shader3D.PERIOD_MATERIAL,
            'u_occlusionStrength': Shader3D.PERIOD_MATERIAL,
            'u_NormalScale': Shader3D.PERIOD_MATERIAL,
            'u_ParallaxScale': Shader3D.PERIOD_MATERIAL,
            'u_TilingOffset': Shader3D.PERIOD_MATERIAL,
            'u_MetallicGlossTexture': Shader3D.PERIOD_MATERIAL,
            'u_Metallic': Shader3D.PERIOD_MATERIAL,
            'u_ReflectTexture': Shader3D.PERIOD_SCENE,
            'u_ReflectIntensity': Shader3D.PERIOD_SCENE,
            'u_AmbientColor': Shader3D.PERIOD_SCENE,
            'u_FogStart': Shader3D.PERIOD_SCENE,
            'u_FogRange': Shader3D.PERIOD_SCENE,
            'u_FogColor': Shader3D.PERIOD_SCENE,
            'u_DirationLightCount': Shader3D.PERIOD_SCENE,
            'u_LightBuffer': Shader3D.PERIOD_SCENE,
            'u_LightClusterBuffer': Shader3D.PERIOD_SCENE,
            //Shadow
            'u_ShadowBias': Shader3D.PERIOD_SCENE,
            'u_ShadowLightDirection': Shader3D.PERIOD_SCENE,
            'u_ShadowMap': Shader3D.PERIOD_SCENE,
            'u_ShadowParams': Shader3D.PERIOD_SCENE,
            'u_ShadowSplitSpheres': Shader3D.PERIOD_SCENE,
            'u_ShadowMatrices': Shader3D.PERIOD_SCENE,
            'u_ShadowMapSize': Shader3D.PERIOD_SCENE,
            //GI
            'u_AmbientSHAr': Shader3D.PERIOD_SCENE,
            'u_AmbientSHAg': Shader3D.PERIOD_SCENE,
            'u_AmbientSHAb': Shader3D.PERIOD_SCENE,
            'u_AmbientSHBr': Shader3D.PERIOD_SCENE,
            'u_AmbientSHBg': Shader3D.PERIOD_SCENE,
            'u_AmbientSHBb': Shader3D.PERIOD_SCENE,
            'u_AmbientSHC': Shader3D.PERIOD_SCENE,
            'u_ReflectionProbe': Shader3D.PERIOD_SCENE,
            'u_ReflectCubeHDRParams': Shader3D.PERIOD_SCENE,
            //legacy lighting
            'u_DirectionLight.direction': Shader3D.PERIOD_SCENE,
            'u_DirectionLight.color': Shader3D.PERIOD_SCENE,
            'u_PointLight.position': Shader3D.PERIOD_SCENE,
            'u_PointLight.range': Shader3D.PERIOD_SCENE,
            'u_PointLight.color': Shader3D.PERIOD_SCENE,
            'u_SpotLight.position': Shader3D.PERIOD_SCENE,
            'u_SpotLight.direction': Shader3D.PERIOD_SCENE,
            'u_SpotLight.range': Shader3D.PERIOD_SCENE,
            'u_SpotLight.spot': Shader3D.PERIOD_SCENE,
            'u_SpotLight.color': Shader3D.PERIOD_SCENE
        };
        var stateMap = {
            's_Cull': Shader3D.RENDER_STATE_CULL,
            's_Blend': Shader3D.RENDER_STATE_BLEND,
            's_BlendSrc': Shader3D.RENDER_STATE_BLEND_SRC,
            's_BlendDst': Shader3D.RENDER_STATE_BLEND_DST,
            's_DepthTest': Shader3D.RENDER_STATE_DEPTH_TEST,
            's_DepthWrite': Shader3D.RENDER_STATE_DEPTH_WRITE
        };
        var shader = Shader3D.add("PBR");
        var subShader = new SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(PBRVS, PBRPS, stateMap, "Forward");
        subShader.addShaderPass(PBRShadowCasterVS, PBRShadowCasterPS, stateMap, "ShadowCaster");
    }
    /**
     * 金属光滑度贴图。
     */
    get metallicGlossTexture() {
        return this._shaderValues.getTexture(PBRStandardMaterial.METALLICGLOSSTEXTURE);
    }
    set metallicGlossTexture(value) {
        if (value)
            this._shaderValues.addDefine(PBRStandardMaterial.SHADERDEFINE_METALLICGLOSSTEXTURE);
        else
            this._shaderValues.removeDefine(PBRStandardMaterial.SHADERDEFINE_METALLICGLOSSTEXTURE);
        this._shaderValues.setTexture(PBRStandardMaterial.METALLICGLOSSTEXTURE, value);
    }
    /**
     * 获取金属度,范围为0到1。
     */
    get metallic() {
        return this._shaderValues.getNumber(PBRStandardMaterial.METALLIC);
    }
    set metallic(value) {
        this._shaderValues.setNumber(PBRStandardMaterial.METALLIC, Math.max(0.0, Math.min(1.0, value)));
    }
    /**
     * 光滑度数据源,0或1。
     */
    get smoothnessSource() {
        return this._smoothnessSource;
    }
    set smoothnessSource(value) {
        if (value)
            this._shaderValues.addDefine(PBRStandardMaterial.SHADERDEFINE_SMOOTHNESSSOURCE_ALBEDOTEXTURE_ALPHA);
        else
            this._shaderValues.removeDefine(PBRStandardMaterial.SHADERDEFINE_SMOOTHNESSSOURCE_ALBEDOTEXTURE_ALPHA);
        this._smoothnessSource = value;
    }
    /**
     * 克隆。
     * @return	 克隆副本。
     * @override
     */
    clone() {
        var dest = new PBRStandardMaterial();
        this.cloneTo(dest);
        return dest;
    }
}
/** @internal */
PBRStandardMaterial.METALLICGLOSSTEXTURE = Shader3D.propertyNameToID("u_MetallicGlossTexture");
/** @internal */
PBRStandardMaterial.METALLIC = Shader3D.propertyNameToID("u_Metallic");
