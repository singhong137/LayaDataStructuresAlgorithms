import { Texture2D } from "../../../resource/Texture2D";
import { Vector4 } from "../../math/Vector4";
import { Material } from "./Material";
import { TextureDecodeFormat } from "../../../resource/TextureDecodeFormat";
/**
 * <code>SkyPanoramicMaterial</code> 类用于实现SkyPanoramicMaterial材质。
 */
export declare class SkyPanoramicMaterial extends Material {
    static TINTCOLOR: number;
    static EXPOSURE: number;
    static ROTATION: number;
    static TEXTURE: number;
    static TEXTURE_HDR_PARAMS: number;
    /**
     * @internal
     */
    static __init__(): void;
    /** @internal */
    private _exposure;
    /** @internal */
    private _textureDecodeFormat;
    /** @internal */
    private _textureHDRParams;
    /**
     * 颜色。
     */
    tintColor: Vector4;
    /**
     * 曝光强度。
     */
    exposure: number;
    /**
     * 旋转角度。
     */
    rotation: number;
    /**
     * 全景天空纹理。
     */
    panoramicTexture: Texture2D;
    /**
     * 全景天空纹理解码格式。
     */
    panoramicTextureDecodeFormat: TextureDecodeFormat;
    /**
     * 创建一个 <code>SkyPanoramicMaterial</code> 实例。
     */
    constructor();
}
