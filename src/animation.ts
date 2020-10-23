import { Rectangle, CanvasLoop, easing } from "html-canvas-animation";

export function startAnimation(canvasLoop: CanvasLoop): void {
  addAnimation(5, canvasLoop);

  canvasLoop.start();
}

const rand = (from: number, to: number) => {
  return from + Math.floor(Math.random() * (to - from));
};

const randomAnimation = (canvasLoop: CanvasLoop) => {
  const { canvas, ctx } = canvasLoop;
  const animation = Rectangle.animate(ctx);

  const MaxSize = 40;

  const randomDuration = () => 200 + Math.floor(Math.random() * 1500);
  const randomPos = () => ({
    x: rand(0, canvas.width - MaxSize),
    y: rand(0, canvas.height - MaxSize),
  });

  const randomSize = () => ({
    width: rand(5, MaxSize),
    height: rand(5, MaxSize),
  });

  let r = Math.random();
  let remaining = 5;
  while (remaining > 0) {
    if (r < 0.1) {
      break;
    } else if (r < 0.3) {
      animation.scale({
        duration: randomDuration(),
        size: randomSize(),
        easingFunction: easing.easeInOutCubic,
      });
    } else {
      animation.translate({
        duration: randomDuration(),
        to: randomPos(),
        easingFunction: easing.easeInOutQuad,
      });
    }
    --remaining;
    r = Math.random();
  }
  const color = "hsla(" + Math.random() * 360 + ", 100%, 50%, 1)";
  animation.setRectangle(
    new Rectangle(
      color,
      rand(0, canvas.width - 40),
      rand(0, canvas.height - 40),
      rand(10, 40),
      rand(10, 40)
    )
  );
  animation.onFinish = () => animation.fadeOut(rand(350, 800));

  return animation;
};

const sleep = (m: number) => new Promise(r => setTimeout(r, m));

async function addAnimation(
  remaining: number,
  loop: CanvasLoop,
  firstTime = true
): Promise<void> {
  if (!firstTime) {
    await sleep(rand(1500, 3000));
  }

  loop.addEntity(randomAnimation(loop));
  if (remaining > 0) {
    await addAnimation(--remaining, loop, false);
  }
}
