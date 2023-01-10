class Player extends THREE.Group {
    input = new Input()
    geometry  = new THREE.BoxGeometry(5,25,0);
    material
    mesh
    speed = 3

    constructor(x, color) {
        super()
        this.material = new THREE.MeshBasicMaterial( {color: color} );
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.x = x

        // add mesh
        this.add(this.mesh)
    }
}