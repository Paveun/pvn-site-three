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
import { createLoadingManager, createGltfLoader } from './app/createLoadingManager.js';

const USE_REMOTE_TAGLINES = true;
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
  let beginIntro = () => {};
  let activeModel = null;

  const rotationState = {
    base: 0.35,
    current: 0.35,
  };

  const loadingManager = createLoadingManager({
    onStart: () => {
      loadingOverlay.setStatus('Loading...');
      loadingOverlay.setProgress(0);
    },
    onProgress: (_, loaded, total) => {
      const ratio = total ? loaded / total : 0;
      loadingOverlay.setProgress(ratio);
    },
    onError: (item) => {
      console.error(`Failed to load asset: ${item}`);
      loadingOverlay.showError('Asset failed to load');
    },
    onLoad: () => {
      loadingOverlay.setProgress(1);
      loadingOverlay.setStatus('Ready');
      window.setTimeout(() => {
        loadingOverlay.finish({
          onFadeStart: beginIntro,
        });
      }, 150);
    },
  });

  const gltfLoader = createGltfLoader(loadingManager);

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

  const controls = createControls(camera, canvas);

  const applyMotionPreference = (shouldReduce) => {
    motionPreferences.reduceMotion = shouldReduce;
    rotationState.current = shouldReduce ? 0 : rotationState.base;
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

  applyMotionPreference(motionPreferences.reduceMotion);

  registerResizeHandler({ sizes, camera, renderer });

  startRenderLoop(renderer, scene, camera, controls, {
    onFrame: (delta) => {
      if (rotationState.current === 0 || !activeModel) {
        return;
      }

      activeModel.rotation.y += rotationState.current * delta;
    },
  });

  const spinButton = document.querySelector('.button.spin');
  attachSpinHandler(spinButton, rotationState, motionPreferences);

  const taglineTarget = document.querySelector('.sub');
  setRandomTagline(taglineTarget);

  beginIntro = () => {
    runIntroTimeline(camera, motionPreferences);
  };

  loadModel(scene, 'space', { loader: gltfLoader })
    .then((model) => {
      activeModel = model;
    })
    .catch((error) => {
      console.error('Failed to load model', error);
      loadingOverlay.showError('Model failed to load');
      window.setTimeout(() => {
        loadingOverlay.finish({
          onFadeStart: beginIntro,
        });
      }, 500);
    });
}

init();
