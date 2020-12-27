import { Bitmap } from "./Bitmap";
import { FilterMode } from "./FilterMode";
import { WarpMode } from "./WrapMode";
/**
 * <code>BaseTexture</code> 纹理的父类，抽象类，不允许实例。
 */
export declare class BaseTexture extends Bitmap {
    /** @internal */
    static _rgbmRange: number;
    /** @internal */
    protected _readyed: boolean;
    /** @internal */
    protected _glTextureType: number;
    /** @internal */
    protected _glTexture: any;
    /** @internal */
    protected _format: number;
    /** @internal */
    protected _mipmap: boolean;
    /** @internal */
    protected _wrapModeU: WarpMode;
    /** @internal */
    protected _wrapModeV: WarpMode;
    /** @internal */
    protected _filterMode: FilterMode;
    /** @internal */
    protected _anisoLevel: number;
    /** @internal */
    protected _mipmapCount: number;
    /**
     * 是否使用mipLevel
     */
    readonly mipmap: boolean;
    /**
     * 纹理格式
     */
    readonly format: number;
    /**
     * 纹理横向循环模式。
     */
    wrapModeU: number;
    /**
     * 纹理纵向循环模式。
     */
    wrapModeV: number;
    /**
     * 缩小过滤器
     */
    filterMode: FilterMode;
    /**
     * 各向异性等级
     */
    anisoLevel: number;
    /**
     * 获取mipmap数量。
     */
    readonly mipmapCount: number;
    readonly defaulteTexture: BaseTexture;
    /**
     * 创建一个 <code>BaseTexture</code> 实例。
     */
    constructor(format: number, mipMap: boolean);
    /**
     * @internal
     */
    _getFormatByteCount(): number;
    /**
     * @internal
     */
    protected _isPot(size: number): boolean;
    /**
     * @internal
     */
    protected _getGLFormat(): number;
    /**
     * @internal
     */
    protected _setFilterMode(value: FilterMode): void;
    /**
     * @internal
     */
    protected _setWarpMode(orientation: number, mode: number): void;
    /**
     * @internal
     */
    protected _setAnisotropy(value: number): void;
    /**
     * @inheritDoc
     * @override
     */
    protected _disposeResource(): void;
    /**
     * @internal
     * 获取纹理资源。
     * @override
     */
    _getSource(): any;
    /**
     * 通过基础数据生成mipMap。
     */
    generateMipmap(): void;
    /** @deprecated use TextureFormat.FORMAT_R8G8B8 instead.*/
    static FORMAT_R8G8B8: number;
    /** @deprecated use TextureFormat.FORMAT_R8G8B8A8 instead.*/
    static FORMAT_R8G8B8A8: number;
    /** @deprecated use TextureFormat.FORMAT_ALPHA8 instead.*/
    static FORMAT_ALPHA8: number;
    /** @deprecated use TextureFormat.FORMAT_DXT1 instead.*/
    static FORMAT_DXT1: number;
    /** @deprecated use TextureFormat.FORMAT_DXT5 instead.*/
    static FORMAT_DXT5: number;
    /** @deprecated use TextureFormat.FORMAT_ETC1RGB instead.*/
    static FORMAT_ETC1RGB: number;
    /** @deprecated use TextureFormat.FORMAT_PVRTCRGB_2BPPV instead.*/
    static FORMAT_PVRTCRGB_2BPPV: number;
    /** @deprecated use TextureFormat.FORMAT_PVRTCRGBA_2BPPV instead.*/
    static FORMAT_PVRTCRGBA_2BPPV: number;
    /** @deprecated use TextureFormat.FORMAT_PVRTCRGB_4BPPV instead.*/
    static FORMAT_PVRTCRGB_4BPPV: number;
    /** @deprecated use TextureFormat.FORMAT_PVRTCRGBA_4BPPV instead.*/
    static FORMAT_PVRTCRGBA_4BPPV: number;
    /** @deprecated use RenderTextureFormat.R16G16B16A16 instead.*/
    static RENDERTEXTURE_FORMAT_RGBA_HALF_FLOAT: number;
    /** @deprecated use TextureFormat.R32G32B32A32 instead.*/
    static FORMAT_R32G32B32A32: number;
    /** @deprecated use RenderTextureDepthFormat.DEPTH_16 instead.*/
    static FORMAT_DEPTH_16: number;
    /** @deprecated use RenderTextureDepthFormat.STENCIL_8 instead.*/
    static FORMAT_STENCIL_8: number;
    /** @deprecated use RenderTextureDepthFormat.DEPTHSTENCIL_16_8 instead.*/
    static FORMAT_DEPTHSTENCIL_16_8: number;
    /** @deprecated use RenderTextureDepthFormat.DEPTHSTENCIL_NONE instead.*/
    static FORMAT_DEPTHSTENCIL_NONE: number;
    /** @deprecated use FilterMode.Point instead.*/
    static FILTERMODE_POINT: number;
    /** @deprecated use FilterMode.Bilinear instead.*/
    static FILTERMODE_BILINEAR: number;
    /** @deprecated use FilterMode.Trilinear instead.*/
    static FILTERMODE_TRILINEAR: number;
    /** @deprecated use WarpMode.Repeat instead.*/
    static WARPMODE_REPEAT: number;
    /** @deprecated use WarpMode.Clamp instead.*/
    static WARPMODE_CLAMP: number;
}
