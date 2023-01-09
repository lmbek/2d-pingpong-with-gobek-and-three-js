class PlayerRight extends Player {

    constructor() {
        super()
    }

    update(){
        super.update()
        if(this.input.isKeyUpDown){
            if(this.mesh.position.y < 75) {
                // move up
                this.mesh.position.y += this.speed
            }
        }
        if(this.input.isKeyDownDown){
            if(this.mesh.position.y > -75) {
                // move up
                this.mesh.position.y -= this.speed
            }
        }
    }

    changePosition() {
        super.changePosition()
        // mesh x position
        this.mesh.position.x = 145;
    }

}