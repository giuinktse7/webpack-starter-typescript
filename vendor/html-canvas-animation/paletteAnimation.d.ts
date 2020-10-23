import { BaseAnimation, Point2D } from "./animation";
export declare type ColorSample = {
    palette: string[];
    prominentColor: string;
};
declare type PaletteAnimationConfig = {
    ctx: CanvasRenderingContext2D;
    swatch: ColorSample;
    topLeft: Point2D;
    boxSize: number;
    duration: number;
};
export declare class PaletteAnimation extends BaseAnimation {
    swatch: ColorSample;
    topLeft: Point2D;
    current: Point2D;
    boxSize: number;
    duration: number;
    temporary: boolean;
    currentColorIndex: number;
    constructor({ ctx, swatch, topLeft, boxSize, duration, }: PaletteAnimationConfig);
    setTemporary: (value: boolean) => boolean;
    updateAnimation: (deltaTime: number) => boolean;
    draw: () => void;
}
declare type HighlightPaletteAnimationConfig = {
    animation: PaletteAnimation;
    duration: number;
    easingFunction?: (x: number) => number;
};
export declare class HighlightPaletteAnimation extends BaseAnimation {
    readonly animation: PaletteAnimation;
    private LoopCount;
    xOffset: number;
    private state;
    private readonly finalIndex;
    elapsedTime: number;
    private currentIndex;
    private boxOpacity;
    private increasingOpacity;
    temporary: boolean;
    private cycleDurationMs;
    private totalDurationMs;
    private readonly FadeOutInDurationMs;
    private readonly BlinkAmount;
    private readonly BlinkDurationMs;
    private readonly FocusDurationMs;
    easingFunction: (x: number) => number;
    constructor({ animation, duration, easingFunction, }: HighlightPaletteAnimationConfig);
    updateAnimation: (deltaTime: number) => boolean;
    draw: () => void;
    highlightPosition: () => Point2D;
    updateOpacity: (deltaTime: number) => void;
}
export declare const highlightPalette: (config: HighlightPaletteAnimationConfig) => HighlightPaletteAnimation;
export {};
