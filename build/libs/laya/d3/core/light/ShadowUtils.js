import { LayaGL } from "../../../layagl/LayaGL";
import { FilterMode } from "../../../resource/FilterMode";
import { RenderTextureFormat } from "../../../resource/RenderTextureFormat";
import { WarpMode } from "../../../resource/WrapMode";
import { BoundFrustum, FrustumCorner } from "../../math/BoundFrustum";
import { MathUtils3D } from "../../math/MathUtils3D";
import { Matrix4x4 } from "../../math/Matrix4x4";
import { Plane } from "../../math/Plane";
import { Vector3 } from "../../math/Vector3";
import { RenderTexture } from "../../resource/RenderTexture";
import { Utils3D } from "../../utils/Utils3D";
import { LightType } from "./LightSprite";
import { ShadowCascadesMode } from "./ShadowCascadesMode";
import { ShadowMode } from "./ShadowMode";
import { SystemUtils } from "../../../webgl/SystemUtils";
/**
 * @internal
 */
var FrustumFace;
(function (FrustumFace) {
    FrustumFace[FrustumFace["Near"] = 0] = "Near";
    FrustumFace[FrustumFace["Far"] = 1] = "Far";
    FrustumFace[FrustumFace["Left"] = 2] = "Left";
    FrustumFace[FrustumFace["Right"] = 3] = "Right";
    FrustumFace[FrustumFace["Bottom"] = 4] = "Bottom";
    FrustumFace[FrustumFace["Top"] = 5] = "Top";
})(FrustumFace || (FrustumFace = {}));
/**
 * @internal
 */
export class ShadowUtils {
    /**
    * @internal
    */
    static supportShadow() {
        return LayaGL.layaGPUInstance._isWebGL2 || SystemUtils.supportRenderTextureFormat(RenderTextureFormat.Depth);
    }
    /**
     * @internal
     */
    static init() {
        //some const value,only init once here.
        if (LayaGL.layaGPUInstance._isWebGL2)
            ShadowUtils._shadowTextureFormat = RenderTextureFormat.ShadowMap;
        else
            ShadowUtils._shadowTextureFormat = RenderTextureFormat.Depth;
    }
    /**
     * @internal
     */
    static getTemporaryShadowTexture(witdh, height, depthFormat) {
        var shadowMap = RenderTexture.createFromPool(witdh, height, ShadowUtils._shadowTextureFormat, depthFormat);
        shadowMap.filterMode = FilterMode.Bilinear;
        shadowMap.wrapModeU = WarpMode.Clamp;
        shadowMap.wrapModeV = WarpMode.Clamp;
        return shadowMap;
    }
    /**
     * @internal
     */
    static getShadowBias(light, shadowProjectionMatrix, shadowResolution, out) {
        var frustumSize;
        if (light._lightType == LightType.Directional) {
            // Frustum size is guaranteed to be a cube as we wrap shadow frustum around a sphere
            // elements[0] = 2.0 / (right - left)
            frustumSize = 2.0 / shadowProjectionMatrix.elements[0];
        }
        else if (light._lightType == LightType.Spot) {
            // For perspective projections, shadow texel size varies with depth
            // It will only work well if done in receiver side in the pixel shader. Currently We
            // do bias on caster side in vertex shader. When we add shader quality tiers we can properly
            // handle this. For now, as a poor approximation we do a constant bias and compute the size of
            // the frustum as if it was orthogonal considering the size at mid point between near and far planes.
            // Depending on how big the light range is, it will be good enough with some tweaks in bias
            frustumSize = Math.tan(light.spotAngle * 0.5 * MathUtils3D.Deg2Rad) * light.range;
        }
        else {
            console.warn("ShadowUtils:Only spot and directional shadow casters are supported now.");
            frustumSize = 0.0;
        }
        // depth and normal bias scale is in shadowmap texel size in world space
        var texelSize = frustumSize / shadowResolution;
        var depthBias = -light._shadowDepthBias * texelSize;
        var normalBias = -light._shadowNormalBias * texelSize;
        if (light.shadowMode == ShadowMode.SoftHigh) {
            // TODO: depth and normal bias assume sample is no more than 1 texel away from shadowmap
            // This is not true with PCF. Ideally we need to do either
            // cone base bias (based on distance to center sample)
            // or receiver place bias based on derivatives.
            // For now we scale it by the PCF kernel size (5x5)
            const kernelRadius = 2.5;
            depthBias *= kernelRadius;
            normalBias *= kernelRadius;
        }
        out.setValue(depthBias, normalBias, 0.0, 0.0);
    }
    /**
     * @internal
     */
    static getCameraFrustumPlanes(cameraViewProjectMatrix, frustumPlanes) {
        BoundFrustum.getPlanesFromMatrix(cameraViewProjectMatrix, frustumPlanes[FrustumFace.Near], frustumPlanes[FrustumFace.Far], frustumPlanes[FrustumFace.Left], frustumPlanes[FrustumFace.Right], frustumPlanes[FrustumFace.Top], frustumPlanes[FrustumFace.Bottom]);
    }
    /**
    * @internal
    */
    static getFarWithRadius(radius, denominator) {
        // use the frustum side as the radius and get the far distance form camera.
        // var tFov: number = Math.tan(fov * 0.5);// get this the equation using Pythagorean
        // return Math.sqrt(radius * radius / (1.0 + tFov * tFov * (aspectRatio * aspectRatio + 1.0)));
        return Math.sqrt(radius * radius / denominator);
    }
    /**
    * @internal
    */
    static getCascadesSplitDistance(twoSplitRatio, fourSplitRatio, cameraNear, shadowFar, fov, aspectRatio, cascadesMode, out) {
        out[0] = cameraNear;
        var range = shadowFar - cameraNear;
        var tFov = Math.tan(fov * 0.5);
        var denominator = 1.0 + tFov * tFov * (aspectRatio * aspectRatio + 1.0);
        switch (cascadesMode) {
            case ShadowCascadesMode.NoCascades:
                out[1] = ShadowUtils.getFarWithRadius(shadowFar, denominator);
                break;
            case ShadowCascadesMode.TwoCascades:
                out[1] = ShadowUtils.getFarWithRadius(cameraNear + range * twoSplitRatio, denominator);
                out[2] = ShadowUtils.getFarWithRadius(shadowFar, denominator);
                break;
            case ShadowCascadesMode.FourCascades:
                out[1] = ShadowUtils.getFarWithRadius(cameraNear + range * fourSplitRatio.x, denominator);
                out[2] = ShadowUtils.getFarWithRadius(cameraNear + range * fourSplitRatio.y, denominator);
                out[3] = ShadowUtils.getFarWithRadius(cameraNear + range * fourSplitRatio.z, denominator);
                out[4] = ShadowUtils.getFarWithRadius(shadowFar, denominator);
                break;
        }
    }
    /**
     * @internal
     */
    static applySliceTransform(shadowSliceData, atlasWidth, atlasHeight, cascadeIndex, outShadowMatrices) {
        // Apply shadow slice scale and offset
        var sliceE = ShadowUtils._tempMatrix0.elements;
        var oneOverAtlasWidth = 1.0 / atlasWidth;
        var oneOverAtlasHeight = 1.0 / atlasHeight;
        sliceE[0] = shadowSliceData.resolution * oneOverAtlasWidth; //scale
        sliceE[5] = shadowSliceData.resolution * oneOverAtlasHeight;
        sliceE[12] = shadowSliceData.offsetX * oneOverAtlasWidth; //offset
        sliceE[13] = shadowSliceData.offsetY * oneOverAtlasHeight;
        sliceE[1] = sliceE[2] = sliceE[2] = sliceE[4] = sliceE[6] = sliceE[7] = sliceE[8] = sliceE[9] = sliceE[11] = sliceE[14] = 0;
        sliceE[10] = sliceE[15] = 1;
        var offset = cascadeIndex * 16;
        Utils3D._mulMatrixArray(sliceE, outShadowMatrices, offset, outShadowMatrices, offset);
    }
    /**
     * @internal
     */
    static getDirectionLightShadowCullPlanes(cameraFrustumPlanes, cascadeIndex, splitDistance, cameraNear, direction, shadowSliceData) {
        // http://lspiroengine.com/?p=187
        var frustumCorners = ShadowUtils._frustumCorners;
        var backPlaneFaces = ShadowUtils._backPlaneFaces;
        var planeNeighbors = ShadowUtils._frustumPlaneNeighbors;
        var twoPlaneCorners = ShadowUtils._frustumTwoPlaneCorners;
        var edgePlanePoint2 = ShadowUtils._edgePlanePoint2;
        var out = shadowSliceData.cullPlanes;
        // cameraFrustumPlanes is share
        var near = cameraFrustumPlanes[FrustumFace.Near], far = cameraFrustumPlanes[FrustumFace.Far];
        var left = cameraFrustumPlanes[FrustumFace.Left], right = cameraFrustumPlanes[FrustumFace.Right];
        var bottom = cameraFrustumPlanes[FrustumFace.Bottom], top = cameraFrustumPlanes[FrustumFace.Top];
        // adjustment the near/far plane
        var splitNearDistance = splitDistance[cascadeIndex] - cameraNear;
        var splitNear = ShadowUtils._adjustNearPlane;
        var splitFar = ShadowUtils._adjustFarPlane;
        near.normal.cloneTo(splitNear.normal);
        far.normal.cloneTo(splitFar.normal);
        splitNear.distance = near.distance - splitNearDistance;
        splitFar.distance = Math.min(-near.distance + shadowSliceData.sphereCenterZ + shadowSliceData.splitBoundSphere.radius, far.distance); //do a clamp is the sphere is out of range the far plane
        BoundFrustum.get3PlaneInterPoint(splitNear, bottom, right, frustumCorners[FrustumCorner.nearBottomRight]);
        BoundFrustum.get3PlaneInterPoint(splitNear, top, right, frustumCorners[FrustumCorner.nearTopRight]);
        BoundFrustum.get3PlaneInterPoint(splitNear, top, left, frustumCorners[FrustumCorner.nearTopLeft]);
        BoundFrustum.get3PlaneInterPoint(splitNear, bottom, left, frustumCorners[FrustumCorner.nearBottomLeft]);
        BoundFrustum.get3PlaneInterPoint(splitFar, bottom, right, frustumCorners[FrustumCorner.FarBottomRight]);
        BoundFrustum.get3PlaneInterPoint(splitFar, top, right, frustumCorners[FrustumCorner.FarTopRight]);
        BoundFrustum.get3PlaneInterPoint(splitFar, top, left, frustumCorners[FrustumCorner.FarTopLeft]);
        BoundFrustum.get3PlaneInterPoint(splitFar, bottom, left, frustumCorners[FrustumCorner.FarBottomLeft]);
        var backIndex = 0;
        for (var i = 0; i < 6; i++) { // meybe 3、4、5(light eye is at far, forward is near, or orth camera is any axis)
            var plane;
            switch (i) {
                case FrustumFace.Near:
                    plane = splitNear;
                    break;
                case FrustumFace.Far:
                    plane = splitFar;
                    break;
                default:
                    plane = cameraFrustumPlanes[i];
                    break;
            }
            if (Vector3.dot(plane.normal, direction) < 0.0) {
                plane.cloneTo(out[backIndex]);
                backPlaneFaces[backIndex] = i;
                backIndex++;
            }
        }
        var edgeIndex = backIndex;
        for (var i = 0; i < backIndex; i++) {
            var backFace = backPlaneFaces[i];
            var neighborFaces = planeNeighbors[backFace];
            for (var j = 0; j < 4; j++) {
                var neighborFace = neighborFaces[j];
                var notBackFace = true;
                for (var k = 0; k < backIndex; k++)
                    if (neighborFace == backPlaneFaces[k]) {
                        notBackFace = false;
                        break;
                    }
                if (notBackFace) {
                    var corners = twoPlaneCorners[backFace][neighborFace];
                    var point0 = frustumCorners[corners[0]];
                    var point1 = frustumCorners[corners[1]];
                    Vector3.add(point0, direction, edgePlanePoint2);
                    Plane.createPlaneBy3P(point0, point1, edgePlanePoint2, out[edgeIndex++]);
                }
            }
        }
        shadowSliceData.cullPlaneCount = edgeIndex;
    }
    /**
     * @internal
     */
    static getBoundSphereByFrustum(near, far, fov, aspectRatio, cameraPos, forward, outBoundSphere) {
        // https://lxjk.github.io/2017/04/15/Calculate-Minimal-Bounding-Sphere-of-Frustum.html
        var centerZ;
        var radius;
        var k = Math.sqrt(1.0 + aspectRatio * aspectRatio) * Math.tan(fov / 2.0);
        var k2 = k * k;
        var farSNear = far - near;
        var farANear = far + near;
        if (k2 > farSNear / farANear) {
            centerZ = far;
            radius = far * k;
        }
        else {
            centerZ = 0.5 * farANear * (1 + k2);
            radius = 0.5 * Math.sqrt(farSNear * farSNear + 2.0 * (far * far + near * near) * k2 + farANear * farANear * k2 * k2);
        }
        var center = outBoundSphere.center;
        outBoundSphere.radius = radius;
        Vector3.scale(forward, centerZ, center);
        Vector3.add(cameraPos, center, center);
        return centerZ;
    }
    /**
     * @inernal
     */
    static getMaxTileResolutionInAtlas(atlasWidth, atlasHeight, tileCount) {
        var resolution = Math.min(atlasWidth, atlasHeight);
        var currentTileCount = Math.floor(atlasWidth / resolution) * Math.floor(atlasHeight / resolution);
        while (currentTileCount < tileCount) {
            resolution = Math.floor(resolution >> 1);
            currentTileCount = Math.floor(atlasWidth / resolution) * Math.floor(atlasHeight / resolution);
        }
        return resolution;
    }
    /**
     * @internal
     */
    static getDirectionalLightMatrices(lightUp, lightSide, lightForward, cascadeIndex, nearPlane, shadowResolution, shadowSliceData, shadowMatrices) {
        var boundSphere = shadowSliceData.splitBoundSphere;
        // To solve shdow swimming problem.
        var center = boundSphere.center;
        var radius = boundSphere.radius;
        var halfShadowResolution = shadowResolution / 2;
        // Add border to prject edge pixel PCF.
        // Improve:the clip planes not conside the border,but I think is OK,because the object can clip is not continuous.
        var borderRadius = radius * halfShadowResolution / (halfShadowResolution - ShadowUtils.atlasBorderSize);
        var borderDiam = borderRadius * 2.0;
        var sizeUnit = shadowResolution / borderDiam;
        var radiusUnit = borderDiam / shadowResolution;
        var upLen = Math.ceil(Vector3.dot(center, lightUp) * sizeUnit) * radiusUnit;
        var sideLen = Math.ceil(Vector3.dot(center, lightSide) * sizeUnit) * radiusUnit;
        var forwardLen = Vector3.dot(center, lightForward);
        center.x = lightUp.x * upLen + lightSide.x * sideLen + lightForward.x * forwardLen;
        center.y = lightUp.y * upLen + lightSide.y * sideLen + lightForward.y * forwardLen;
        center.z = lightUp.z * upLen + lightSide.z * sideLen + lightForward.z * forwardLen;
        // Direction light use shadow pancaking tech,do special dispose with nearPlane.
        var origin = shadowSliceData.position;
        var viewMatrix = shadowSliceData.viewMatrix;
        var projectMatrix = shadowSliceData.projectionMatrix;
        var viewProjectMatrix = shadowSliceData.viewProjectMatrix;
        shadowSliceData.resolution = shadowResolution;
        shadowSliceData.offsetX = (cascadeIndex % 2) * shadowResolution;
        shadowSliceData.offsetY = Math.floor(cascadeIndex / 2) * shadowResolution;
        Vector3.scale(lightForward, radius + nearPlane, origin);
        Vector3.subtract(center, origin, origin);
        Matrix4x4.createLookAt(origin, center, lightUp, viewMatrix);
        Matrix4x4.createOrthoOffCenter(-borderRadius, borderRadius, -borderRadius, borderRadius, 0.0, radius * 2.0 + nearPlane, projectMatrix);
        Matrix4x4.multiply(projectMatrix, viewMatrix, viewProjectMatrix);
        Utils3D._mulMatrixArray(ShadowUtils._shadowMapScaleOffsetMatrix.elements, viewProjectMatrix.elements, 0, shadowMatrices, cascadeIndex * 16);
    }
    /**
     * @internal
     */
    static prepareShadowReceiverShaderValues(light, shadowMapWidth, shadowMapHeight, shadowSliceDatas, cascadeCount, shadowMapSize, shadowParams, shadowMatrices, splitBoundSpheres) {
        shadowMapSize.setValue(1.0 / shadowMapWidth, 1.0 / shadowMapHeight, shadowMapWidth, shadowMapHeight);
        shadowParams.setValue(light._shadowStrength, 0.0, 0.0, 0.0);
        if (cascadeCount > 1) {
            const matrixFloatCount = 16;
            for (var i = cascadeCount * matrixFloatCount, n = 4 * matrixFloatCount; i < n; i++) //the last matrix is always ZERO
                shadowMatrices[i] = 0.0; //set Matrix4x4.ZERO to project the cascade index is 4
            for (var i = 0; i < cascadeCount; i++) {
                var boundSphere = shadowSliceDatas[i].splitBoundSphere;
                var center = boundSphere.center;
                var radius = boundSphere.radius;
                var offset = i * 4;
                splitBoundSpheres[offset] = center.x;
                splitBoundSpheres[offset + 1] = center.y;
                splitBoundSpheres[offset + 2] = center.z;
                splitBoundSpheres[offset + 3] = radius * radius;
            }
            const sphereFloatCount = 4;
            for (var i = cascadeCount * sphereFloatCount, n = 4 * sphereFloatCount; i < n; i++)
                splitBoundSpheres[i] = 0.0; //set Matrix4x4.ZERO to project the cascade index is 4
        }
    }
}
/** @internal */
ShadowUtils._tempMatrix0 = new Matrix4x4();
/** @internal */
ShadowUtils._shadowMapScaleOffsetMatrix = new Matrix4x4(0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.5, 0.5, 0.0, 1.0);
/** @internal */
ShadowUtils._frustumCorners = [new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3()];
/** @internal */
ShadowUtils._adjustNearPlane = new Plane(new Vector3());
/** @internal */
ShadowUtils._adjustFarPlane = new Plane(new Vector3());
/** @internal */
ShadowUtils._backPlaneFaces = new Array(5);
/** @internal */
ShadowUtils._edgePlanePoint2 = new Vector3();
/** @internal */
ShadowUtils._frustumPlaneNeighbors = [
    [FrustumFace.Left, FrustumFace.Right, FrustumFace.Top, FrustumFace.Bottom],
    [FrustumFace.Left, FrustumFace.Right, FrustumFace.Top, FrustumFace.Bottom],
    [FrustumFace.Near, FrustumFace.Far, FrustumFace.Top, FrustumFace.Bottom],
    [FrustumFace.Near, FrustumFace.Far, FrustumFace.Top, FrustumFace.Bottom],
    [FrustumFace.Near, FrustumFace.Far, FrustumFace.Left, FrustumFace.Right],
    [FrustumFace.Near, FrustumFace.Far, FrustumFace.Left, FrustumFace.Right]
]; // top
/** @internal */
ShadowUtils._frustumTwoPlaneCorners = [
    [[FrustumCorner.unknown, FrustumCorner.unknown] /* near */, [FrustumCorner.unknown, FrustumCorner.unknown] /* far */, [FrustumCorner.nearBottomLeft, FrustumCorner.nearTopLeft] /* left */, [FrustumCorner.nearTopRight, FrustumCorner.nearBottomRight] /* right */, [FrustumCorner.nearBottomRight, FrustumCorner.nearBottomLeft] /* bottom */, [FrustumCorner.nearTopLeft, FrustumCorner.nearTopRight] /* top */],
    [[FrustumCorner.unknown, FrustumCorner.unknown] /* near */, [FrustumCorner.unknown, FrustumCorner.unknown] /* far */, [FrustumCorner.FarTopLeft, FrustumCorner.FarBottomLeft] /* left */, [FrustumCorner.FarBottomRight, FrustumCorner.FarTopRight] /* right */, [FrustumCorner.FarBottomLeft, FrustumCorner.FarBottomRight] /* bottom */, [FrustumCorner.FarTopRight, FrustumCorner.FarTopLeft] /* top */],
    [[FrustumCorner.nearTopLeft, FrustumCorner.nearBottomLeft] /* near */, [FrustumCorner.FarBottomLeft, FrustumCorner.FarTopLeft] /* far */, [FrustumCorner.unknown, FrustumCorner.unknown] /* left */, [FrustumCorner.unknown, FrustumCorner.unknown] /* right */, [FrustumCorner.nearBottomLeft, FrustumCorner.FarBottomLeft] /* bottom */, [FrustumCorner.FarTopLeft, FrustumCorner.nearTopLeft] /* top */],
    [[FrustumCorner.nearBottomRight, FrustumCorner.nearTopRight] /* near */, [FrustumCorner.FarTopRight, FrustumCorner.FarBottomRight] /* far */, [FrustumCorner.unknown, FrustumCorner.unknown] /* left */, [FrustumCorner.unknown, FrustumCorner.unknown] /* right */, [FrustumCorner.FarBottomRight, FrustumCorner.nearBottomRight] /* bottom */, [FrustumCorner.nearTopRight, FrustumCorner.FarTopRight] /* top */],
    [[FrustumCorner.nearBottomLeft, FrustumCorner.nearBottomRight] /* near */, [FrustumCorner.FarBottomRight, FrustumCorner.FarBottomLeft] /* far */, [FrustumCorner.FarBottomLeft, FrustumCorner.nearBottomLeft] /* left */, [FrustumCorner.nearBottomRight, FrustumCorner.FarBottomRight] /* right */, [FrustumCorner.unknown, FrustumCorner.unknown] /* bottom */, [FrustumCorner.unknown, FrustumCorner.unknown] /* top */],
    [[FrustumCorner.nearTopRight, FrustumCorner.nearTopLeft] /* near */, [FrustumCorner.FarTopLeft, FrustumCorner.FarTopRight] /* far */, [FrustumCorner.nearTopLeft, FrustumCorner.FarTopLeft] /* left */, [FrustumCorner.FarTopRight, FrustumCorner.nearTopRight], [FrustumCorner.unknown /* right */, FrustumCorner.unknown] /* bottom */, [FrustumCorner.unknown, FrustumCorner.unknown] /* top */] // top
];
/** @internal */
ShadowUtils.atlasBorderSize = 4.0; //now max shadow sample tent is 5x5,atlas borderSize at leate 3=ceil(2.5),and +1 pixle is for global border for no cascade mode.
