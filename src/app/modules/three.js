/*
 * Adapted from https://github.com/spite/looper
 *
 */

import * as THREE from 'three';

window.THREE = THREE;

function getWebGLRenderer(width = 800, height = 800) {
  const renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(width, height);
  const canvas = renderer.domElement;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  window.renderer = renderer;

  return renderer;
}

const renderer = getWebGLRenderer();

function getCamera() {
  const camera =  new THREE.PerspectiveCamera(35,1,.1,100);
  window.camera = camera;

  return camera;
}

export { renderer, getWebGLRenderer, getCamera };
