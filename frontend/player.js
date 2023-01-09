class Player extends THREE.Group {
    input = new Input()
    mesh = new THREE.Mesh(new THREE.BoxGeometry(5, 15, 0))
    boundingMesh = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
    speed = 3

    constructor() {
        super()
        this.changePosition()

        // add mesh
        this.add(this.mesh)
        this.boundingMesh.setFromObject(this.mesh)

        //const newPos= new THREE.Vector3(0,5,0)
        //console.log(this.mesh.position.add(newPos))
    }

    changePosition() {
        // mesh z position
        this.mesh.position.z = 0
    }

    update(){
        // update bounding meshes
        this.boundingMesh.copy(this.mesh.geometry.boundingBox).applyMatrix4(this.mesh.matrixWorld)
    }
}