//import { Scene, GLTFLoader } from 'js/three.js'
//Initial Configuration
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  1,
  1000
)
camera.position.set( 20, 20, 20 );
scene.add( camera );
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x79c6c6);
document.body.appendChild(renderer.domElement);

//Resizing
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
})

controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.enableZoom = false;
controls.enablePan = false;
controls.maxPolarAngle = Math.PI / 2;
 
var light = new THREE.PointLight( 0xffffff, 0.8 );
camera.add( light );


var geometry = new THREE.BoxGeometry( 20.5, 10, 0.25 );
var material = new THREE.MeshLambertMaterial( {
   color: 0xffffff
} );
 
var onBeforeRender = function() {
 var v = new THREE.Vector3();
 return function onBeforeRender( renderer, scene, camera, geometry, material, group ) {
   if ( v.subVectors( camera.position, this.position ).dot( this.userData.normal ) < 0 ) {
     geometry.setDrawRange( 0, 0 );
   }
 };
}();

var onAfterRender = function( renderer, scene, camera, geometry, material, group ) {
 geometry.setDrawRange( 0, Infinity );
};

//Primera pared
mesh = new THREE.Mesh( geometry, material );
mesh.position.set( 0, 0, 10 );
mesh.rotation.set( 0, 0, 0 );
scene.add( mesh );
mesh.userData.normal = new THREE.Vector3( 0, 0, - 1 );
mesh.onBeforeRender = onBeforeRender;
mesh.onAfterRender = onAfterRender;

//Segunda Pared
mesh = new THREE.Mesh( geometry, material );
mesh.position.set( 0, 0, - 10 );
mesh.rotation.set( 0, 0, 0 );
scene.add( mesh );
mesh.userData.normal = new THREE.Vector3( 0, 0, 1 );
mesh.onBeforeRender = onBeforeRender;
mesh.onAfterRender = onAfterRender;

//Tercera Pared
mesh = new THREE.Mesh( geometry, material );
mesh.position.set( 10, 0, 0 );
mesh.rotation.set( 0, - Math.PI / 2, 0 );
scene.add( mesh );
mesh.userData.normal = new THREE.Vector3( - 1, 0, 0 );
mesh.onBeforeRender = onBeforeRender;
mesh.onAfterRender = onAfterRender;

//Cuarta Pared
mesh = new THREE.Mesh( geometry, material );
mesh.position.set( - 10, 0, 0 );
mesh.rotation.set( 0, Math.PI / 2, 0 );
scene.add( mesh );
mesh.userData.normal = new THREE.Vector3( 1, 0, 0 );
mesh.onBeforeRender = onBeforeRender;
mesh.onAfterRender = onAfterRender;

//Piso
var geometry = new THREE.BoxGeometry( 20.5, 20.5, 0.25 );
mesh = new THREE.Mesh( geometry, material );
mesh.position.set( 0, - 5, 0 );
mesh.rotation.set( - Math.PI / 2, 0, 0 );
scene.add( mesh );
mesh.userData.normal = new THREE.Vector3( 0, 1, 0 );
mesh.onBeforeRender = onBeforeRender;
mesh.onAfterRender = onAfterRender;

//Closet
var geometry = new THREE.BoxGeometry( 2, 8, 4 );
mesh = new THREE.Mesh( geometry, material );
mesh.position.set( 9, -1, 6 );
scene.add( mesh );

//Cajones
var geometry = new THREE.BoxGeometry( 3, 4, 7 );
mesh = new THREE.Mesh( geometry, material );
mesh.position.set( -8, -3, -4 );
scene.add( mesh );

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();