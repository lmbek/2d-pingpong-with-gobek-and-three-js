class Player extends THREE.Group {
    mesh = new THREE.Mesh(new THREE.BoxGeometry(5, 15, 0))
    boundingMesh = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
    speed = 5

    constructor() {
        super()
        this.changePosition()

        // add mesh
        this.add(this.mesh)
        this.boundingMesh.setFromObject(this.mesh)
    }

    changePosition() {
        // mesh z position
        this.mesh.position.z = 0
    }

    updatePlayer(){
        // update bounding meshes
        this.boundingMesh.copy(this.mesh.geometry.boundingBox).applyMatrix4(this.mesh.matrixWorld)
        //console.log(this.boundingMesh)
    }
}