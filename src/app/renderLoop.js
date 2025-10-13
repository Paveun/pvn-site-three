export function startRenderLoop(renderer, scene, camera, controls) {
  const tick = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
  };

  tick();
}
