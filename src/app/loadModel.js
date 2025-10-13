import { Box3, Vector3 } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

export function loadModel(scene, modelName = 'space', { onProgress } = {}) {
  return new Promise((resolve, reject) => {
    loader.load(
      `models/${modelName}/scene.gltf`,
      (gltf) => {
        const object = gltf.scene;
        const box = new Box3().setFromObject(object);
        const center = box.getCenter(new Vector3());

        object.position.sub(center);
        scene.add(object);

        onProgress?.(1);
        resolve(object);
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
