import { ShaderCompile } from "../../webgl/utils/ShaderCompile";
import { ShaderNode } from "../../webgl/utils/ShaderNode";
import { RenderState } from "../core/material/RenderState";
import { DefineDatas } from "./DefineDatas";
import { ShaderInstance } from "./ShaderInstance";
import { SubShader } from "./SubShader";
/**
 * <code>ShaderPass</code> 类用于实现ShaderPass。
 */
export declare class ShaderPass extends ShaderCompile {
    /** @internal */
    private static _defineString;
    /** @internal */
    private static _debugDefineString;
    /** @internal */
    private static _debugDefineMask;
    /** @internal */
    private _owner;
    /** @internal */
    _stateMap: object;
    /** @internal */
    private _cacheSharders;
    /** @internal */
    private _cacheShaderHierarchy;
    /** @internal */
    private _renderState;
    /** @internal */
    _validDefine: DefineDatas;
    /** @internal */
    _tags: any;
    /** @internal */
    _pipelineMode: string;
    /**
     * 渲染状态。
     */
    readonly renderState: RenderState;
    constructor(owner: SubShader, vs: string, ps: string, stateMap: object);
    /**
     * @inheritDoc
     * @override
     */
    protected _compileToTree(parent: ShaderNode, lines: any[], start: number, includefiles: any[], defs: any): void;
    /**
     * @internal
     */
    _resizeCacheShaderMap(cacheMap: object, hierarchy: number, resizeLength: number): void;
    /**
     * @internal
     */
    _addDebugShaderVariantCollection(compileDefine: DefineDatas, outDebugDefines: string[], outDebugDefineMask: number[]): void;
    /**
     * @internal
     */
    withCompile(compileDefine: DefineDatas): ShaderInstance;
    /**
     * 添加标记。
     * @param key 标记键。
     * @param value 标记值。
     */
    setTag(key: string, value: string): void;
    /**
     * 获取标记值。
     * @return key 标记键。
     */
    getTag(key: string): string;
}
