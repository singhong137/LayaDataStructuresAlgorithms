import { BoundSphere } from "../math/BoundSphere";
import { Matrix4x4 } from "../math/Matrix4x4";
import { Plane } from "../math/Plane";
import { Vector3 } from "../math/Vector3";
import { ShaderData } from "../shader/ShaderData";
/**
 * @internal
 * 阴影分割数据。
 */
export class ShadowSliceData {
    constructor() {
        this.cameraShaderValue = new ShaderData();
        this.position = new Vector3();
        this.viewMatrix = new Matrix4x4();
        this.projectionMatrix = new Matrix4x4();
        this.viewProjectMatrix = new Matrix4x4();
        this.cullPlanes = [new Plane(new Vector3()), new Plane(new Vector3()), new Plane(new Vector3()), new Plane(new Vector3()), new Plane(new Vector3()), new Plane(new Vector3()), new Plane(new Vector3()), new Plane(new Vector3()), new Plane(new Vector3()), new Plane(new Vector3())];
        this.splitBoundSphere = new BoundSphere(new Vector3(), 0.0);
    }
}
