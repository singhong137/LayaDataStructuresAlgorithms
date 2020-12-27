/**
 * 纹理的过滤模式。
 */
export var FilterMode;
(function (FilterMode) {
    /**点过滤。*/
    FilterMode[FilterMode["Point"] = 0] = "Point";
    /**双线性过滤。*/
    FilterMode[FilterMode["Bilinear"] = 1] = "Bilinear";
    /**三线性过滤。*/
    FilterMode[FilterMode["Trilinear"] = 2] = "Trilinear";
})(FilterMode || (FilterMode = {}));
