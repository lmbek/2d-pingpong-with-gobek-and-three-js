class PlayerRight extends Player {

    constructor() {
        super()

        window.addEventListener("keydown", (event)=>{
            if(event.key === "ArrowUp"){
                //console.log("arrow up clicked")

                if(this.mesh.position.y < 75) {
                    // move up
                    this.mesh.position.y += this.speed
                }
            }
            if(event.key === "ArrowDown"){
                //console.log("arrow down clicked")

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
        this.mesh.position.x = 145;
    }

}