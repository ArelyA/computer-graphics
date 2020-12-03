//Initial Configuration
//Camera
const camera = new THREE.PerspectiveCamera(
  80,
  window.innerWidth / window.innerHeight,
  1,
  2000
)
camera.position.set(20, 20, 20)
//Scene
const scene = new THREE.Scene()
scene.add(camera)
//Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.BasicShadowMap
document.body.appendChild(renderer.domElement)

//Resizing
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
})

//Controls
let controls = new THREE.OrbitControls(camera, renderer.domElement)
controls.enableZoom = true
controls.enablePan = true
controls.maxPolarAngle = Math.PI / 2

//Light
let light = new THREE.AmbientLight(0xffffff, 0.3)
camera.add(light)
//Comment light above and uncomment this to get a fully illuminated scene
/* light = new THREE.DirectionalLight(0xffffff, 2.0, 1000)
light.position.set(0, 0, 0)
light.castShadow = true
light.shadow.camera.near = 0.1
light.shadow.camera.far = 100
camera.add(light) */

var geometry = new THREE.BoxGeometry(30, 10, 0.25)
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

//Textura Paredes
var texture = new THREE.TextureLoader().load(
  '/computer-graphics/Assets/Textures/TexturesCom_WoodRough0021_5_seamless_S.jpg'
)

material = new THREE.MeshLambertMaterial({ map: texture })

//Primera pared
let mesh = new THREE.Mesh(geometry, material)
mesh.position.set(0, 0, 15)
mesh.rotation.set(0, 0, 0)
mesh.userData.normal = new THREE.Vector3(0, 0, -1)
mesh.onBeforeRender = onBeforeRender
mesh.onAfterRender = onAfterRender
mesh.receiveShadow = true
mesh.castShadow = true
scene.add(mesh)

//Segunda Pared
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(0, 0, -15)
mesh.rotation.set(0, 0, 0)
mesh.userData.normal = new THREE.Vector3(0, 0, 1)
mesh.onBeforeRender = onBeforeRender
mesh.onAfterRender = onAfterRender
mesh.receiveShadow = true
mesh.castShadow = true
scene.add(mesh)

//Tercera Pared
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(15, 0, 0)
mesh.rotation.set(0, -Math.PI / 2, 0)
mesh.userData.normal = new THREE.Vector3(-1, 0, 0)
mesh.onBeforeRender = onBeforeRender
mesh.onAfterRender = onAfterRender
mesh.receiveShadow = true
mesh.castShadow = true
scene.add(mesh)

//Cuarta Pared
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(-15, 0, 0)
mesh.rotation.set(0, Math.PI / 2, 0)
mesh.userData.normal = new THREE.Vector3(1, 0, 0)
mesh.onBeforeRender = onBeforeRender
mesh.onAfterRender = onAfterRender
mesh.receiveShadow = true
mesh.castShadow = true
scene.add(mesh)

//Piso
var geometry = new THREE.BoxGeometry(30, 30, 0.25)
var texture = new THREE.TextureLoader().load(
  '/computer-graphics/Assets/Textures/TexturesCom_WoodRough0047_4_S.jpg'
)
texture.wrapS = THREE.MirroredRepeatWrapping
texture.wrapT = THREE.MirroredRepeatWrapping
texture.repeat.set(4, 8)
material = new THREE.MeshLambertMaterial({ map: texture })
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(0, -5, 0)
mesh.rotation.set(-Math.PI / 2, 0, 0)
mesh.userData.normal = new THREE.Vector3(0, 1, 0)
mesh.onBeforeRender = onBeforeRender
mesh.onAfterRender = onAfterRender
mesh.receiveShadow = true
mesh.castShadow = true
scene.add(mesh)

//Closet #1
var geometry = new THREE.BoxGeometry(2, 8, 6)
var texture = new THREE.TextureLoader().load(
  '/computer-graphics/Assets/Textures/0088-dark-raw-wood-texture-seamless-hr.jpg'
)
texture.wrapS = THREE.RepeatWrapping
texture.wrapT = THREE.RepeatWrapping
texture.repeat.set(1, 3)
material = new THREE.MeshLambertMaterial({ map: texture })
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(14, -1, 6)
mesh.receiveShadow = true
mesh.castShadow = true
scene.add(mesh)
//Puerta #1
var geometry = new THREE.BoxGeometry(0.5, 7, 2.5)
var texture = new THREE.TextureLoader().load(
  '/computer-graphics/Assets/Textures/0088-dark-raw-wood-texture-seamless-hr_2.jpg'
)
texture.wrapS = THREE.RepeatWrapping
texture.wrapT = THREE.RepeatWrapping
texture.repeat.set(1, 1)
material = new THREE.MeshLambertMaterial({ map: texture })
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(13, -1, 7.5)
mesh.receiveShadow = true
mesh.castShadow = true
scene.add(mesh)
//Puerta #2
var geometry = new THREE.BoxGeometry(0.5, 7, 2.5)
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(13, -1, 4.5)
mesh.receiveShadow = true
mesh.castShadow = true
scene.add(mesh)
//Mango de la Puerta #1
var geometry = new THREE.SphereGeometry(0.25, 32, 32)
var texture = new THREE.TextureLoader().load(
  '/computer-graphics/Assets/Textures/TexturesCom_LeadPlate_overlay_S_2.png'
)
material = new THREE.MeshLambertMaterial({ map: texture })
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(12.75, -1, 5)
mesh.receiveShadow = true
mesh.castShadow = true
scene.add(mesh)
//Mango de la Puerta #2
var geometry = new THREE.SphereGeometry(0.25, 32, 32)
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(12.75, -1, 7)
mesh.receiveShadow = true
mesh.castShadow = true
scene.add(mesh)

//Closet #2
var geometry = new THREE.BoxGeometry(2, 8, 6)
var texture = new THREE.TextureLoader().load(
  '/computer-graphics/Assets/Textures/0088-dark-raw-wood-texture-seamless-hr.jpg'
)
texture.wrapS = THREE.RepeatWrapping
texture.wrapT = THREE.RepeatWrapping
texture.repeat.set(1, 3)
material = new THREE.MeshLambertMaterial({ map: texture })
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(14, -1, -6)
mesh.receiveShadow = true
mesh.castShadow = true
scene.add(mesh)

light = new THREE.SpotLight(0x3483de, 0.8, 1000)
light.target = mesh
light.position.set(15, 15, 15)
light.castShadow = true
scene.add(light)
//Puerta #3
var geometry = new THREE.BoxGeometry(0.5, 7, 2.5)
var texture = new THREE.TextureLoader().load(
  '/computer-graphics/Assets/Textures/0088-dark-raw-wood-texture-seamless-hr_2.jpg'
)
texture.wrapS = THREE.RepeatWrapping
texture.wrapT = THREE.RepeatWrapping
texture.repeat.set(1, 1)
material = new THREE.MeshLambertMaterial({ map: texture })
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(13, -1, -7.5)
mesh.receiveShadow = true
mesh.castShadow = true
scene.add(mesh)
//Puerta #4
var geometry = new THREE.BoxGeometry(0.5, 7, 2.5)
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(13, -1, -4.5)
scene.add(mesh)
//Mango de la Puerta #3
var geometry = new THREE.SphereGeometry(0.25, 32, 32)
var texture = new THREE.TextureLoader().load(
  '/computer-graphics/Assets/Textures/TexturesCom_LeadPlate_overlay_S_2.png'
)
material = new THREE.MeshLambertMaterial({ map: texture })
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(12.75, -1, -5)
mesh.receiveShadow = true
mesh.castShadow = true
scene.add(mesh)
//Mango de la Puerta #4
var geometry = new THREE.SphereGeometry(0.25, 32, 32)
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(12.75, -1, -7)
mesh.receiveShadow = true
mesh.castShadow = true
scene.add(mesh)

//Cajonera
var geometry = new THREE.BoxGeometry(3, 4.5, 7)
var texture = new THREE.TextureLoader().load(
  '/computer-graphics/Assets/Textures/0088-dark-raw-wood-texture-seamless-hr.jpg'
)
texture.wrapS = THREE.RepeatWrapping
texture.wrapT = THREE.RepeatWrapping
texture.repeat.set(1, 4)
material = new THREE.MeshLambertMaterial({ map: texture })
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(-13, -3, 0)
mesh.receiveShadow = true
mesh.castShadow = true
scene.add(mesh)
var geometry = new THREE.BoxGeometry(0.25, 1.8, 6.3)
var texture = new THREE.TextureLoader().load(
  '/computer-graphics/Assets/Textures/0088-dark-raw-wood-texture-seamless-hr.jpg'
)
material = new THREE.MeshLambertMaterial({ map: texture })
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(-11.5, -3.79, 0)
mesh.receiveShadow = true
mesh.castShadow = true
scene.add(mesh)
var geometry = new THREE.BoxGeometry(0.25, 1.8, 6.3)
material = new THREE.MeshLambertMaterial({ map: texture })
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(-11.5, -1.79, 0)
mesh.receiveShadow = true
mesh.castShadow = true
scene.add(mesh)

//Tapete
var geometry = new THREE.CylinderGeometry(8, 8, 0.25, 64)
var texture = new THREE.TextureLoader().load(
  '/computer-graphics/Assets/Textures/TexturesCom_PersianCarpets0016_S_2.jpg'
)
material = new THREE.MeshLambertMaterial({ map: texture })
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(0, -4.9, 0)
mesh.receiveShadow = true
mesh.castShadow = true
scene.add(mesh)

//http://127.0.0.1:8000/index2.html
//Mesa #1
var geometry = new THREE.CylinderGeometry(0.1, 0.1, 2.8, 64)
var texture = new THREE.TextureLoader().load(
  '/computer-graphics/Assets/Textures/TexturesCom_LeadPlate_overlay_S.png'
)
material = new THREE.MeshLambertMaterial({ map: texture })
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(-12.5, -3, 7)
mesh.receiveShadow = true
mesh.castShadow = true
scene.add(mesh)
//Palo de mesa #1
var geometry = new THREE.CylinderGeometry(2, 2, 0.3, 64)
var texture = new THREE.TextureLoader().load(
  '/computer-graphics/Assets/Textures/0088-dark-raw-wood-texture-seamless-hr.jpg'
)
material = new THREE.MeshLambertMaterial({ map: texture })
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(-12.5, -1.7, 7)
mesh.receiveShadow = true
mesh.castShadow = true
scene.add(mesh)
//Base de mesa #1
var geometry = new THREE.CylinderGeometry(0.1, 1, 0.4, 64)
var texture = new THREE.TextureLoader().load(
  '/computer-graphics/Assets/Textures/TexturesCom_LeadPlate_overlay_S.png'
)
material = new THREE.MeshLambertMaterial({ map: texture })
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(-12.5, -4.5, 7)
mesh.receiveShadow = true
mesh.castShadow = true
scene.add(mesh)

//Mesa #2
var geometry = new THREE.CylinderGeometry(0.1, 0.1, 2.8, 64)
var texture = new THREE.TextureLoader().load(
  '/computer-graphics/Assets/Textures/TexturesCom_LeadPlate_overlay_S.png'
)
material = new THREE.MeshLambertMaterial({ map: texture })
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(-12.5, -3, -7)
mesh.receiveShadow = true
mesh.castShadow = true
scene.add(mesh)
//Palo de mesa
var geometry = new THREE.CylinderGeometry(2, 2, 0.3, 64)
var texture = new THREE.TextureLoader().load(
  '/computer-graphics/Assets/Textures/0088-dark-raw-wood-texture-seamless-hr.jpg'
)
material = new THREE.MeshLambertMaterial({ map: texture })
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(-12.5, -1.7, -7)
mesh.receiveShadow = true
mesh.castShadow = true
scene.add(mesh)
//Base de mesa
var geometry = new THREE.CylinderGeometry(0.1, 1, 0.4, 64)
var texture = new THREE.TextureLoader().load(
  '/computer-graphics/Assets/Textures/TexturesCom_LeadPlate_overlay_S.png'
)
material = new THREE.MeshLambertMaterial({ map: texture })
mesh = new THREE.Mesh(geometry, material)
mesh.position.set(-12.5, -4.5, -7)
mesh.receiveShadow = true
mesh.castShadow = true
scene.add(mesh)

//Cargar Boo
var loader = new THREE.GLTFLoader()
var boo
var boo2
var boo3
var boo4

loader.load('/computer-graphics/models/boo/scene.gltf', function (gltf) {
  boo = gltf.scene.children[0]
  boo.scale.set(0.027, 0.027, 0.027)
  boo.position.set(0, 0, 0)
  scene.add(boo)
  boo2 = boo.clone()
  boo2.scale.set(0.015, 0.015, 0.015)
  boo2.position.set(5, 0, 5)
  //boo2.rotation.set(0, 0, 0);
  boo2.rotation.z = 180
  scene.add(boo2)
  boo3 = boo2.clone()
  boo3.position.set(-5, 0, 5)
  boo3.rotation.z = 90
  scene.add(boo3)
  boo4 = boo2.clone()
  boo4.position.set(0, 0, -5)
  boo4.rotation.z = 0
  scene.add(boo4)
})

//Datos de velocidad de Boos
var boo1Data = {
  ySpeed: 0,
}

var boo2Data = {
  ySpeed: -0.01,
}

var boo3Data = {
  ySpeed: 0.01,
}

var boo4Data = {
  ySpeed: -0.01,
}

//Funcion general de movimiento de Boos
function moveBoos() {
  moveBooY(boo, boo1Data)
  moveBooY(boo2, boo2Data)
  moveBooY(boo3, boo3Data)
  moveBooY(boo4, boo4Data)
  moveCircleBoo(boo2, 90)
  moveCircleBoo(boo3, 180)
  moveCircleBoo(boo4, 270)
}

//Movimiento de Boos en Y
function moveBooY(boo, data) {
  if (boo.position.y <= -0.7) {
    data.ySpeed = 0.01
  } else if (boo.position.y >= 0) {
    data.ySpeed = -0.01
  }
  boo.position.y += data.ySpeed
}

//Movimiento circular de Boos
function moveCircleBoo(boo, initPos) {
  let tNueva = initPos + t
  boo.position.x = 8 * Math.cos(tNueva) + 0
  boo.position.z = 8 * Math.sin(tNueva) + 0
  boo.rotation.z -= 0.01
}

var t = 0
function animate() {
  requestAnimationFrame(animate)
  if (boo && boo2 && boo3 && boo4) {
    t += 0.01
    moveBoos()
    console.log('Posicion', boo4.rotation.z)
    console.log(t)
  }
  renderer.render(scene, camera)
}
animate()
