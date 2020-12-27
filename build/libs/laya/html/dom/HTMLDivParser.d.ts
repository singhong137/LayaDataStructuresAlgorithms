import { HTMLElement } from "./HTMLElement";
import { ILayout } from "../utils/ILayout";
import { Rectangle } from "../../maths/Rectangle";
import { Handler } from "../../utils/Handler";
/**
 * @private
 */
export declare class HTMLDivParser extends HTMLElement {
    /** 实际内容的高 */
    contextHeight: number;
    /** 实际内容的宽 */
    contextWidth: number;
    /** @private */
    private _htmlBounds;
    /** @private */
    private _boundsRec;
    /** 重绘回调 */
    repaintHandler: Handler;
    /**
     * @override
     */
    reset(): HTMLElement;
    /**
     * 设置标签内容
     */
    innerHTML: string;
    /**
     * @override
     */
    /**
    * 获取对象的宽
    * @override
    */
    width: number;
    /**
     * 追加内容，解析并对显示对象排版
     * @param	text
     */
    appendHTML(text: string): void;
    /**
     * @internal
     * @param	out
     * @return
     * @override
     */
    _addChildsToLayout(out: ILayout[]): boolean;
    /**
     * @internal
     * @param	out
     * @override
     */
    _addToLayout(out: ILayout[]): void;
    /**
     * 获取bounds
     * @return
     */
    getBounds(): Rectangle;
    /**
     * @override
     */
    parentRepaint(recreate?: boolean): void;
    /**
     * @private
     * 对显示内容进行排版
     */
    layout(): void;
    /**
     * 获取对象的高
     * @override
     */
    /**
    * @override
    */
    height: number;
}
