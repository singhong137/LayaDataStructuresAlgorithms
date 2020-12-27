export var RenderTextureFormat;
(function (RenderTextureFormat) {
    /**RGB格式,每个通道8位。*/
    RenderTextureFormat[RenderTextureFormat["R8G8B8"] = 0] = "R8G8B8";
    /**RGBA格式,每个通道8位。*/
    RenderTextureFormat[RenderTextureFormat["R8G8B8A8"] = 1] = "R8G8B8A8";
    /**Alpha格式,8位。*/
    RenderTextureFormat[RenderTextureFormat["Alpha8"] = 2] = "Alpha8";
    /**RGBA格式,每个通道16位。*/
    RenderTextureFormat[RenderTextureFormat["R16G16B16A16"] = 14] = "R16G16B16A16";
    /**深度格式。*/
    RenderTextureFormat[RenderTextureFormat["Depth"] = 15] = "Depth";
    /**阴影贴图格式格式。*/
    RenderTextureFormat[RenderTextureFormat["ShadowMap"] = 16] = "ShadowMap";
})(RenderTextureFormat || (RenderTextureFormat = {}));
export var RenderTextureDepthFormat;
(function (RenderTextureDepthFormat) {
    /**深度格式_DEPTH_16。*/
    RenderTextureDepthFormat[RenderTextureDepthFormat["DEPTH_16"] = 0] = "DEPTH_16";
    /**深度格式_STENCIL_8。*/
    RenderTextureDepthFormat[RenderTextureDepthFormat["STENCIL_8"] = 1] = "STENCIL_8";
    /**深度格式_DEPTHSTENCIL_24_8。*/
    RenderTextureDepthFormat[RenderTextureDepthFormat["DEPTHSTENCIL_24_8"] = 2] = "DEPTHSTENCIL_24_8";
    /**深度格式_DEPTHSTENCIL_NONE。*/
    RenderTextureDepthFormat[RenderTextureDepthFormat["DEPTHSTENCIL_NONE"] = 3] = "DEPTHSTENCIL_NONE";
    /** @deprecated*/
    RenderTextureDepthFormat[RenderTextureDepthFormat["DEPTHSTENCIL_16_8"] = 2] = "DEPTHSTENCIL_16_8";
})(RenderTextureDepthFormat || (RenderTextureDepthFormat = {}));
