import { PointLight } from 'three';

export function addSceneLighting(scene) {
  const keyLight = new PointLight(0xffffff, 1.25, 100);
  keyLight.position.set(0, 10, 10);
  scene.add(keyLight);
  return { keyLight };
}
