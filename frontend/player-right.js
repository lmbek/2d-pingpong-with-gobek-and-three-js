class PlayerRight extends Player {

    constructor() {
        super();
    }

    setupKeyControls() {
        var cube = scene.getObjectByName('batRight')
        document.onkeydown = function(e) {
            switch (e.keyCode){
                case 38: // up arrow key
                    console.log("up arrow pressed")
                    cube.position.y -= 1; // change y by -1, UP
                    break;
                case 40: // down arrow key
                    console.log("down arrow pressed")
                    cube.position.y += 1; // change y by +1, DOWN
                    break;
            }
        };
    }


}