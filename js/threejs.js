import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


//document.getElementById
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.set(4, 5, 11);
camera.lookAt(0, 0, 0);

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let object;
let controls;
let objToRender = 'dino';


const loader = new GLTFLoader();
loader.load('models/threeDsite/dino/table11.glb',function(gltf){
    object =gltf.scene;
    scene.add(object);

},
function (xhr){
    console.log((xhr.load/xhr.total*100) + '% loaded');
},
function (error){
    console.error(error)
}
)
;


//const renderer = new THREE.WebGLRenderer({alpha:true});
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize(window.innerWidth/2, window.innerHeight/3);
renderer.setClearColor(0x000000);//background of viwport
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('threeD').appendChild( renderer.domElement );


camera.position.z = objToRender === "dino"?10:500;//zoom 25:500

/*add plane to scene
const groundGeometry = new THREE.PlaneGeometry(10, 10, 10, 10);
groundGeometry.rotateX(-Math.PI / 2);
const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x555ff5,
    side: THREE.DoubleSide
});

const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
scene.add(groundMesh);
*/
const topLight = new THREE.SpotLight(0xffffff, 3, 500, 0.2, 0.5);//new THREE.DirectionalLight(0xffffff,1)
topLight.position.set(100,25,100)
topLight.castShadow =true;
scene.add(topLight);
//second light source
const topLightt = new THREE.SpotLight(0xffffff, 3, 500, 0.2, 0.5);//new THREE.DirectionalLight(0xffffff,1)
topLightt.position.set(-100,25,-100)
topLightt.castShadow =true;
scene.add(topLightt);

const ambientLight = new THREE.AmbientLight(0x333333,objToRender==='dino'?5:1);//light intensity
scene.add(ambientLight);

if(objToRender === "dino"){
    controls = new OrbitControls(camera, renderer.domElement);
}

function animate(){
    requestAnimationFrame(animate);

if(object && objToRender === "plate"){
        object.rotation.y= -3 + mouseX/window.innerWidth * 3;
        object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight
    }
    renderer.render(scene,camera)
}

window.addEventListener("resize",function(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth/window.innerHeight);
});

document.onmousemove = (e)=>{
    mouseX = e.clientX;
    mouseY = e.clientY;  
}

animate();
if (!renderer.getContext()) {
    console.error("WebGL not supported!");
} else {
    console.log("WebGL is supported.");
}

   

