import { HTMLDivParser } from "./HTMLDivParser";
import { Sprite } from "../../display/Sprite";
import { HTMLStyle } from "../utils/HTMLStyle";
/**
 * HTML图文类，用于显示html内容
 *
 * 支持的标签如下:
 * a:链接标签，点击后会派发"link"事件 比如:<a href='alink'>a</a>
 * div:div容器标签，比如:<div>abc</div>
 * span:行内元素标签，比如:<span style='color:#ff0000'>abc</span>
 * p:行元素标签，p标签会自动换行，div不会，比如:<p>abc</p>
 * img:图片标签，比如:<img src='res/boy.png'></img>
 * br:换行标签，比如:<div>abc<br/>def</div>
 * style:样式标签，比如:<div style='width:130px;height:50px;color:#ff0000'>abc</div>
 * link:外链样式标签，可以加载一个css文件来当style使用，比如:<link type='text/css' href='html/test.css'/>
 *
 * style支持的属性如下:
 * italic:true|false;					是否是斜体
 * bold:true|false;						是否是粗体
 * letter-spacing:10px;					字间距
 * font-family:宋体; 					字体
 * font-size:20px;						字体大小
 * font-weight:bold:none;				字体是否是粗体，功能同bold
 * color:#ff0000;						字体颜色
 * stroke:2px;							字体描边宽度
 * strokeColor:#ff0000;					字体描边颜色
 * padding:10px 10px 20px 20px;			边缘的距离
 * vertical-align:top|bottom|middle;	垂直对齐方式
 * align:left|right|center;				水平对齐方式
 * line-height:20px;					行高
 * background-color:#ff0000;			背景颜色
 * border-color:#ff0000;				边框颜色
 * width:100px;							对象宽度
 * height:100px;						对象高度
 *
 * 示例用法：
 * var div:HTMLDivElement=new HTMLDivElement();
 * div.innerHTML = "<link type='text/css' href='html/test.css'/><a href='alink'>a</a><div style='width:130px;height:50px;color:#ff0000'>div</div><br/><span style='font-weight:bold;color:#ffffff;font-size:30px;stroke:2px;italic:true;'>span</span><span style='letter-spacing:5px'>span2</span><p>p</p><img src='res/boy.png'></img>";
 */
export declare class HTMLDivElement extends Sprite {
    /**@internal */
    _element: HTMLDivParser;
    /**@private */
    private _recList;
    /**@private */
    private _innerHTML;
    /**@private */
    private _repaintState;
    constructor();
    /**@private
     * @override
    */
    destroy(destroyChild?: boolean): void;
    /**@private */
    private _htmlDivRepaint;
    private _updateGraphicWork;
    private _setGraphicDirty;
    /**@private */
    private _doClears;
    /**@private */
    private _updateGraphic;
    /**
     * 获取HTML样式
     */
    readonly style: HTMLStyle;
    /**
     * 设置标签内容
     */
    innerHTML: string;
    private _refresh;
    /**
     * 获取內容宽度
     */
    readonly contextWidth: number;
    /**
     * 获取內容高度
     */
    readonly contextHeight: number;
    /**@private */
    private _onMouseClick;
    /**@private */
    private _eventLink;
}
