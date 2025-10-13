import { WebGLRenderer } from 'three';

export function createRenderer(canvas, { width, height }) {
  const renderer = new WebGLRenderer({ canvas });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio ?? 1, 2));
  return renderer;
}

export function updateRendererSize(renderer, { width, height }) {
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio ?? 1, 2));
}
