/**
 * 阴影得级联模式。
 */
export var ShadowCascadesMode;
(function (ShadowCascadesMode) {
    /** 无级联。 */
    ShadowCascadesMode[ShadowCascadesMode["NoCascades"] = 0] = "NoCascades";
    /** 二级级联。 */
    ShadowCascadesMode[ShadowCascadesMode["TwoCascades"] = 1] = "TwoCascades";
    /** 四级级联。 */
    ShadowCascadesMode[ShadowCascadesMode["FourCascades"] = 2] = "FourCascades";
})(ShadowCascadesMode || (ShadowCascadesMode = {}));
