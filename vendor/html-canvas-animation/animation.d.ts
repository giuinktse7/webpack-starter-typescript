import { EasingFunction } from "./easing";
export declare type Point2D = {
    x: number;
    y: number;
};
interface RenderOptions {
    opacity?: number;
}
export declare enum AnimationType {
    Active = 0,
    FadeOut = 1,
    Gone = 2,
    ScheduledForDeletion = 3
}
declare namespace Anim {
    type Active = {
        type: AnimationType.Active;
    };
    type FadeOut = {
        type: AnimationType.FadeOut;
        elapsedTime: number;
        duration: number;
        opacity: number;
        removeWhenInvisible: boolean;
        easingFunction: EasingFunction;
    };
    type Gone = {
        type: AnimationType.Gone;
    };
    type ScheduledForDeletion = {
        type: AnimationType.ScheduledForDeletion;
    };
}
declare type AnimationState = Anim.Active | Anim.FadeOut | Anim.Gone | Anim.ScheduledForDeletion;
export interface Animation {
    animationState: AnimationState;
    update: (deltaTime: number) => boolean;
    render: (renderOptions?: RenderOptions) => void;
    isFinished: () => boolean;
    temporary: boolean;
    fadeOut: (duration: number, f?: EasingFunction) => void;
    getContext(): CanvasRenderingContext2D;
    shouldDelete(): boolean;
    identifier: string;
    setName: (name: string) => void;
}
export declare abstract class BaseAnimation implements Animation {
    identifier: string;
    readonly ctx: CanvasRenderingContext2D;
    temporary: boolean;
    animationState: AnimationState;
    private finished;
    onFinish?: () => void;
    protected renderOptions: () => RenderOptions | undefined;
    protected abstract updateAnimation: (deltaTime: number) => boolean;
    protected abstract draw: () => void;
    isFinished: () => boolean;
    setFinished: (finished: boolean) => void;
    constructor(ctx: CanvasRenderingContext2D);
    setName: (name: string) => void;
    update: (deltaTime: number) => boolean;
    setRenderOptions: (options: RenderOptions) => (() => void);
    render: (options?: RenderOptions | undefined) => void;
    fadeOut: (duration: number, f?: EasingFunction, removeWhenInvisible?: boolean) => void;
    shouldDelete: () => boolean;
    getContext: () => CanvasRenderingContext2D;
    updateContext: () => () => void;
    shouldDraw: () => boolean;
    stroke: () => void;
    fillRect: (x: number, y: number, w: number, h: number) => void;
    strokeRect: (x: number, y: number, w: number, h: number) => void;
}
export declare class Parallel extends BaseAnimation {
    animations: Animation[];
    constructor(...animations: Animation[]);
    updateAnimation: (delta: number) => boolean;
    draw: () => void;
}
export declare abstract class BaseSequential<A extends Animation = Animation> extends BaseAnimation {
    abstract size(): number;
    abstract removeAtIndex(index: number): void;
    abstract get(index: number): A;
    abstract add(animation: A): void;
    empty: () => boolean;
    constructor(ctx: CanvasRenderingContext2D);
    updateAnimation: (delta: number) => boolean;
    draw: () => void;
}
export declare class Sequential extends BaseSequential {
    private animations;
    constructor(ctx: CanvasRenderingContext2D);
    size: () => number;
    removeAtIndex: (index: number) => void;
    get: (index: number) => Animation;
    add: (animation: Animation) => void;
    static create(...animations: Animation[]): Sequential;
}
export {};
