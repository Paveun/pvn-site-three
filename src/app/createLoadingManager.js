import { LoadingManager } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function createLoadingManager({ onStart, onProgress, onLoad, onError } = {}) {
  const manager = new LoadingManager();

  if (onStart) {
    manager.onStart = onStart;
  }

  if (onProgress) {
    manager.onProgress = onProgress;
  }

  if (onLoad) {
    manager.onLoad = onLoad;
  }

  if (onError) {
    manager.onError = onError;
  }

  return manager;
}

export function createGltfLoader(manager) {
  return new GLTFLoader(manager);
}
