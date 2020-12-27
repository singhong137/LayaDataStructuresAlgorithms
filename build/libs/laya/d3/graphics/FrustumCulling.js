import { LayaGL } from "../../layagl/LayaGL";
import { Render } from "../../renders/Render";
import { Stat } from "../../utils/Stat";
import { Color } from "../math/Color";
import { Vector3 } from "../math/Vector3";
import { Utils3D } from "../utils/Utils3D";
import { DynamicBatchManager } from "./DynamicBatchManager";
import { StaticBatchManager } from "./StaticBatchManager";
export class CameraCullInfo {
}
export class ShadowCullInfo {
}
/**
 * @internal
 * <code>FrustumCulling</code> 类用于裁剪。
 */
export class FrustumCulling {
    /**
     * @internal
     */
    static __init__() {
        if (Render.supportWebGLPlusCulling) { //[NATIVE]
            FrustumCulling._cullingBufferLength = 0;
            FrustumCulling._cullingBuffer = new Float32Array(4096);
        }
    }
    /**
     * @internal
     */
    static _drawTraversalCullingBound(renderList, debugTool) {
        var renders = renderList.elements;
        for (var i = 0, n = renderList.length; i < n; i++) {
            var color = FrustumCulling._tempColor0;
            color.r = 0;
            color.g = 1;
            color.b = 0;
            color.a = 1;
            Utils3D._drawBound(debugTool, renders[i].bounds._getBoundBox(), color);
        }
    }
    /**
     * @internal
     */
    static _traversalCulling(cameraCullInfo, scene, context, renderList, customShader, replacementTag, isShadowCasterCull) {
        var renders = renderList.elements;
        var boundFrustum = cameraCullInfo.boundFrustum;
        var camPos = cameraCullInfo.position;
        var cullMask = cameraCullInfo.cullingMask;
        var loopCount = Stat.loopCount;
        for (var i = 0, n = renderList.length; i < n; i++) {
            var render = renders[i];
            var canPass;
            if (isShadowCasterCull)
                canPass = render._castShadow && render._enable;
            else
                canPass = ((Math.pow(2, render._owner._layer) & cullMask) != 0) && render._enable;
            if (canPass) {
                Stat.frustumCulling++;
                if (!cameraCullInfo.useOcclusionCulling || render._needRender(boundFrustum, context)) {
                    render._renderMark = loopCount;
                    render._distanceForSort = Vector3.distance(render.bounds.getCenter(), camPos); //TODO:合并计算浪费,或者合并后取平均值
                    var elements = render._renderElements;
                    for (var j = 0, m = elements.length; j < m; j++)
                        elements[j]._update(scene, context, customShader, replacementTag);
                }
            }
        }
    }
    /**
     * @internal
     */
    static renderObjectCulling(cameraCullInfo, scene, context, customShader, replacementTag, isShadowCasterCull) {
        var i, n;
        var opaqueQueue = scene._opaqueQueue;
        var transparentQueue = scene._transparentQueue;
        var renderList = scene._renders;
        opaqueQueue.clear();
        transparentQueue.clear();
        var staticBatchManagers = StaticBatchManager._managers;
        for (i = 0, n = staticBatchManagers.length; i < n; i++)
            staticBatchManagers[i]._clear();
        var dynamicBatchManagers = DynamicBatchManager._managers;
        for (i = 0, n = dynamicBatchManagers.length; i < n; i++)
            dynamicBatchManagers[i]._clear();
        var octree = scene._octree;
        if (octree) {
            octree.updateMotionObjects();
            octree.shrinkRootIfPossible();
            octree.getCollidingWithFrustum(cameraCullInfo, context, customShader, replacementTag, isShadowCasterCull);
        }
        //else {//包围盒不完善的节点走遍历裁剪
        FrustumCulling._traversalCulling(cameraCullInfo, scene, context, renderList, customShader, replacementTag, isShadowCasterCull);
        //}
        if (FrustumCulling.debugFrustumCulling) {
            var debugTool = scene._debugTool;
            debugTool.clear();
            if (octree) {
                octree.drawAllBounds(debugTool);
                octree.drawAllObjects(debugTool);
            }
            //else {//包围盒不完善的节点走遍历裁剪
            FrustumCulling._drawTraversalCullingBound(renderList, debugTool);
            //}
        }
        var count = opaqueQueue.elements.length;
        (count > 0) && (opaqueQueue._quickSort(0, count - 1));
        count = transparentQueue.elements.length;
        (count > 0) && (transparentQueue._quickSort(0, count - 1));
    }
    /**
     * @internal
     */
    static cullingShadow(cullInfo, scene, context) {
        var opaqueQueue = scene._opaqueQueue;
        var transparentQueue = scene._transparentQueue;
        var renderList = scene._renders;
        opaqueQueue.clear();
        transparentQueue.clear();
        var staticBatchManagers = StaticBatchManager._managers;
        for (var i = 0, n = staticBatchManagers.length; i < n; i++)
            staticBatchManagers[i]._clear();
        var dynamicBatchManagers = DynamicBatchManager._managers;
        for (var i = 0, n = dynamicBatchManagers.length; i < n; i++)
            dynamicBatchManagers[i]._clear();
        var renderList = scene._renders;
        var position = cullInfo.position;
        var cullPlaneCount = cullInfo.cullPlaneCount;
        var cullPlanes = cullInfo.cullPlanes;
        var cullSphere = cullInfo.cullSphere;
        var direction = cullInfo.direction;
        var renders = renderList.elements;
        var loopCount = Stat.loopCount;
        for (var i = 0, n = renderList.length; i < n; i++) {
            var render = renders[i];
            var canPass = render._castShadow && render._enable;
            if (canPass) {
                Stat.frustumCulling++;
                var bounds = render.bounds;
                var min = bounds.getMin();
                var max = bounds.getMax();
                var minX = min.x;
                var minY = min.y;
                var minZ = min.z;
                var maxX = max.x;
                var maxY = max.y;
                var maxZ = max.z;
                //TODO:通过相机裁剪直接pass
                var pass = true;
                // cull by planes
                // Improve:Maybe use sphre and direction cull can savle the far plane cull
                for (var j = 0; j < cullPlaneCount; j++) {
                    var plane = cullPlanes[j];
                    var normal = plane.normal;
                    if (plane.distance + (normal.x * (normal.x < 0.0 ? minX : maxX)) + (normal.y * (normal.y < 0.0 ? minY : maxY)) + (normal.z * (normal.z < 0.0 ? minZ : maxZ)) < 0.0) {
                        pass = false;
                        break;
                    }
                }
                if (pass) {
                    render._renderMark = loopCount;
                    render._distanceForSort = Vector3.distance(bounds.getCenter(), position); //TODO:合并计算浪费,或者合并后取平均值
                    var elements = render._renderElements;
                    for (var j = 0, m = elements.length; j < m; j++)
                        elements[j]._update(scene, context, null, null);
                }
            }
        }
        return opaqueQueue.elements.length > 0 ? true : false;
    }
    /**
     * @internal [NATIVE]
     */
    static renderObjectCullingNative(camera, scene, context, renderList, customShader, replacementTag) {
        var i, n, j, m;
        var opaqueQueue = scene._opaqueQueue;
        var transparentQueue = scene._transparentQueue;
        opaqueQueue.clear();
        transparentQueue.clear();
        var staticBatchManagers = StaticBatchManager._managers;
        for (i = 0, n = staticBatchManagers.length; i < n; i++)
            staticBatchManagers[i]._clear();
        var dynamicBatchManagers = DynamicBatchManager._managers;
        for (i = 0, n = dynamicBatchManagers.length; i < n; i++)
            dynamicBatchManagers[i]._clear();
        var validCount = renderList.length;
        var renders = renderList.elements;
        for (i = 0; i < validCount; i++) {
            renders[i].bounds;
            renders[i]._updateForNative && renders[i]._updateForNative(context);
        }
        var boundFrustum = camera.boundFrustum;
        FrustumCulling.cullingNative(camera._boundFrustumBuffer, FrustumCulling._cullingBuffer, scene._cullingBufferIndices, validCount, scene._cullingBufferResult);
        var loopCount = Stat.loopCount;
        var camPos = context.camera._transform.position;
        for (i = 0; i < validCount; i++) {
            var render = renders[i];
            if (!camera.useOcclusionCulling || (camera._isLayerVisible(render._owner._layer) && render._enable && scene._cullingBufferResult[i])) { //TODO:需要剥离部分函数
                render._renderMark = loopCount;
                render._distanceForSort = Vector3.distance(render.bounds.getCenter(), camPos); //TODO:合并计算浪费,或者合并后取平均值
                var elements = render._renderElements;
                for (j = 0, m = elements.length; j < m; j++) {
                    var element = elements[j];
                    element._update(scene, context, customShader, replacementTag);
                }
            }
        }
        var count = opaqueQueue.elements.length;
        (count > 0) && (opaqueQueue._quickSort(0, count - 1));
        count = transparentQueue.elements.length;
        (count > 0) && (transparentQueue._quickSort(0, count - 1));
    }
    /**
     * @internal [NATIVE]
     */
    static cullingNative(boundFrustumBuffer, cullingBuffer, cullingBufferIndices, cullingCount, cullingBufferResult) {
        return LayaGL.instance.culling(boundFrustumBuffer, cullingBuffer, cullingBufferIndices, cullingCount, cullingBufferResult);
    }
}
/**@internal */
FrustumCulling._tempColor0 = new Color();
/**@internal */
FrustumCulling._tempVector0 = new Vector3();
/**@internal */
FrustumCulling._cameraCullInfo = new CameraCullInfo();
/**@internal */
FrustumCulling._shadowCullInfo = new ShadowCullInfo();
/**@internal */
FrustumCulling.debugFrustumCulling = false;
