import { Box3, Vector3 } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

export async function loadModel(scene, modelName = 'space') {
  const gltf = await loader.loadAsync(`models/${modelName}/scene.gltf`);
  const object = gltf.scene;
  const box = new Box3().setFromObject(object);
  const center = box.getCenter(new Vector3());

  object.position.sub(center);
  scene.add(object);

  return object;
}
