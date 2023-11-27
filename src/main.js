import setup from "./Utils/setup.js";
// Certifique-se de corrigir o caminho para a classe Ball

window.addEventListener('load', function() {
    const { board, BoardElement, player, ball } = setup();

    function updateFrame() {
        player.update();
        //ball.update(); // Adiciona a atualização da bola ao quadro
        //ball.collision(player); // Verifica colisões da bola com o jogador
    }

    setInterval(updateFrame, 16);
});
