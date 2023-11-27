export default class Ball {
    constructor(x, y, width, ctx) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = width;
        this.ctx = ctx;
        this.boardWidth = 500;
        this.boardHeight = 600;
        this.ballSpeed = 5;
    }

    create() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.ctx.clearRect(0, 0, this.boardWidth, this.boardHeight);
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    collision(player) {
        // Bounce the ball off the player paddle
        if (this.topCollision(player) || this.bottomCollision(player)) {
            this.velocityY *= -1; // Flip y direction up or down
        } else if (this.leftCollision(player) || this.rightCollision(player)) {
            this.velocityX *= -1; // Flip x direction left or right
        }

        if (this.y <= 0) {
            // If ball touches top of canvas
            this.velocityY *= -1; // Reverse direction
        } else if (this.x <= 0 || this.x + this.width >= this.boardWidth) {
            // If ball touches left or right of canvas
            this.velocityX *= -1; // Reverse direction
        } else if (this.y + this.height >= this.boardHeight) {
            // If ball touches bottom of canvas
            this.gameOver();
        }
    }

    topCollision(block) {
        return (
            this.y < block.y + block.height &&
            this.y + this.height >= block.y &&
            this.x < block.x + block.width &&
            this.x + this.width > block.x
        );
    }

    bottomCollision(block) {
        return (
            this.y < block.y + block.height &&
            this.y + this.height >= block.y &&
            this.x < block.x + block.width &&
            this.x + this.width > block.x
        );
    }

    leftCollision(block) {
        return (
            this.y < block.y + block.height &&
            this.y + this.height > block.y &&
            this.x < block.x + block.width &&
            this.x + this.width >= block.x
        );
    }

    rightCollision(block) {
        return (
            this.y < block.y + block.height &&
            this.y + this.height > block.y &&
            this.x < block.x + block.width &&
            this.x + this.width >= block.x
        );
    }

    gameOver() {
        this.ctx.font = "20px sans-serif";
        this.ctx.fillText("Aperte a tela de espaço pra iniciar", 80, 400);
        gameOver = true;
    }
}