import { BaseAnimation, Point2D } from "./animation";
export declare class LineAnimation extends BaseAnimation {
    from: Point2D;
    to: Point2D;
    current: Point2D;
    duration: number;
    abs: Point2D;
    constructor(ctx: CanvasRenderingContext2D, from: Point2D, to: Point2D, duration: number);
    setTemporary: (value: boolean) => void;
    updateAnimation: (delta: number) => boolean;
    draw: () => void;
}
