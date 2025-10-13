import './style.css';

import { createScene } from './app/createScene.js';
import { createCamera } from './app/createCamera.js';
import { createRenderer } from './app/createRenderer.js';
import { createControls } from './app/createControls.js';
import { addSceneLighting } from './app/createLights.js';
import { loadModel } from './app/loadModel.js';
import { startRenderLoop } from './app/renderLoop.js';
import { registerResizeHandler } from './app/registerResizeHandler.js';
import { runIntroTimeline, attachSpinHandler } from './app/animations.js';
import { setRandomTagline } from './utils/tagline.js';

function init() {
  const canvas = document.querySelector('.webgl');
  if (!canvas) {
    console.error('Missing .webgl canvas element.');
    return;
  }

  const scene = createScene();
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const camera = createCamera(sizes);
  scene.add(camera);

  addSceneLighting(scene);

  const renderer = createRenderer(canvas, sizes);
  const controls = createControls(camera, canvas);

  registerResizeHandler({ sizes, camera, renderer });

  startRenderLoop(renderer, scene, camera, controls);
  runIntroTimeline(camera);

  const spinButton = document.querySelector('.button.spin');
  if (spinButton) {
    attachSpinHandler(spinButton, controls);
  }

  const taglineTarget = document.querySelector('.sub');
  setRandomTagline(taglineTarget);

  loadModel(scene).catch((error) => {
    console.error('Failed to load model', error);
  });
}

init();
