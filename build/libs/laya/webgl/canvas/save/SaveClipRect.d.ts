import { ISaveData } from "./ISaveData";
import { Rectangle } from "../../../maths/Rectangle";
import { Context } from "../../../resource/Context";
export declare class SaveClipRect implements ISaveData {
    private static POOL;
    private _globalClipMatrix;
    private _clipInfoID;
    /**@internal */
    _clipRect: Rectangle;
    incache: boolean;
    isSaveMark(): boolean;
    restore(context: Context): void;
    static save(context: Context): void;
}
