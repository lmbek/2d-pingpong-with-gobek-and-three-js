class PlayerLeft extends Player {

    constructor() {
        super()
    }

    update(){
        super.update()
        if(this.input.isKeyWDown){
            if(this.mesh.position.y < 75) {
                // move up
                this.mesh.position.y += this.speed
            }
        }
        if(this.input.isKeySDown){
            if(this.mesh.position.y > -75) {
                // move up
                this.mesh.position.y -= this.speed
            }
        }
    }

    changePosition() {
        super.changePosition()
        // mesh x position
        this.mesh.position.x = -145;
    }

}