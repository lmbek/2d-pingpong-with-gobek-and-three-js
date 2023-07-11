class Game {
    constructor() {
        this.scene = new THREE.Scene();
        this.playerLeft = new PlayerLeft(-134, 0xff0000);
        this.playerRight = new PlayerRight(134, 0x0000ff);
        this.ball = new Ball();
        this.walls = [new Wall(70), new Wall(-70)];
        this.goals = [new Goal(-140), new Goal(140)]; // 160
        this.rectangleRight = new Rectangle(60, 20);
        this.rectangleLeft = new Rectangle(-60, 20);
        this.scorePlayerLeft = 0;
        this.scorePlayerRight = 0;
        this.numberOfHits = 0;
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

        //this.scene.add(this.rectangleLeft);
        //this.scene.add(this.rectangleRight);

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
/*
        const result = this.handleRectangleCollision({
            x: 30,
            y: 50,
            width: 100,
            height: 120
        },
        {
            x: 35,
            y: 100,
            width: 150,
            height: 250
        });

        console.log(result)
 */
    }

    handleRectangleCollision(rect1,rect2){
        if (
            rect1.x + rect1.width > rect2.x &&
            rect1.x < rect2.x + rect2.width &&
            rect1.y + rect1.height > rect2.y &&
            rect1.y < rect2.y + rect2.height
        ) {
            // Rectangles intersect
            const xDiff = (rect1.x + rect1.width / 2) - (rect2.x + rect2.width / 2);
            const yDiff = (rect1.y + rect1.height / 2) - (rect2.y + rect2.height / 2);
            const w = 0.5 * (rect1.width + rect2.width);
            const h = 0.5 * (rect1.height + rect2.height);
            const dx = Math.abs(xDiff);
            const dy = Math.abs(yDiff);

            if (dx <= w && dy <= h) {
                // Collision occurred
                const wy = w * yDiff;
                const hx = h * xDiff;

                if (wy > hx) {
                    return wy > -hx ? "bottom" : "left";
                } else {
                    return wy > -hx ? "right" : "top";
                }
            }
            // No collision occurred
            return null;
        }
    }

    handleGoalCollision() {
        // check left goal
        if (this.ball.mesh.position.x - this.ball.mesh.geometry.parameters.radius < this.goals[0].mesh.position.x + this.goals[0].mesh.geometry.parameters.width/2
            && this.ball.mesh.position.x + this.ball.mesh.geometry.parameters.radius > this.goals[0].mesh.position.x - this.goals[0].mesh.geometry.parameters.width/2
            && this.ball.mesh.position.y + this.ball.mesh.geometry.parameters.radius > this.goals[0].mesh.position.y - this.goals[0].mesh.geometry.parameters.height/2
            && this.ball.mesh.position.y - this.ball.mesh.geometry.parameters.radius < this.goals[0].mesh.position.y + this.goals[0].mesh.geometry.parameters.height/2){
            // Left goal collision detected!
            this.scorePlayerRight += 1;
            this.ball.reset()
        }
        // check right goal
        if (this.ball.mesh.position.x - this.ball.mesh.geometry.parameters.radius < this.goals[1].mesh.position.x + this.goals[1].mesh.geometry.parameters.width/2
            && this.ball.mesh.position.x + this.ball.mesh.geometry.parameters.radius > this.goals[1].mesh.position.x - this.goals[1].mesh.geometry.parameters.width/2
            && this.ball.mesh.position.y + this.ball.mesh.geometry.parameters.radius > this.goals[1].mesh.position.y - this.goals[1].mesh.geometry.parameters.height/2
            && this.ball.mesh.position.y - this.ball.mesh.geometry.parameters.radius < this.goals[1].mesh.position.y + this.goals[1].mesh.geometry.parameters.height/2){
            // Right goal collision detected!
            this.scorePlayerLeft += 1;
            this.updateUI()
            this.ball.reset()
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
        if (this.ball.mesh.position.x + this.ball.velocity.x - this.ball.mesh.geometry.parameters.radius < this.playerLeft.mesh.position.x + this.playerLeft.mesh.geometry.parameters.width/2
            && this.ball.mesh.position.x + this.ball.velocity.x + this.ball.mesh.geometry.parameters.radius > this.playerLeft.mesh.position.x - this.playerLeft.mesh.geometry.parameters.width/2
            && this.ball.mesh.position.y + this.ball.velocity.y + this.ball.mesh.geometry.parameters.radius > this.playerLeft.mesh.position.y - this.playerLeft.mesh.geometry.parameters.height/2
            && this.ball.mesh.position.y + this.ball.velocity.y - this.ball.mesh.geometry.parameters.radius < this.playerLeft.mesh.position.y + this.playerLeft.mesh.geometry.parameters.height/2){
            // collision detected!
            this.ball.mesh.position.x = this.playerLeft.mesh.position.x + this.playerLeft.mesh.geometry.parameters.width/2
            this.ball.velocity.x = -this.ball.velocity.x;
            this.numberOfHits = this.numberOfHits +1
            this.ball.increaseSpeed();
        }
    }

    handleRightPlayerCollisions(){
        // check if ball collides with playerRight
        if (this.ball.mesh.position.x + this.ball.velocity.x - this.ball.mesh.geometry.parameters.radius < this.playerRight.mesh.position.x + this.playerRight.mesh.geometry.parameters.width/2
            && this.ball.mesh.position.x + this.ball.velocity.x + this.ball.mesh.geometry.parameters.radius > this.playerRight.mesh.position.x - this.playerRight.mesh.geometry.parameters.width/2
            && this.ball.mesh.position.y + this.ball.velocity.y + this.ball.mesh.geometry.parameters.radius > this.playerRight.mesh.position.y - this.playerRight.mesh.geometry.parameters.height/2
            && this.ball.mesh.position.y + this.ball.velocity.y - this.ball.mesh.geometry.parameters.radius < this.playerRight.mesh.position.y + this.playerRight.mesh.geometry.parameters.height/2){
            // collision detected!
            this.ball.mesh.position.x = this.playerRight.mesh.position.x - this.playerRight.mesh.geometry.parameters.width/2
            this.ball.velocity.x = -this.ball.velocity.x;
            this.numberOfHits = this.numberOfHits +1
            this.ball.increaseSpeed();
        }
    }
}
    const game = new Game();
    game.start();