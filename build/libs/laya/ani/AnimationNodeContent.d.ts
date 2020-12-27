import { KeyFramesContent } from "./KeyFramesContent";
/**
 * @internal
 */
export declare class AnimationNodeContent {
    name: string;
    parentIndex: number;
    parent: AnimationNodeContent;
    keyframeWidth: number;
    lerpType: number;
    interpolationMethod: any[];
    childs: any[];
    keyFrame: KeyFramesContent[];
    playTime: number;
    extenData: ArrayBuffer;
    dataOffset: number;
}
