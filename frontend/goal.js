class Goal extends THREE.Group {
    geometry  = new THREE.BoxGeometry(5, 135, 0);
    material = new THREE.MeshBasicMaterial( {color: 0xff00ff} );
    mesh = new THREE.Mesh(this.geometry, this.material);

    constructor(x) {
        super()
        this.mesh.position.x = x
        this.mesh.position.y = 0
        this.mesh.position.z = 0

        // add mesh
        this.add(this.mesh)
    }
}