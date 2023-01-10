class PlayerRight extends Player {
    update(){
        if(this.input.isKeyUpDown){
            if(this.mesh.position.y < 54) {
                // move up
                this.mesh.position.y += this.speed
            }
        }
        if(this.input.isKeyDownDown){
            if(this.mesh.position.y > -54) {
                // move up
                this.mesh.position.y -= this.speed
            }
        }
    }
}