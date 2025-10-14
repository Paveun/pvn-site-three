import { Clock } from 'three';

const clock = new Clock();

export function startRenderLoop(renderer, scene, camera, controls, { onFrame } = {}) {
  const tick = () => {
    const delta = clock.getDelta();

    onFrame?.(delta);

    controls?.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
  };

  tick();
}
