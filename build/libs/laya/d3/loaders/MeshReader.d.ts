import { Mesh } from "../resource/models/Mesh";
import { SubMesh } from "../resource/models/SubMesh";
/**
 * @internal
 */
export declare class MeshReader {
    /**
     *@internal
     */
    static _parse(data: any, propertyParams?: any, constructParams?: any[]): Mesh;
    static read(data: ArrayBuffer, mesh: Mesh, subMeshes: SubMesh[]): void;
}
