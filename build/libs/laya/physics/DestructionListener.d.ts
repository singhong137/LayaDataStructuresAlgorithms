/**
 * JS实现Box2D SayGoodbyeParticle
 * 相关类型对象被隐性移除时触发对应的SayGoodBye方法
 */
export declare class DestructionListener {
    /**
     * Joint被隐性移除时触发
     * @param params box2d的Joint相关对象
     */
    SayGoodbyeJoint(params: any): void;
    /**
     * Fixtures被隐性移除时触发
     * @param params box2d的Fixtures相关对象
     */
    SayGoodbyeFixture(params: any): void;
    /**
     * ParticleGroup被隐性移除时触发
     * @param params box2d的ParticleGroup相关对象
     */
    SayGoodbyeParticleGroup(params: any): void;
    /**
     * Particle被隐性移除时触发
     * @param params box2d的Particle相关对象
     */
    SayGoodbyeParticle(params: any): void;
}
