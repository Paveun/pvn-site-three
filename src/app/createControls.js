import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function createControls(camera, canvas, { autoRotate = true, autoRotateSpeed = 0.5 } = {}) {
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.autoRotate = autoRotate;
  controls.autoRotateSpeed = autoRotate ? autoRotateSpeed : 0;
  return controls;
}
