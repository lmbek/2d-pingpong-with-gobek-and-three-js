// initialize scene
const scene = new THREE.Scene()

// set up player
//const player = new Player()
const playerLeft = new PlayerLeft()
const playerRight = new PlayerRight()
const ball = new Ball()
const walls = [new Wall(85), new Wall(-85)]
const goals = [new Goal(-160), new Goal(160)]
let scorePlayerLeft = 0
let scorePlayerRight = 0

// add player to scene
//scene.add(player)
scene.add(playerLeft)
scene.add(playerRight)
scene.add(ball)
scene.add(walls[0])
scene.add(walls[1])
scene.add(goals[0])
scene.add(goals[1])

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
    ball.update()

    playerLeft.update()
    playerRight.update()

    collision()

    console.log("Score: ", scorePlayerLeft, "/", scorePlayerRight)
}, 1000/60)

document.body.appendChild(renderer.domElement)

function collision(){
    // ball collision with walls
    if(ball.boundingMesh.intersectsBox(walls[0].boundingMesh) || ball.boundingMesh.intersectsBox(walls[1].boundingMesh)){
        ball.yVelocity = -ball.yVelocity
    }

    // ball collision with players
    if(ball.boundingMesh.intersectsBox(playerLeft.boundingMesh) || ball.boundingMesh.intersectsBox(playerRight.boundingMesh)) {
        ball.xVelocity = -ball.xVelocity
        // increase ball speed
        ball.numberOfHits += 1
        ball.increaseSpeed()
        console.log(ball.speed)
    }

    // ball collision with left goal
    if(ball.boundingMesh.intersectsBox(goals[0].boundingMesh)){
        //console.log("left")
        scorePlayerRight += 1

        ball.mesh.position.x = 0
        ball.mesh.position.y = 0
    }

    // ball collision with right goal
    if(ball.boundingMesh.intersectsBox(goals[1].boundingMesh)){
        //console.log("right")
        scorePlayerLeft += 1

        ball.mesh.position.x = 0
        ball.mesh.position.y = 0
    }
}