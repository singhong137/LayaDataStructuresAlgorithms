/**
 * 阴影模式。
 */
export var ShadowMode;
(function (ShadowMode) {
    /* 不产生阴影。*/
    ShadowMode[ShadowMode["None"] = 0] = "None";
    /* 硬阴影，对性能要求较低。*/
    ShadowMode[ShadowMode["Hard"] = 1] = "Hard";
    /* 低强度软阴影，对性能要求一般。*/
    ShadowMode[ShadowMode["SoftLow"] = 2] = "SoftLow";
    /* 高强度软阴影,对性能要求较高。*/
    ShadowMode[ShadowMode["SoftHigh"] = 3] = "SoftHigh";
})(ShadowMode || (ShadowMode = {}));
