/**
     * <code>Rand</code> 类用于通过32位无符号整型随机种子创建随机数。
     */
export class Rand {
    /**
     * 创建一个 <code>Rand</code> 实例。
     * @param	seed  32位无符号整型随机种子。
     */
    constructor(seed) {
        /**@internal */
        this._temp = new Uint32Array(1);
        /**获取随机种子。*/
        this.seeds = new Uint32Array(4);
        this.seeds[0] = seed;
        this.seeds[1] = this.seeds[0] * 0x6C078965 /*1812433253U*/ + 1;
        this.seeds[2] = this.seeds[1] * 0x6C078965 /*1812433253U*/ + 1;
        this.seeds[3] = this.seeds[2] * 0x6C078965 /*1812433253U*/ + 1;
    }
    /**
     * 通过无符号32位整形，获取32位浮点随机数。
     * @param 无符号32位整形随机数。
     * @return 32位浮点随机数。
     */
    static getFloatFromInt(v) {
        // take 23 bits of integer, and divide by 2^23-1
        return (v & 0x007FFFFF) * (1.0 / 8388607.0);
    }
    /**
     * 通过无符号32位整形，获取无符号8位字节随机数。
     * @param 无符号32位整形随机数。
     * @return 无符号8位字节随机数。
     */
    static getByteFromInt(v) {
        // take the most significant byte from the 23-bit value
        return (v & 0x007FFFFF) >>> 15 /*(23-8)*/;
    }
    /**
     * 获取随机种子。
     * @return 随机种子。
     */
    get seed() {
        return this.seeds[0];
    }
    /**
     * 设置随机种子。
     * @param	seed 随机种子。
     */
    set seed(seed) {
        this.seeds[0] = seed;
        this.seeds[1] = this.seeds[0] * 0x6C078965 /*1812433253U*/ + 1;
        this.seeds[2] = this.seeds[1] * 0x6C078965 /*1812433253U*/ + 1;
        this.seeds[3] = this.seeds[2] * 0x6C078965 /*1812433253U*/ + 1;
    }
    /**
     * 获取无符号32位整形随机数。
     * @return 无符号32位整形随机数。
     */
    getUint() {
        this._temp[0] = this.seeds[0] ^ (this.seeds[0] << 11);
        this.seeds[0] = this.seeds[1];
        this.seeds[1] = this.seeds[2];
        this.seeds[2] = this.seeds[3];
        this.seeds[3] = (this.seeds[3] ^ (this.seeds[3] >>> 19)) ^ (this._temp[0] ^ (this._temp[0] >>> 8));
        return this.seeds[3];
    }
    /**
     * 获取0到1之间的浮点随机数。
     * @return 0到1之间的浮点随机数。
     */
    getFloat() {
        this.getUint();
        return (this.seeds[3] & 0x007FFFFF) * (1.0 / 8388607.0);
    }
    /**
     * 获取-1到1之间的浮点随机数。
     * @return -1到1之间的浮点随机数。
     */
    getSignedFloat() {
        return this.getFloat() * 2.0 - 1.0;
    }
}
