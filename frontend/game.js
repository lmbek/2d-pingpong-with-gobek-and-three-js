class Game {


    constructor() {
        this.scene = new THREE.Scene();
        this.playerLeft = new PlayerLeft(-134, 0xff0000);
        this.playerRight = new PlayerRight(134, 0x0000ff);
        this.ball = new Ball();
        this.walls = [new Wall(70), new Wall(-70)];
        this.goals = [new Goal(-140), new Goal(140)]; // 160
        this.scorePlayerLeft = 0;
        this.scorePlayerRight = 0;
        this.aspectRatio = 16 / 9;
        this.cameraWidth = 300;
        this.cameraHeight = this.cameraWidth / this.aspectRatio;
        this.camera = new THREE.OrthographicCamera(
            this.cameraWidth / -2,
            this.cameraWidth / 2,
            this.cameraHeight / 2,
            this.cameraHeight / -2,
            0,
            1000,
        );
        this.camera.position.set(0, 0, 1000);
        this.renderer = new THREE.WebGLRenderer({antialias: true});

        let width = window.innerWidth;
        let height = window.innerHeight;

        if (width / height > this.aspectRatio) {
            width = height * this.aspectRatio;
        } else {
            height = width / this.aspectRatio;
        }

        this.renderer.setSize( width, height);
        this.renderer.setViewport( 0, 0, width, height);
        this.camera.aspect = this.aspectRatio;
        this.camera.updateProjectionMatrix();

        addEventListener("resize", (event) => {
            let width = window.innerWidth;
            let height = window.innerHeight;

            if (width / height > this.aspectRatio) {
                width = height * this.aspectRatio;
            } else {
                height = width / this.aspectRatio;
            }

            this.renderer.setSize( width, height);
            this.renderer.setViewport( 0, 0, width, height);
            this.camera.aspect = this.aspectRatio;
            this.camera.updateProjectionMatrix();
        });
        document.body.appendChild(this.renderer.domElement);
    }

    start() {
        // Add objects to scene
        this.scene.add(this.playerLeft);
        this.scene.add(this.playerRight);
        this.scene.add(this.ball);
        this.scene.add(this.walls[0]);
        this.scene.add(this.walls[1]);
        this.scene.add(this.goals[0]);
        this.scene.add(this.goals[1]);

        this.updateUI()
        // start update method
        this.interval = window.setInterval(() => {
            this.update()
        }, 1000 / 60);
    }

    update() {
        this.renderer.render(this.scene, this.camera);
        this.collision();
        this.ball.update();
        this.playerLeft.update();
        this.playerRight.update();
    }

    stop() {
        window.clearInterval(this.interval);
    }

    updateUI(){
        document.getElementById("score").innerText = "Score: "+this.scorePlayerLeft+" / "+this.scorePlayerRight
    }

    collision() {
        this.handleGoalCollision()
        //this.handleLeftPlayerCollisionWithRaycast()
        this.handleLeftPlayerCollisions()
        this.handleRightPlayerCollisions()
        this.handleTopWallCollisions()
        this.handleBottomWallCollisions()
    }

    handleGoalCollision() {

        if (this.ball.mesh.position.x - this.ball.mesh.geometry.parameters.radius < this.goals[0].mesh.position.x + this.goals[0].mesh.geometry.parameters.width/2
            && this.ball.mesh.position.x + this.ball.mesh.geometry.parameters.radius > this.goals[0].mesh.position.x - this.goals[0].mesh.geometry.parameters.width/2
            && this.ball.mesh.position.y + this.ball.mesh.geometry.parameters.radius > this.goals[0].mesh.position.y - this.goals[0].mesh.geometry.parameters.height/2
            && this.ball.mesh.position.y - this.ball.mesh.geometry.parameters.radius < this.goals[0].mesh.position.y + this.goals[0].mesh.geometry.parameters.height/2){
            // Left goal collision detected!
            this.scorePlayerRight += 1;
            this.updateUI()
            this.ball.mesh.position.x = 0;
            this.ball.mesh.position.y = 0;
            this.ball.velocity.x = 0;
            this.ball.velocity.y = 0;
            this.playerLeft.started = false
        }
        if (this.ball.mesh.position.x - this.ball.mesh.geometry.parameters.radius < this.goals[1].mesh.position.x + this.goals[1].mesh.geometry.parameters.width/2
            && this.ball.mesh.position.x + this.ball.mesh.geometry.parameters.radius > this.goals[1].mesh.position.x - this.goals[1].mesh.geometry.parameters.width/2
            && this.ball.mesh.position.y + this.ball.mesh.geometry.parameters.radius > this.goals[1].mesh.position.y - this.goals[1].mesh.geometry.parameters.height/2
            && this.ball.mesh.position.y - this.ball.mesh.geometry.parameters.radius < this.goals[1].mesh.position.y + this.goals[1].mesh.geometry.parameters.height/2){
            // Right goal collision detected!
            this.scorePlayerLeft += 1;
            this.updateUI()
            this.ball.mesh.position.x = 0;
            this.ball.mesh.position.y = 0;
            this.ball.velocity.x = 0;
            this.ball.velocity.y = 0;
            this.playerLeft.started = false
        }
    }

    handleTopWallCollisions(){
        // check if ball collides with top wall
        if (this.ball.mesh.position.y + this.ball.mesh.geometry.parameters.radius > this.walls[0].mesh.position.y - this.walls[0].mesh.geometry.parameters.height/2) {
            this.ball.velocity.y = -this.ball.velocity.y;
        }
    }

    handleBottomWallCollisions(){
        // check if ball collides with bottom wall
        if (this.ball.mesh.position.y - this.ball.mesh.geometry.parameters.radius < this.walls[1].mesh.position.y + this.walls[1].mesh.geometry.parameters.height/2) {
            this.ball.velocity.y = -this.ball.velocity.y;
        }
    }

    handleLeftPlayerCollisions(){
        // check if ball collides with player
        if (this.ball.mesh.position.x - this.ball.mesh.geometry.parameters.radius < this.playerLeft.mesh.position.x + this.playerLeft.mesh.geometry.parameters.width/2
            && this.ball.mesh.position.x + this.ball.mesh.geometry.parameters.radius > this.playerLeft.mesh.position.x - this.playerLeft.mesh.geometry.parameters.width/2
            && this.ball.mesh.position.y + this.ball.mesh.geometry.parameters.radius > this.playerLeft.mesh.position.y - this.playerLeft.mesh.geometry.parameters.height/2
            && this.ball.mesh.position.y - this.ball.mesh.geometry.parameters.radius < this.playerLeft.mesh.position.y + this.playerLeft.mesh.geometry.parameters.height/2){
            // collision detected!
            this.ball.velocity.x = -this.ball.velocity.x;
            this.ball.increaseSpeed();
        }
    }

    handleRightPlayerCollisions(){
        // check if ball collides with playerRight
        if (this.ball.mesh.position.x - this.ball.mesh.geometry.parameters.radius < this.playerRight.mesh.position.x + this.playerRight.mesh.geometry.parameters.width/2
            && this.ball.mesh.position.x + this.ball.mesh.geometry.parameters.radius > this.playerRight.mesh.position.x - this.playerRight.mesh.geometry.parameters.width/2
            && this.ball.mesh.position.y + this.ball.mesh.geometry.parameters.radius > this.playerRight.mesh.position.y - this.playerRight.mesh.geometry.parameters.height/2
            && this.ball.mesh.position.y - this.ball.mesh.geometry.parameters.radius < this.playerRight.mesh.position.y + this.playerRight.mesh.geometry.parameters.height/2){
            // collision detected!
            this.ball.velocity.x = -this.ball.velocity.x;
            this.ball.increaseSpeed();
        }
    }
}
    const game = new Game();
    game.start();