/**
     * <code>PhysicsSettings</code> 类用于创建物理配置信息。
     */
export declare class PhysicsSettings {
    /**标志集合。*/
    flags: number;
    /**物理引擎在一帧中用于补偿减速的最大次数。*/
    maxSubSteps: number;
    /**物理模拟器帧的间隔时间。*/
    fixedTimeStep: number;
    /**
     * 创建一个 <code>PhysicsSettings</code> 实例。
     */
    constructor();
}
