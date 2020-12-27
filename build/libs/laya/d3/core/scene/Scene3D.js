import { Config3D } from "../../../../Config3D";
import { ILaya } from "../../../../ILaya";
import { Sprite } from "../../../display/Sprite";
import { LayaGL } from "../../../layagl/LayaGL";
import { Loader } from "../../../net/Loader";
import { URL } from "../../../net/URL";
import { Render } from "../../../renders/Render";
import { Context } from "../../../resource/Context";
import { RenderTextureDepthFormat } from "../../../resource/RenderTextureFormat";
import { TextureDecodeFormat } from "../../../resource/TextureDecodeFormat";
import { SubmitBase } from "../../../webgl/submit/SubmitBase";
import { SubmitKey } from "../../../webgl/submit/SubmitKey";
import { WebGLContext } from "../../../webgl/WebGLContext";
import { Animator } from "../../component/Animator";
import { SimpleSingletonList } from "../../component/SimpleSingletonList";
import { FrustumCulling } from "../../graphics/FrustumCulling";
import { Cluster } from "../../graphics/renderPath/Cluster";
import { SphericalHarmonicsL2 } from "../../graphics/SphericalHarmonicsL2";
import { Input3D } from "../../Input3D";
import { Vector3 } from "../../math/Vector3";
import { Vector4 } from "../../math/Vector4";
import { Physics3D } from "../../physics/Physics3D";
import { PhysicsComponent } from "../../physics/PhysicsComponent";
import { PhysicsSettings } from "../../physics/PhysicsSettings";
import { PhysicsSimulation } from "../../physics/PhysicsSimulation";
import { SkyBox } from "../../resource/models/SkyBox";
import { SkyDome } from "../../resource/models/SkyDome";
import { SkyRenderer } from "../../resource/models/SkyRenderer";
import { TextureCube } from "../../resource/TextureCube";
import { Shader3D } from "../../shader/Shader3D";
import { ShaderData } from "../../shader/ShaderData";
import { Utils3D } from "../../utils/Utils3D";
import { CameraClearFlags } from "../Camera";
import { AlternateLightQueue, DirectionLightQueue, LightQueue } from "../light/LightQueue";
import { Material } from "../material/Material";
import { PBRMaterial } from "../material/PBRMaterial";
import { PBRRenderQuality } from "../material/PBRRenderQuality";
import { RenderState } from "../material/RenderState";
import { PixelLineMaterial } from "../pixelLine/PixelLineMaterial";
import { PixelLineSprite3D } from "../pixelLine/PixelLineSprite3D";
import { RenderQueue } from "../render/RenderQueue";
import { BoundsOctree } from "./BoundsOctree";
import { Lightmap } from "./Lightmap";
import { Scene3DShaderDeclaration } from "./Scene3DShaderDeclaration";
import { ShadowCasterPass } from "../../shadowMap/ShadowCasterPass";
import { DefineDatas } from "../../shader/DefineDatas";
/**
 * 环境光模式
 */
export var AmbientMode;
(function (AmbientMode) {
    /** 固定颜色。*/
    AmbientMode[AmbientMode["SolidColor"] = 0] = "SolidColor";
    /** 球谐光照,例如通过天空盒生成的球谐数据。 */
    AmbientMode[AmbientMode["SphericalHarmonics"] = 1] = "SphericalHarmonics";
})(AmbientMode || (AmbientMode = {}));
/**
 * 用于实现3D场景。
 */
export class Scene3D extends Sprite {
    /**
     * 创建一个 <code>Scene3D</code> 实例。
     */
    constructor() {
        super();
        /** @internal */
        this._lightCount = 0;
        /** @internal */
        this._pointLights = new LightQueue();
        /** @internal */
        this._spotLights = new LightQueue();
        /** @internal */
        this._directionLights = new DirectionLightQueue();
        /** @internal */
        this._alternateLights = new AlternateLightQueue();
        /** @internal */
        this._lightmaps = [];
        /** @internal */
        this._skyRenderer = new SkyRenderer();
        /** @internal */
        this._input = new Input3D();
        /** @internal */
        this._timer = ILaya.timer;
        /** @internal */
        this._time = 0;
        /** @internal */
        this._shCoefficients = new Array(7);
        /** @internal */
        this._ambientMode = AmbientMode.SolidColor;
        /** @internal */
        this._ambientSphericalHarmonics = new SphericalHarmonicsL2();
        /** @internal */
        this._ambientSphericalHarmonicsIntensity = 1.0;
        /** @internal */
        this._reflectionDecodeFormat = TextureDecodeFormat.Normal;
        /** @internal */
        this._reflectionIntensity = 1.0;
        /** @internal 只读,不允许修改。*/
        this._collsionTestList = [];
        /** @internal */
        this._renders = new SimpleSingletonList();
        /** @internal */
        this._opaqueQueue = new RenderQueue(false);
        /** @internal */
        this._transparentQueue = new RenderQueue(true);
        /** @internal */
        this._cameraPool = [];
        /** @internal */
        this._animatorPool = new SimpleSingletonList();
        /** @internal */
        this._scriptPool = new Array();
        /** @internal */
        this._tempScriptPool = new Array();
        /** @internal */
        this._needClearScriptPool = false;
        /**	@internal */
        this._reflectionCubeHDRParams = new Vector4();
        /** 当前创建精灵所属遮罩层。*/
        this.currentCreationLayer = Math.pow(2, 0);
        /** 是否启用灯光。*/
        this.enableLight = true;
        /** @internal */
        this._key = new SubmitKey();
        /** @internal [Editer]*/
        this._pickIdToSprite = new Object();
        /** @internal */
        this._reflectionMode = 0;
        if (Physics3D._enablePhysics)
            this._physicsSimulation = new PhysicsSimulation(Scene3D.physicsSettings);
        this._shaderValues = new ShaderData(null);
        this.enableFog = false;
        this.fogStart = 300;
        this.fogRange = 1000;
        this.fogColor = new Vector3(0.7, 0.7, 0.7);
        this.ambientColor = new Vector3(0.212, 0.227, 0.259);
        this.reflectionIntensity = 1.0;
        this.reflection = TextureCube.blackTexture;
        for (var i = 0; i < 7; i++)
            this._shCoefficients[i] = new Vector4();
        this._shaderValues.setVector(Scene3D.REFLECTIONCUBE_HDR_PARAMS, this._reflectionCubeHDRParams);
        if (Render.supportWebGLPlusCulling) { //[NATIVE]
            this._cullingBufferIndices = new Int32Array(1024);
            this._cullingBufferResult = new Int32Array(1024);
        }
        //this._shaderValues.setTexture(Scene3D.RANGEATTENUATIONTEXTURE, ShaderInit3D._rangeAttenTex);//TODO:
        //var angleAttenTex:Texture2D = Texture2D.buildTexture2D(64, 64, BaseTexture.FORMAT_Alpha8, TextureGenerator.haloTexture);
        //_shaderValues.setTexture(Scene3D.ANGLEATTENUATIONTEXTURE, angleAttenTex);
        this._scene = this;
        this._input.__init__(Render.canvas, this);
        if (Scene3D.octreeCulling)
            this._octree = new BoundsOctree(Scene3D.octreeInitialSize, Scene3D.octreeInitialCenter, Scene3D.octreeMinNodeSize, Scene3D.octreeLooseness);
        if (FrustumCulling.debugFrustumCulling) {
            this._debugTool = new PixelLineSprite3D();
            var lineMaterial = new PixelLineMaterial();
            lineMaterial.renderQueue = Material.RENDERQUEUE_TRANSPARENT;
            lineMaterial.alphaTest = false;
            lineMaterial.depthWrite = false;
            lineMaterial.cull = RenderState.CULL_BACK;
            lineMaterial.blend = RenderState.BLEND_ENABLE_ALL;
            lineMaterial.blendSrc = RenderState.BLENDPARAM_SRC_ALPHA;
            lineMaterial.blendDst = RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
            lineMaterial.depthTest = RenderState.DEPTHTEST_LESS;
            this._debugTool.pixelLineRenderer.sharedMaterial = lineMaterial;
        }
    }
    /**
     * @internal
     */
    static __init__() {
        var con = Config3D._config;
        var multiLighting = con._multiLighting;
        if (multiLighting) {
            const width = 4;
            var maxLightCount = con.maxLightCount;
            var clusterSlices = con.lightClusterCount;
            Cluster.instance = new Cluster(clusterSlices.x, clusterSlices.y, clusterSlices.z, Math.min(con.maxLightCount, con._maxAreaLightCountPerClusterAverage));
            Scene3D._lightTexture = Utils3D._createFloatTextureBuffer(width, maxLightCount);
            Scene3D._lightTexture.lock = true;
            Scene3D._lightPixles = new Float32Array(maxLightCount * width * 4);
        }
        Scene3DShaderDeclaration.SHADERDEFINE_FOG = Shader3D.getDefineByName("FOG");
        Scene3DShaderDeclaration.SHADERDEFINE_DIRECTIONLIGHT = Shader3D.getDefineByName("DIRECTIONLIGHT");
        Scene3DShaderDeclaration.SHADERDEFINE_POINTLIGHT = Shader3D.getDefineByName("POINTLIGHT");
        Scene3DShaderDeclaration.SHADERDEFINE_SPOTLIGHT = Shader3D.getDefineByName("SPOTLIGHT");
        Scene3DShaderDeclaration.SHADERDEFINE_SHADOW = Shader3D.getDefineByName("SHADOW");
        Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_CASCADE = Shader3D.getDefineByName("SHADOW_CASCADE");
        Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SOFT_SHADOW_LOW = Shader3D.getDefineByName("SHADOW_SOFT_SHADOW_LOW");
        Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SOFT_SHADOW_HIGH = Shader3D.getDefineByName("SHADOW_SOFT_SHADOW_HIGH");
        Scene3DShaderDeclaration.SHADERDEFINE_GI_AMBIENT_SH = Shader3D.getDefineByName("GI_AMBIENT_SH");
        var config = Config3D._config;
        var configShaderValue = Scene3D._configDefineValues;
        (config._multiLighting) || (configShaderValue.add(Shader3D.SHADERDEFINE_LEGACYSINGALLIGHTING));
        if (LayaGL.layaGPUInstance._isWebGL2)
            configShaderValue.add(Shader3D.SHADERDEFINE_GRAPHICS_API_GLES3);
        else
            configShaderValue.add(Shader3D.SHADERDEFINE_GRAPHICS_API_GLES2);
        switch (config.pbrRenderQuality) {
            case PBRRenderQuality.High:
                configShaderValue.add(PBRMaterial.SHADERDEFINE_LAYA_PBR_BRDF_HIGH);
                break;
            case PBRRenderQuality.Low:
                configShaderValue.add(PBRMaterial.SHADERDEFINE_LAYA_PBR_BRDF_LOW);
                break;
            default:
                throw "Scene3D:unknown shader quality.";
        }
    }
    /**
     * 加载场景,注意:不缓存。
     * @param url 模板地址。
     * @param complete 完成回调。
     */
    static load(url, complete) {
        ILaya.loader.create(url, complete, null, Scene3D.HIERARCHY);
    }
    /**
     * 资源的URL地址。
     */
    get url() {
        return this._url;
    }
    /**
     * 是否允许雾化。
     */
    get enableFog() {
        return this._enableFog;
    }
    set enableFog(value) {
        if (this._enableFog !== value) {
            this._enableFog = value;
            if (value) {
                this._shaderValues.addDefine(Scene3DShaderDeclaration.SHADERDEFINE_FOG);
            }
            else
                this._shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_FOG);
        }
    }
    /**
     * 雾化颜色。
     */
    get fogColor() {
        return this._shaderValues.getVector3(Scene3D.FOGCOLOR);
    }
    set fogColor(value) {
        this._shaderValues.setVector3(Scene3D.FOGCOLOR, value);
    }
    /**
     * 雾化起始位置。
     */
    get fogStart() {
        return this._shaderValues.getNumber(Scene3D.FOGSTART);
    }
    set fogStart(value) {
        this._shaderValues.setNumber(Scene3D.FOGSTART, value);
    }
    /**
     * 雾化范围。
     */
    get fogRange() {
        return this._shaderValues.getNumber(Scene3D.FOGRANGE);
    }
    set fogRange(value) {
        this._shaderValues.setNumber(Scene3D.FOGRANGE, value);
    }
    /**
     * 环境光模式。
     * 如果值为AmbientMode.SolidColor一般使用ambientColor作为环境光源，如果值为如果值为AmbientMode.SphericalHarmonics一般使用ambientSphericalHarmonics作为环境光源。
     */
    get ambientMode() {
        return this._ambientMode;
    }
    set ambientMode(value) {
        if (this._ambientMode !== value) {
            switch (value) {
                case AmbientMode.SolidColor:
                    this._shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_GI_AMBIENT_SH);
                    break;
                case AmbientMode.SphericalHarmonics:
                    this._shaderValues.addDefine(Scene3DShaderDeclaration.SHADERDEFINE_GI_AMBIENT_SH);
                    break;
                default:
                    throw "Scene3D: unknown ambientMode.";
            }
            this._ambientMode = value;
        }
    }
    /**
     * 固定颜色环境光。
     */
    get ambientColor() {
        return this._shaderValues.getVector3(Scene3D.AMBIENTCOLOR);
    }
    set ambientColor(value) {
        this._shaderValues.setVector3(Scene3D.AMBIENTCOLOR, value);
    }
    /**
     * 球谐环境光,修改后必须重新赋值。
     */
    get ambientSphericalHarmonics() {
        return this._ambientSphericalHarmonics;
    }
    set ambientSphericalHarmonics(value) {
        var originalSH = value || SphericalHarmonicsL2._default;
        this._applySHCoefficients(originalSH, Math.pow(this._ambientSphericalHarmonicsIntensity, 2.2)); //Gamma to Linear,I prefer use 'Color.gammaToLinearSpace',but must same with Unity now.
        if (this._ambientSphericalHarmonics != value)
            value.cloneTo(this._ambientSphericalHarmonics);
    }
    /**
     * 环境球谐强度。
     */
    get ambientSphericalHarmonicsIntensity() {
        return this._ambientSphericalHarmonicsIntensity;
    }
    set ambientSphericalHarmonicsIntensity(value) {
        value = Math.max(Math.min(value, 8.0), 0.0);
        if (this._ambientSphericalHarmonicsIntensity !== value) {
            var originalSH = this._ambientSphericalHarmonics || SphericalHarmonicsL2._default;
            this._applySHCoefficients(originalSH, Math.pow(value, 2.2)); //Gamma to Linear,I prefer use 'Color.gammaToLinearSpace',but must same with Unity now.
            this._ambientSphericalHarmonicsIntensity = value;
        }
    }
    /**
     * 反射立方体纹理。
     */
    get reflection() {
        return this._reflection;
    }
    set reflection(value) {
        if (this._reflection != value) {
            this._shaderValues.setTexture(Scene3D.REFLECTIONTEXTURE, value || TextureCube.blackTexture);
            this._reflection = value;
        }
    }
    /**
     * 反射立方体纹理解码格式。
     */
    get reflectionDecodingFormat() {
        return this._reflectionDecodeFormat;
    }
    set reflectionDecodingFormat(value) {
        if (this._reflectionDecodeFormat != value) {
            this._reflectionCubeHDRParams.x = this._reflectionIntensity;
            if (this._reflectionDecodeFormat == TextureDecodeFormat.RGBM)
                this._reflectionCubeHDRParams.x *= 5.0; //5.0 is RGBM param
            this._reflectionDecodeFormat = value;
        }
    }
    /**
     * 反射强度。
     */
    get reflectionIntensity() {
        return this._reflectionIntensity;
    }
    set reflectionIntensity(value) {
        value = Math.max(Math.min(value, 1.0), 0.0);
        this._reflectionCubeHDRParams.x = value;
        if (this._reflectionDecodeFormat == TextureDecodeFormat.RGBM)
            this._reflectionCubeHDRParams.x *= 5.0; //5.0 is RGBM param
        this._reflectionIntensity = value;
    }
    /**
     * 天空渲染器。
     */
    get skyRenderer() {
        return this._skyRenderer;
    }
    /**
     * 物理模拟器。
     */
    get physicsSimulation() {
        return this._physicsSimulation;
    }
    /**
     * 场景时钟。
     * @override
     */
    get timer() {
        return this._timer;
    }
    set timer(value) {
        this._timer = value;
    }
    /**
     *	输入。
     */
    get input() {
        return this._input;
    }
    /**
     * 光照贴图数组,返回值为浅拷贝数组。
     */
    get lightmaps() {
        return this._lightmaps.slice();
    }
    set lightmaps(value) {
        var maps = this._lightmaps;
        if (maps) {
            for (var i = 0, n = maps.length; i < n; i++) {
                var map = maps[i];
                map.lightmapColor._removeReference();
                map.lightmapDirection._removeReference();
            }
        }
        if (value) {
            var count = value.length;
            maps.length = count;
            for (i = 0; i < count; i++) {
                var map = value[i];
                map.lightmapColor && map.lightmapColor._addReference();
                map.lightmapDirection && map.lightmapDirection._addReference();
                maps[i] = map;
            }
        }
        else {
            maps.length = 0;
        }
    }
    /**
     * @internal
     */
    _applySHCoefficients(originalSH, intensity) {
        var optSH = this._shCoefficients;
        for (var i = 0; i < 3; i++) {
            var shaderSHA = optSH[i];
            var shaderSHB = optSH[i + 3];
            shaderSHA.setValue(originalSH.getCoefficient(i, 3) * intensity, originalSH.getCoefficient(i, 1) * intensity, originalSH.getCoefficient(i, 2) * intensity, (originalSH.getCoefficient(i, 0) - originalSH.getCoefficient(i, 6)) * intensity);
            shaderSHB.setValue(originalSH.getCoefficient(i, 4) * intensity, originalSH.getCoefficient(i, 5) * intensity, originalSH.getCoefficient(i, 6) * 3 * intensity, originalSH.getCoefficient(i, 7) * intensity); // Quadratic polynomials 
        }
        optSH[6].setValue(originalSH.getCoefficient(0, 8) * intensity, originalSH.getCoefficient(1, 8) * intensity, originalSH.getCoefficient(2, 8) * intensity, 1); // Final quadratic polynomial
        var shaderValues = this._shaderValues;
        shaderValues.setVector(Scene3D.AMBIENTSHAR, optSH[0]);
        shaderValues.setVector(Scene3D.AMBIENTSHAG, optSH[1]);
        shaderValues.setVector(Scene3D.AMBIENTSHAB, optSH[2]);
        shaderValues.setVector(Scene3D.AMBIENTSHBR, optSH[3]);
        shaderValues.setVector(Scene3D.AMBIENTSHBG, optSH[4]);
        shaderValues.setVector(Scene3D.AMBIENTSHBB, optSH[5]);
        shaderValues.setVector(Scene3D.AMBIENTSHC, optSH[6]);
    }
    /**
     *@internal
     */
    _update() {
        var delta = this.timer._delta / 1000;
        this._time += delta;
        this._shaderValues.setNumber(Scene3D.TIME, this._time);
        var simulation = this._physicsSimulation;
        if (Physics3D._enablePhysics && !PhysicsSimulation.disableSimulation) {
            simulation._updatePhysicsTransformFromRender();
            PhysicsComponent._addUpdateList = false; //物理模拟器会触发_updateTransformComponent函数,不加入更新队列
            //simulate physics
            simulation._simulate(delta);
            //update character sprite3D transforms from physics engine simulation
            simulation._updateCharacters();
            PhysicsComponent._addUpdateList = true;
            //handle frame contacts
            simulation._updateCollisions();
            //send contact events
            simulation._eventScripts();
        }
        this._input._update();
        this._clearScript();
        this._updateScript();
        Animator._update(this);
        this._lateUpdateScript();
    }
    /**
     * @internal
     */
    _binarySearchIndexInCameraPool(camera) {
        var start = 0;
        var end = this._cameraPool.length - 1;
        var mid;
        while (start <= end) {
            mid = Math.floor((start + end) / 2);
            var midValue = this._cameraPool[mid]._renderingOrder;
            if (midValue == camera._renderingOrder)
                return mid;
            else if (midValue > camera._renderingOrder)
                end = mid - 1;
            else
                start = mid + 1;
        }
        return start;
    }
    /**
     * @internal
     * [Editer]
     */
    _allotPickColorByID(id, pickColor) {
        var pickColorR = Math.floor(id / (255 * 255));
        id -= pickColorR * 255 * 255;
        var pickColorG = Math.floor(id / 255);
        id -= pickColorG * 255;
        var pickColorB = id;
        pickColor.x = pickColorR / 255;
        pickColor.y = pickColorG / 255;
        pickColor.z = pickColorB / 255;
        pickColor.w = 1.0;
    }
    /**
     * @internal
     * [Editer]
     */
    _searchIDByPickColor(pickColor) {
        var id = pickColor.x * 255 * 255 + pickColor.y * 255 + pickColor.z;
        return id;
    }
    /**
     * @internal
     * @override
     */
    onEnable() {
        this._input._onCanvasEvent(Render.canvas);
    }
    /**
     * @internal
     * @override
     */
    onDisable() {
        this._input._offCanvasEvent(Render.canvas);
    }
    /**
     */
    _setCreateURL(url) {
        this._url = URL.formatURL(url);
    }
    /**
     * @internal
     */
    _getGroup() {
        return this._group;
    }
    /**
     * @internal
     */
    _setGroup(value) {
        this._group = value;
    }
    /**
     * @internal
     */
    _clearScript() {
        if (this._needClearScriptPool) {
            var scripts = this._scriptPool;
            for (var i = 0, n = scripts.length; i < n; i++) {
                var script = scripts[i];
                if (script) {
                    script._indexInPool = this._tempScriptPool.length;
                    this._tempScriptPool.push(script);
                }
            }
            this._scriptPool = this._tempScriptPool;
            scripts.length = 0;
            this._tempScriptPool = scripts;
            this._needClearScriptPool = false;
        }
    }
    /**
     * @internal
     */
    _updateScript() {
        var scripts = this._scriptPool;
        for (var i = 0, n = scripts.length; i < n; i++) {
            var script = scripts[i];
            (script && script.enabled) && (script.onUpdate());
        }
    }
    /**
     * @internal
     */
    _lateUpdateScript() {
        var scripts = this._scriptPool;
        for (var i = 0, n = scripts.length; i < n; i++) {
            var script = scripts[i];
            (script && script.enabled) && (script.onLateUpdate());
        }
    }
    /**
     * @inheritDoc
     * @override
     */
    _onActive() {
        super._onActive();
        ILaya.stage._scene3Ds.push(this);
    }
    /**
     * @inheritDoc
     * @override
     */
    _onInActive() {
        super._onInActive();
        var scenes = ILaya.stage._scene3Ds;
        scenes.splice(scenes.indexOf(this), 1);
    }
    /**
     * @internal
     */
    _prepareSceneToRender() {
        var shaderValues = this._shaderValues;
        var multiLighting = Config3D._config._multiLighting;
        if (multiLighting) {
            var ligTex = Scene3D._lightTexture;
            var ligPix = Scene3D._lightPixles;
            const pixelWidth = ligTex.width;
            const floatWidth = pixelWidth * 4;
            var curCount = 0;
            var dirCount = this._directionLights._length;
            var dirElements = this._directionLights._elements;
            if (dirCount > 0) {
                var sunLightIndex = this._directionLights.getSunLight(); //get the brightest light as sun
                this._mainLight = dirElements[sunLightIndex];
                for (var i = 0; i < dirCount; i++, curCount++) {
                    var dirLight = dirElements[i];
                    var dir = dirLight._direction;
                    var intCor = dirLight._intensityColor;
                    var off = floatWidth * curCount;
                    Vector3.scale(dirLight.color, dirLight._intensity, intCor);
                    dirLight.transform.worldMatrix.getForward(dir);
                    Vector3.normalize(dir, dir); //矩阵有缩放时需要归一化
                    ligPix[off] = intCor.x;
                    ligPix[off + 1] = intCor.y;
                    ligPix[off + 2] = intCor.z;
                    ligPix[off + 4] = dir.x;
                    ligPix[off + 5] = dir.y;
                    ligPix[off + 6] = dir.z;
                    if (i == sunLightIndex) {
                        shaderValues.setVector3(Scene3D.SUNLIGHTDIRCOLOR, intCor);
                        shaderValues.setVector3(Scene3D.SUNLIGHTDIRECTION, dir);
                    }
                }
                shaderValues.addDefine(Scene3DShaderDeclaration.SHADERDEFINE_DIRECTIONLIGHT);
            }
            else {
                shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_DIRECTIONLIGHT);
            }
            var poiCount = this._pointLights._length;
            if (poiCount > 0) {
                var poiElements = this._pointLights._elements;
                for (var i = 0; i < poiCount; i++, curCount++) {
                    var poiLight = poiElements[i];
                    var pos = poiLight.transform.position;
                    var intCor = poiLight._intensityColor;
                    var off = floatWidth * curCount;
                    Vector3.scale(poiLight.color, poiLight._intensity, intCor);
                    ligPix[off] = intCor.x;
                    ligPix[off + 1] = intCor.y;
                    ligPix[off + 2] = intCor.z;
                    ligPix[off + 3] = poiLight.range;
                    ligPix[off + 4] = pos.x;
                    ligPix[off + 5] = pos.y;
                    ligPix[off + 6] = pos.z;
                }
                shaderValues.addDefine(Scene3DShaderDeclaration.SHADERDEFINE_POINTLIGHT);
            }
            else {
                shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_POINTLIGHT);
            }
            var spoCount = this._spotLights._length;
            if (spoCount > 0) {
                var spoElements = this._spotLights._elements;
                for (var i = 0; i < spoCount; i++, curCount++) {
                    var spoLight = spoElements[i];
                    var dir = spoLight._direction;
                    var pos = spoLight.transform.position;
                    var intCor = spoLight._intensityColor;
                    var off = floatWidth * curCount;
                    Vector3.scale(spoLight.color, spoLight._intensity, intCor);
                    spoLight.transform.worldMatrix.getForward(dir);
                    Vector3.normalize(dir, dir);
                    ligPix[off] = intCor.x;
                    ligPix[off + 1] = intCor.y;
                    ligPix[off + 2] = intCor.z;
                    ligPix[off + 3] = spoLight.range;
                    ligPix[off + 4] = pos.x;
                    ligPix[off + 5] = pos.y;
                    ligPix[off + 6] = pos.z;
                    ligPix[off + 7] = spoLight.spotAngle * Math.PI / 180;
                    ligPix[off + 8] = dir.x;
                    ligPix[off + 9] = dir.y;
                    ligPix[off + 10] = dir.z;
                }
                shaderValues.addDefine(Scene3DShaderDeclaration.SHADERDEFINE_SPOTLIGHT);
            }
            else {
                shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_SPOTLIGHT);
            }
            (curCount > 0) && (ligTex.setSubPixels(0, 0, pixelWidth, curCount, ligPix, 0));
            shaderValues.setTexture(Scene3D.LIGHTBUFFER, ligTex);
            shaderValues.setInt(Scene3D.DIRECTIONLIGHTCOUNT, this._directionLights._length);
            shaderValues.setTexture(Scene3D.CLUSTERBUFFER, Cluster.instance._clusterTexture);
        }
        else {
            if (this._directionLights._length > 0) {
                var dirLight = this._directionLights._elements[0];
                this._mainLight = dirLight;
                Vector3.scale(dirLight.color, dirLight._intensity, dirLight._intensityColor);
                dirLight.transform.worldMatrix.getForward(dirLight._direction);
                Vector3.normalize(dirLight._direction, dirLight._direction);
                shaderValues.setVector3(Scene3D.LIGHTDIRCOLOR, dirLight._intensityColor);
                shaderValues.setVector3(Scene3D.LIGHTDIRECTION, dirLight._direction);
                shaderValues.setVector3(Scene3D.SUNLIGHTDIRCOLOR, dirLight._intensityColor);
                shaderValues.setVector3(Scene3D.SUNLIGHTDIRECTION, dirLight._direction);
                shaderValues.addDefine(Scene3DShaderDeclaration.SHADERDEFINE_DIRECTIONLIGHT);
            }
            else {
                shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_DIRECTIONLIGHT);
            }
            if (this._pointLights._length > 0) {
                var poiLight = this._pointLights._elements[0];
                Vector3.scale(poiLight.color, poiLight._intensity, poiLight._intensityColor);
                shaderValues.setVector3(Scene3D.POINTLIGHTCOLOR, poiLight._intensityColor);
                shaderValues.setVector3(Scene3D.POINTLIGHTPOS, poiLight.transform.position);
                shaderValues.setNumber(Scene3D.POINTLIGHTRANGE, poiLight.range);
                shaderValues.addDefine(Scene3DShaderDeclaration.SHADERDEFINE_POINTLIGHT);
            }
            else {
                shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_POINTLIGHT);
            }
            if (this._spotLights._length > 0) {
                var spotLight = this._spotLights._elements[0];
                Vector3.scale(spotLight.color, spotLight._intensity, spotLight._intensityColor);
                shaderValues.setVector3(Scene3D.SPOTLIGHTCOLOR, spotLight._intensityColor);
                shaderValues.setVector3(Scene3D.SPOTLIGHTPOS, spotLight.transform.position);
                spotLight.transform.worldMatrix.getForward(spotLight._direction);
                Vector3.normalize(spotLight._direction, spotLight._direction);
                shaderValues.setVector3(Scene3D.SPOTLIGHTDIRECTION, spotLight._direction);
                shaderValues.setNumber(Scene3D.SPOTLIGHTRANGE, spotLight.range);
                shaderValues.setNumber(Scene3D.SPOTLIGHTSPOTANGLE, spotLight.spotAngle * Math.PI / 180);
                shaderValues.addDefine(Scene3DShaderDeclaration.SHADERDEFINE_SPOTLIGHT);
            }
            else {
                shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_SPOTLIGHT);
            }
        }
    }
    /**
     * @internal
     */
    _addScript(script) {
        var scripts = this._scriptPool;
        script._indexInPool = scripts.length;
        scripts.push(script);
    }
    /**
     * @internal
     */
    _removeScript(script) {
        this._scriptPool[script._indexInPool] = null;
        script._indexInPool = -1;
        this._needClearScriptPool = true;
    }
    /**
     * @internal
     */
    _preRenderScript() {
        var scripts = this._scriptPool;
        for (var i = 0, n = scripts.length; i < n; i++) {
            var script = scripts[i];
            (script && script.enabled) && (script.onPreRender());
        }
    }
    /**
     * @internal
     */
    _postRenderScript() {
        var scripts = this._scriptPool;
        for (var i = 0, n = scripts.length; i < n; i++) {
            var script = scripts[i];
            (script && script.enabled) && (script.onPostRender());
        }
    }
    /**
     * @internal
     */
    _addCamera(camera) {
        var index = this._binarySearchIndexInCameraPool(camera);
        var order = camera._renderingOrder;
        var count = this._cameraPool.length;
        while (index < count && this._cameraPool[index]._renderingOrder <= order)
            index++;
        this._cameraPool.splice(index, 0, camera);
    }
    /**
     * @internal
     */
    _removeCamera(camera) {
        this._cameraPool.splice(this._cameraPool.indexOf(camera), 1);
    }
    /**
     * @internal
     */
    _preCulling(context, camera, shader, replacementTag) {
        var cameraCullInfo = FrustumCulling._cameraCullInfo;
        cameraCullInfo.position = camera._transform.position;
        cameraCullInfo.cullingMask = camera.cullingMask;
        cameraCullInfo.boundFrustum = camera.boundFrustum;
        cameraCullInfo.useOcclusionCulling = camera.useOcclusionCulling;
        FrustumCulling.renderObjectCulling(cameraCullInfo, this, context, shader, replacementTag, false);
    }
    /**
     * @internal
     */
    _clear(gl, state) {
        var viewport = state.viewport;
        var camera = state.camera;
        var renderTex = camera._getRenderTexture();
        var vpX, vpY;
        var vpW = viewport.width;
        var vpH = viewport.height;
        if (camera._needInternalRenderTexture()) {
            vpX = 0;
            vpY = 0;
        }
        else {
            vpX = viewport.x;
            vpY = camera._getCanvasHeight() - viewport.y - vpH;
        }
        gl.viewport(vpX, vpY, vpW, vpH);
        var flag;
        var clearFlag = camera.clearFlag;
        if (clearFlag === CameraClearFlags.Sky && !(camera.skyRenderer._isAvailable() || this._skyRenderer._isAvailable()))
            clearFlag = CameraClearFlags.SolidColor;
        switch (clearFlag) {
            case CameraClearFlags.SolidColor:
                var clearColor = camera.clearColor;
                gl.enable(gl.SCISSOR_TEST);
                gl.scissor(vpX, vpY, vpW, vpH);
                if (clearColor)
                    gl.clearColor(clearColor.x, clearColor.y, clearColor.z, clearColor.w);
                else
                    gl.clearColor(0, 0, 0, 0);
                if (renderTex) {
                    flag = gl.COLOR_BUFFER_BIT;
                    switch (renderTex.depthStencilFormat) {
                        case RenderTextureDepthFormat.DEPTH_16:
                            flag |= gl.DEPTH_BUFFER_BIT;
                            break;
                        case RenderTextureDepthFormat.STENCIL_8:
                            flag |= gl.STENCIL_BUFFER_BIT;
                            break;
                        case RenderTextureDepthFormat.DEPTHSTENCIL_24_8:
                            flag |= gl.DEPTH_BUFFER_BIT;
                            flag |= gl.STENCIL_BUFFER_BIT;
                            break;
                    }
                }
                else {
                    flag = gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT;
                }
                WebGLContext.setDepthMask(gl, true);
                gl.clear(flag);
                gl.disable(gl.SCISSOR_TEST);
                break;
            case CameraClearFlags.Sky:
            case CameraClearFlags.DepthOnly:
                gl.enable(gl.SCISSOR_TEST);
                gl.scissor(vpX, vpY, vpW, vpH);
                if (renderTex) {
                    switch (renderTex.depthStencilFormat) {
                        case RenderTextureDepthFormat.DEPTH_16:
                            flag = gl.DEPTH_BUFFER_BIT;
                            break;
                        case RenderTextureDepthFormat.STENCIL_8:
                            flag = gl.STENCIL_BUFFER_BIT;
                            break;
                        case RenderTextureDepthFormat.DEPTHSTENCIL_24_8:
                            flag = gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT;
                            break;
                    }
                }
                else {
                    flag = gl.DEPTH_BUFFER_BIT;
                }
                WebGLContext.setDepthMask(gl, true);
                gl.clear(flag);
                gl.disable(gl.SCISSOR_TEST);
                break;
            case CameraClearFlags.Nothing:
                break;
            default:
                throw new Error("Scene3D:camera clearFlag invalid.");
        }
    }
    /**
     * @internal
     */
    _renderScene(context) {
        var camera = context.camera;
        this._opaqueQueue._render(context); //非透明队列
        if (camera.clearFlag === CameraClearFlags.Sky) {
            if (camera.skyRenderer._isAvailable())
                camera.skyRenderer._render(context);
            else if (this._skyRenderer._isAvailable())
                this._skyRenderer._render(context);
        }
        this._transparentQueue._render(context); //透明队列
        if (FrustumCulling.debugFrustumCulling) {
            var renderElements = this._debugTool._render._renderElements;
            for (var i = 0, n = renderElements.length; i < n; i++) {
                renderElements[i]._update(this, context, null, null);
                renderElements[i]._render(context);
            }
        }
    }
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _parse(data, spriteMap) {
        var lightMapsData = data.lightmaps;
        if (lightMapsData) {
            var lightMapCount = lightMapsData.length;
            var lightmaps = new Array(lightMapCount);
            for (var i = 0; i < lightMapCount; i++) {
                var lightMap = new Lightmap();
                var lightMapData = lightMapsData[i];
                if (lightMapData.path) { //兼容
                    lightMap.lightmapColor = Loader.getRes(lightMapData.path);
                }
                else {
                    lightMap.lightmapColor = Loader.getRes(lightMapData.color.path);
                    if (lightMapData.direction)
                        lightMap.lightmapDirection = Loader.getRes(lightMapData.direction.path);
                }
                lightmaps[i] = lightMap;
            }
            this.lightmaps = lightmaps;
        }
        var ambientColorData = data.ambientColor;
        if (ambientColorData) {
            var ambCol = this.ambientColor;
            ambCol.fromArray(ambientColorData);
            this.ambientColor = ambCol;
        }
        var skyData = data.sky;
        if (skyData) {
            this._skyRenderer.material = Loader.getRes(skyData.material.path);
            switch (skyData.mesh) {
                case "SkyBox":
                    this._skyRenderer.mesh = SkyBox.instance;
                    break;
                case "SkyDome":
                    this._skyRenderer.mesh = SkyDome.instance;
                    break;
                default:
                    this.skyRenderer.mesh = SkyBox.instance;
            }
        }
        this.enableFog = data.enableFog;
        this.fogStart = data.fogStart;
        this.fogRange = data.fogRange;
        var fogColorData = data.fogColor;
        if (fogColorData) {
            var fogCol = this.fogColor;
            fogCol.fromArray(fogColorData);
            this.fogColor = fogCol;
        }
        var ambientSphericalHarmonicsData = data.ambientSphericalHarmonics;
        if (ambientSphericalHarmonicsData) {
            var ambientSH = this.ambientSphericalHarmonics;
            for (var i = 0; i < 3; i++) {
                var off = i * 9;
                ambientSH.setCoefficients(i, ambientSphericalHarmonicsData[off], ambientSphericalHarmonicsData[off + 1], ambientSphericalHarmonicsData[off + 2], ambientSphericalHarmonicsData[off + 3], ambientSphericalHarmonicsData[off + 4], ambientSphericalHarmonicsData[off + 5], ambientSphericalHarmonicsData[off + 6], ambientSphericalHarmonicsData[off + 7], ambientSphericalHarmonicsData[off + 8]);
            }
            this.ambientSphericalHarmonics = ambientSH;
        }
        var reflectionData = data.reflection;
        (reflectionData != undefined) && (this.reflection = Loader.getRes(reflectionData));
        var reflectionDecodingFormatData = data.reflectionDecodingFormat;
        (reflectionDecodingFormatData != undefined) && (this.reflectionDecodingFormat = reflectionDecodingFormatData);
        var ambientModeData = data.ambientMode;
        (ambientModeData != undefined) && (this.ambientMode = ambientModeData);
        var ambientSphericalHarmonicsIntensityData = data.ambientSphericalHarmonicsIntensity;
        (ambientSphericalHarmonicsIntensityData != undefined) && (this.ambientSphericalHarmonicsIntensity = ambientSphericalHarmonicsIntensityData);
        var reflectionIntensityData = data.reflectionIntensity;
        (reflectionIntensityData != undefined) && (this.reflectionIntensity = reflectionIntensityData);
    }
    /**
     * @internal
     */
    _addRenderObject(render) {
        if (this._octree && render._supportOctree) {
            this._octree.add(render);
        }
        else {
            this._renders.add(render);
            if (Render.supportWebGLPlusCulling) { //[NATIVE]
                var indexInList = render._getIndexInList();
                var length = this._cullingBufferIndices.length;
                if (indexInList >= length) {
                    var tempIndices = this._cullingBufferIndices;
                    var tempResult = this._cullingBufferResult;
                    this._cullingBufferIndices = new Int32Array(length + 1024);
                    this._cullingBufferResult = new Int32Array(length + 1024);
                    this._cullingBufferIndices.set(tempIndices, 0);
                    this._cullingBufferResult.set(tempResult, 0);
                }
                this._cullingBufferIndices[indexInList] = render._cullingBufferIndex;
            }
        }
    }
    /**
     * @internal
     */
    _removeRenderObject(render) {
        if (this._octree && render._supportOctree) {
            this._octree.remove(render);
        }
        else {
            var endRender;
            if (Render.supportWebGLPlusCulling) { //[NATIVE]
                endRender = this._renders.elements[this._renders.length - 1];
            }
            this._renders.remove(render);
            if (Render.supportWebGLPlusCulling) { //[NATIVE]
                this._cullingBufferIndices[endRender._getIndexInList()] = endRender._cullingBufferIndex;
            }
        }
    }
    /**
     * @internal
     */
    _getRenderQueue(index) {
        if (index <= 2500) //2500作为队列临界点
            return this._opaqueQueue;
        else
            return this._transparentQueue;
    }
    /**
     * @inheritDoc
     * @override
     */
    destroy(destroyChild = true) {
        if (this.destroyed)
            return;
        super.destroy(destroyChild);
        this._skyRenderer.destroy();
        this._skyRenderer = null;
        this._directionLights = null;
        this._pointLights = null;
        this._spotLights = null;
        this._alternateLights = null;
        this._lightmaps = null;
        this._shaderValues = null;
        this._renders = null;
        this._cameraPool = null;
        this._octree = null;
        this._physicsSimulation && this._physicsSimulation._destroy();
        Loader.clearRes(this.url);
    }
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    render(ctx, x, y) {
        //TODO:外层应该设计为接口调用
        ctx._curSubmit = SubmitBase.RENDERBASE; //打断2D合并的renderKey
        this._children.length > 0 && ctx.addRenderObject(this);
    }
    /**
     *
     */
    renderSubmit() {
        var gl = LayaGL.instance;
        this._prepareSceneToRender();
        var i, n, n1;
        for (i = 0, n = this._cameraPool.length, n1 = n - 1; i < n; i++) {
            if (Render.supportWebGLPlusRendering)
                ShaderData.setRuntimeValueMode((i == n1) ? true : false);
            var camera = this._cameraPool[i];
            camera.enableRender && camera.render();
        }
        Context.set2DRenderConfig(); //还原2D配置
        return 1;
    }
    /**
     *
     */
    getRenderType() {
        return 0;
    }
    /**
     *
     */
    releaseRender() {
    }
    /**
     *
     */
    reUse(context, pos) {
        return 0;
    }
    //--------------------------------------------------------deprecated------------------------------------------------------------------------
    /**
     * @deprecated
     */
    get customReflection() {
        return this._reflection;
    }
    set customReflection(value) {
        if (this._reflection != value) {
            this._shaderValues.setTexture(Scene3D.REFLECTIONTEXTURE, value || TextureCube.blackTexture);
            this._reflection = value;
        }
    }
    /**
     * @deprecated
     */
    get reflectionMode() {
        return this._reflectionMode;
    }
    set reflectionMode(value) {
        this._reflectionMode = value;
    }
    /**
     * @deprecated
     * 设置光照贴图。
     * @param value 光照贴图。
     */
    setlightmaps(value) {
        var maps = this._lightmaps;
        for (var i = 0, n = maps.length; i < n; i++)
            maps[i].lightmapColor._removeReference();
        if (value) {
            var count = value.length;
            maps.length = count;
            for (i = 0; i < count; i++) {
                var lightMap = value[i];
                lightMap._addReference();
                (maps[i]) || (maps[i] = new Lightmap());
                maps[i].lightmapColor = lightMap;
            }
        }
        else {
            throw new Error("Scene3D: value value can't be null.");
        }
    }
    /**
     * @deprecated
     * 获取光照贴图浅拷贝列表。
     * @return 获取光照贴图浅拷贝列表。
     */
    getlightmaps() {
        var lightmapColors = new Array(this._lightmaps.length);
        for (var i = 0; i < this._lightmaps.length; i++) {
            lightmapColors[i] = this._lightmaps[i].lightmapColor;
        }
        return lightmapColors; //slice()防止修改数组内容
    }
}
/** @internal */
Scene3D._shadowCasterPass = new ShadowCasterPass();
/**Hierarchy资源。*/
Scene3D.HIERARCHY = "HIERARCHY";
/**@internal */
Scene3D.physicsSettings = new PhysicsSettings();
/** 是否开启八叉树裁剪。*/
Scene3D.octreeCulling = false;
/** 八叉树初始化尺寸。*/
Scene3D.octreeInitialSize = 64.0;
/** 八叉树初始化中心。*/
Scene3D.octreeInitialCenter = new Vector3(0, 0, 0);
/** 八叉树最小尺寸。*/
Scene3D.octreeMinNodeSize = 2.0;
/** 八叉树松散值。*/
Scene3D.octreeLooseness = 1.25;
Scene3D.REFLECTIONMODE_SKYBOX = 0;
Scene3D.REFLECTIONMODE_CUSTOM = 1;
Scene3D.FOGCOLOR = Shader3D.propertyNameToID("u_FogColor");
Scene3D.FOGSTART = Shader3D.propertyNameToID("u_FogStart");
Scene3D.FOGRANGE = Shader3D.propertyNameToID("u_FogRange");
Scene3D.DIRECTIONLIGHTCOUNT = Shader3D.propertyNameToID("u_DirationLightCount");
Scene3D.LIGHTBUFFER = Shader3D.propertyNameToID("u_LightBuffer");
Scene3D.CLUSTERBUFFER = Shader3D.propertyNameToID("u_LightClusterBuffer");
Scene3D.SUNLIGHTDIRECTION = Shader3D.propertyNameToID("u_SunLight.direction");
Scene3D.SUNLIGHTDIRCOLOR = Shader3D.propertyNameToID("u_SunLight.color");
Scene3D.AMBIENTSHAR = Shader3D.propertyNameToID("u_AmbientSHAr");
Scene3D.AMBIENTSHAG = Shader3D.propertyNameToID("u_AmbientSHAg");
Scene3D.AMBIENTSHAB = Shader3D.propertyNameToID("u_AmbientSHAb");
Scene3D.AMBIENTSHBR = Shader3D.propertyNameToID("u_AmbientSHBr");
Scene3D.AMBIENTSHBG = Shader3D.propertyNameToID("u_AmbientSHBg");
Scene3D.AMBIENTSHBB = Shader3D.propertyNameToID("u_AmbientSHBb");
Scene3D.AMBIENTSHC = Shader3D.propertyNameToID("u_AmbientSHC");
Scene3D.REFLECTIONPROBE = Shader3D.propertyNameToID("u_ReflectionProbe");
Scene3D.REFLECTIONCUBE_HDR_PARAMS = Shader3D.propertyNameToID("u_ReflectCubeHDRParams");
//------------------legacy lighting-------------------------------
Scene3D.LIGHTDIRECTION = Shader3D.propertyNameToID("u_DirectionLight.direction");
Scene3D.LIGHTDIRCOLOR = Shader3D.propertyNameToID("u_DirectionLight.color");
Scene3D.POINTLIGHTPOS = Shader3D.propertyNameToID("u_PointLight.position");
Scene3D.POINTLIGHTRANGE = Shader3D.propertyNameToID("u_PointLight.range");
Scene3D.POINTLIGHTATTENUATION = Shader3D.propertyNameToID("u_PointLight.attenuation");
Scene3D.POINTLIGHTCOLOR = Shader3D.propertyNameToID("u_PointLight.color");
Scene3D.SPOTLIGHTPOS = Shader3D.propertyNameToID("u_SpotLight.position");
Scene3D.SPOTLIGHTDIRECTION = Shader3D.propertyNameToID("u_SpotLight.direction");
Scene3D.SPOTLIGHTSPOTANGLE = Shader3D.propertyNameToID("u_SpotLight.spot");
Scene3D.SPOTLIGHTRANGE = Shader3D.propertyNameToID("u_SpotLight.range");
Scene3D.SPOTLIGHTCOLOR = Shader3D.propertyNameToID("u_SpotLight.color");
//------------------legacy lighting-------------------------------
Scene3D.AMBIENTCOLOR = Shader3D.propertyNameToID("u_AmbientColor");
Scene3D.REFLECTIONTEXTURE = Shader3D.propertyNameToID("u_ReflectTexture");
Scene3D.TIME = Shader3D.propertyNameToID("u_Time");
/** @internal */
Scene3D._configDefineValues = new DefineDatas();
