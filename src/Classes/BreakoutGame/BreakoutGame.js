import Paddle from "../Paddle/Paddle.js";
import Ball from "../Ball/Ball.js";
import RotatingBlock from "../RotattingBlock/RotattingBlock.js";
import PowerUp from "../PowerUp/PowerUp.js";
import Brick from "../Brick/Brick.js";

class BreakoutGame {
    constructor() {
        this.canvas = document.getElementById("breakoutCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.paddle = new Paddle(this.canvas);
        this.ball = new Ball(this.canvas);
        this.bricks = [];
        this.rotatingBlock = new RotatingBlock(this.canvas, 75, 20, 0.02);
        this.powerUp = new PowerUp();
        this.rightPressed = false;
        this.leftPressed = false;

        document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
        document.addEventListener("keyup", this.keyUpHandler.bind(this), false);

        this.initBricks();
        this.draw();
    }

    initBricks() {
        const brickRowCount = 5;
        const brickColumnCount = 3;
        const brickWidth = 75;
        const brickHeight = 20;
        const brickPadding = 10;

        for (let c = 0; c < brickColumnCount; c++) {
            this.bricks[c] = [];
            for (let r = 0; r < brickRowCount; r++) {
                const brickX = c * (brickWidth + brickPadding) + 30;
                const brickY = r * (brickHeight + brickPadding) + 30;
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

        this.drawBricks();
        this.paddle.draw(this.ctx);
        this.ball.draw(this.ctx);
        this.drawPowerUp();
        this.collisionDetection();

        // Move the paddle
        if (this.rightPressed && this.paddle.x < this.canvas.width - this.paddle.width) {
            this.paddle.x += 7;
        } else if (this.leftPressed && this.paddle.x > 0) {
            this.paddle.x -= 7;
        }

        // Move the ball
        this.ball.x += this.ball.dx;
        this.ball.y += this.ball.dy;

        // Bounce off the walls
        if (this.ball.x + this.ball.dx > this.canvas.width - this.ball.radius || this.ball.x + this.ball.dx < this.ball.radius) {
            this.ball.dx = -this.ball.dx;
        }

        // Bounce off the paddle
        if (this.ball.y + this.ball.dy < this.ball.radius) {
            this.ball.dy = -this.ball.dy;
        } else if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {
            // Check if the ball hits the paddle
            if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {
                this.ball.dy = -this.ball.dy;
            } else {
                // Game over
                document.location.reload();
            }
        }

        // Update rotating block angle
        this.rotatingBlock.angle += this.rotatingBlock.rotationSpeed;

        requestAnimationFrame(this.draw.bind(this));
    }

    drawBricks() {
        for (let c = 0; c < this.bricks.length; c++) {
            for (let r = 0; r < this.bricks[c].length; r++) {
                const brick = this.bricks[c][r];
                if (brick.status == 1) {
                    brick.draw(this.ctx);
                }
            }
        }

        // Draw rotating block
        this.rotatingBlock.draw(this.ctx);
    }

    drawPowerUp() {
        if (this.powerUp.active) {
            this.ctx.font = "16px Arial";
            this.ctx.fillStyle = "#0095DD";
            this.ctx.fillText("Power-Up Active", 8, 20);
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
            this.ball.dy = -this.ball.dy;
        }
    }
}

export default BreakoutGame;