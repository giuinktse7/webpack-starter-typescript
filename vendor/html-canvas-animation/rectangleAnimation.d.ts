import { BaseAnimation, Point2D, BaseSequential, Animation } from "./animation";
import { EasingFunction } from "./easing";
declare type RectangleThunk = (rectangle: Rectangle) => RectangleAnimation;
declare type Size = {
    width: number;
    height: number;
};
interface RectangleAnimationArgs {
    ctx: CanvasRenderingContext2D;
    rectangle: Rectangle;
    duration: number;
    easingFunction?: EasingFunction;
}
declare abstract class RectangleAnimation extends BaseAnimation {
    rectangle: Rectangle;
    duration: number;
    protected elapsedTime: number;
    protected easingFunction: EasingFunction;
    constructor({ ctx, rectangle, duration, easingFunction, }: RectangleAnimationArgs);
    draw: () => void;
}
export declare class Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    constructor(color: string, x?: number, y?: number, width?: number, height?: number);
    static animate(ctx: CanvasRenderingContext2D): RectangleAnimations;
    static scale({ ctx, duration, size, easingFunction, name, }: {
        ctx: CanvasRenderingContext2D;
        duration: number;
        size: Size;
        easingFunction?: EasingFunction;
        name?: string;
    }): RectangleAnimations;
    static translate(ctx: CanvasRenderingContext2D, duration: number, to: Point2D): RectangleAnimations;
    scale: (ctx: CanvasRenderingContext2D, duration: number, size: Size) => RectangleAnimations;
    translate: (ctx: CanvasRenderingContext2D, duration: number, to: Point2D) => RectangleAnimations;
}
interface ScaleArgs extends RectangleAnimationArgs {
    toSize: Size;
}
export declare class Scale extends RectangleAnimation {
    toSize: Size;
    fromSize: Size;
    constructor({ ctx, toSize, duration, rectangle, easingFunction }: ScaleArgs);
    updateAnimation: (deltaTime: number) => boolean;
}
interface TranslateArgs extends RectangleAnimationArgs {
    to: Point2D;
}
export declare class Translate extends RectangleAnimation {
    from: Point2D;
    to: Point2D;
    constructor({ ctx, duration, to, rectangle, easingFunction }: TranslateArgs);
    updateAnimation: (deltaTime: number) => boolean;
}
declare class RectangleAnimations extends BaseSequential {
    private animations;
    private animationThunks;
    private rectangle?;
    constructor(ctx: CanvasRenderingContext2D, thunk?: RectangleThunk, rectangle?: Rectangle);
    size: () => number;
    removeAtIndex: (index: number) => void;
    get: (index: number) => Animation;
    add: (animation: Animation) => void;
    private materializeThunk;
    setRectangle: (rectangle: Rectangle) => void;
    private addThunk;
    scale: ({ duration, size, easingFunction, }: {
        duration: number;
        size: Size;
        easingFunction?: EasingFunction | undefined;
    }) => RectangleAnimations;
    translate: ({ duration, to, easingFunction, name, }: {
        duration: number;
        to: Point2D;
        easingFunction?: EasingFunction | undefined;
        name?: string | undefined;
    }) => RectangleAnimations;
}
export {};
