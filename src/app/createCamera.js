import { PerspectiveCamera } from 'three';

export function createCamera({ width, height }) {
  const camera = new PerspectiveCamera(45, width / height, 0.1, 150);
  camera.position.set(0, 1.5, 0);
  return camera;
}
