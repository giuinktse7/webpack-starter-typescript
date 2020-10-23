import { CanvasLoop } from "html-canvas-animation";
import { startAnimation } from "./animation";

function appendHello() {
  const tag = document.createElement("p");
  tag.textContent = "Hello from index.ts!";
  tag.style.margin = "1rem auto";

  document.getElementById("main-wrapper")?.appendChild(tag);
}

function resizeCanvas(canvas: HTMLCanvasElement): void {
  //Gets the devicePixelRatio
  const pixelRatio = window.devicePixelRatio ?? 1;
  const wrapper = canvas.parentElement;
  if (!wrapper) return;

  canvas.width = wrapper.clientWidth * pixelRatio;
  canvas.height = wrapper.clientHeight * pixelRatio;
}

window.onload = function () {
  appendHello();

  const canvas = document.getElementById("test-canvas") as HTMLCanvasElement;
  resizeCanvas(canvas);

  const canvasLoop = CanvasLoop.create(canvas);

  if (canvasLoop === null) {
    console.warn("Could not create canvas loop.");
    return;
  }

  canvasLoop.onFinish = () => canvasLoop.clear();

  const button = document.getElementById("animation-button");
  button?.addEventListener("click", () => {
    startAnimation(canvasLoop);
  });
};
