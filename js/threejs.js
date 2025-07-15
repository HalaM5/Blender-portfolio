import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Get the container element
const container = document.getElementById('threeD');

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 1, 1000);
camera.position.set(4, 5, 11);
camera.lookAt(0, 0, 0);

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let object;
let controls;
let objToRender = 'dino';

// Renderer setup with proper sizing
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize(container.offsetWidth, container.offsetHeight);
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// GLTF Loader
const loader = new GLTFLoader();
loader.load('models/threeDsite/dino/table11.glb', 
    function(gltf) {
        object = gltf.scene;
        scene.add(object);
    },
    function(xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function(error) {
        console.error('Error loading model:', error);
    }
);

// Camera position based on object type
camera.position.z = objToRender === "dino" ? 10 : 500;

// Lighting setup
const topLight = new THREE.SpotLight(0xffffff, 3, 500, 0.2, 0.5);
topLight.position.set(100, 25, 100);
topLight.castShadow = true;
scene.add(topLight);

const topLightt = new THREE.SpotLight(0xffffff, 3, 500, 0.2, 0.5);
topLightt.position.set(-100, 25, -100);
topLightt.castShadow = true;
scene.add(topLightt);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender === 'dino' ? 5 : 1);
scene.add(ambientLight);

// Controls
if (objToRender === "dino") {
    controls = new OrbitControls(camera, renderer.domElement);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    if (object && objToRender === "plate") {
        object.rotation.y = -3 + mouseX / window.innerWidth * 3;
        object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
    }
    
    renderer.render(scene, camera);
}

// FIXED: Proper resize handling
function handleResize() {
    // Get current container dimensions
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    // Update camera aspect ratio
    camera.aspect = containerWidth / containerHeight;
    camera.updateProjectionMatrix();
    
    // Update renderer size
    renderer.setSize(containerWidth, containerHeight);
}

// Add resize event listener
window.addEventListener("resize", handleResize);

// Mouse move event
document.onmousemove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
};

// Start animation
animate();

// WebGL support check
if (!renderer.getContext()) {
    console.error("WebGL not supported!");
} else {
    console.log("WebGL is supported.");
}

// Optional: Add a resize observer for better responsiveness
if (window.ResizeObserver) {
    const resizeObserver = new ResizeObserver(() => {
        handleResize();
    });
    resizeObserver.observe(container);
}