import { updateRendererSize } from './createRenderer.js';

export function registerResizeHandler({ sizes, camera, renderer }) {
  window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    updateRendererSize(renderer, sizes);
  });
}
