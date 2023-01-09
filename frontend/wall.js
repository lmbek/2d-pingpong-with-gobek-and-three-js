class Wall extends THREE.Group {
    mesh = new THREE.Mesh(new THREE.BoxGeometry(window.innerWidth, 5, 0));
    boundingMesh = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
    yPosition = 0

    constructor(yPosition) {
        super()
        this.yPosition = yPosition
        this.setPosition()

        // add mesh
        this.add(this.mesh)
        this.boundingMesh.setFromObject(this.mesh)
    }

    setPosition() {
        // mesh z position
        this.mesh.position.z = 0
        this.mesh.position.y = this.yPosition
    }
}