import { Box } from "./Box";
import { IRender } from "./IRender";
import { List } from "./List";
import { ScrollBar } from "./ScrollBar";
import { Event } from "../events/Event";
import { Handler } from "../utils/Handler";
/**
 * 实例的 <code>selectedIndex</code> 属性发生变化时调度。
 * @eventType laya.events.Event
 */
/**
 * 节点打开关闭时触发。
 * @eventType laya.events.Event
 */
/**
 * <code>Tree</code> 控件使用户可以查看排列为可扩展树的层次结构数据。
 *
 * @example
 * package
 *	{
 *		import laya.ui.Tree;
 *		import laya.utils.Browser;
 *		import laya.utils.Handler;
    
 *		public class Tree_Example
 *		{
    
 *			public function Tree_Example()
 *			{
 *				Laya.init(640, 800);
 *				Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
 *				Laya.loader.load(["resource/ui/vscroll.png", "resource/ui/vscroll$bar.png", "resource/ui/vscroll$down.png", "resource/ui/vscroll$up.png", "resource/ui/clip_selectBox.png", "resource/ui/clip_tree_folder.png", "resource/ui/clip_tree_arrow.png"], Handler.create(this, onLoadComplete));
 *			}
    
 *			private function onLoadComplete():void
 *			{
 *				var xmlString:String;//创建一个xml字符串，用于存储树结构数据。
 *				xmlString = "&lt;root&gt;&lt;item label='box1'&gt;&lt;abc label='child1'/&gt;&lt;abc label='child2'/&gt;&lt;abc label='child3'/&gt;&lt;abc label='child4'/&gt;&lt;abc label='child5'/&gt;&lt;/item&gt;&lt;item label='box2'&gt;&lt;abc label='child1'/&gt;&lt;abc label='child2'/&gt;&lt;abc label='child3'/&gt;&lt;abc label='child4'/&gt;&lt;/item&gt;&lt;/root&gt;";
 *				var domParser:* = new Browser.window.DOMParser();//创建一个DOMParser实例domParser。
 *				var xml:* = domParser.parseFromString(xmlString, "text/xml");//解析xml字符。
    
 *				var tree:Tree = new Tree();//创建一个 Tree 类的实例对象 tree 。
 *				tree.scrollBarSkin = "resource/ui/vscroll.png";//设置 tree 的皮肤。
 *				tree.itemRender = Item;//设置 tree 的项渲染器。
 *				tree.xml = xml;//设置 tree 的树结构数据。
 *				tree.x = 100;//设置 tree 对象的属性 x 的值，用于控制 tree 对象的显示位置。
 *				tree.y = 100;//设置 tree 对象的属性 y 的值，用于控制 tree 对象的显示位置。
 *				tree.width = 200;//设置 tree 的宽度。
 *				tree.height = 100;//设置 tree 的高度。
 *				Laya.stage.addChild(tree);//将 tree 添加到显示列表。
 *			}
 *		}
 *	}
    
 * import laya.ui.Box;
 * import laya.ui.Clip;
 * import laya.ui.Label;
 *	class Item extends Box
 *	{
 *		public function Item()
 *		{
 *			this.name = "render";
 *			this.right = 0;
 *			this.left = 0;
    
 *			var selectBox:Clip = new Clip("resource/ui/clip_selectBox.png", 1, 2);
 *			selectBox.name = "selectBox";
 *			selectBox.height = 24;
 *			selectBox.x = 13;
 *			selectBox.y = 0;
 *			selectBox.left = 12;
 *			addChild(selectBox);
    
 *			var folder:Clip = new Clip("resource/ui/clip_tree_folder.png", 1, 3);
 *			folder.name = "folder";
 *			folder.x = 14;
 *			folder.y = 4;
 *			addChild(folder);
    
 *			var label:Label = new Label("treeItem");
 *			label.name = "label";
 *			label.color = "#ffff00";
 *			label.width = 150;
 *			label.height = 22;
 *			label.x = 33;
 *			label.y = 1;
 *			label.left = 33;
 *			label.right = 0;
 *			addChild(label);
    
 *			var arrow:Clip = new Clip("resource/ui/clip_tree_arrow.png", 1, 2);
 *			arrow.name = "arrow";
 *			arrow.x = 0;
 *			arrow.y = 5;
 *			addChild(arrow);
 *		}
 *	 }
 * @example
 * Laya.init(640, 800);//设置游戏画布宽高、渲染模式
 * Laya.stage.bgColor = "#efefef";//设置画布的背景颜色
 * var res = ["resource/ui/vscroll.png", "resource/ui/vscroll$bar.png", "resource/ui/vscroll$down.png", "resource/ui/vscroll$up.png", "resource/ui/clip_selectBox.png", "resource/ui/clip_tree_folder.png", "resource/ui/clip_tree_arrow.png"];
 * Laya.loader.load(res, new laya.utils.Handler(this, onLoadComplete));
 * function onLoadComplete() {
 *     var xmlString;//创建一个xml字符串，用于存储树结构数据。
 *     xmlString = "&lt;root&gt;&lt;item label='box1'&gt;&lt;abc label='child1'/&gt;&lt;abc label='child2'/&gt;&lt;abc label='child3'/&gt;&lt;abc label='child4'/&gt;&lt;abc label='child5'/&gt;&lt;/item&gt;&lt;item label='box2'&gt;&lt;abc label='child1'/&gt;&lt;abc label='child2'/&gt;&lt;abc label='child3'/&gt;&lt;abc label='child4'/&gt;&lt;/item&gt;&lt;/root&gt;";
 *     var domParser = new laya.utils.Browser.window.DOMParser();//创建一个DOMParser实例domParser。
 *     var xml = domParser.parseFromString(xmlString, "text/xml");//解析xml字符。
    
 *     var tree = new laya.ui.Tree();//创建一个 Tree 类的实例对象 tree 。
 *     tree.scrollBarSkin = "resource/ui/vscroll.png";//设置 tree 的皮肤。
 *     tree.itemRender = mypackage.treeExample.Item;//设置 tree 的项渲染器。
 *     tree.xml = xml;//设置 tree 的树结构数据。
 *     tree.x = 100;//设置 tree 对象的属性 x 的值，用于控制 tree 对象的显示位置。
 *     tree.y = 100;//设置 tree 对象的属性 y 的值，用于控制 tree 对象的显示位置。
 *     tree.width = 200;//设置 tree 的宽度。
 *     tree.height = 100;//设置 tree 的高度。
 *     Laya.stage.addChild(tree);//将 tree 添加到显示列表。
 * }
 * (function (_super) {
 *     function Item() {
 *         Item.__super.call(this);//初始化父类。
 *         this.right = 0;
 *         this.left = 0;
    
 *         var selectBox = new laya.ui.Clip("resource/ui/clip_selectBox.png", 1, 2);
 *         selectBox.name = "selectBox";//设置 selectBox 的name 为“selectBox”时，将被识别为树结构的项的背景。2帧：悬停时背景、选中时背景。
 *         selectBox.height = 24;
 *         selectBox.x = 13;
 *         selectBox.y = 0;
 *         selectBox.left = 12;
 *         this.addChild(selectBox);//需要使用this.访问父类的属性或方法。
    
 *         var folder = new laya.ui.Clip("resource/ui/clip_tree_folder.png", 1, 3);
 *         folder.name = "folder";//设置 folder 的name 为“folder”时，将被识别为树结构的文件夹开启状态图表。2帧：折叠状态、打开状态。
 *         folder.x = 14;
 *         folder.y = 4;
 *         this.addChild(folder);
    
 *         var label = new laya.ui.Label("treeItem");
 *         label.name = "label";//设置 label 的name 为“label”时，此值将用于树结构数据赋值。
 *         label.color = "#ffff00";
 *         label.width = 150;
 *         label.height = 22;
 *         label.x = 33;
 *         label.y = 1;
 *         label.left = 33;
 *         label.right = 0;
 *         this.addChild(label);
    
 *         var arrow = new laya.ui.Clip("resource/ui/clip_tree_arrow.png", 1, 2);
 *         arrow.name = "arrow";//设置 arrow 的name 为“arrow”时，将被识别为树结构的文件夹开启状态图表。2帧：折叠状态、打开状态。
 *         arrow.x = 0;
 *         arrow.y = 5;
 *         this.addChild(arrow);
 *     };
 *     Laya.class(Item,"mypackage.treeExample.Item",_super);//注册类 Item 。
 * })(laya.ui.Box);
 * @example
 * import Tree = laya.ui.Tree;
 * import Browser = laya.utils.Browser;
 * import Handler = laya.utils.Handler;
 * class Tree_Example {
    
 *     constructor() {
 *         Laya.init(640, 800);
 *         Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。
 *         Laya.loader.load(["resource/ui/vscroll.png", "resource/ui/vscroll$bar.png", "resource/ui/vscroll$down.png", "resource/ui/vscroll$up.png", "resource/ui/vscroll$up.png", "resource/ui/clip_selectBox.png", "resource/ui/clip_tree_folder * . * png", "resource/ui/clip_tree_arrow.png"], Handler.create(this, this.onLoadComplete));
 *     }
 *     private onLoadComplete(): void {
 *         var xmlString: String;//创建一个xml字符串，用于存储树结构数据。
 *         xmlString = "&lt;root&gt;&lt;item label='box1'&gt;&lt;abc label='child1'/&gt;&lt;abc label='child2'/&gt;&lt;abc label='child3'/&gt;&lt;abc label='child4'/&gt;&lt;abc label='child5'/&gt;&lt;/item&gt;&lt;item label='box2'&gt;&lt;abc  * label='child1'/&gt;&lt;abc label='child2'/&gt;&lt;abc label='child3'/&gt;&lt;abc label='child4'/&gt;&lt;/item&gt;&lt;/root&gt;";
 *         var domParser: any = new Browser.window.DOMParser();//创建一个DOMParser实例domParser。
 *         var xml: any = domParser.parseFromString(xmlString, "text/xml");//解析xml字符。
    
 *         var tree: Tree = new Tree();//创建一个 Tree 类的实例对象 tree 。
 *         tree.scrollBarSkin = "resource/ui/vscroll.png";//设置 tree 的皮肤。
 *         tree.itemRender = Item;//设置 tree 的项渲染器。
 *         tree.xml = xml;//设置 tree 的树结构数据。
 *         tree.x = 100;//设置 tree 对象的属性 x 的值，用于控制 tree 对象的显示位置。
 *         tree.y = 100;//设置 tree 对象的属性 y 的值，用于控制 tree 对象的显示位置。
 *         tree.width = 200;//设置 tree 的宽度。
 *         tree.height = 100;//设置 tree 的高度。
 *         Laya.stage.addChild(tree);//将 tree 添加到显示列表。
 *     }
 * }
 * import Box = laya.ui.Box;
 * import Clip = laya.ui.Clip;
 * import Label = laya.ui.Label;
 * class Item extends Box {
 *     constructor() {
 *         super();
 *         this.name = "render";
 *         this.right = 0;
 *         this.left = 0;
 *         var selectBox: Clip = new Clip("resource/ui/clip_selectBox.png", 1, 2);
 *         selectBox.name = "selectBox";
 *         selectBox.height = 24;
 *         selectBox.x = 13;
 *         selectBox.y = 0;
 *         selectBox.left = 12;
 *         this.addChild(selectBox);
    
 *         var folder: Clip = new Clip("resource/ui/clip_tree_folder.png", 1, 3);
 *         folder.name = "folder";
 *         folder.x = 14;
 *         folder.y = 4;
 *         this.addChild(folder);
    
 *         var label: Label = new Label("treeItem");
 *         label.name = "label";
 *         label.color = "#ffff00";
 *         label.width = 150;
 *         label.height = 22;
 *         label.x = 33;
 *         label.y = 1;
 *         label.left = 33;
 *         label.right = 0;
 *         this.addChild(label);
    
 *         var arrow: Clip = new Clip("resource/ui/clip_tree_arrow.png", 1, 2);
 *         arrow.name = "arrow";
 *         arrow.x = 0;
 *         arrow.y = 5;
 *         this.addChild(arrow);
 *     }
 * }
 */
export declare class Tree extends Box implements IRender {
    /**@private */
    protected _list: List;
    /**@private */
    protected _source: any[];
    /**@private */
    protected _renderHandler: Handler;
    /**@private */
    protected _spaceLeft: number;
    /**@private */
    protected _spaceBottom: number;
    /**@private */
    protected _keepStatus: boolean;
    /**
     * 创建一个新的 <code>Tree</code> 类实例。
     * <p>在 <code>Tree</code> 构造函数中设置属性width、height的值都为200。</p>
     */
    constructor();
    /**
     * @inheritDoc
     * @override
    */
    destroy(destroyChild?: boolean): void;
    /**
     * @override
     */
    protected createChildren(): void;
    /**
     * @private
     * 此对象包含的<code>List</code>实例的<code>Event.CHANGE</code>事件侦听处理函数。
     */
    protected onListChange(e?: Event): void;
    /**
     * 数据源发生变化后，是否保持之前打开状态，默认为true。
     * <p><b>取值：</b>
     * <li>true：保持之前打开状态。</li>
     * <li>false：不保持之前打开状态。</li>
     * </p>
     */
    keepStatus: boolean;
    /**
     * 列表数据源，只包含当前可视节点数据。
     */
    array: any[];
    /**
     * 数据源，全部节点数据。
     */
    readonly source: any[];
    /**
     * 此对象包含的<code>List</code>实例对象。
     */
    readonly list: List;
    /**
     * 此对象包含的<code>List</code>实例的单元格渲染器。
     * <p><b>取值：</b>
     * <ol>
     * <li>单元格类对象。</li>
     * <li> UI 的 JSON 描述。</li>
     * </ol></p>
     * @implements
     */
    itemRender: any;
    /**
     * 滚动条皮肤。
     */
    scrollBarSkin: string;
    /**滚动条*/
    readonly scrollBar: ScrollBar;
    /**
     * 单元格鼠标事件处理器。
     * <p>默认返回参数（e:Event,index:int）。</p>
     */
    mouseHandler: Handler;
    /**
     * <code>Tree</code> 实例的渲染处理器。
     */
    renderHandler: Handler;
    /**
     * 左侧缩进距离（以像素为单位）。
     */
    spaceLeft: number;
    /**
     * 每一项之间的间隔距离（以像素为单位）。
     */
    spaceBottom: number;
    /**
     * 表示当前选择的项索引。
     */
    selectedIndex: number;
    /**
     * 当前选中的项对象的数据源。
     */
    selectedItem: any;
    /**
     * @inheritDoc
     * @override
     */
    /**
    * @inheritDoc
    * @override
    */
    width: number;
    /**
     * @inheritDoc
     * @override
     */
    /**
    * @inheritDoc
    * @override
    */
    height: number;
    /**
     * @private
     * 获取数据源集合。
     */
    protected getArray(): any[];
    /**
     * @private
     * 获取项对象的深度。
     */
    protected getDepth(item: any, num?: number): number;
    /**
     * @private
     * 获取项对象的上一级的打开状态。
     */
    protected getParentOpenStatus(item: any): boolean;
    /**
     * @private
     * 渲染一个项对象。
     * @param cell 一个项对象。
     * @param index 项的索引。
     */
    protected renderItem(cell: Box, index: number): void;
    /**
     * @private
     */
    private onArrowClick;
    /**
     * 设置指定项索引的项对象的打开状态。
     * @param index 项索引。
     * @param isOpen 是否处于打开状态。
     */
    setItemState(index: number, isOpen: boolean): void;
    /**
     * 刷新项列表。
     */
    fresh(): void;
    /**
     * @inheritDoc
     * @override
     */
    /**
    * @inheritDoc
    * @override
    */
    dataSource: any;
    /**
     *  xml结构的数据源。
     */
    xml: XMLDocument;
    /**
     * @private
     * 解析并处理XML类型的数据源。
     */
    protected parseXml(xml: ChildNode, source: any[], nodeParent: any, isRoot: boolean): void;
    /**
     * @private
     * 处理数据项的打开状态。
     */
    protected parseOpenStatus(oldSource: any[], newSource: any[]): void;
    /**
     * @private
     * 判断两个项对象在树结构中的父节点是否相同。
     * @param item1 项对象。
     * @param item2 项对象。
     * @return 如果父节点相同值为true，否则值为false。
     */
    protected isSameParent(item1: any, item2: any): boolean;
    /**
     * 表示选择的树节点项的<code>path</code>属性值。
     */
    readonly selectedPath: string;
    /**
     * 更新项列表，显示指定键名的数据项。
     * @param	key 键名。
     */
    filter(key: string): void;
    /**
     * @private
     * 获取数据源中指定键名的值。
     */
    private getFilterSource;
}
