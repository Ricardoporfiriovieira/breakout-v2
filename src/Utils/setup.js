import Board from "../Classes/Board/Board.js";
import Player from "../Classes/Player/Player.js";
import Ball from "../Classes/Ball/Ball.js";

export default function setup(){
    let boardWidth = 500;
    let boardHeight = 600;
    let BoardElement = document.getElementById("board");
    
    const board = new Board(boardWidth, boardHeight, BoardElement);
    board.create();

    var context = document.getElementById("board");
    var ctx = context.getContext("2d");

    let playerWidth = 40;
    let playerHeight = 5;

    let playerX = ((boardWidth - playerWidth) / 2) - 100;
    let playerY = (boardHeight - playerHeight) - 455;

    const player = new Player(playerX, playerY, playerWidth, playerHeight, ctx);
    player.create();

    let ballX = 150;
    let ballY = 150;

    let ballWidth = 100;

    const ball = new Ball(ballX, ballY, ballWidth, ctx);
    ball.create();

    return { board, BoardElement, player, ball };
}