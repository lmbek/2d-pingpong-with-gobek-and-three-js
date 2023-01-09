class Input {
    isKeyWDown = false;
    isKeySDown = false;
    isKeyUpDown = false;
    isKeyDownDown = false;

    constructor() {
        this.addEventListeners(document)
    }

    addEventListeners(dom){
        dom.addEventListener("keydown", (event) => {
            if (event.code === "KeyW") {
                this.isKeyWDown = true;
            } else if (event.code === "KeyS") {
                this.isKeySDown = true;
            }

            if (event.code === "ArrowUp") {
                this.isKeyUpDown = true;
            } else if (event.code === "ArrowDown") {
                this.isKeyDownDown = true;
            }

        });

        dom.addEventListener("keyup", (event) => {
            if (event.code === "KeyW") {
                this.isKeyWDown = false;
            } else if (event.code === "KeyS") {
                this.isKeySDown = false;
            }

            if (event.code === "ArrowUp") {
                this.isKeyUpDown = false;
            } else if (event.code === "ArrowDown") {
                this.isKeyDownDown = false;
            }
        });
    }

}