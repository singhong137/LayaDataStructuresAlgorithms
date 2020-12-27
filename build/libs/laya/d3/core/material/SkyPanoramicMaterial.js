import { VertexMesh } from "../../graphics/Vertex/VertexMesh";
import { Vector4 } from "../../math/Vector4";
import SkyPanoramicFS from "../../shader/files/SkyPanoramic.fs";
import SkyPanoramicVS from "../../shader/files/SkyPanoramic.vs";
import { Shader3D } from "../../shader/Shader3D";
import { SubShader } from "../../shader/SubShader";
import { Material } from "./Material";
import { TextureDecodeFormat } from "../../../resource/TextureDecodeFormat";
import { BaseTexture } from "../../../resource/BaseTexture";
/**
 * <code>SkyPanoramicMaterial</code> 类用于实现SkyPanoramicMaterial材质。
 */
export class SkyPanoramicMaterial extends Material {
    /**
     * 创建一个 <code>SkyPanoramicMaterial</code> 实例。
     */
    constructor() {
        super();
        /** @internal */
        this._exposure = 1.0;
        /** @internal */
        this._textureDecodeFormat = TextureDecodeFormat.Normal;
        /** @internal */
        this._textureHDRParams = new Vector4(1.0, 0.0, 0.0, 1.0);
        this.setShaderName("SkyPanoramic");
        var shaderValues = this._shaderValues;
        shaderValues.setVector(SkyPanoramicMaterial.TINTCOLOR, new Vector4(0.5, 0.5, 0.5, 0.5));
        shaderValues.setNumber(SkyPanoramicMaterial.ROTATION, 0.0);
        shaderValues.setVector(SkyPanoramicMaterial.TEXTURE_HDR_PARAMS, this._textureHDRParams);
    }
    /**
     * @internal
     */
    static __init__() {
        var attributeMap = {
            'a_Position': VertexMesh.MESH_POSITION0
        };
        var uniformMap = {
            'u_TintColor': Shader3D.PERIOD_MATERIAL,
            'u_TextureHDRParams': Shader3D.PERIOD_MATERIAL,
            'u_Rotation': Shader3D.PERIOD_MATERIAL,
            'u_Texture': Shader3D.PERIOD_MATERIAL,
            'u_ViewProjection': Shader3D.PERIOD_CAMERA
        };
        var shader = Shader3D.add("SkyPanoramic");
        var subShader = new SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(SkyPanoramicVS, SkyPanoramicFS);
    }
    /**
     * 颜色。
     */
    get tintColor() {
        return this._shaderValues.getVector(SkyPanoramicMaterial.TINTCOLOR);
    }
    set tintColor(value) {
        this._shaderValues.setVector(SkyPanoramicMaterial.TINTCOLOR, value);
    }
    /**
     * 曝光强度。
     */
    get exposure() {
        return this._exposure;
    }
    set exposure(value) {
        if (this._exposure !== value) {
            this._exposure = value;
            if (this._textureDecodeFormat == TextureDecodeFormat.RGBM)
                this._textureHDRParams.x = value * BaseTexture._rgbmRange;
            else
                this._textureHDRParams.x = value;
        }
    }
    /**
     * 旋转角度。
     */
    get rotation() {
        return this._shaderValues.getNumber(SkyPanoramicMaterial.ROTATION);
    }
    set rotation(value) {
        this._shaderValues.setNumber(SkyPanoramicMaterial.ROTATION, value);
    }
    /**
     * 全景天空纹理。
     */
    get panoramicTexture() {
        return this._shaderValues.getTexture(SkyPanoramicMaterial.TEXTURE);
    }
    set panoramicTexture(value) {
        this._shaderValues.setTexture(SkyPanoramicMaterial.TEXTURE, value);
    }
    /**
     * 全景天空纹理解码格式。
     */
    get panoramicTextureDecodeFormat() {
        return this._textureDecodeFormat;
    }
    set panoramicTextureDecodeFormat(value) {
        if (this._textureDecodeFormat !== value) {
            this._textureDecodeFormat = value;
            if (value == TextureDecodeFormat.RGBM)
                this._textureHDRParams.x = this._exposure * BaseTexture._rgbmRange;
            else
                this._textureHDRParams.x = this._exposure;
        }
    }
}
SkyPanoramicMaterial.TINTCOLOR = Shader3D.propertyNameToID("u_TintColor");
SkyPanoramicMaterial.EXPOSURE = Shader3D.propertyNameToID("u_Exposure");
SkyPanoramicMaterial.ROTATION = Shader3D.propertyNameToID("u_Rotation");
SkyPanoramicMaterial.TEXTURE = Shader3D.propertyNameToID("u_Texture");
SkyPanoramicMaterial.TEXTURE_HDR_PARAMS = Shader3D.propertyNameToID("u_TextureHDRParams");
