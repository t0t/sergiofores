import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.modelo3d');

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry( .5, 10, 10)

// Materials
const material = new THREE.MeshBasicMaterial(
  {
    color: 0x0095DD,
    wireframe:true
  }
);
material.color = new THREE.Color("white")

// Mesh
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

// Model
// const modl = require("../models/model-1.gltf")
// console.log(modl)

// const loader = new GLTFLoader()
// loader.load(MODEL, (gltf) => {
//   gltf.scene.traverse(function (child) {
//     // console.log(child);
//     child.castShadow = true;
//     child.doubleSided = true;
//   });
//   gltf.scene.scale.x = 0.05;
//   gltf.scene.scale.y = 0.05;
//   gltf.scene.scale.z = 0.05;
  
//   console.log(gltf.scene);
//   scene.add(gltf.scene);
// });
// console.log(loader)

// Lights
// const pointLight = new THREE.AmbientLight (0x404040,.5)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 8
// scene.add(pointLight)

const sizes = {
  canvaswidth: window.innerWidth,
  canvasheight: window.innerHeight
}

window.addEventListener("resize", ()=> {
    // Update sizes
    sizes.canvaswidth = window.innerWidth
    sizes.canvasheight = window.innerHeight
    
    // Update camera
    camera.aspect = sizes.canvaswidth / sizes.canvasheight
    camera.updateProjectionMatrix()
    // camera.position.set(0,100,0); 
    // camera.lookAt(scene.position);
    
    // Update renderer
    renderer.setSize(sizes.canvaswidth,sizes.canvasheight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.canvaswidth / sizes.canvasheight, 0.1, 5000)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

/**
 * Renderer
 */
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
  })
  renderer.setSize(sizes.canvaswidth,sizes.canvasheight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))


/**
 * Animate
 */

document.addEventListener("mousemove", onDocumentMouseMove)

let mouseX = 0
let mouseY = 0
let targetX = 0
let targetY = 0

const windowX = window.innerWidth / 2
const windowY = window.innerHeight / 2

function onDocumentMouseMove(e) {
  mouseX = (e.clientX - windowX)
  mouseY = (e.clientY - windowY)
}

const updateSphere = (e) => {
  sphere.position.z = window.scrollY * .001
}
window.addEventListener("scroll", updateSphere)

const clock = new THREE.Clock()

const tick = () => {
  targetX = mouseX * .001
  targetY = mouseY * .001

  const elapsedTime = clock.getElapsedTime()

  // Update objects
  sphere.rotation.y = 5 / elapsedTime

  //mouse detection
  sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
  sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
  sphere.position.z += -.05 * (targetY - sphere.rotation.x)

  // Render
  renderer.render(scene,camera)
  
  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}
tick()
