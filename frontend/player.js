class Player extends THREE.Group {
    mesh = new THREE.Mesh(new THREE.BoxGeometry(5, 15, 0));

    constructor() {
        super();
        this.changePosition()

        window.addEventListener("keypress", (event)=>{
            if(event.key === "w"){
                console.log("w clicked")

                if(this.mesh.position.y < 76) {
                    // move up
                    this.mesh.position.y += 1;
                }
            }
            if(event.key === "s"){
                console.log("s clicked")

                if(this.mesh.position.y > -76) {
                    // move up
                    this.mesh.position.y -= 1;
                }
            }
        })

        // add mesh
        this.add(this.mesh);
    }

    changePosition() {
        // mesh
        this.mesh.position.z = 0;

        this.mesh.position.x = -145;
    }
}