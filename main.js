// Import Three.js and necessary loaders
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 3, 10); // Move the camera back to see both models

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0Xffe5b4, 2);
scene.add(ambientLight);

const hemisphereLight  = new THREE.AmbientLight(0xf0e424, 2);
scene.add(hemisphereLight );

const color = 0xeeeeee;
const directionalLight = new THREE.DirectionalLight(color, 1.5);
directionalLight.intensity = 1.5;
directionalLight.castShadow = true;
directionalLight.position.set(0, 10, 0);
directionalLight.target.position.set(-5, 0, 0);

scene.add(directionalLight);
scene.add(directionalLight.target);


const pointLight = new THREE.PointLight(0xeeeeee, 10);
pointLight.castShadow = true;
pointLight.position.set(0, 3, 0);
pointLight.distance = 100;

scene.add(pointLight)


// Load First Model (Left Side)
const loader = new GLTFLoader();
loader.load('/low-poly-room.glb', (gltf) => {
    const model1 = gltf.scene;
    model1.scale.set(0.2, 0.2, 0.2);
    model1.position.set(-3, 0, 0); // Move it to the left
    scene.add(model1);
}, undefined, (error) => {
    console.error('Error loading low-poly-room:', error);
});

// Load Second Model (Right Side)
loader.load('/63-room/another-room.glb', (gltf) => {
    const model2 = gltf.scene;
    model2.scale.set(1, 1, 1);
    model2.position.set(5, 0, 0); // Move it farther to the right
    scene.add(model2);
}, undefined, (error) => {
    console.error('Error loading another-room:', error);
});
loader.load('another-room-2.glb', (gltf) => {
    const model3 = gltf.scene;
    model3.scale.set(0.3, 0.3, 0.3);
    model3.position.set(0, -5, 0); // Move it farther to the right
    scene.add(model3);
}, undefined, (error) => {
    console.error('Error loading another-room:', error);
});

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Resize handling
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
