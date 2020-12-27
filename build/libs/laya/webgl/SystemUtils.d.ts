/**
 * 系统工具。
 */
export declare class SystemUtils {
    /** @internal */
    static _maxTextureCount: number;
    /** @internal */
    static _maxTextureSize: number;
    /** @internal */
    static _shaderCapailityLevel: number;
    /**
     * 图形设备支持的最大纹理数量。
     */
    static readonly maxTextureCount: number;
    /**
     * 图形设备支持的最大纹理尺寸。
     */
    static readonly maxTextureSize: number;
    /**
     * 图形设备着色器的大致能力等级,类似于DirectX的shader model概念。
     */
    static readonly shaderCapailityLevel: number;
    /**
     * 是否支持纹理格式。
     * @param format 纹理格式。
     * @returns 是否支持。
     */
    static supportTextureFormat(format: number): boolean;
    /**
     * 是否支持渲染纹理格式。
     * @param format 渲染纹理格式。
     * @returns 是否支持。
     */
    static supportRenderTextureFormat(format: number): boolean;
}
