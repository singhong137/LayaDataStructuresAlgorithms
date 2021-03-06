import { Resource } from "../../../resource/Resource";
import { Handler } from "../../../utils/Handler";
import { Bounds } from "../../core/Bounds";
import { BufferState } from "../../core/BufferState";
import { IClone } from "../../core/IClone";
import { IndexBuffer3D } from "../../graphics/IndexBuffer3D";
import { IndexFormat } from "../../graphics/IndexFormat";
import { VertexBuffer3D } from "../../graphics/VertexBuffer3D";
import { VertexDeclaration } from "../../graphics/VertexDeclaration";
import { Color } from "../../math/Color";
import { Matrix4x4 } from "../../math/Matrix4x4";
import { Vector2 } from "../../math/Vector2";
import { Vector3 } from "../../math/Vector3";
import { Vector4 } from "../../math/Vector4";
import { SubMesh } from "./SubMesh";
/**
 * @internal
 */
export declare class skinnedMatrixCache {
    readonly subMeshIndex: number;
    readonly batchIndex: number;
    readonly batchBoneIndex: number;
    constructor(subMeshIndex: number, batchIndex: number, batchBoneIndex: number);
}
/**
 * <code>Mesh</code> 类用于创建文件网格数据模板。
 */
export declare class Mesh extends Resource implements IClone {
    /**Mesh资源。*/
    static MESH: string;
    /** @internal */
    private _tempVector30;
    /** @internal */
    private _tempVector31;
    /** @internal */
    private _tempVector32;
    /** @internal */
    private static _nativeTempVector30;
    /** @internal */
    private static _nativeTempVector31;
    /** @internal */
    private static _nativeTempVector32;
    /**
    * @internal
    */
    static __init__(): void;
    /**
     * 加载网格模板。
     * @param url 模板地址。
     * @param complete 完成回调。
     */
    static load(url: string, complete: Handler): void;
    /** @internal */
    private _btTriangleMesh;
    /** @internal */
    private _minVerticesUpdate;
    /** @internal */
    private _maxVerticesUpdate;
    /** @internal */
    private _needUpdateBounds;
    /** @internal */
    private _bounds;
    /** @internal */
    _isReadable: boolean;
    /** @internal */
    _bufferState: BufferState;
    /** @internal */
    _instanceBufferState: BufferState;
    /** @internal */
    _subMeshes: SubMesh[];
    /** @internal */
    _vertexBuffer: VertexBuffer3D;
    /** @internal */
    _indexBuffer: IndexBuffer3D;
    /** @internal */
    _boneNames: string[];
    /** @internal */
    _inverseBindPoses: Matrix4x4[];
    /** @internal */
    _skinnedMatrixCaches: skinnedMatrixCache[];
    /** @internal */
    _vertexCount: number;
    /** @internal */
    _indexFormat: IndexFormat;
    /**
     * 网格的全局默认绑定动作逆矩阵。
     */
    readonly inverseAbsoluteBindPoses: Matrix4x4[];
    /**
     * 获取顶点个数。
     */
    readonly vertexCount: number;
    /**
     * 获取索引个数。
     */
    readonly indexCount: number;
    /**
     * SubMesh的个数。
     */
    readonly subMeshCount: number;
    /**
     * 边界。
     */
    bounds: Bounds;
    /**
     * 索引格式。
     */
    readonly indexFormat: IndexFormat;
    /**
     * 创建一个 <code>Mesh</code> 实例,禁止使用。
     * @param isReadable 是否可读。
     */
    constructor(isReadable?: boolean);
    /**
     * @internal
     */
    private _getPositionElement;
    /**
     * @internal
     */
    private _getVerticeElementData;
    /**
     * @internal
     */
    private _setVerticeElementData;
    /**
     * @inheritDoc
     * @override
     */
    protected _disposeResource(): void;
    /**
     *@internal
     */
    _setSubMeshes(subMeshes: SubMesh[]): void;
    /**
     * @internal
     */
    _setBuffer(vertexBuffer: VertexBuffer3D, indexBuffer: IndexBuffer3D): void;
    /**
     * @internal
     */
    _getPhysicMesh(): any;
    /**
     * @internal
     */
    _uploadVerticesData(): void;
    /**
     * 根据获取子网格。
     * @param index 索引。
     */
    getSubMesh(index: number): SubMesh;
    /**
     * 拷贝并填充位置数据至数组。
     * @param positions 位置数组。
     * @remark 该方法为拷贝操作，比较耗费性能。
     */
    getPositions(positions: Vector3[]): void;
    /**
     * 设置位置数据。
     * @param positions 位置。
     */
    setPositions(positions: Vector3[]): void;
    /**
     * 拷贝并填充颜色数据至数组。
     * @param colors 颜色数组。
     * @remark 该方法为拷贝操作，比较耗费性能。
     */
    getColors(colors: Color[]): void;
    /**
     * 设置颜色数据。
     * @param colors  颜色。
     */
    setColors(colors: Color[]): void;
    /**
     * 拷贝并填充纹理坐标数据至数组。
     * @param uvs 纹理坐标数组。
     * @param channel 纹理坐标通道。
     * @remark 该方法为拷贝操作，比较耗费性能。
     */
    getUVs(uvs: Vector2[], channel?: number): void;
    /**
     * 设置纹理坐标数据。
     * @param uvs 纹理坐标。
     * @param channel 纹理坐标通道。
     */
    setUVs(uvs: Vector2[], channel?: number): void;
    /**
     * 拷贝并填充法线数据至数组。
     * @param normals 法线数组。
     * @remark 该方法为拷贝操作，比较耗费性能。
     */
    getNormals(normals: Vector3[]): void;
    /**
     * 设置法线数据。
     * @param normals 法线。
     */
    setNormals(normals: Vector3[]): void;
    /**
     * 拷贝并填充切线数据至数组。
     * @param tangents 切线。
     */
    getTangents(tangents: Vector4[]): void;
    /**
     * 设置切线数据。
     * @param tangents 切线。
     */
    setTangents(tangents: Vector4[]): void;
    /**
    * 获取骨骼权重。
    * @param boneWeights 骨骼权重。
    */
    getBoneWeights(boneWeights: Vector4[]): void;
    /**
    * 拷贝并填充骨骼权重数据至数组。
    * @param boneWeights 骨骼权重。
    */
    setBoneWeights(boneWeights: Vector4[]): void;
    /**
    * 获取骨骼索引。
    * @param boneIndices 骨骼索引。
    */
    getBoneIndices(boneIndices: Vector4[]): void;
    /**
    * 拷贝并填充骨骼索引数据至数组。
    * @param boneWeights 骨骼索引。
    */
    setBoneIndices(boneIndices: Vector4[]): void;
    /**
     * 将Mesh标记为不可读,可减少内存，标记后不可再调用相关读取方法。
     */
    markAsUnreadbale(): void;
    /**
     * 获取顶点声明。
     */
    getVertexDeclaration(): VertexDeclaration;
    /**
    * 拷贝并获取顶点数据的副本。
    * @return 顶点数据。
    */
    getVertices(): ArrayBuffer;
    /**
    * 设置顶点数据。
    * @param vertices 顶点数据。
    */
    setVertices(vertices: ArrayBuffer): void;
    /**
     * 拷贝并获取网格索引的副本。
     * @return 网格索引。
     */
    getIndices(): Uint8Array | Uint16Array | Uint32Array;
    /**
     * 设置网格索引。
     * @param indices 网格索引。
     */
    setIndices(indices: Uint8Array | Uint16Array | Uint32Array): void;
    /**
     * 从模型位置数据生成包围盒。
     */
    calculateBounds(): void;
    /**
     * 克隆。
     * @param	destObject 克隆源。
     */
    cloneTo(destObject: any): void;
    /**
     * 克隆。
     * @return	 克隆副本。
     */
    clone(): any;
    /** @internal */
    _inverseBindPosesBuffer: ArrayBuffer;
}
