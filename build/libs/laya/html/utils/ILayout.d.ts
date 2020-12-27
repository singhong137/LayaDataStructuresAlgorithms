import { HTMLStyle } from "./HTMLStyle";
/**
     * @private
     *  <code>ILayout</code> 类是显示对象的布局接口。
     */
export interface ILayout {
    x: number;
    y: number;
    width: number;
    height: number;
    /**@internal */
    _isChar(): boolean;
    /**@internal */
    _getCSSStyle(): HTMLStyle;
}
