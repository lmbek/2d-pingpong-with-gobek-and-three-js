class Input {
    isKeyWDown = false;
    isKeySDown = false;
    isKeyUpDown = false;
    isKeyDownDown = false;
    isSpaceDown = false;

    constructor() {
        this.addEventListeners(document)
    }

    addEventListeners(dom){
        dom.addEventListener("keydown", (event) => {
            if (event.code === "KeyW") {
                this.isKeyWDown = true;
            }

            if (event.code === "KeyS") {
                this.isKeySDown = true;
            }

            if (event.code === "ArrowUp") {
                this.isKeyUpDown = true;
            }

            if (event.code === "ArrowDown") {
                this.isKeyDownDown = true;
            }

            if (event.code === "Space") {
                this.isSpaceDown = true;
            }
        });

        dom.addEventListener("keyup", (event) => {
            if (event.code === "KeyW") {
                this.isKeyWDown = false;
            }

            if (event.code === "KeyS") {
                this.isKeySDown = false;
            }

            if (event.code === "ArrowUp") {
                this.isKeyUpDown = false;
            }

            if (event.code === "ArrowDown") {
                this.isKeyDownDown = false;
            }

            if (event.code === "Space") {
                this.isSpaceDown = false;
            }
        });
    }

}