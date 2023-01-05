class Goal extends THREE.Group {
    mesh = new THREE.Mesh(new THREE.BoxGeometry(0, window.innerHeight, 0));
    boundingMesh = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
    xPosition = 0

    constructor(xPosition) {
        super()
        this.xPosition = xPosition
        this.setPosition()

        // add mesh
        this.add(this.mesh)
        this.boundingMesh.setFromObject(this.mesh)
    }

    setPosition() {
        // mesh z position
        this.mesh.position.z = 0
        this.mesh.position.x = this.xPosition
    }
}