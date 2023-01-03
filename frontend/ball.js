class Ball extends THREE.Group {
    mesh = new THREE.Mesh(new THREE.SphereGeometry(1))
    boundingMesh = new THREE.Sphere(this.mesh.position, 1)
    xVelocity = 0
    yVelocity = 0
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
        this.xVelocity = Math.random() > 0.5 ? -1 : 1 // if random value (decimal between 0-1) is above 0.5, then -1 else 1

        // set the y at angle 45
        this.yVelocity = this.getRandomInteger(-0.7, 0.7)
    }

    updateBall(){
        // update bounding meshes
        this.boundingMesh.copy(this.mesh.geometry.boundingSphere).applyMatrix4(this.mesh.matrixWorld)
        //console.log(this.boundingMesh)

        // set velocity
        this.velocity = new THREE.Vector3(this.xVelocity, this.yVelocity, 0)
        // normalize the velocity vector, to make it uniform
        this.velocity.normalize()
        // make the ball move
        this.mesh.position.add(this.velocity)
    }
}

