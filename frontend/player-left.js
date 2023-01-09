class PlayerLeft extends Player {

    constructor() {
        super()

        window.addEventListener("keypress", (event)=>{
            if(event.key === "w"){
                //console.log("w clicked")

                if(this.mesh.position.y < 75) {
                    // move up
                    this.mesh.position.y += this.speed
                }
            }
            if(event.key === "s"){
                //console.log("s clicked")

                if(this.mesh.position.y > -75) {
                    // move up
                    this.mesh.position.y -= this.speed
                }
            }
        })
    }

    changePosition() {
        super.changePosition()
        // mesh x position
        this.mesh.position.x = -145;
    }

}