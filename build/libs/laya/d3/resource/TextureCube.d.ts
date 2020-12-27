import { Handler } from "../../utils/Handler";
import { BaseTexture } from "../../resource/BaseTexture";
export declare enum TextureCubeFace {
    PositiveX = 0,
    NegativeX = 1,
    PositiveY = 2,
    NegativeY = 3,
    PositiveZ = 4,
    NegativeZ = 5
}
/**
 * <code>TextureCube</code> 类用于生成立方体纹理。
 */
export declare class TextureCube extends BaseTexture {
    /**TextureCube资源。*/
    static TEXTURECUBE: string;
    /**@private*/
    private static _blackTexture;
    /**@private*/
    private static _grayTexture;
    /**
     * 黑色纯色纹理。
     */
    static readonly blackTexture: TextureCube;
    /**
     * 灰色纯色纹理。
     */
    static readonly grayTexture: TextureCube;
    /**
     * @internal
     */
    static __init__(): void;
    /**
     * @inheritDoc
     */
    static _parse(data: any, propertyParams?: any, constructParams?: any[]): TextureCube;
    /**
     * @inheritDoc
     */
    static _parseBin(data: any, propertyParams?: any, constructParams?: any[]): TextureCube;
    /**
     * 加载TextureCube。
     * @param url TextureCube地址。
     * @param complete 完成回调。
     */
    static load(url: string, complete: Handler): void;
    /**
     * @inheritDoc
     * @override
     */
    readonly defaulteTexture: BaseTexture;
    /**
     * 创建一个 <code>TextureCube</code> 实例。
     * @param	format 贴图格式。
     * @param	mipmap 是否生成mipmap。
     */
    constructor(size: number, format?: number, mipmap?: boolean);
    /**
    * @private
    */
    private _setPixels;
    /**
     * 通过六张图片源填充纹理。
     * @param 图片源数组。
     */
    setSixSideImageSources(source: any[], premultiplyAlpha?: boolean): void;
    /**
     * 通过六张图片源填充纹理。
     * @param 图片源数组。
     */
    setSixSidePixels(pixels: Array<Uint8Array>, miplevel?: number): void;
    /**
     * 通过图源设置一个面的颜色。
     * @param face 面。
     * @param imageSource 图源。
     * @param miplevel 层级。
     */
    setImageSource(face: TextureCubeFace, imageSource: HTMLImageElement | HTMLCanvasElement, miplevel?: number): void;
}
