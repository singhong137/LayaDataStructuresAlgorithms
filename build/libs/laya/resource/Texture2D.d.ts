import { Handler } from "../utils/Handler";
import { BaseTexture } from "./BaseTexture";
import { TextureFormat } from "./TextureFormat";
/**
 * <code>Texture2D</code> 类用于生成2D纹理。
 */
export declare class Texture2D extends BaseTexture {
    /**Texture2D资源。*/
    static TEXTURE2D: string;
    /**纯灰色纹理。*/
    static grayTexture: Texture2D;
    /**纯白色纹理。*/
    static whiteTexture: Texture2D;
    /**纯黑色纹理。*/
    static blackTexture: Texture2D;
    /**
     * @internal
     */
    static __init__(): void;
    /**
     * @internal
     */
    static _parse(data: any, propertyParams?: any, constructParams?: any[]): Texture2D;
    /**
     * 加载Texture2D。
     * @param url Texture2D地址。
     * @param complete 完成回掉。
     */
    static load(url: string, complete: Handler): void;
    /** @internal */
    private _canRead;
    /** @internal */
    private _pixels;
    /**
     * @inheritDoc
     * @override
     */
    readonly defaulteTexture: BaseTexture;
    /**
     * 创建一个 <code>Texture2D</code> 实例。
     * @param	width 宽。
     * @param	height 高。
     * @param	format 贴图格式。
     * @param	mipmap 是否生成mipmap。
     * @param	canRead 是否可读像素,如果为true,会在内存保留像素数据。
     */
    constructor(width?: number, height?: number, format?: TextureFormat, mipmap?: boolean, canRead?: boolean);
    /**
     * @internal
     */
    private _gpuCompressFormat;
    /**
     * @internal
     */
    private _setPixels;
    /**
     * @internal
     */
    private _calcualatesCompressedDataSize;
    /**
     * @internal
     */
    private _pharseDDS;
    /**
     * @internal
     */
    private _pharseKTX;
    /**
     * @internal
     */
    private _pharsePVR;
    /**
     * @internal
     */
    _upLoadCompressedTexImage2D(data: ArrayBuffer, width: number, height: number, miplevelCount: number, dataOffset: number, imageSizeOffset: number): void;
    /**
     * 通过图片源填充纹理,可为HTMLImageElement、HTMLCanvasElement、HTMLVideoElement、ImageBitmap、ImageData,
     * 设置之后纹理宽高可能会发生变化。
     */
    loadImageSource(source: any, premultiplyAlpha?: boolean): void;
    /**
     * 通过像素填充纹理。
     * @param	pixels 像素。
     * @param   miplevel 层级。
     */
    setPixels(pixels: Uint8Array | Uint16Array | Float32Array, miplevel?: number): void;
    /**
     * 通过像素填充部分纹理。
     * @param  x X轴像素起点。
     * @param  y Y轴像素起点。
     * @param  width 像素宽度。
     * @param  height 像素高度。
     * @param  pixels 像素数组。
     * @param  miplevel 层级。
     */
    setSubPixels(x: number, y: number, width: number, height: number, pixels: Uint8Array | Uint16Array | Float32Array, miplevel?: number): void;
    /**
     * 通过压缩数据填充纹理。
     * @param	data 压缩数据。
     * @param   miplevel 层级。
     */
    setCompressData(data: ArrayBuffer): void;
    /**
     * 返回图片像素。
     * @return 图片像素。
     */
    getPixels(): Uint8Array | Uint16Array | Float32Array;
}
