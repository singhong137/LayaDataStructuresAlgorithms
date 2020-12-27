import { LayaGL } from "../../layagl/LayaGL";
import { RenderTextureDepthFormat } from "../../resource/RenderTextureFormat";
import { BaseCamera } from "../core/BaseCamera";
import { Camera } from "../core/Camera";
import { ShadowCascadesMode } from "../core/light/ShadowCascadesMode";
import { ShadowMode } from "../core/light/ShadowMode";
import { ShadowUtils } from "../core/light/ShadowUtils";
import { Scene3DShaderDeclaration } from "../core/scene/Scene3DShaderDeclaration";
import { FrustumCulling } from "../graphics/FrustumCulling";
import { MathUtils3D } from "../math/MathUtils3D";
import { Matrix4x4 } from "../math/Matrix4x4";
import { Plane } from "../math/Plane";
import { Vector3 } from "../math/Vector3";
import { Vector4 } from "../math/Vector4";
import { RenderTexture } from "../resource/RenderTexture";
import { Shader3D } from "../shader/Shader3D";
import { ShaderData } from "../shader/ShaderData";
import { ShadowSliceData } from "./ShadowSliceData";
/**
 * @internal
 */
export class ShadowCasterPass {
    constructor() {
        /** @internal */
        this._shadowBias = new Vector4();
        /** @internal */
        this._shadowParams = new Vector4();
        /** @internal */
        this._shadowMapSize = new Vector4();
        /** @internal */
        this._shadowMatrices = new Float32Array(16 * (ShadowCasterPass._maxCascades));
        /**@internal */
        this._splitBoundSpheres = new Float32Array(ShadowCasterPass._maxCascades * 4);
        /** @internal */
        this._cascadeCount = 0;
        /** @internal */
        this._shadowMapWidth = 0;
        /** @internal */
        this._shadowMapHeight = 0;
        /** @internal */
        this._shadowSliceDatas = [new ShadowSliceData(), new ShadowSliceData(), new ShadowSliceData(), new ShadowSliceData()];
        /** @internal */
        this._lightUp = new Vector3();
        /** @internal */
        this._lightSide = new Vector3();
        /** @internal */
        this._lightForward = new Vector3();
    }
    /**
     * @internal
     */
    _setupShadowCasterShaderValues(context, shaderValues, shadowSliceData, direction, shadowBias) {
        shaderValues.setVector(ShadowCasterPass.SHADOW_BIAS, shadowBias);
        shaderValues.setVector3(ShadowCasterPass.SHADOW_LIGHT_DIRECTION, direction);
        var cameraSV = shadowSliceData.cameraShaderValue; //TODO:should optimization with shader upload.
        cameraSV.setMatrix4x4(BaseCamera.VIEWMATRIX, shadowSliceData.viewMatrix);
        cameraSV.setMatrix4x4(BaseCamera.PROJECTMATRIX, shadowSliceData.projectionMatrix);
        cameraSV.setMatrix4x4(BaseCamera.VIEWPROJECTMATRIX, shadowSliceData.viewProjectMatrix);
        context.viewMatrix = shadowSliceData.viewMatrix;
        context.projectionMatrix = shadowSliceData.projectionMatrix;
        context.projectionViewMatrix = shadowSliceData.viewProjectMatrix;
    }
    /**
     * @internal
     */
    _setupShadowReceiverShaderValues(shaderValues) {
        var light = this._light;
        if (light.shadowCascadesMode !== ShadowCascadesMode.NoCascades)
            shaderValues.addDefine(Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_CASCADE);
        else
            shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_CASCADE);
        switch (light.shadowMode) {
            case ShadowMode.Hard:
                shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SOFT_SHADOW_LOW);
                shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SOFT_SHADOW_HIGH);
                break;
            case ShadowMode.SoftLow:
                shaderValues.addDefine(Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SOFT_SHADOW_LOW);
                shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SOFT_SHADOW_HIGH);
                break;
            case ShadowMode.SoftHigh:
                shaderValues.addDefine(Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SOFT_SHADOW_HIGH);
                shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SOFT_SHADOW_LOW);
                break;
        }
        shaderValues.setTexture(ShadowCasterPass.SHADOW_MAP, this._shadowMap);
        shaderValues.setBuffer(ShadowCasterPass.SHADOW_MATRICES, this._shadowMatrices);
        shaderValues.setVector(ShadowCasterPass.SHADOW_MAP_SIZE, this._shadowMapSize);
        shaderValues.setVector(ShadowCasterPass.SHADOW_PARAMS, this._shadowParams);
        shaderValues.setBuffer(ShadowCasterPass.SHADOW_SPLIT_SPHERES, this._splitBoundSpheres);
    }
    /**
     * @internal
     */
    update(camera, light) {
        this._light = light;
        var lightWorld = ShadowCasterPass._tempMatrix0;
        var lightWorldE = lightWorld.elements;
        var lightUp = this._lightUp;
        var lightSide = this._lightSide;
        var lightForward = this._lightForward;
        Matrix4x4.createFromQuaternion(light._transform.rotation, lightWorld); //to remove scale problem
        lightSide.setValue(lightWorldE[0], lightWorldE[1], lightWorldE[2]);
        lightUp.setValue(lightWorldE[4], lightWorldE[5], lightWorldE[6]);
        lightForward.setValue(-lightWorldE[8], -lightWorldE[9], -lightWorldE[10]);
        var atlasResolution = light._shadowResolution;
        var cascadesMode = light._shadowCascadesMode;
        var cascadesCount;
        var shadowTileResolution;
        var shadowMapWidth, shadowMapHeight;
        if (cascadesMode == ShadowCascadesMode.NoCascades) {
            cascadesCount = 1;
            shadowTileResolution = atlasResolution;
            shadowMapWidth = atlasResolution;
            shadowMapHeight = atlasResolution;
        }
        else {
            cascadesCount = cascadesMode == ShadowCascadesMode.TwoCascades ? 2 : 4;
            shadowTileResolution = ShadowUtils.getMaxTileResolutionInAtlas(atlasResolution, atlasResolution, cascadesCount);
            shadowMapWidth = shadowTileResolution * 2;
            shadowMapHeight = cascadesMode == ShadowCascadesMode.TwoCascades ? shadowTileResolution : shadowTileResolution * 2;
        }
        this._cascadeCount = cascadesCount;
        this._shadowMapWidth = shadowMapWidth;
        this._shadowMapHeight = shadowMapHeight;
        var splitDistance = ShadowCasterPass._cascadesSplitDistance;
        var frustumPlanes = ShadowCasterPass._frustumPlanes;
        var cameraNear = camera.nearPlane;
        var shadowFar = Math.min(camera.farPlane, light._shadowDistance);
        var shadowMatrices = this._shadowMatrices;
        var boundSpheres = this._splitBoundSpheres;
        ShadowUtils.getCascadesSplitDistance(light._shadowTwoCascadeSplits, light._shadowFourCascadeSplits, cameraNear, shadowFar, camera.fieldOfView * MathUtils3D.Deg2Rad, camera.aspectRatio, cascadesMode, splitDistance);
        ShadowUtils.getCameraFrustumPlanes(camera.projectionViewMatrix, frustumPlanes);
        var forward = ShadowCasterPass._tempVector30;
        camera._transform.getForward(forward);
        Vector3.normalize(forward, forward);
        for (var i = 0; i < cascadesCount; i++) {
            var sliceData = this._shadowSliceDatas[i];
            sliceData.sphereCenterZ = ShadowUtils.getBoundSphereByFrustum(splitDistance[i], splitDistance[i + 1], camera.fieldOfView * MathUtils3D.Deg2Rad, camera.aspectRatio, camera._transform.position, forward, sliceData.splitBoundSphere);
            ShadowUtils.getDirectionLightShadowCullPlanes(frustumPlanes, i, splitDistance, cameraNear, lightForward, sliceData);
            ShadowUtils.getDirectionalLightMatrices(lightUp, lightSide, lightForward, i, light._shadowNearPlane, shadowTileResolution, sliceData, shadowMatrices);
            if (cascadesCount > 1)
                ShadowUtils.applySliceTransform(sliceData, shadowMapWidth, shadowMapHeight, i, shadowMatrices);
        }
        ShadowUtils.prepareShadowReceiverShaderValues(light, shadowMapWidth, shadowMapHeight, this._shadowSliceDatas, cascadesCount, this._shadowMapSize, this._shadowParams, shadowMatrices, boundSpheres);
    }
    /**
     * @interal
     */
    render(context, scene) {
        var shaderValues = scene._shaderValues;
        context.pipelineMode = "ShadowCaster";
        ShaderData.setRuntimeValueMode(false);
        var shadowMap = this._shadowMap = ShadowUtils.getTemporaryShadowTexture(this._shadowMapWidth, this._shadowMapHeight, RenderTextureDepthFormat.DEPTH_16);
        shadowMap._start();
        var light = this._light;
        for (var i = 0, n = this._cascadeCount; i < n; i++) {
            var sliceData = this._shadowSliceDatas[i];
            ShadowUtils.getShadowBias(light, sliceData.projectionMatrix, sliceData.resolution, this._shadowBias);
            this._setupShadowCasterShaderValues(context, shaderValues, sliceData, this._lightForward, this._shadowBias);
            var shadowCullInfo = FrustumCulling._shadowCullInfo;
            shadowCullInfo.position = sliceData.position;
            shadowCullInfo.cullPlanes = sliceData.cullPlanes;
            shadowCullInfo.cullPlaneCount = sliceData.cullPlaneCount;
            shadowCullInfo.cullSphere = sliceData.splitBoundSphere;
            shadowCullInfo.direction = this._lightForward;
            var needRender = FrustumCulling.cullingShadow(shadowCullInfo, scene, context);
            context.cameraShaderValue = sliceData.cameraShaderValue;
            Camera._updateMark++;
            var gl = LayaGL.instance;
            var resolution = sliceData.resolution;
            var offsetX = sliceData.offsetX;
            var offsetY = sliceData.offsetY;
            gl.enable(gl.SCISSOR_TEST);
            gl.viewport(offsetX, offsetY, resolution, resolution);
            gl.scissor(offsetX, offsetY, resolution, resolution);
            gl.clear(gl.DEPTH_BUFFER_BIT);
            if (needRender) { // if one cascade have anything to render.
                gl.scissor(offsetX + 1, offsetY + 1, resolution - 2, resolution - 2); //for no cascade is for the edge,for cascade is for the beyond maxCascade pixel can use (0,0,0) trick sample the shadowMap
                scene._opaqueQueue._render(context); //阴影均为非透明队列
            }
        }
        shadowMap._end();
        this._setupShadowReceiverShaderValues(shaderValues);
        ShaderData.setRuntimeValueMode(true);
        context.pipelineMode = "Forward";
    }
    /**
     * @internal
     */
    cleanUp() {
        RenderTexture.recoverToPool(this._shadowMap);
        this._shadowMap = null;
        this._light = null;
    }
}
/**@internal */
ShadowCasterPass._tempVector30 = new Vector3();
/**@internal */
ShadowCasterPass._tempMatrix0 = new Matrix4x4();
/** @internal */
ShadowCasterPass.SHADOW_BIAS = Shader3D.propertyNameToID("u_ShadowBias");
/** @internal */
ShadowCasterPass.SHADOW_LIGHT_DIRECTION = Shader3D.propertyNameToID("u_ShadowLightDirection");
/** @internal */
ShadowCasterPass.SHADOW_SPLIT_SPHERES = Shader3D.propertyNameToID("u_ShadowSplitSpheres");
/** @internal */
ShadowCasterPass.SHADOW_MATRICES = Shader3D.propertyNameToID("u_ShadowMatrices");
/** @internal */
ShadowCasterPass.SHADOW_MAP_SIZE = Shader3D.propertyNameToID("u_ShadowMapSize");
/** @internal */
ShadowCasterPass.SHADOW_MAP = Shader3D.propertyNameToID("u_ShadowMap");
/** @internal */
ShadowCasterPass.SHADOW_PARAMS = Shader3D.propertyNameToID("u_ShadowParams");
/** @internal */
ShadowCasterPass._maxCascades = 4;
/**@internal */
ShadowCasterPass._cascadesSplitDistance = new Array(ShadowCasterPass._maxCascades + 1);
/** @internal */
ShadowCasterPass._frustumPlanes = new Array(new Plane(new Vector3()), new Plane(new Vector3()), new Plane(new Vector3()), new Plane(new Vector3()), new Plane(new Vector3()), new Plane(new Vector3()));
