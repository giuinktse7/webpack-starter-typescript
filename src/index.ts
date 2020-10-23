import { CanvasLoop } from "html-canvas-animation";
import { startAnimation } from "./animation";

function appendHello() {
  const tag = document.createElement("p");
  tag.textContent = "Hello from index.ts!";
  tag.style.margin = "1rem auto";

  document.getElementById("main-wrapper")?.appendChild(tag);
}

window.onload = function () {
  appendHello();

  const canvas = document.getElementById("test-canvas") as HTMLCanvasElement;
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
