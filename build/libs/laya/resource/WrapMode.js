/**
 * 纹理寻址模式。
 */
export var WarpMode;
(function (WarpMode) {
    /** 循环平铺。*/
    WarpMode[WarpMode["Repeat"] = 0] = "Repeat";
    /** 超过UV边界后采用最后一个像素。*/
    WarpMode[WarpMode["Clamp"] = 1] = "Clamp";
})(WarpMode || (WarpMode = {}));
