import { getWebGLRenderer, getCamera} from 'modules/three.js';
import Easings from 'modules/easings.js';

const renderer = getWebGLRenderer(400,400);
const canvas = renderer.domElement;
const camera = getCamera();
const scene = new THREE.Scene();
const group = new THREE.Group();

const material = new THREE.MeshStandardMaterial({color: 0xa42539,metalness: 0, roughness: 1});
const geometry = new THREE.BoxBufferGeometry(1,1,1);
const cube = new THREE.Mesh(geometry, material);
cube.castShadow = cube.receiveShadow = true;
group.add(cube);
const cube2 = cube.clone();
cube2.position.x = 1;
cube2.position.z = -1;
group.add(cube2);

const cube3 = cube.clone();
cube3.position.x = -1;
cube3.position.z = 1;
group.add(cube3);

const cube4 = cube.clone();
cube4.position.x = -1;
cube4.position.z = -1;
group.add(cube4);

const cube5 = cube.clone();
cube5.position.x = 1;
cube5.position.z = 1;
group.add(cube5);

scene.add(group);

const directionalLight = new THREE.DirectionalLight( 0xffffff, .5 );
directionalLight.position.set(-1,1,1);
directionalLight.castShadow = true;
scene.add( directionalLight );

const directionalLight2 = new THREE.DirectionalLight( 0xffffff, .5 );
directionalLight2.position.set(1,2,1);
directionalLight2.castShadow = true;
scene.add( directionalLight2 );

const ambientLight = new THREE.AmbientLight(0x808080, .5);
scene.add(ambientLight);

const light = new THREE.HemisphereLight( 0xcefeff, 0xb3eaf0, .5 );
scene.add( light );

camera.position.set(4,4,4);
camera.lookAt(cube.position);
renderer.setClearColor(0xffffff,1);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const loopDuration = 2;

function InOutQuint(t) {
  if ((t *= 2) < 1) return 0.5 * t * t * t * t * t;
  return 0.5 * ((t -= 2) * t * t * t * t + 2);
}

function draw(startTime) {

  const time = ( .001 * (performance.now()-startTime) ) % loopDuration;
  const t = time * 2 * Math.PI / loopDuration;
  const f = .75 + .25 * InOutQuint( 0.5 * Math.sin( t ));
  const f2 = 1 + 2 * InOutQuint( .5 + .5 * Math.cos( t ));

  cube.rotation.y = Math.PI / 2 * InOutQuint( time / loopDuration );
  cube2.rotation.y = Math.PI / 2 * InOutQuint( .5 + .5 * Math.cos( t ));
  cube3.rotation.y = -Math.PI / 2 * InOutQuint( .5 + .5 * Math.cos( t ));


  renderer.render(scene, camera);
}

export { draw, loopDuration, canvas };

