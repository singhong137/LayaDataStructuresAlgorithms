/**
 * 纹理解码格式。
 */
export var TextureDecodeFormat;
(function (TextureDecodeFormat) {
    /** 常规解码方式,直接采样纹理颜色。*/
    TextureDecodeFormat[TextureDecodeFormat["Normal"] = 0] = "Normal";
    /** 按照RGBM方式解码并计算最终RGB颜色。 */
    TextureDecodeFormat[TextureDecodeFormat["RGBM"] = 1] = "RGBM";
})(TextureDecodeFormat || (TextureDecodeFormat = {}));
