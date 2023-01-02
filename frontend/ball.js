class Ball extends THREE.Group {
    mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 0));
    x = 0
    y = 0
    velocity = null

    constructor(){
        super();
        this.mesh.position.z = 0;

        // add mesh
        this.add(this.mesh);

        // set initial position
        this.setInitialMovement()
    }

    getRandomInteger(min, max){
        return (Math.random() * (max - min + 1) ) + min
    }

    setInitialMovement(){
        // the ball can go left or right randomly at the beginning
        this.x = Math.random() > 0.5 ? -1 : 1 // if random value (decimal between 0-1) is above 0.5, then -1 else 1

        // set the y at angle 45
        this.y = this.getRandomInteger(-0.7, 0.7)

        // set initial velocity
        this.velocity = new THREE.Vector3(this.x, this.y, 0)
    }

    updateBall(){
        this.velocity.normalize()
        this.mesh.position.add(this.velocity)
    }


}

