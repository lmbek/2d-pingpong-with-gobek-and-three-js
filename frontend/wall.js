class Wall extends THREE.Group {
    geometry  = new THREE.BoxGeometry(285, 5, 0);
    material = new THREE.MeshBasicMaterial( {color: 0xC4A484} );
    mesh = new THREE.Mesh(this.geometry, this.material);

    constructor(y) {
        super()
        this.mesh.position.x = 0
        this.mesh.position.y = y
        this.mesh.position.z = 0

        // add mesh
        this.add(this.mesh)
    }
}