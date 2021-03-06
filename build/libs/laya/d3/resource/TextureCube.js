import { Render } from "../../renders/Render";
import { WebGLContext } from "../../webgl/WebGLContext";
import { BaseTexture } from "../../resource/BaseTexture";
import { LayaGL } from "../../layagl/LayaGL";
import { ILaya } from "../../../ILaya";
import { TextureFormat } from "../../resource/TextureFormat";
export var TextureCubeFace;
(function (TextureCubeFace) {
    TextureCubeFace[TextureCubeFace["PositiveX"] = 0] = "PositiveX";
    TextureCubeFace[TextureCubeFace["NegativeX"] = 1] = "NegativeX";
    TextureCubeFace[TextureCubeFace["PositiveY"] = 2] = "PositiveY";
    TextureCubeFace[TextureCubeFace["NegativeY"] = 3] = "NegativeY";
    TextureCubeFace[TextureCubeFace["PositiveZ"] = 4] = "PositiveZ";
    TextureCubeFace[TextureCubeFace["NegativeZ"] = 5] = "NegativeZ";
})(TextureCubeFace || (TextureCubeFace = {}));
/**
 * <code>TextureCube</code> 类用于生成立方体纹理。
 */
export class TextureCube extends BaseTexture {
    /**
     * 创建一个 <code>TextureCube</code> 实例。
     * @param	format 贴图格式。
     * @param	mipmap 是否生成mipmap。
     */
    constructor(size, format = TextureFormat.R8G8B8, mipmap = false) {
        super(format, mipmap);
        this._glTextureType = LayaGL.instance.TEXTURE_CUBE_MAP;
        this._width = size;
        this._height = size;
        var gl = LayaGL.instance;
        this._setWarpMode(gl.TEXTURE_WRAP_S, this._wrapModeU);
        this._setWarpMode(gl.TEXTURE_WRAP_T, this._wrapModeV);
        this._setFilterMode(this._filterMode);
        this._setAnisotropy(this._anisoLevel);
        if (this._mipmap) {
            this._mipmapCount = Math.ceil(Math.log2(size)) + 1;
            for (var i = 0; i < this._mipmapCount; i++)
                this._setPixels([], i, Math.max(size >> i, 1), Math.max(size >> i, 1)); //初始化各级mipmap
            this._setGPUMemory(size * size * 4 * (1 + 1 / 3) * 6);
        }
        else {
            this._mipmapCount = 1;
            this._setGPUMemory(size * size * 4 * 6);
        }
    }
    /**
     * 黑色纯色纹理。
     */
    static get blackTexture() {
        return TextureCube._blackTexture;
    }
    /**
     * 灰色纯色纹理。
     */
    static get grayTexture() {
        return TextureCube._grayTexture;
    }
    /**
     * @internal
     */
    static __init__() {
        var blackTexture = new TextureCube(1, TextureFormat.R8G8B8, false);
        var grayTexture = new TextureCube(1, TextureFormat.R8G8B8, false);
        var pixels = new Uint8Array(3);
        pixels[0] = 0, pixels[1] = 0, pixels[2] = 0;
        blackTexture.setSixSidePixels([pixels, pixels, pixels, pixels, pixels, pixels]);
        blackTexture.lock = true; //锁住资源防止被资源管理释放
        pixels[0] = 128, pixels[1] = 128, pixels[2] = 128;
        grayTexture.setSixSidePixels([pixels, pixels, pixels, pixels, pixels, pixels]);
        grayTexture.lock = true; //锁住资源防止被资源管理释放
        TextureCube._grayTexture = grayTexture;
        TextureCube._blackTexture = blackTexture;
    }
    /**
     * @inheritDoc
     */
    static _parse(data, propertyParams = null, constructParams = null) {
        var texture = constructParams ? new TextureCube(0, constructParams[0], constructParams[1]) : new TextureCube(0);
        texture.setSixSideImageSources(data);
        return texture;
    }
    /**
     * @inheritDoc
     */
    static _parseBin(data, propertyParams = null, constructParams = null) {
        var texture = constructParams ? new TextureCube(0, constructParams[0], constructParams[1]) : new TextureCube(0);
        texture.setSixSideImageSources(data);
        return texture;
    }
    /**
     * 加载TextureCube。
     * @param url TextureCube地址。
     * @param complete 完成回调。
     */
    static load(url, complete) {
        ILaya.loader.create(url, complete, null, TextureCube.TEXTURECUBE);
    }
    /**
     * @inheritDoc
     * @override
     */
    get defaulteTexture() {
        return TextureCube.grayTexture;
    }
    /**
    * @private
    */
    _setPixels(pixels, miplevel, width, height) {
        var gl = LayaGL.instance;
        var glFormat = this._getGLFormat();
        WebGLContext.bindTexture(gl, this._glTextureType, this._glTexture);
        if (this.format === TextureFormat.R8G8B8) {
            gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1); //字节对齐
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, miplevel, glFormat, width, height, 0, glFormat, gl.UNSIGNED_BYTE, pixels[0]); //back
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, miplevel, glFormat, width, height, 0, glFormat, gl.UNSIGNED_BYTE, pixels[1]); //front
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, miplevel, glFormat, width, height, 0, glFormat, gl.UNSIGNED_BYTE, pixels[2]); //right
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, miplevel, glFormat, width, height, 0, glFormat, gl.UNSIGNED_BYTE, pixels[3]); //left
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, miplevel, glFormat, width, height, 0, glFormat, gl.UNSIGNED_BYTE, pixels[4]); //up
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, miplevel, glFormat, width, height, 0, glFormat, gl.UNSIGNED_BYTE, pixels[5]); //down
            gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
        }
        else {
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, miplevel, glFormat, width, height, 0, glFormat, gl.UNSIGNED_BYTE, pixels[0]); //back
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, miplevel, glFormat, width, height, 0, glFormat, gl.UNSIGNED_BYTE, pixels[1]); //front
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, miplevel, glFormat, width, height, 0, glFormat, gl.UNSIGNED_BYTE, pixels[2]); //right
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, miplevel, glFormat, width, height, 0, glFormat, gl.UNSIGNED_BYTE, pixels[3]); //left
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, miplevel, glFormat, width, height, 0, glFormat, gl.UNSIGNED_BYTE, pixels[4]); //up
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, miplevel, glFormat, width, height, 0, glFormat, gl.UNSIGNED_BYTE, pixels[5]); //down
        }
    }
    /**
     * 通过六张图片源填充纹理。
     * @param 图片源数组。
     */
    setSixSideImageSources(source, premultiplyAlpha = false) {
        var width;
        var height;
        for (var i = 0; i < 6; i++) {
            var img = source[i];
            if (!img) { //TODO:
                console.log("TextureCube: image Source can't be null.");
                return;
            }
            var nextWidth = img.width;
            var nextHeight = img.height;
            if (i > 0) {
                if (width !== nextWidth) {
                    console.log("TextureCube: each side image's width and height must same.");
                    return;
                }
            }
            width = nextWidth;
            height = nextHeight;
            if (width !== height) {
                console.log("TextureCube: each side image's width and height must same.");
                return;
            }
        }
        this._width = width;
        this._height = height;
        var gl = LayaGL.instance;
        WebGLContext.bindTexture(gl, this._glTextureType, this._glTexture);
        var glFormat = this._getGLFormat();
        if (!Render.isConchApp) {
            (premultiplyAlpha) && (gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true));
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, glFormat, glFormat, gl.UNSIGNED_BYTE, source[0]); //back
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, glFormat, glFormat, gl.UNSIGNED_BYTE, source[1]); //front
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, glFormat, glFormat, gl.UNSIGNED_BYTE, source[2]); //right
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, glFormat, glFormat, gl.UNSIGNED_BYTE, source[3]); //left
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, glFormat, glFormat, gl.UNSIGNED_BYTE, source[4]); //up
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, glFormat, glFormat, gl.UNSIGNED_BYTE, source[5]); //down
            (premultiplyAlpha) && (gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false));
        }
        else {
            if (premultiplyAlpha == true) {
                for (var j = 0; j < 6; j++)
                    source[j].setPremultiplyAlpha(premultiplyAlpha);
            }
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source[0]); //back
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source[1]); //front
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source[2]); //right
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source[3]); //left
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source[4]); //up
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source[5]); //down
        }
        if (this._mipmap && this._isPot(width) && this._isPot(height)) {
            gl.generateMipmap(this._glTextureType);
            this._setGPUMemory(width * height * 4 * (1 + 1 / 3) * 6);
        }
        else {
            this._setGPUMemory(width * height * 4 * 6);
        }
        this._setWarpMode(gl.TEXTURE_WRAP_S, this._wrapModeU);
        this._setWarpMode(gl.TEXTURE_WRAP_T, this._wrapModeV);
        this._setFilterMode(this._filterMode);
        this._readyed = true;
        this._activeResource();
    }
    /**
     * 通过六张图片源填充纹理。
     * @param 图片源数组。
     */
    setSixSidePixels(pixels, miplevel = 0) {
        if (!pixels)
            throw new Error("TextureCube:pixels can't be null.");
        var width = Math.max(this._width >> miplevel, 1);
        var height = Math.max(this._height >> miplevel, 1);
        var pixelsCount = width * height * this._getFormatByteCount();
        if (pixels[0].length < pixelsCount) //TODO:只判断了0层
            throw "TextureCube:pixels length should at least " + pixelsCount + ".";
        this._setPixels(pixels, miplevel, width, height);
        if (miplevel === 0) {
            var gl = LayaGL.instance;
            this._setWarpMode(gl.TEXTURE_WRAP_S, this._wrapModeU);
            this._setWarpMode(gl.TEXTURE_WRAP_T, this._wrapModeV);
        }
        this._readyed = true;
        this._activeResource();
    }
    /**
     * 通过图源设置一个面的颜色。
     * @param face 面。
     * @param imageSource 图源。
     * @param miplevel 层级。
     */
    setImageSource(face, imageSource, miplevel = 0) {
        var width = this._width;
        var height = this._height;
        if (imageSource) { //if is null will clear the face data
            if (width !== imageSource.width || height !== imageSource.height) {
                console.log("TextureCube: imageSource's width and height must same.");
                return;
            }
        }
        var gl = LayaGL.instance;
        WebGLContext.bindTexture(gl, this._glTextureType, this._glTexture);
        var glFormat = this._getGLFormat();
        switch (face) {
            case TextureCubeFace.NegativeX:
                gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, miplevel, glFormat, glFormat, gl.UNSIGNED_BYTE, imageSource); //left
                break;
            case TextureCubeFace.PositiveX:
                gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, miplevel, glFormat, glFormat, gl.UNSIGNED_BYTE, imageSource); //right
                break;
            case TextureCubeFace.NegativeY:
                gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, miplevel, glFormat, glFormat, gl.UNSIGNED_BYTE, imageSource); //down
                break;
            case TextureCubeFace.PositiveY:
                gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, miplevel, glFormat, glFormat, gl.UNSIGNED_BYTE, imageSource); //up
                break;
            case TextureCubeFace.NegativeZ:
                gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, miplevel, glFormat, glFormat, gl.UNSIGNED_BYTE, imageSource); //front
                break;
            case TextureCubeFace.PositiveZ:
                gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, miplevel, glFormat, glFormat, gl.UNSIGNED_BYTE, imageSource); //back
                break;
        }
        //TODO:
        if (this._mipmap && this._isPot(width) && this._isPot(height)) {
            gl.generateMipmap(this._glTextureType);
            this._setGPUMemory(width * height * 4 * (1 + 1 / 3) * 6);
        }
        else {
            this._setGPUMemory(width * height * 4 * 6);
        }
        this._setWarpMode(gl.TEXTURE_WRAP_S, this._wrapModeU);
        this._setWarpMode(gl.TEXTURE_WRAP_T, this._wrapModeV);
        this._setFilterMode(this._filterMode);
        this._readyed = true;
    }
}
/**TextureCube资源。*/
TextureCube.TEXTURECUBE = "TEXTURECUBE";
