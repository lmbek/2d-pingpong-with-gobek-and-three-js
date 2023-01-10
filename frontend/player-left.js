class PlayerLeft extends Player {
    started = false

    update(){
        if(this.input.isKeyWDown){
            if(this.mesh.position.y < 54) {
                // move up
                this.mesh.position.y += this.speed
            }
        }
        if(this.input.isKeySDown){
            if(this.mesh.position.y > -54) {
                // move up
                this.mesh.position.y -= this.speed
            }
        }

        if(this.input.isSpaceDown&&this.started===false){
            this.started = true
            document.getElementById("info").innerText = ""
            // set initial ball position
            game.ball.setInitialMovement()
        } else if(this.started===false) {
            document.getElementById("info").innerText = "Press Space to start round"
        } else if(this.started===true){
            document.getElementById("info").innerText = ""
        }
    }
}