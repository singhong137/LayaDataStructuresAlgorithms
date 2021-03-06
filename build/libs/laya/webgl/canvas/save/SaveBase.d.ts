import { ISaveData } from "./ISaveData";
import { Context } from "../../../resource/Context";
export declare class SaveBase implements ISaveData {
    static TYPE_ALPHA: number;
    static TYPE_FILESTYLE: number;
    static TYPE_FONT: number;
    static TYPE_LINEWIDTH: number;
    static TYPE_STROKESTYLE: number;
    static TYPE_MARK: number;
    static TYPE_TRANSFORM: number;
    static TYPE_TRANSLATE: number;
    static TYPE_ENABLEMERGE: number;
    static TYPE_TEXTBASELINE: number;
    static TYPE_TEXTALIGN: number;
    static TYPE_GLOBALCOMPOSITEOPERATION: number;
    static TYPE_CLIPRECT: number;
    static TYPE_CLIPRECT_STENCIL: number;
    static TYPE_IBVB: number;
    static TYPE_SHADER: number;
    static TYPE_FILTERS: number;
    static TYPE_FILTERS_TYPE: number;
    static TYPE_COLORFILTER: number;
    private static POOL;
    private static _namemap;
    /**@internal */
    static _createArray(): any[];
    /**@internal */
    static _init(): any;
    private _valueName;
    private _value;
    private _dataObj;
    private _newSubmit;
    constructor();
    isSaveMark(): boolean;
    restore(context: Context): void;
    static save(context: Context, type: number, dataObj: any, newSubmit: boolean): void;
}
