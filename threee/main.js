// Import necessary components from Three.js
import * as THREE from 'three';

// Create the scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
scene.add(camera);

// Create a cube geometry and material
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xffbbaa });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Get the canvas element and set up the renderer
const canvas = document.getElementById('draw');
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Render the scene with the camera
renderer.render(scene, camera);

// For Animation
let clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);

    // Move the cube up and down using sine wave
    cube.position.y = Math.sin(clock.getElapsedTime()) * 2;

    // Optionally add rotation (uncomment to use)
    // cube.rotation.x += 0.1;
    // cube.rotation.y += 0.1;

    // Render the scene again on each frame
    renderer.render(scene, camera);
}

// Start the animation loop
animate();

// Resize the renderer and camera on window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
