import setup from "./Utils/setup.js";

window.addEventListener('load', function() {
    const { board, BoardElement, player} = setup();
    
    function updateFrame(){
        player.update();
    }


    setInterval(updateFrame, 16);
});



