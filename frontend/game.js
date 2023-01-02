// initialize scene
const scene = new THREE.Scene()

// set up player
const player = new Player()
const ball = new Ball()

// add player to scene
scene.add(player)
scene.add(ball)

// set up camera
const aspectRatio = 16/9 //const aspectRatio = window.innerWidth / window.innerHeight
const cameraWidth = 300
const cameraHeight = cameraWidth / aspectRatio
const camera = new THREE.OrthographicCamera(
    cameraWidth / -2, // left
    cameraWidth / 2, // right
    cameraHeight / 2, // top
    cameraHeight / -2, // bottom
    0, // near plane
    1000 // far plane
)
camera.position.set(0, 0, 1000)
//camera.up.set(0, 0, 1)
//camera.lookAt(0, 0, 0)

// set up renderer
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
//renderer.render(scene, camera)

// render all
window.setInterval(()=>{
    renderer.render(scene, camera)

    // game logic
    ball.updateBall()
}, 1000/60)

document.body.appendChild(renderer.domElement)