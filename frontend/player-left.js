class PlayerLeft extends Player {

    constructor() {
        super();
    }

    setupKeyControls() {
        var cube = scene.getObjectByName('batLeft')
        document.onkeydown = function(e) {
            switch (e.keyCode){
                case 87: // W key
                    console.log("W key pressed")
                    cube.position.y -= 1; // change y by -1, UP
                    break;
                case 83: // S key
                    console.log("S key pressed")
                    cube.position.y += 1; // change y by +1, DOWN
                    break;
            }
        };
    }


}