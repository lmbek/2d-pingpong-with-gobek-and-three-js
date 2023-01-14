class Ball extends THREE.Group {
    geometry  = new THREE.SphereGeometry(1);
    material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
    mesh = new THREE.Mesh(this.geometry, this.material);
    velocity = new THREE.Vector3(0,0,0)
    baseSpeed = 1
    speed = 1
    numberOfHits = 0

    constructor(){
        super();
        this.mesh.position.z = 0;

        // add mesh
        this.add(this.mesh);
    }

    getRandomInteger(min, max){
        return (Math.random() * (max - min + 1) ) + min
    }

    setInitialMovement(){
        // the ball can go left or right randomly at the beginning
        this.velocity.x = Math.random() > 0.5 ? -1 : 1 // if random value (decimal between 0-1) is above 0.5, then -1 else 1

        // set the y at angle 45
        this.velocity.y = this.getRandomInteger(-0.7, 0.7)
    }

    increaseSpeed(){
        this.speed = this.baseSpeed + 0.1 * game.numberOfHits
    }

    update(){
        // normalize the velocity vector, to make it uniform
        this.velocity.normalize()
        // scale the velocity with speed
        this.velocity.multiplyScalar(this.speed)
        // make the ball move
        this.mesh.position.add(this.velocity)
    }

    reset(){
        game.updateUI()
        this.mesh.position.x = 0;
        this.mesh.position.y = 0;
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.speed = this.baseSpeed
        game.numberOfHits = 0
        game.playerLeft.started = false
    }
}

