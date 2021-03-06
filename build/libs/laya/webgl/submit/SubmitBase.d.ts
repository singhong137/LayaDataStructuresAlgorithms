import { ISubmit } from "./ISubmit";
import { SubmitKey } from "./SubmitKey";
import { Value2D } from "../shader/d2/value/Value2D";
import { Mesh2D } from "../utils/Mesh2D";
export declare class SubmitBase implements ISubmit {
    static TYPE_2D: number;
    static TYPE_CANVAS: number;
    static TYPE_CMDSETRT: number;
    static TYPE_CUSTOM: number;
    static TYPE_BLURRT: number;
    static TYPE_CMDDESTORYPRERT: number;
    static TYPE_DISABLESTENCIL: number;
    static TYPE_OTHERIBVB: number;
    static TYPE_PRIMITIVE: number;
    static TYPE_RT: number;
    static TYPE_BLUR_RT: number;
    static TYPE_TARGET: number;
    static TYPE_CHANGE_VALUE: number;
    static TYPE_SHAPE: number;
    static TYPE_TEXTURE: number;
    static TYPE_FILLTEXTURE: number;
    static KEY_ONCE: number;
    static KEY_FILLRECT: number;
    static KEY_DRAWTEXTURE: number;
    static KEY_VG: number;
    static KEY_TRIANGLES: number;
    static RENDERBASE: SubmitBase;
    static ID: number;
    static preRender: ISubmit;
    clipInfoID: number;
    /**@internal */
    _mesh: Mesh2D;
    /**@internal */
    _blendFn: Function;
    protected _id: number;
    /**@internal */
    _renderType: number;
    /**@internal */
    _parent: ISubmit;
    /**@internal */
    _key: SubmitKey;
    /**@internal */
    _startIdx: number;
    /**@internal */
    _numEle: number;
    /**@internal */
    _ref: number;
    shaderValue: Value2D;
    static __init__(): void;
    constructor(renderType?: number);
    getID(): number;
    getRenderType(): number;
    toString(): string;
    renderSubmit(): number;
    releaseRender(): void;
}
