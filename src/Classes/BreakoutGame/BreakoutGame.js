import Paddle from "../Paddle/Paddle.js";
import Ball from "../Ball/Ball.js";
import RotatingBlock from "../RotattingBlock/RotattingBlock.js";
import PowerUp from "../PowerUp/PowerUp.js";
import Brick from "../Brick/Brick.js";

class BreakoutGame {
    constructor() {
        this.score = 0; // Adicione esta linha para iniciar a pontuação
        this.scoreElement = document.getElementById("score"); // Substitua pelo ID real do elemento de pontuação no seu HTML

        this.canvas = document.getElementById("breakoutCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.paddle = new Paddle(this.canvas);
        this.ball = new Ball(this.canvas);
        this.bricks = [];
        this.rotatingBlock = new RotatingBlock(this.canvas, 75, 20, 0.02);
        this.powerUp = new PowerUp();
        this.rightPressed = false;
        this.leftPressed = false;

        this.menu = document.getElementById("menu");
        this.startButton = document.getElementById("startButton");

        this.gameOver = document.getElementById("gameOver");
        this.restartButton = document.getElementById("restartButton");

        this.startButton.addEventListener("click", this.startGame.bind(this));
        this.restartButton.addEventListener("click", this.restartGame.bind(this));

        document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
        document.addEventListener("keyup", this.keyUpHandler.bind(this), false);

        this.showMenu();

        
    }

    showMenu() {
        this.menu.style.display = "block";
        this.gameOver.style.display = "none";
    }


    startGame() {
        this.menu.style.display = "none";
        this.gameOver.style.display = "none";
        this.score = 0;
        this.updateScore();
        this.initBricks();
        this.draw();
    }

    restartGame() {
        this.gameOver.style.display = "none";
        this.score = 0;
        this.updateScore();
        this.initBricks();
        this.draw();
        document.location.reload();
    }

    updateScore() {
        this.scoreElement.textContent = "Score: " + this.score;
    }

    showGameOver() {
        this.gameOver.style.display = "block";
        document.getElementById("finalScore").textContent = this.score;
    }

    initBricks() {
        // quantidade de linhas
        const brickRowCount = 5;
        // quantidade de coluna
        const brickColumnCount = 3;
        // largura do bloco
        const brickWidth = 75;
        // altura do bloco
        const brickHeight = 20;
        // distancia entre os blocos
        const brickPadding = 10;

        for (let c = 0; c < brickColumnCount; c++) {
            this.bricks[c] = [];
            for (let r = 0; r < brickRowCount; r++) {
                // desenhando o quadrado
                const brickX = c * (brickWidth + brickPadding) + 30;
                const brickY = r * (brickHeight + brickPadding) + 30;
                // calculo para saber se o quadrado tem poderzinho
                const powerUp = Math.random() < 0.2;

                this.bricks[c][r] = new Brick(brickX, brickY, brickWidth, brickHeight, powerUp);
            }
        }
    }

    keyDownHandler(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            this.rightPressed = true;
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
            this.leftPressed = true;
        }
    }

    keyUpHandler(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            this.rightPressed = false;
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
            this.leftPressed = false;
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // desenhaos bloquinhos
        this.drawBricks();
        // desenha o jogador
        this.paddle.draw(this.ctx);
        this.ball.draw(this.ctx);
        this.drawPowerUp();
        this.collisionDetection();

        // verificando se um dos botões foi apertado pra mover a barrinha
        if (this.rightPressed && this.paddle.x < this.canvas.width - this.paddle.width) {
            this.paddle.x += 7;
        } else if (this.leftPressed && this.paddle.x > 0) {
            this.paddle.x -= 7;
        }

        // Move the ball
        this.ball.x += this.ball.dx;
        this.ball.y += this.ball.dy;

        // bolinha batendo nas paredes
        if (this.ball.x + this.ball.dx > this.canvas.width - this.ball.radius || this.ball.x + this.ball.dx < this.ball.radius) {
            this.ball.dx = -this.ball.dx;
        }

        // bolinha batendo no jogador
        if (this.ball.y + this.ball.dy < this.ball.radius) {
            this.ball.dy = -this.ball.dy;
        } else if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {
            // Check if the ball hits the paddle
            if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {
                // Calculate a new angle based on where the ball hits the paddle
                const relativeIntersectX = this.ball.x - (this.paddle.x + this.paddle.width / 2);
                const normalizedRelativeIntersectX = relativeIntersectX / (this.paddle.width / 2);
                const bounceAngle = normalizedRelativeIntersectX * Math.PI / 3; // Adjust the angle as needed

                // Update the ball's direction based on the new angle
                this.ball.dx = Math.sin(bounceAngle) * this.ball.speed; // Adjust ball.speed as needed
                this.ball.dy = -Math.cos(bounceAngle) * this.ball.speed; // Adjust ball.speed as needed
            } else {
                // Game over
                this.showGameOver();
            }
        }


        

        // fazendo nbarrinha ficar girando
        this.rotatingBlock.angle += this.rotatingBlock.rotationSpeed;

        // faz a animação do jogo        
        requestAnimationFrame(this.draw.bind(this));
    }

    // desenha os bloquinhos
    drawBricks() {
        let cont = 0;
        // desenha o bloquinho que gira
        this.rotatingBlock.draw(this.ctx);

        for (let c = 0; c < this.bricks.length; c++) {
            for (let r = 0; r < this.bricks[c].length; r++) {
                const brick = this.bricks[c][r];
                if (brick.status == 1) {
                    brick.draw(this.ctx);

                    if(brick.powerUp) {
                        brick.draw(this.ctx, "pink");
                    }
                }else{
                    cont++;
                }

            }
        }

        if(cont === this.bricks.length * this.bricks[0].length){
            console.log("ganhou");  
        }

    }

    drawPowerUp() {
        if (this.powerUp.active) {
            this.ctx.font = "16px Arial";
            this.ctx.fillStyle = "#0095DD";
            this.ctx.fillText("Poderzinho ativado", 8, 20);
        }
    }

    collisionDetection() {
        for (let c = 0; c < this.bricks.length; c++) {
            for (let r = 0; r < this.bricks[c].length; r++) {
                const brick = this.bricks[c][r];
                if (brick.status == 1) {
                    if (
                        this.ball.x > brick.x &&
                        this.ball.x < brick.x + brick.width &&
                        this.ball.y > brick.y &&
                        this.ball.y < brick.y + brick.height
                    ) {
                        this.ball.dy = -this.ball.dy;
                        brick.status = 0;
                        this.score += 10;
                        this.updateScore();

                        if (brick.powerUp) {
                            this.powerUp.activatePaddlePowerUp(this.paddle);
                        }
                    }
                }
            }
        }

        // Check collision with rotating block
        if (
            this.ball.x > this.rotatingBlock.x &&
            this.ball.x < this.rotatingBlock.x + this.rotatingBlock.width &&
            this.ball.y > this.rotatingBlock.y &&
            this.ball.y < this.rotatingBlock.y + this.rotatingBlock.height
        ) {
            this.ball.speed += 1;
            this.ball.dy = -this.ball.dy;
        
        }
    }
}

export default BreakoutGame;