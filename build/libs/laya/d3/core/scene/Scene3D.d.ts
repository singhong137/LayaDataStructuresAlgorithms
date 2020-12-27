import { Sprite } from "../../../display/Sprite";
import { Context } from "../../../resource/Context";
import { ICreateResource } from "../../../resource/ICreateResource";
import { Texture2D } from "../../../resource/Texture2D";
import { TextureDecodeFormat } from "../../../resource/TextureDecodeFormat";
import { Handler } from "../../../utils/Handler";
import { Timer } from "../../../utils/Timer";
import { ISubmit } from "../../../webgl/submit/ISubmit";
import { SubmitKey } from "../../../webgl/submit/SubmitKey";
import { Script3D } from "../../component/Script3D";
import { SimpleSingletonList } from "../../component/SimpleSingletonList";
import { SphericalHarmonicsL2 } from "../../graphics/SphericalHarmonicsL2";
import { Input3D } from "../../Input3D";
import { Vector3 } from "../../math/Vector3";
import { Vector4 } from "../../math/Vector4";
import { PhysicsSettings } from "../../physics/PhysicsSettings";
import { PhysicsSimulation } from "../../physics/PhysicsSimulation";
import { SkyRenderer } from "../../resource/models/SkyRenderer";
import { TextureCube } from "../../resource/TextureCube";
import { Shader3D } from "../../shader/Shader3D";
import { ShaderData } from "../../shader/ShaderData";
import { BaseCamera } from "../BaseCamera";
import { Camera } from "../Camera";
import { DirectionLight } from "../light/DirectionLight";
import { AlternateLightQueue, DirectionLightQueue, LightQueue } from "../light/LightQueue";
import { PointLight } from "../light/PointLight";
import { SpotLight } from "../light/SpotLight";
import { PixelLineSprite3D } from "../pixelLine/PixelLineSprite3D";
import { BaseRender } from "../render/BaseRender";
import { RenderContext3D } from "../render/RenderContext3D";
import { RenderQueue } from "../render/RenderQueue";
import { BoundsOctree } from "./BoundsOctree";
import { Lightmap } from "./Lightmap";
import { ShadowCasterPass } from "../../shadowMap/ShadowCasterPass";
import { DefineDatas } from "../../shader/DefineDatas";
/**
 * 环境光模式
 */
export declare enum AmbientMode {
    /** 固定颜色。*/
    SolidColor = 0,
    /** 球谐光照,例如通过天空盒生成的球谐数据。 */
    SphericalHarmonics = 1
}
/**
 * 用于实现3D场景。
 */
export declare class Scene3D extends Sprite implements ISubmit, ICreateResource {
    /** @internal */
    private static _lightTexture;
    /** @internal */
    private static _lightPixles;
    /** @internal */
    static _shadowCasterPass: ShadowCasterPass;
    /**Hierarchy资源。*/
    static HIERARCHY: string;
    /**@internal */
    static physicsSettings: PhysicsSettings;
    /** 是否开启八叉树裁剪。*/
    static octreeCulling: boolean;
    /** 八叉树初始化尺寸。*/
    static octreeInitialSize: number;
    /** 八叉树初始化中心。*/
    static octreeInitialCenter: Vector3;
    /** 八叉树最小尺寸。*/
    static octreeMinNodeSize: number;
    /** 八叉树松散值。*/
    static octreeLooseness: number;
    static REFLECTIONMODE_SKYBOX: number;
    static REFLECTIONMODE_CUSTOM: number;
    static FOGCOLOR: number;
    static FOGSTART: number;
    static FOGRANGE: number;
    static DIRECTIONLIGHTCOUNT: number;
    static LIGHTBUFFER: number;
    static CLUSTERBUFFER: number;
    static SUNLIGHTDIRECTION: number;
    static SUNLIGHTDIRCOLOR: number;
    static AMBIENTSHAR: number;
    static AMBIENTSHAG: number;
    static AMBIENTSHAB: number;
    static AMBIENTSHBR: number;
    static AMBIENTSHBG: number;
    static AMBIENTSHBB: number;
    static AMBIENTSHC: number;
    static REFLECTIONPROBE: number;
    static REFLECTIONCUBE_HDR_PARAMS: number;
    static LIGHTDIRECTION: number;
    static LIGHTDIRCOLOR: number;
    static POINTLIGHTPOS: number;
    static POINTLIGHTRANGE: number;
    static POINTLIGHTATTENUATION: number;
    static POINTLIGHTCOLOR: number;
    static SPOTLIGHTPOS: number;
    static SPOTLIGHTDIRECTION: number;
    static SPOTLIGHTSPOTANGLE: number;
    static SPOTLIGHTRANGE: number;
    static SPOTLIGHTCOLOR: number;
    static AMBIENTCOLOR: number;
    static REFLECTIONTEXTURE: number;
    static TIME: number;
    /** @internal */
    static _configDefineValues: DefineDatas;
    /**
     * @internal
     */
    static __init__(): void;
    /**
     * 加载场景,注意:不缓存。
     * @param url 模板地址。
     * @param complete 完成回调。
     */
    static load(url: string, complete: Handler): void;
    /** @internal */
    private _url;
    /** @internal */
    private _group;
    /** @internal */
    _lightCount: number;
    /** @internal */
    _pointLights: LightQueue<PointLight>;
    /** @internal */
    _spotLights: LightQueue<SpotLight>;
    /** @internal */
    _directionLights: DirectionLightQueue;
    /** @internal */
    _alternateLights: AlternateLightQueue;
    /** @internal */
    private _lightmaps;
    /** @internal */
    private _skyRenderer;
    /** @internal */
    private _enableFog;
    /** @internal */
    private _input;
    /** @internal */
    private _timer;
    /** @internal */
    private _time;
    /** @internal */
    private _shCoefficients;
    /** @internal */
    private _ambientMode;
    /** @internal */
    private _ambientSphericalHarmonics;
    /** @internal */
    private _ambientSphericalHarmonicsIntensity;
    /** @internal */
    private _reflection;
    /** @internal */
    private _reflectionDecodeFormat;
    /** @internal */
    private _reflectionIntensity;
    /** @internal */
    _mainLight: DirectionLight;
    /** @internal */
    _physicsSimulation: PhysicsSimulation;
    /** @internal */
    _octree: BoundsOctree;
    /** @internal 只读,不允许修改。*/
    _collsionTestList: number[];
    /** @internal */
    _shaderValues: ShaderData;
    /** @internal */
    _renders: SimpleSingletonList;
    /** @internal */
    _opaqueQueue: RenderQueue;
    /** @internal */
    _transparentQueue: RenderQueue;
    /** @internal */
    _cameraPool: BaseCamera[];
    /** @internal */
    _animatorPool: SimpleSingletonList;
    /** @internal */
    _scriptPool: Script3D[];
    /** @internal */
    _tempScriptPool: Script3D[];
    /** @internal */
    _needClearScriptPool: boolean;
    /**	@internal */
    _reflectionCubeHDRParams: Vector4;
    /** 当前创建精灵所属遮罩层。*/
    currentCreationLayer: number;
    /** 是否启用灯光。*/
    enableLight: boolean;
    /** @internal */
    _debugTool: PixelLineSprite3D;
    /** @internal */
    _key: SubmitKey;
    /** @internal	[NATIVE]*/
    _cullingBufferIndices: Int32Array;
    /** @internal	[NATIVE]*/
    _cullingBufferResult: Int32Array;
    /** @internal [Editer]*/
    _pickIdToSprite: any;
    /**
     * 资源的URL地址。
     */
    readonly url: string;
    /**
     * 是否允许雾化。
     */
    enableFog: boolean;
    /**
     * 雾化颜色。
     */
    fogColor: Vector3;
    /**
     * 雾化起始位置。
     */
    fogStart: number;
    /**
     * 雾化范围。
     */
    fogRange: number;
    /**
     * 环境光模式。
     * 如果值为AmbientMode.SolidColor一般使用ambientColor作为环境光源，如果值为如果值为AmbientMode.SphericalHarmonics一般使用ambientSphericalHarmonics作为环境光源。
     */
    ambientMode: AmbientMode;
    /**
     * 固定颜色环境光。
     */
    ambientColor: Vector3;
    /**
     * 球谐环境光,修改后必须重新赋值。
     */
    ambientSphericalHarmonics: SphericalHarmonicsL2;
    /**
     * 环境球谐强度。
     */
    ambientSphericalHarmonicsIntensity: number;
    /**
     * 反射立方体纹理。
     */
    reflection: TextureCube;
    /**
     * 反射立方体纹理解码格式。
     */
    reflectionDecodingFormat: TextureDecodeFormat;
    /**
     * 反射强度。
     */
    reflectionIntensity: number;
    /**
     * 天空渲染器。
     */
    readonly skyRenderer: SkyRenderer;
    /**
     * 物理模拟器。
     */
    readonly physicsSimulation: PhysicsSimulation;
    /**
     * 场景时钟。
     * @override
     */
    timer: Timer;
    /**
     *	输入。
     */
    readonly input: Input3D;
    /**
     * 光照贴图数组,返回值为浅拷贝数组。
     */
    lightmaps: Lightmap[];
    /**
     * 创建一个 <code>Scene3D</code> 实例。
     */
    constructor();
    /**
     * @internal
     */
    private _applySHCoefficients;
    /**
     *@internal
     */
    private _update;
    /**
     * @internal
     */
    private _binarySearchIndexInCameraPool;
    /**
     * @internal
     * [Editer]
     */
    _allotPickColorByID(id: number, pickColor: Vector4): void;
    /**
     * @internal
     * [Editer]
     */
    _searchIDByPickColor(pickColor: Vector4): number;
    /**
     * @internal
     * @override
     */
    onEnable(): void;
    /**
     * @internal
     * @override
     */
    onDisable(): void;
    /**
     */
    _setCreateURL(url: string): void;
    /**
     * @internal
     */
    _getGroup(): string;
    /**
     * @internal
     */
    _setGroup(value: string): void;
    /**
     * @internal
     */
    private _clearScript;
    /**
     * @internal
     */
    private _updateScript;
    /**
     * @internal
     */
    private _lateUpdateScript;
    /**
     * @inheritDoc
     * @override
     */
    protected _onActive(): void;
    /**
     * @inheritDoc
     * @override
     */
    protected _onInActive(): void;
    /**
     * @internal
     */
    private _prepareSceneToRender;
    /**
     * @internal
     */
    _addScript(script: Script3D): void;
    /**
     * @internal
     */
    _removeScript(script: Script3D): void;
    /**
     * @internal
     */
    _preRenderScript(): void;
    /**
     * @internal
     */
    _postRenderScript(): void;
    /**
     * @internal
     */
    _addCamera(camera: BaseCamera): void;
    /**
     * @internal
     */
    _removeCamera(camera: BaseCamera): void;
    /**
     * @internal
     */
    _preCulling(context: RenderContext3D, camera: Camera, shader: Shader3D, replacementTag: string): void;
    /**
     * @internal
     */
    _clear(gl: WebGLRenderingContext, state: RenderContext3D): void;
    /**
     * @internal
     */
    _renderScene(context: RenderContext3D): void;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _parse(data: any, spriteMap: any): void;
    /**
     * @internal
     */
    _addRenderObject(render: BaseRender): void;
    /**
     * @internal
     */
    _removeRenderObject(render: BaseRender): void;
    /**
     * @internal
     */
    _getRenderQueue(index: number): RenderQueue;
    /**
     * @inheritDoc
     * @override
     */
    destroy(destroyChild?: boolean): void;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    render(ctx: Context, x: number, y: number): void;
    /**
     *
     */
    renderSubmit(): number;
    /**
     *
     */
    getRenderType(): number;
    /**
     *
     */
    releaseRender(): void;
    /**
     *
     */
    reUse(context: Context, pos: number): number;
    /**
     * @deprecated
     */
    customReflection: TextureCube;
    /** @internal */
    private _reflectionMode;
    /**
     * @deprecated
     */
    reflectionMode: number;
    /**
     * @deprecated
     * 设置光照贴图。
     * @param value 光照贴图。
     */
    setlightmaps(value: Texture2D[]): void;
    /**
     * @deprecated
     * 获取光照贴图浅拷贝列表。
     * @return 获取光照贴图浅拷贝列表。
     */
    getlightmaps(): Texture2D[];
}
