class Rectangle extends THREE.Group {
    geometry  = new THREE.BoxGeometry(15, 80, 0);
    material = new THREE.MeshBasicMaterial( {color: 0x95FF95} );
    mesh = new THREE.Mesh(this.geometry, this.material);

    constructor(x,y) {
        super()
        this.mesh.position.x = x
        this.mesh.position.y = y
        this.mesh.position.z = 0

        // add mesh
        this.add(this.mesh)
    }
}