
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GUI } from 'dat.gui';
// import './App.css'; // Optional: Add your styling here

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Load texture
    const loader = new THREE.TextureLoader();
    const texture = loader.load('./pic.jpg');

    // Box geometry and material
    const boxGeometry = new THREE.BoxGeometry(5, 5, 3);
    const boxMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      metalness: 0.7,
      roughness: 0.4,
    });

    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.add(box);

    // Animation controls
    let boxRotationSpeed = { speed: 0.01 };

    // dat.GUI setup
    const gui = new GUI();
    const materialFolder = gui.addFolder('Material');
    materialFolder.add(boxMaterial, 'metalness', 0, 1).name('Metalness');
    materialFolder.add(boxMaterial, 'roughness', 0, 1).name('Roughness');

    const boxFolder = gui.addFolder('Box');
    boxFolder.add(box.rotation, 'x', 0, Math.PI * 2).name('Rotate X');
    boxFolder.add(box.rotation, 'y', 0, Math.PI * 2).name('Rotate Y');
    boxFolder.add(box.scale, 'x', 0.5, 3).name('Scale X');
    boxFolder.add(box.scale, 'y', 0.5, 3).name('Scale Y');
    boxFolder.add(box.scale, 'z', 0.5, 3).name('Scale Z');
    boxFolder.add(boxRotationSpeed, 'speed', 0, 0.1).name('Rotation Speed');

    materialFolder.open();
    boxFolder.open();

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      box.rotation.x += boxRotationSpeed.speed;
      box.rotation.y += boxRotationSpeed.speed;
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', onWindowResize);
      gui.destroy(); // Destroy the GUI when component unmounts
    };
  }, []);

  return <canvas ref={canvasRef} />;
}

export default App;
