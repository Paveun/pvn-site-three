import { Box3, Group, Vector3 } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const fallbackLoader = new GLTFLoader();

export function loadModel(scene, modelName = 'space', { loader = fallbackLoader, onProgress } = {}) {
  return new Promise((resolve, reject) => {
    loader.load(
      `models/${modelName}/scene.gltf`,
      (gltf) => {
        const object = gltf.scene;
        const box = new Box3().setFromObject(object);
        const center = box.getCenter(new Vector3());

        const pivot = new Group();
        object.position.sub(center);
        pivot.add(object);
        scene.add(pivot);

        if (onProgress) {
          onProgress(1);
        }

        resolve(pivot);
      },
      (event) => {
        if (!onProgress) {
          return;
        }

        const ratio = event.total ? event.loaded / event.total : 0;
        onProgress(ratio);
      },
      (error) => {
        reject(error);
      },
    );
  });
}
