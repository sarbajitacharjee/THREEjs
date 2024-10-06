// src/main.js
import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // Import Orbit Controls
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


// Set up the scene, camera, and renderer
let canvas = document.getElementById('draw');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

// Set the size of the renderer
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load HDRI texture for lighting
const rgbeLoader = new RGBELoader();
rgbeLoader.load('/zwartkops_pit_2k.hdr', (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    // scene.background = texture; // Set the scene background to the HDRI texture
    scene.environment = texture; // Set the scene environment to the HDRI texture


    const gltfLoader = new GLTFLoader();
    gltfLoader.load('/skeleton.glb', (gltf) => {
      // gltf.scene.scale.set(1, 1, 1);
      gltf.scene.position.set(0, -1, 9.8);
        scene.add(gltf.scene);

    });


    // Create a basic geometry and material
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    // Set the camera position
    camera.position.z = 11;
    

    // Add Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        controls.update(); // Update the controls
        renderer.render(scene, camera);
    };

    animate();
});

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
