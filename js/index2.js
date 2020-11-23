//import { Scene, GLTFLoader } from 'js/three.js'
//Initial Configuration
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  1,
  1000
)
camera.position.set(20, 20, 20)
scene.add(camera)
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0x79c6c6)
document.body.appendChild(renderer.domElement)

//Resizing
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
})

controls = new THREE.OrbitControls(camera, renderer.domElement)
controls.enableZoom = true
controls.enablePan = true
controls.maxPolarAngle = Math.PI / 2

var light = new THREE.PointLight(0xffffff, 0.8)
camera.add(light)

var geometry = new THREE.BoxGeometry(20.5, 10, 0.25)
var material = new THREE.MeshLambertMaterial({
  color: 0xffffff,
})

var onBeforeRender = (function () {
  var v = new THREE.Vector3()
  return function onBeforeRender(
    renderer,
    scene,
    camera,
    geometry,
    material,
    group
  ) {
    if (
      v.subVectors(camera.position, this.position).dot(this.userData.normal) < 0
    ) {
      geometry.setDrawRange(0, 0)
    }
  }
})()

var onAfterRender = function (
  renderer,
  scene,
  camera,
  geometry,
  material,
  group
) {
  geometry.setDrawRange(0, Infinity)
}
class CustomSinCurve extends THREE.Curve {
  constructor(scale = 1) {
    super()

    this.scale = scale
  }

  getPoint(t, optionalTarget = new THREE.Vector3()) {
    const tx = t * 3 - 1.5
    const ty = Math.sin(Math.PI * 0.6 * t)
    const tz = 0

    return optionalTarget.set(tx, ty, tz).multiplyScalar(this.scale)
  }
}

//Primera pared
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(0, 0, 10)
mesh.rotation.set(0, 0, 0)
scene.add(mesh)
mesh.userData.normal = new THREE.Vector3(0, 0, -1)
mesh.onBeforeRender = onBeforeRender
mesh.onAfterRender = onAfterRender

//Segunda Pared
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(0, 0, -10)
mesh.rotation.set(0, 0, 0)
scene.add(mesh)
mesh.userData.normal = new THREE.Vector3(0, 0, 1)
mesh.onBeforeRender = onBeforeRender
mesh.onAfterRender = onAfterRender

//Tercera Pared
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(10, 0, 0)
mesh.rotation.set(0, -Math.PI / 2, 0)
scene.add(mesh)
mesh.userData.normal = new THREE.Vector3(-1, 0, 0)
mesh.onBeforeRender = onBeforeRender
mesh.onAfterRender = onAfterRender

//Cuarta Pared
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(-10, 0, 0)
mesh.rotation.set(0, Math.PI / 2, 0)
scene.add(mesh)
mesh.userData.normal = new THREE.Vector3(1, 0, 0)
mesh.onBeforeRender = onBeforeRender
mesh.onAfterRender = onAfterRender

//Piso
var geometry = new THREE.BoxGeometry(20.5, 20.5, 0.25)
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(0, -5, 0)
mesh.rotation.set(-Math.PI / 2, 0, 0)
scene.add(mesh)
mesh.userData.normal = new THREE.Vector3(0, 1, 0)
mesh.onBeforeRender = onBeforeRender
mesh.onAfterRender = onAfterRender

//Closet #1
var geometry = new THREE.BoxGeometry(2, 8, 6)
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(9, -1, 6)
scene.add(mesh)
//Puerta #1
var geometry = new THREE.BoxGeometry(0.5, 7, 2.5)
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(8, -1, 7.5)
scene.add(mesh)
//Puerta #2
var geometry = new THREE.BoxGeometry(0.5, 7, 2.5)
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(8, -1, 4.5)
scene.add(mesh)
//Mango de la Puerta #1
var geometry = new THREE.SphereGeometry(0.25, 32, 32)
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(7.75, -1, 5)
scene.add(mesh)
//Mango de la Puerta #2
var geometry = new THREE.SphereGeometry(0.25, 32, 32)
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(7.75, -1, 7)
scene.add(mesh)

//Closet #2
var geometry = new THREE.BoxGeometry(2, 8, 6)
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(9, -1, -6)
scene.add(mesh)
//Puerta #3
var geometry = new THREE.BoxGeometry(0.5, 7, 2.5)
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(8, -1, -7.5)
scene.add(mesh)
//Puerta #4
var geometry = new THREE.BoxGeometry(0.5, 7, 2.5)
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(8, -1, -4.5)
scene.add(mesh)
//Mango de la Puerta #3
var geometry = new THREE.SphereGeometry(0.25, 32, 32)
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(7.75, -1, -5)
scene.add(mesh)
//Mango de la Puerta #4
var geometry = new THREE.SphereGeometry(0.25, 32, 32)
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(7.75, -1, -7)
scene.add(mesh)
//Cajonera
var geometry = new THREE.BoxGeometry(3, 6, 7)
material = new THREE.MeshBasicMaterial({ color: 0x3ccd28 })
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(-8, -3, 0)
scene.add(mesh)
var geometry = new THREE.BoxGeometry(0.25, 1.8, 6.3)
material = new THREE.MeshBasicMaterial({ color: 0xe24673 })
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(-6.5, -3.5, 0)
scene.add(mesh)
var geometry = new THREE.BoxGeometry(0.25, 1.8, 6.3)
material = new THREE.MeshBasicMaterial({ color: 0xe24673 })
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(-6.5, -1.5, 0)
scene.add(mesh)
//Tapete
var geometry = new THREE.CylinderGeometry(8, 8, 0.25, 64)
material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(0, -4.9, 0)
scene.add(mesh)
//Mesa #1
var geometry = new THREE.CylinderGeometry(0.1, 0.1, 2.8, 64)
material = new THREE.MeshBasicMaterial({ color: 0x489ad1 })
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(-7.5, -3, 7)
scene.add(mesh)
//Palo de mesa #1
var geometry = new THREE.CylinderGeometry(2, 2, 0.3, 64)
material = new THREE.MeshBasicMaterial({ color: 0x489ad1 })
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(-7.5, -1.5, 7)
scene.add(mesh)
//Base de mesa #1
var geometry = new THREE.CylinderGeometry(0.1, 1, 0.4, 64)
material = new THREE.MeshBasicMaterial({ color: 0x489ad1 })
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(-7.5, -4.3, 7)
scene.add(mesh)
//Mesa #2
var geometry = new THREE.CylinderGeometry(0.1, 0.1, 2.8, 64)
material = new THREE.MeshBasicMaterial({ color: 0x489ad1 })
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(-7.5, -3, -7)
scene.add(mesh)
//Palo de mesa
var geometry = new THREE.CylinderGeometry(2, 2, 0.3, 64)
material = new THREE.MeshBasicMaterial({ color: 0x489ad1 })
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(-7.5, -1.5, -7)
scene.add(mesh)
//Base de mesa
var geometry = new THREE.CylinderGeometry(0.1, 1, 0.4, 64)
material = new THREE.MeshBasicMaterial({ color: 0x489ad1 })
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(-7.5, -4.3, -7)
scene.add(mesh)

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
animate()
