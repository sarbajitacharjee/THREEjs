// Import necessary Three.js modules
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'lil-gui';
import { DirectionalLightHelper, PointLightHelper } from 'three'; // Import PointLightHelper
import { AxesHelper } from 'three';

// Create scene
const scene = new THREE.Scene();

// Create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

// Create renderer
const canvas = document.getElementById('draw');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Soft white ambient light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Bright directional light
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Add helpers
// Directional Light Helper
const directionalLightHelper = new DirectionalLightHelper(directionalLight, 1); // Size is 1
scene.add(directionalLightHelper);

// Axes Helper
const axesHelper = new THREE.AxesHelper(10); // Length of the axes
scene.add(axesHelper);

// Point Light
const pointLight = new THREE.PointLight(0xffffff, 1, 100); // Color, intensity, distance
pointLight.position.set(-5, 5, 5); // Position the point light
scene.add(pointLight);

// Point Light Helper
const pointLightHelper = new PointLightHelper(pointLight, 1); // Size is 1
scene.add(pointLightHelper);

// Load texture
const loader = new THREE.TextureLoader();
// const texture = loader.load('/fruit.jpg');
const texture = loader.load('/assets/fruit.jpg', 
    (texture) => {
        console.log('Texture loaded successfully', texture);
    },
    undefined,
    (error) => {
        console.error('An error occurred while loading the texture', error);
    }
);


// Create box geometry
const boxGeometry = new THREE.BoxGeometry(5, 5, 3);

// Create MeshStandardMaterial with metalness and roughness properties
const boxMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    metalness: 0.7,
    roughness: 0.4,
});

// Create mesh
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

// GUI controls
const gui = new GUI();

// Material controls
const materialFolder = gui.addFolder('Material');
materialFolder.add(boxMaterial, 'metalness', 0, 1).name('Metalness');
materialFolder.add(boxMaterial, 'roughness', 0, 1).name('Roughness');

// Box controls
const boxFolder = gui.addFolder('Box');
boxFolder.add(box.rotation, 'x', 0, Math.PI * 2).name('Rotate X');
boxFolder.add(box.rotation, 'y', 0, Math.PI * 2).name('Rotate Y');
boxFolder.add(box.scale, 'x', 0.5, 3).name('Scale X');
boxFolder.add(box.scale, 'y', 0.5, 3).name('Scale Y');
boxFolder.add(box.scale, 'z', 0.5, 3).name('Scale Z');

let boxRotationSpeed = { speed: 0.01 };
boxFolder.add(boxRotationSpeed, 'speed', 0, 0.1).name('Rotation Speed');

// Light controls
const lightFolder = gui.addFolder('Lights');

// Ambient Light Controls
const ambientFolder = lightFolder.addFolder('Ambient Light');
ambientFolder.add(ambientLight, 'intensity', 0, 2).name('Intensity'); // Control intensity
ambientFolder.open();

// Directional Light Controls
const directionalFolder = lightFolder.addFolder('Directional Light');
directionalFolder.add(directionalLight.position, 'x', -10, 10).name('Position X');
directionalFolder.add(directionalLight.position, 'y', -10, 10).name('Position Y');
directionalFolder.add(directionalLight.position, 'z', -10, 10).name('Position Z');
directionalFolder.add(directionalLight, 'intensity', 0, 2).name('Intensity'); // Control intensity
directionalFolder.open();

// Point Light Controls
const pointFolder = lightFolder.addFolder('Point Light');
pointFolder.add(pointLight.position, 'x', -10, 10).name('Position X');
pointFolder.add(pointLight.position, 'y', -10, 10).name('Position Y');
pointFolder.add(pointLight.position, 'z', -10, 10).name('Position Z');
pointFolder.add(pointLight, 'intensity', 0, 2).name('Intensity'); // Control intensity
pointFolder.open();

// Open main lights folder
lightFolder.open();

materialFolder.open();
boxFolder.open();

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the box based on speed
    box.rotation.x += boxRotationSpeed.speed;
    box.rotation.y += boxRotationSpeed.speed;

    // Update controls
    controls.update();

    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
