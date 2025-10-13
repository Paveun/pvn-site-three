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
import { setRandomTagline, TAGLINE_SOURCE } from './utils/tagline.js';
import { createLoadingOverlay } from './app/loadingOverlay.js';

const USE_REMOTE_TAGLINES = false;
const REMOTE_FORMAT = 'json';

if (USE_REMOTE_TAGLINES) {
  TAGLINE_SOURCE.useApi = true;
  TAGLINE_SOURCE.apiFormat = REMOTE_FORMAT;
}

function init() {
  const canvas = document.querySelector('.webgl');
  if (!canvas) {
    console.error('Missing .webgl canvas element.');
    return;
  }

  const loadingOverlay = createLoadingOverlay();

  const scene = createScene();
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const camera = createCamera(sizes);
  scene.add(camera);

  addSceneLighting(scene);

  const renderer = createRenderer(canvas, sizes);

  const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const motionPreferences = {
    reduceMotion: motionMediaQuery.matches,
  };

  const controls = createControls(camera, canvas, {
    autoRotate: !motionPreferences.reduceMotion,
  });

  const applyMotionPreference = (shouldReduce) => {
    motionPreferences.reduceMotion = shouldReduce;
    controls.autoRotate = !shouldReduce;
    controls.autoRotateSpeed = shouldReduce ? 0 : 0.5;
  };

  if (motionMediaQuery.addEventListener) {
    motionMediaQuery.addEventListener('change', (event) => {
      applyMotionPreference(event.matches);
    });
  } else if (motionMediaQuery.addListener) {
    motionMediaQuery.addListener((event) => {
      applyMotionPreference(event.matches);
    });
  }

  registerResizeHandler({ sizes, camera, renderer });

  startRenderLoop(renderer, scene, camera, controls);

  const spinButton = document.querySelector('.button.spin');
  attachSpinHandler(spinButton, controls, motionPreferences);

  const taglineTarget = document.querySelector('.sub');
  setRandomTagline(taglineTarget);

  const beginIntro = () => {
    runIntroTimeline(camera, motionPreferences);
  };

  loadModel(scene, 'space', {
    onProgress: (value) => {
      loadingOverlay.setProgress(value);
    },
  })
    .then(() => {
      loadingOverlay.setProgress(1);
      loadingOverlay.setStatus('Ready');
      window.setTimeout(() => {
        loadingOverlay.finish(beginIntro);
      }, 150);
    })
    .catch((error) => {
      console.error('Failed to load model', error);
      loadingOverlay.showError('Model failed to load');
      window.setTimeout(() => {
        loadingOverlay.finish(beginIntro);
      }, 500);
    });
}

init();
