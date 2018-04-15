import { getWebGLRenderer, getCamera} from 'modules/three.js';
import Easings from 'modules/easings.js';

const vertexShader = `
void main(){
    gl_Position = vec4( position, 1.0 );
}
`
//const fragmentShader = `
//uniform float time;
//uniform vec2 resolution;
//void main()	{
    //float x = mod(time + gl_FragCoord.x, 20.) < 10. ? 1. : 0.;
    //float y = mod(time + gl_FragCoord.y, 20.) < 10. ? 1. : 0.;
    //gl_FragColor = vec4(vec3(min(x, y)), 1.);
//}`;
const fragmentShader = `
precision mediump float;

uniform vec2 resolution;
uniform vec2 u_mouse;
uniform float time;

void main() {
    vec2 st = gl_FragCoord.xy/resolution.xy;
    st.x *= resolution.x/resolution.y;

    vec3 color = vec3(0.);
    color = vec3(st.x,st.y,abs(sin(time)));

    gl_FragColor = vec4(color,1.0);
}
`;

const uniforms = {
    time: { type: "f", value: 1.0 },
    resolution: { type: "v2", value: new THREE.Vector2() }
};
const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
});

//const material = new THREE.MeshStandardMaterial({color: 0xa42539,metalness: 0, roughness: 1});
        
const renderer = getWebGLRenderer(400,400);
const canvas = renderer.domElement;
const camera = getCamera();

uniforms.resolution.value.x = window.innerWidth;
uniforms.resolution.value.y = window.innerHeight;

const scene = new THREE.Scene();
const group = new THREE.Group();

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

function draw(startTime, currentTime) {
    var elapsedMilliseconds = Date.now() - startTime;
    var elapsedSeconds = elapsedMilliseconds / 1000.;
    uniforms.time.value = (currentTime % 20);
console.log(uniforms.time.value);



  const time = ( .001 * (performance.now()-startTime) ) % loopDuration;
  const t = time * 2 * Math.PI / loopDuration;

  renderer.render(scene, camera);
}

export { draw, loopDuration, canvas };

