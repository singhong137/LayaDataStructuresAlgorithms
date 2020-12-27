import { Scene3D } from "./laya/d3/core/scene/Scene3D";
import { MeshRenderDynamicBatchManager } from "./laya/d3/graphics/MeshRenderDynamicBatchManager";
import { MeshRenderStaticBatchManager } from "./laya/d3/graphics/MeshRenderStaticBatchManager";
import { SubMeshDynamicBatch } from "./laya/d3/graphics/SubMeshDynamicBatch";
import { Matrix4x4 } from "./laya/d3/math/Matrix4x4";
import { Shader3D } from "./laya/d3/shader/Shader3D";
import { Laya3D } from "./Laya3D";
/**
 * @internal
 * 使用全局类的时候，避免引用其他模块
 */
export declare class ILaya3D {
    static Shader3D: typeof Shader3D;
    static Scene3D: typeof Scene3D;
    static MeshRenderStaticBatchManager: typeof MeshRenderStaticBatchManager;
    static MeshRenderDynamicBatchManager: typeof MeshRenderDynamicBatchManager;
    static SubMeshDynamicBatch: typeof SubMeshDynamicBatch;
    static Laya3D: typeof Laya3D;
    static Matrix4x4: typeof Matrix4x4;
}
