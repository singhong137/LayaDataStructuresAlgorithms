import { Sprite } from "../../display/Sprite";
import { Byte } from "../../utils/Byte";
import { Handler } from "../../utils/Handler";
/**
 * 动画播放完毕后调度。
 * @eventType Event.COMPLETE
 */
/**
 * 播放到某标签后调度。
 * @eventType Event.LABEL
 */
/**
 * 加载完成后调度。
 * @eventType Event.LOADED
 */
/**
 * 进入帧后调度。
 * @eventType Event.FRAME
 */
/**
 * <p> <code>MovieClip</code> 用于播放经过工具处理后的 swf 动画。</p>
 */
export declare class MovieClip extends Sprite {
    /**@internal */
    protected static _ValueList: any[];
    /**@internal 数据起始位置。*/
    protected _start: number;
    /**@internal 当前位置。*/
    protected _Pos: number;
    /**@internal 数据。*/
    protected _data: Byte;
    /**@internal */
    protected _curIndex: number;
    /**@internal */
    protected _preIndex: number;
    /**@internal */
    protected _playIndex: number;
    /**@internal */
    protected _playing: boolean;
    /**@internal */
    protected _ended: boolean;
    /**@internal 总帧数。*/
    protected _count: number;
    /**@internal id_data起始位置表*/
    _ids: any;
    /**@internal */
    protected _loadedImage: any;
    /**@internal id_实例表*/
    _idOfSprite: any[];
    /**@internal 父mc*/
    _parentMovieClip: MovieClip;
    /**@internal 需要更新的movieClip表*/
    _movieClipList: any[];
    /**@internal */
    protected _labels: any;
    /**资源根目录。*/
    basePath: string;
    /**@internal */
    private _atlasPath;
    /**@internal */
    private _url;
    /**@internal */
    private _isRoot;
    /**@internal */
    private _completeHandler;
    /**@internal */
    private _endFrame;
    /** 播放间隔(单位：毫秒)。*/
    interval: number;
    /**是否循环播放 */
    loop: boolean;
    /**
     * 创建一个 <code>MovieClip</code> 实例。
     * @param parentMovieClip 父MovieClip,自己创建时不需要传该参数
     */
    constructor(parentMovieClip?: MovieClip);
    /**
     * <p>销毁此对象。以及销毁引用的Texture</p>
     * @param	destroyChild 是否同时销毁子节点，若值为true,则销毁子节点，否则不销毁子节点。
     * @override
     */
    destroy(destroyChild?: boolean): void;
    /**
     * @internal
     * @override
     */
    _setDisplay(value: boolean): void;
    /**
     * @internal
     * @override
     */
    protected _onDisplay(value?: boolean): void;
    /**@private 更新时间轴*/
    updates(): void;
    /**当前播放索引。*/
    index: number;
    /**
     * 增加一个标签到index帧上，播放到此index后会派发label事件
     * @param	label	标签名称
     * @param	index	索引位置
     */
    addLabel(label: string, index: number): void;
    /**
     * 删除某个标签
     * @param	label 标签名字，如果label为空，则删除所有Label
     */
    removeLabel(label: string): void;
    /**
     * 帧总数。
     */
    readonly count: number;
    /**
     * 是否在播放中
     */
    readonly playing: boolean;
    /**
     * @internal
     * 动画的帧更新处理函数。
     */
    private _update;
    /**
     * 停止播放动画。
     */
    stop(): void;
    /**
     * 跳到某帧并停止播放动画。
     * @param frame 要跳到的帧
     */
    gotoAndStop(index: number): void;
    /**
     * @internal
     * 清理。
     */
    private _clear;
    /**
     * 播放动画。
     * @param	index 帧索引。
     */
    play(index?: number, loop?: boolean): void;
    /**@internal */
    private _displayFrame;
    /**@internal */
    private _reset;
    /**@internal */
    private _parseFrame;
    /**@internal */
    _setData(data: Byte, start: number): void;
    /**
     * 资源地址。
     */
    url: string;
    /**
     * 加载资源。
     * @param	url swf 资源地址。
     * @param   atlas  是否使用图集资源
     * @param   atlasPath  图集路径，默认使用与swf同名的图集
     */
    load(url: string, atlas?: boolean, atlasPath?: string): void;
    /**@internal */
    private _onLoaded;
    /**@internal */
    private _initState;
    /**@internal */
    private _initData;
    /**
     * 从开始索引播放到结束索引，结束之后出发complete回调
     * @param	start	开始索引
     * @param	end		结束索引
     * @param	complete	结束回调
     */
    playTo(start: number, end: number, complete?: Handler): void;
}
