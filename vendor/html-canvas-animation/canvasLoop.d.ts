export interface Entity {
    update: (deltaTime: number) => unknown;
    draw: () => void;
    shouldDelete: () => boolean;
}
export default class CanvasLoop {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    onFinish?: () => void;
    private entities;
    private finished;
    private started;
    private lastUpdateTime?;
    static create: (canvas: HTMLCanvasElement) => CanvasLoop | null;
    private constructor();
    clear: () => void;
    addEntity: (entity: Entity) => void;
    start: () => void;
    private requestFrame;
    private finish;
    private update;
}
